'use client'

import React, { useEffect, useMemo, useState } from 'react'
import {
  CalendarDays,
  Clock3,
  Plus,
  Trash2,
  X,
  Bell,
  BookOpen,
  Timer,
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import './page.css'

const page = () => {
  const supabase = createClient()

  const [exams, setExams] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const [showForm, setShowForm] = useState(false)

  const [name, setName] = useState('')
  const [subject, setSubject] = useState('General')
  const [examDate, setExamDate] = useState('')
  const [description, setDescription] = useState('')

  const [now, setNow] = useState(new Date())

  useEffect(() => {
    loadExams()

    const interval = setInterval(() => {
      setNow(new Date())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const loadExams = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        setLoading(false)
        return
      }

      const { data, error } = await supabase
        .from('exam_countdowns')
        .select('*')
        .eq('user_id', user.id)
        .order('exam_date', { ascending: true })

      if (error) throw error

      setExams(data || [])
    } catch (error) {
      console.error('Failed to load exams:', error)
    } finally {
      setLoading(false)
    }
  }

  const upcomingExams = useMemo(() => {
    return exams.filter((exam) => new Date(exam.exam_date) > now)
  }, [exams, now])

  const pastExams = useMemo(() => {
    return exams.filter((exam) => new Date(exam.exam_date) <= now)
  }, [exams, now])

  const nextExam = upcomingExams[0] || null

  const getCountdown = (date) => {
    const difference = new Date(date).getTime() - now.getTime()

    if (difference <= 0) {
      return {
        expired: true,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      }
    }

    const totalSeconds = Math.floor(difference / 1000)

    const days = Math.floor(totalSeconds / 86400)
    const hours = Math.floor((totalSeconds % 86400) / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60

    return {
      expired: false,
      days,
      hours,
      minutes,
      seconds,
    }
  }

  const formatNumber = (number) => {
    return String(number).padStart(2, '0')
  }

  const formatExamDate = (date) => {
    return new Date(date).toLocaleString([], {
      dateStyle: 'medium',
      timeStyle: 'short',
    })
  }

  const resetForm = () => {
    setName('')
    setSubject('General')
    setExamDate('')
    setDescription('')
  }

  const handleAddExam = async (e) => {
    e.preventDefault()

    if (!name.trim() || !examDate) {
        return
    }

    const selectedDate = new Date(examDate)

    if (selectedDate <= new Date()) {
        alert('Please choose a future date and time.')
        return
    }

    setSaving(true)

    try {
        const {
        data: { user },
        } = await supabase.auth.getUser()

        if (!user) {
        alert('Please sign in first.')
        return
        }

        const { data: exam, error } = await supabase
        .from('exam_countdowns')
        .insert({
            user_id: user.id,
            name: name.trim(),
            subject: subject.trim() || 'General',
            exam_date: selectedDate.toISOString(),
            description: description.trim() || null,
        })
        .select()
        .single()

        if (error) throw error

        const {
        data: { session },
        } = await supabase.auth.getSession()

        if (!session?.access_token) {
        alert(
            'Exam saved, but your session could not be verified for email scheduling.'
        )

        setExams((prev) =>
            [...prev, exam].sort(
            (a, b) =>
                new Date(a.exam_date).getTime() -
                new Date(b.exam_date).getTime()
            )
        )

        resetForm()
        setShowForm(false)
        return
        }

        const emailResponse = await fetch('/api/exam-notifications', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
            examId: exam.id,
        }),
        })

        const emailText = await emailResponse.text()

        let emailData = {}

        try {
        emailData = emailText ? JSON.parse(emailText) : {}
        } catch (parseError) {
        console.error('Invalid API response:', emailText)
        }

        if (!emailResponse.ok) {
        console.error('Email scheduling failed:', emailData)

        alert(
            emailData.error ||
            'Exam saved, but the email notification could not be scheduled.'
        )

        setExams((prev) =>
            [...prev, exam].sort(
            (a, b) =>
                new Date(a.exam_date).getTime() -
                new Date(b.exam_date).getTime()
            )
        )
        } else if (emailData.emailScheduled) {
        const { data: updatedExam, error: updateError } = await supabase
            .from('exam_countdowns')
            .update({
            resend_email_id: emailData.emailId,
            })
            .eq('id', exam.id)
            .select()
            .single()

        if (!updateError && updatedExam) {
            setExams((prev) =>
            [...prev.filter((item) => item.id !== exam.id), updatedExam].sort(
                (a, b) =>
                new Date(a.exam_date).getTime() -
                new Date(b.exam_date).getTime()
            )
            )
        } else {
            setExams((prev) =>
            [...prev, exam].sort(
                (a, b) =>
                new Date(a.exam_date).getTime() -
                new Date(b.exam_date).getTime()
            )
            )
        }
        } else {
        setExams((prev) =>
            [...prev, exam].sort(
            (a, b) =>
                new Date(a.exam_date).getTime() -
                new Date(b.exam_date).getTime()
            )
        )
        }

        resetForm()
        setShowForm(false)
    } catch (error) {
        console.error('Failed to add exam:', error)
        alert('Something went wrong while adding the exam.')
    } finally {
        setSaving(false)
    }
   }


  const handleDeleteExam = async (id) => {
    const confirmed = window.confirm(
        'Are you sure you want to delete this exam?'
    )

    if (!confirmed) return

    try {
        const examToDelete = exams.find((exam) => exam.id === id)

        // Cancel the scheduled Resend email first
        if (examToDelete?.resend_email_id) {
        const {
            data: { session },
        } = await supabase.auth.getSession()

        const response = await fetch('/api/exam-notifications', {
            method: 'DELETE',
            headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session?.access_token}`,
            },
            body: JSON.stringify({
            examId: id,
            }),
        })

        if (!response.ok) {
            console.error('Failed to cancel scheduled email.')
        }
        }

        const { error } = await supabase
        .from('exam_countdowns')
        .delete()
        .eq('id', id)

        if (error) throw error

        setExams((prev) => prev.filter((exam) => exam.id !== id))
    } catch (error) {
        console.error('Failed to delete exam:', error)
        alert('Could not delete this exam.')
    }
    }


  if (loading) {
    return (
      <main className="exam-page">
        <div className="exam-loading">
          <Timer size={32} />
          <h2>Loading Exam Countdown...</h2>
          <p>Getting your upcoming exams.</p>
        </div>
      </main>
    )
  }

  const countdown = nextExam
    ? getCountdown(nextExam.exam_date)
    : null

  return (
    <main className="exam-page">

      <section className="exam-header">
        <div>
          <span className="exam-label">STUDY TOOLS</span>
          <h1>Exam Countdown</h1>
          <p>
            Keep track of your exams and never lose sight of what's coming.
          </p>
        </div>

        <button
          className="add-exam-btn"
          onClick={() => setShowForm(true)}
        >
          <Plus size={19} />
          Add Exam
        </button>
      </section>

      {nextExam && countdown && !countdown.expired && (
        <section className="next-exam-card">

          <div className="next-exam-top">
            <div>
              <span className="next-label">NEXT EXAM</span>
              <h2>{nextExam.name}</h2>
              <p>
                {nextExam.subject} · {formatExamDate(nextExam.exam_date)}
              </p>
            </div>

            {nextExam.resend_email_id && (
            <div className="notification-badge">
                <Bell size={16} />
                Email reminder scheduled
            </div>
            )}
          </div>

          <div className="countdown-grid">

            <div className="countdown-box">
              <strong>{formatNumber(countdown.days)}</strong>
              <span>Days</span>
            </div>

            <div className="countdown-box">
              <strong>{formatNumber(countdown.hours)}</strong>
              <span>Hours</span>
            </div>

            <div className="countdown-box">
              <strong>{formatNumber(countdown.minutes)}</strong>
              <span>Minutes</span>
            </div>

            <div className="countdown-box">
              <strong>{formatNumber(countdown.seconds)}</strong>
              <span>Seconds</span>
            </div>

          </div>

          {nextExam.description && (
            <div className="next-exam-description">
              {nextExam.description}
            </div>
          )}

        </section>
      )}

      {!nextExam && (
        <section className="empty-next-card">
          <CalendarDays size={38} />
          <h2>No upcoming exams</h2>
          <p>Add your next exam and CampusPlug will keep track of it.</p>
          <button onClick={() => setShowForm(true)}>
            <Plus size={18} />
            Add Your First Exam
          </button>
        </section>
      )}

      <section className="exam-section">

        <div className="section-heading">
          <div>
            <h2>Upcoming Exams</h2>
            <p>Your scheduled exams.</p>
          </div>

          <span>{upcomingExams.length}</span>
        </div>

        {upcomingExams.length === 0 ? (
          <div className="no-exams">
            <BookOpen size={30} />
            <p>No upcoming exams yet.</p>
          </div>
        ) : (
          <div className="exam-list">
            {upcomingExams.map((exam) => {
              const examCountdown = getCountdown(exam.exam_date)

              return (
                <div className="exam-card" key={exam.id}>

                  <div className="exam-card-icon">
                    <CalendarDays size={22} />
                  </div>

                  <div className="exam-card-content">
                    <h3>{exam.name}</h3>

                    <span className="exam-subject">
                      {exam.subject}
                    </span>

                    <p>
                      <Clock3 size={15} />
                      {formatExamDate(exam.exam_date)}
                    </p>

                    {exam.description && (
                      <small>{exam.description}</small>
                    )}
                  </div>

                  <div className="exam-card-countdown">
                    <strong>
                      {examCountdown.days}d {formatNumber(examCountdown.hours)}h
                    </strong>
                    <span>remaining</span>
                  </div>

                  <button
                    className="delete-exam-btn"
                    onClick={() => handleDeleteExam(exam.id)}
                    title="Delete exam"
                  >
                    <Trash2 size={18} />
                  </button>

                </div>
              )
            })}
          </div>
        )}

      </section>

      {pastExams.length > 0 && (
        <section className="exam-section past-section">

          <div className="section-heading">
            <div>
              <h2>Past Exams</h2>
              <p>Exams whose scheduled time has passed.</p>
            </div>

            <span>{pastExams.length}</span>
          </div>

          <div className="exam-list">
            {pastExams.map((exam) => (
              <div className="exam-card past-card" key={exam.id}>

                <div className="exam-card-icon">
                  <CalendarDays size={22} />
                </div>

                <div className="exam-card-content">
                  <h3>{exam.name}</h3>

                  <span className="exam-subject">
                    {exam.subject}
                  </span>

                  <p>
                    <Clock3 size={15} />
                    {formatExamDate(exam.exam_date)}
                  </p>
                </div>

                <span className="completed-badge">
                  Completed
                </span>

                <button
                  className="delete-exam-btn"
                  onClick={() => handleDeleteExam(exam.id)}
                  title="Delete exam"
                >
                  <Trash2 size={18} />
                </button>

              </div>
            ))}
          </div>

        </section>
      )}

      {showForm && (
        <div className="modal-overlay">

          <div className="exam-modal">

            <div className="modal-header">
              <div>
                <span>NEW EXAM</span>
                <h2>Add Exam</h2>
              </div>

              <button
                className="close-modal-btn"
                onClick={() => {
                  setShowForm(false)
                  resetForm()
                }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddExam}>

              <div className="form-group">
                <label>Exam Name</label>

                <input
                  type="text"
                  placeholder="e.g. JAMB Mathematics"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Subject</label>

                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                >
                  <option>General</option>
                  <option>Mathematics</option>
                  <option>English</option>
                  <option>Physics</option>
                  <option>Chemistry</option>
                  <option>Biology</option>
                  <option>Computer Science</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="form-group">
                <label>Exam Date & Time</label>

                <input
                  type="datetime-local"
                  value={examDate}
                  onChange={(e) => setExamDate(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Description (Optional)</label>

                <textarea
                  placeholder="Add any notes about this exam..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="notification-info">
                <Bell size={18} />

                <p>
                  CampusPlug will send an email to your account email when
                  your exam time arrives.
                </p>
              </div>

              <button
                className="save-exam-btn"
                type="submit"
                disabled={saving}
              >
                {saving ? 'Saving Exam...' : 'Save Exam'}
              </button>

            </form>

          </div>

        </div>
      )}

    </main>
  )
}

export default page

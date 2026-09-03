'use client'

import React, { useEffect, useMemo, useState } from 'react'
import {
  Play,
  Pause,
  RotateCcw,
  Clock3,
  Flame,
  CheckCircle2,
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import './page.css'

const TIMER_PRESETS = [25, 45, 60]

const page = () => {
  const supabase = createClient()

  const [selectedMinutes, setSelectedMinutes] = useState(25)
  const [timeLeft, setTimeLeft] = useState(25 * 60)
  const [isRunning, setIsRunning] = useState(false)

  const [subject, setSubject] = useState('General')
  const [goal, setGoal] = useState('')

  const [todaySeconds, setTodaySeconds] = useState(0)
  const [completedSessions, setCompletedSessions] = useState(0)

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const totalSeconds = selectedMinutes * 60

  const progress = useMemo(() => {
    return ((totalSeconds - timeLeft) / totalSeconds) * 100
  }, [totalSeconds, timeLeft])

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60

    return `${String(minutes).padStart(2, '0')}:${String(
      remainingSeconds
    ).padStart(2, '0')}`
  }

  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)

    if (hours > 0) {
      return `${hours}h ${minutes}m`
    }

    return `${minutes}m`
  }

  useEffect(() => {
    const loadStats = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (!user) {
          setLoading(false)
          return
        }

        const startOfDay = new Date()
        startOfDay.setHours(0, 0, 0, 0)

        const { data, error } = await supabase
          .from('focus_sessions')
          .select('duration_seconds, completed_at')
          .eq('user_id', user.id)
          .gte('completed_at', startOfDay.toISOString())

        if (error) throw error

        const sessions = data || []

        const total = sessions.reduce(
          (sum, session) => sum + session.duration_seconds,
          0
        )

        setTodaySeconds(total)
        setCompletedSessions(sessions.length)
      } catch (error) {
        console.error('Failed to load focus stats:', error?.message)
        console.error('Load error details:', error)
      } finally {
        setLoading(false)
      }
    }

    loadStats()
  }, [])

  useEffect(() => {
    if (!isRunning) return

    if (timeLeft <= 0) {
      completeSession()
      return
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [isRunning, timeLeft])

  const completeSession = async () => {
    setIsRunning(false)
    setSaving(true)

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) return

      const { error } = await supabase.from('focus_sessions').insert({
        user_id: user.id,
        subject: subject.trim() || 'General',
        goal: goal.trim() || null,
        duration_seconds: totalSeconds,
      })

      if (error) throw error

      setTodaySeconds((prev) => prev + totalSeconds)
      setCompletedSessions((prev) => prev + 1)
      setTimeLeft(totalSeconds)
      setGoal('')
    } catch (error) {
      console.error('Failed to save focus session:', error?.message)
      console.error('Save error details:', error)
    } finally {
      setSaving(false)
    }
  }

  const startTimer = () => {
    if (timeLeft <= 0) {
      setTimeLeft(totalSeconds)
    }

    setIsRunning(true)
  }

  const pauseTimer = () => {
    setIsRunning(false)
  }

  const resetTimer = () => {
    setIsRunning(false)
    setTimeLeft(totalSeconds)
  }

  const changePreset = (minutes) => {
    if (isRunning) return

    setSelectedMinutes(minutes)
    setTimeLeft(minutes * 60)
  }

  const handleCustomTime = (e) => {
    if (isRunning) return

    const value = Number(e.target.value)

    if (!value || value < 1) return

    setSelectedMinutes(value)
    setTimeLeft(value * 60)
  }

  const handleStart = () => {
    if (isRunning) {
      pauseTimer()
    } else {
      startTimer()
    }
  }

  if (loading) {
    return (
      <main className="focus-page">
        <div className="focus-loading">
          <Clock3 size={32} />
          <h2>Loading Focus Mode...</h2>
          <p>Getting your study progress.</p>
        </div>
      </main>
    )
  }

  return (
    <main className="focus-page">

      <section className="focus-header">
        <div>
          <span className="focus-label">STUDY TOOLS</span>
          <h1>Focus Mode</h1>
          <p>
            Stay focused, study smarter, and keep track of your progress.
          </p>
        </div>
      </section>

      <section className="focus-stats">

        <div className="focus-stat-card">
          <div className="stat-icon">
            <Clock3 size={21} />
          </div>
          <div>
            <span>Today's Focus</span>
            <strong>{formatDuration(todaySeconds)}</strong>
          </div>
        </div>

        <div className="focus-stat-card">
          <div className="stat-icon">
            <CheckCircle2 size={21} />
          </div>
          <div>
            <span>Sessions Completed</span>
            <strong>{completedSessions}</strong>
          </div>
        </div>

        <div className="focus-stat-card">
          <div className="stat-icon">
            <Flame size={21} />
          </div>
          <div>
            <span>Current Session</span>
            <strong>{formatTime(timeLeft)}</strong>
          </div>
        </div>

      </section>

      <section className="focus-layout">

        <div className="timer-card">

          <div className="timer-presets">
            {TIMER_PRESETS.map((minutes) => (
              <button
                key={minutes}
                className={selectedMinutes === minutes ? 'active' : ''}
                onClick={() => changePreset(minutes)}
              >
                {minutes} min
              </button>
            ))}

            <input
              type="number"
              min="1"
              placeholder="Custom"
              disabled={isRunning}
              onChange={handleCustomTime}
            />
          </div>

          <div className="timer-circle">

            <div
              className="timer-progress"
              style={{
                background: `conic-gradient(
                  currentColor ${progress}%,
                  transparent ${progress}%
                )`,
              }}
            />

            <div className="timer-inner">
              <span>{isRunning ? 'FOCUSING' : 'READY'}</span>
              <strong>{formatTime(timeLeft)}</strong>
              <small>{subject}</small>
            </div>

          </div>

          <div className="timer-controls">

            <button
              className="main-timer-btn"
              onClick={handleStart}
              disabled={saving}
            >
              {isRunning ? (
                <>
                  <Pause size={19} />
                  Pause
                </>
              ) : (
                <>
                  <Play size={19} />
                  Start Focus
                </>
              )}
            </button>

            <button
              className="reset-timer-btn"
              onClick={resetTimer}
            >
              <RotateCcw size={18} />
              Reset
            </button>

          </div>

          {saving && (
            <p className="saving-message">
              Saving your completed session...
            </p>
          )}

        </div>

        <div className="focus-details">

          <div className="details-card">
            <h2>Focus Session</h2>
            <p>Set what you're studying before you start.</p>

            <div className="focus-input-group">
              <label>Subject</label>

              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                disabled={isRunning}
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

            <div className="focus-input-group">
              <label>Study Goal</label>

              <textarea
                placeholder="What do you want to accomplish?"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                disabled={isRunning}
              />
            </div>
          </div>

          <div className="focus-tip">
            <Flame size={20} />

            <div>
              <strong>Stay focused</strong>
              <p>
                Put your phone aside, choose one task, and give it your full
                attention.
              </p>
            </div>
          </div>

        </div>

      </section>

    </main>
  )
}

export default page

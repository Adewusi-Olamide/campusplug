"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import {
  BookOpen,
  Calculator,
  ClipboardList,
  FileText,
  Flame,
  Clock3,
  ArrowRight,
  CheckCircle2,
  CalendarDays,
  Laptop,
} from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import "./page.css"

const DAILY_TASKS = [
  {
    key: "study-session",
    title: "Complete a study session",
    description: "Spend some focused time studying today.",
  },
  {
    key: "cbt-practice",
    title: "Complete a CBT practice",
    description: "Test yourself with a CBT practice exam.",
  },
  {
    key: "flashcards",
    title: "Review your flashcards",
    description: "Review important topics and concepts.",
  },
  {
    key: "notes",
    title: "Review your notes",
    description: "Go through your saved study notes.",
  },
]

const Page = () => {
  const supabase = createClient()

  const [userName, setUserName] = useState("Student")

  const [tasks, setTasks] = useState([])
  const [completedTasks, setCompletedTasks] = useState(0)

  const [studyStreak, setStudyStreak] = useState(0)
  const [cbtCount, setCbtCount] = useState(0)
  const [cbtAverage, setCbtAverage] = useState(0)

  const [loading, setLoading] = useState(true)
  const [savingTask, setSavingTask] = useState(null)

  const getLocalDate = (date = new Date()) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")

    return `${year}-${month}-${day}`
  }

  const loadDashboard = async () => {
    setLoading(true)

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser()

      console.log("USER:", user)
      console.log("USER ERROR:", userError)

      if (userError) {
        throw userError
      }

      if (!user) {
        throw new Error("No logged-in user found.")
      }

      if (user.user_metadata?.full_name) {
        setUserName(user.user_metadata.full_name)
      } else if (user.email) {
        setUserName(user.email.split("@")[0])
      }

      const today = getLocalDate()

      console.log("DASHBOARD DATE:", today)

      // Make sure today's tasks exist
      const taskRows = DAILY_TASKS.map((task) => ({
        user_id: user.id,
        task_date: today,
        task_key: task.key,
        completed: false,
      }))

      const { error: createTasksError } = await supabase
        .from("study_tasks")
        .upsert(taskRows, {
          onConflict: "user_id,task_date,task_key",
          ignoreDuplicates: true,
        })

      if (createTasksError) {
        throw createTasksError
      }

      // Get today's tasks
      const { data: todayTasks, error: taskError } = await supabase
        .from("study_tasks")
        .select("id, task_key, completed, task_date")
        .eq("user_id", user.id)
        .eq("task_date", today)
        .order("created_at", { ascending: true })


      console.log("TODAY TASKS:", todayTasks)
      console.log("TASK ERROR:", taskError)

      if (taskError) {
        throw taskError
      }

      setTasks(todayTasks || [])

      const completedToday = (todayTasks || []).filter(
        (task) => task.completed
      ).length

      setCompletedTasks(completedToday)

      // Get CBT attempts
      const {
        data: attempts,
        error: attemptsError,
      } = await supabase
        .from("quiz_attempts")
        .select("score, total_questions, created_at")
        .eq("user_id", user.id)

      console.log("CBT ATTEMPTS:", attempts)
      console.log("CBT ERROR:", attemptsError)

      if (attemptsError) {
        throw attemptsError
      }

      const allAttempts = attempts || []

        setCbtCount(allAttempts.length)

        const validAttempts = allAttempts.filter(
          (attempt) =>
            Number(attempt.total_questions) > 0 &&
            Number.isFinite(Number(attempt.score))
        )

        if (validAttempts.length > 0) {
          const totalPercentage = validAttempts.reduce(
            (total, attempt) => {
              const score = Number(attempt.score)
              const totalQuestions = Number(attempt.total_questions)

              return total + (score / totalQuestions) * 100
            },
            0
          )

          setCbtAverage(
            Math.round(totalPercentage / validAttempts.length)
          )
        } else {
          setCbtAverage(0)
        }


      // Get completed task history
      const {
        data: completedHistory,
        error: historyError,
      } = await supabase
        .from("study_tasks")
        .select("task_date")
        .eq("user_id", user.id)
        .eq("completed", true)

      console.log("TASK HISTORY:", completedHistory)
      console.log("HISTORY ERROR:", historyError)

      if (historyError) {
        throw historyError
      }

      const activeDates = new Set()

      ;(completedHistory || []).forEach((task) => {
        activeDates.add(task.task_date)
      })

      ;(attempts || []).forEach((attempt) => {
        if (attempt.created_at) {
          activeDates.add(getLocalDate(new Date(attempt.created_at)))
        }
      })

      let streak = 0
      const cursor = new Date()

      while (activeDates.has(getLocalDate(cursor))) {
        streak += 1
        cursor.setDate(cursor.getDate() - 1)
      }

      setStudyStreak(streak)

      console.log("FINAL STREAK:", streak)

    } catch (error) {
      console.error("DASHBOARD FAILED:", error?.message)
      console.error("ERROR CODE:", error?.code)
      console.error("ERROR DETAILS:", error?.details)
      console.error("ERROR HINT:", error?.hint)
      console.error("FULL ERROR:", error)
    } finally {
      setLoading(false)
    }
  }


  useEffect(() => {
    loadDashboard()
  }, [])

  const toggleTask = async (task) => {
    if (savingTask === task.id) return

    setSavingTask(task.id)

    const newCompletedState = !task.completed

    /*
      Update the UI immediately.
    */

    setTasks((currentTasks) =>
      currentTasks.map((item) =>
        item.id === task.id
          ? { ...item, completed: newCompletedState }
          : item
      )
    )

    setCompletedTasks((current) =>
      newCompletedState ? current + 1 : Math.max(0, current - 1)
    )

    const { error } = await supabase
      .from("study_tasks")
      .update({
        completed: newCompletedState,
      })
      .eq("id", task.id)

    if (error) {
      console.error("Error updating study task:", error)

      /*
        Revert the UI if saving failed.
      */

      setTasks((currentTasks) =>
        currentTasks.map((item) =>
          item.id === task.id
            ? { ...item, completed: task.completed }
            : item
        )
      )

      setCompletedTasks((current) =>
        task.completed
          ? current + 1
          : Math.max(0, current - 1)
      )
    } else {
      /*
        Reload dashboard data so streaks stay accurate.
      */
      await loadDashboard()
    }

    setSavingTask(null)
  }

  const progress =
    DAILY_TASKS.length > 0
      ? Math.round((completedTasks / DAILY_TASKS.length) * 100)
      : 0

  return (
    <main className="dashboard-page">

      {/* Dashboard Header */}

      <section className="dashboard-header">
        <div>
          <p className="dashboard-label">Student Dashboard</p>

          <h1>
            Welcome back, {userName} 👋
          </h1>

          <p className="dashboard-subtitle">
            Stay organized, keep learning, and make progress every day.
          </p>
        </div>

        <Link href="/study-timer" className="planner-button">
          <CalendarDays size={18} />
          Study Planner
        </Link>
      </section>


      {/* Stats */}

      <section className="dashboard-stats">

        <div className="stat-card">
          <div className="stat-icon">
            <Flame size={22} />
          </div>

          <div>
            <span>Study Streak</span>

            <strong>
              {loading ? "..." : `${studyStreak} days`}
            </strong>
          </div>
        </div>


        <div className="stat-card">
          <div className="stat-icon">
            <Clock3 size={22} />
          </div>

          <div>
            <span>CBT Average</span>

            <strong>
              {cbtAverage}%
            </strong>
          </div>
        </div>


        <div className="stat-card">
          <div className="stat-icon">
            <CheckCircle2 size={22} />
          </div>

          <div>
            <span>Completed</span>

            <strong>
              {loading ? "..." : `${completedTasks} tasks`}
            </strong>
          </div>
        </div>


        <div className="stat-card">
          <div className="stat-icon">
            <Laptop size={22} />
          </div>

          <div>
            <span>Completed</span>

            <strong>
              {loading ? "..." : `${cbtCount} CBT exams`}
            </strong>
          </div>
        </div>

      </section>


      {/* Main Dashboard Grid */}

      <section className="dashboard-content">

        {/* Quick Actions */}

        <div className="dashboard-section">

          <div className="section-heading">
            <div>
              <h2>Quick Actions</h2>

              <p>
                Jump straight into your study tools.
              </p>
            </div>
          </div>


          <div className="tools-grid">

            <Link
              href="/calculator"
              className="tool-card"
            >
              <div className="tool-icon">
                <Calculator size={24} />
              </div>

              <div>
                <h3>Calculator</h3>

                <p>
                  Calculate answers quickly and easily.
                </p>
              </div>

              <ArrowRight
                className="tool-arrow"
                size={19}
              />
            </Link>


            <Link
              href="/cbt"
              className="tool-card"
            >
              <div className="tool-icon">
                <ClipboardList size={24} />
              </div>

              <div>
                <h3>CBT Practice</h3>

                <p>
                  Test your knowledge with practice questions.
                </p>
              </div>

              <ArrowRight
                className="tool-arrow"
                size={19}
              />
            </Link>


            <Link
              href="/flashcard"
              className="tool-card"
            >
              <div className="tool-icon">
                <BookOpen size={24} />
              </div>

              <div>
                <h3>Flashcards</h3>

                <p>
                  Review important topics and concepts.
                </p>
              </div>

              <ArrowRight
                className="tool-arrow"
                size={19}
              />
            </Link>


            <Link
              href="/notes"
              className="tool-card"
            >
              <div className="tool-icon">
                <FileText size={24} />
              </div>

              <div>
                <h3>My Notes</h3>

                <p>
                  Create and organize your study notes.
                </p>
              </div>

              <ArrowRight
                className="tool-arrow"
                size={19}
              />
            </Link>

          </div>
        </div>


        {/* Today's Progress */}

        <div className="progress-card">

          <div className="progress-heading">

            <div>
              <h2>Today's Progress</h2>

              <p>
                Keep building your study habit.
              </p>
            </div>

            <span>
              {loading ? "..." : `${progress}%`}
            </span>

          </div>


          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>


          <div className="progress-footer">

            <span>
              {completedTasks} of {DAILY_TASKS.length} tasks completed
            </span>

            <Link href="/study-timer">
              View planner
              <ArrowRight size={16} />
            </Link>

          </div>

        </div>

      </section>


      {/* Today's Study Tasks */}

      <section className="getting-started">

        <div className="getting-started-icon">
          <CheckCircle2 size={25} />
        </div>


        <div className="getting-started-content">

          <h2>
            Today's Study Tasks
          </h2>

          <p>
            Complete your tasks and keep your study streak going.
          </p>


          <div
            style={{
              marginTop: "18px",
              display: "grid",
              gap: "10px",
            }}
          >

            {DAILY_TASKS.map((task) => {

              const savedTask = tasks.find(
                (item) => item.task_key === task.key
              )

              const isCompleted = savedTask?.completed || false

              return (
                <button
                  key={task.key}
                  type="button"
                  onClick={() =>
                    savedTask && toggleTask(savedTask)
                  }
                  disabled={!savedTask || savingTask === savedTask?.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    width: "100%",
                    border: "none",
                    background: "transparent",
                    padding: "10px 0",
                    textAlign: "left",
                    cursor: savedTask ? "pointer" : "default",
                    opacity:
                      savingTask === savedTask?.id
                        ? 0.6
                        : 1,
                  }}
                >

                  <span
                    style={{
                      width: "22px",
                      height: "22px",
                      minWidth: "22px",
                      borderRadius: "6px",
                      border: "2px solid currentColor",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {isCompleted && (
                      <CheckCircle2 size={18} />
                    )}
                  </span>


                  <span>
                    <strong
                      style={{
                        display: "block",
                        textDecoration: isCompleted
                          ? "line-through"
                          : "none",
                      }}
                    >
                      {task.title}
                    </strong>

                    <small>
                      {task.description}
                    </small>
                  </span>

                </button>
              )
            })}

          </div>

        </div>


        <Link
          href="/exam-history"
          className="resources-button"
        >
          CBT History
          <ArrowRight size={18} />
        </Link>

      </section>

    </main>
  )
}

export default Page

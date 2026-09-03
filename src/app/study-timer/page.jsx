'use client'

import React, { useEffect, useMemo, useState } from 'react'
import {
  Plus,
  Check,
  Trash2,
  Pencil,
  X,
  Target,
  Clock3,
  BookOpen,
  Flame,
  CalendarDays,
  TrendingUp,
  ChevronDown,
} from 'lucide-react'
import './page.css'

const page = () => {
  const [tasks, setTasks] = useState([])
  const [goals, setGoals] = useState([])
  const [sessions, setSessions] = useState([])

  const [taskFilter, setTaskFilter] = useState('All')
  const [showTaskModal, setShowTaskModal] = useState(false)
  const [showGoalModal, setShowGoalModal] = useState(false)
  const [showSessionModal, setShowSessionModal] = useState(false)

  const [editingTaskId, setEditingTaskId] = useState(null)

  const [taskTitle, setTaskTitle] = useState('')
  const [taskSubject, setTaskSubject] = useState('')
  const [taskDate, setTaskDate] = useState('')
  const [taskStart, setTaskStart] = useState('')
  const [taskEnd, setTaskEnd] = useState('')
  const [taskPriority, setTaskPriority] = useState('Medium')

  const [goalTitle, setGoalTitle] = useState('')
  const [goalSubject, setGoalSubject] = useState('')
  const [goalTarget, setGoalTarget] = useState('')
  const [goalProgress, setGoalProgress] = useState(0)

  const [sessionSubject, setSessionSubject] = useState('')
  const [sessionMinutes, setSessionMinutes] = useState('')

  useEffect(() => {
    const savedTasks = localStorage.getItem('campusplug-study-tasks')
    const savedGoals = localStorage.getItem('campusplug-study-goals')
    const savedSessions = localStorage.getItem('campusplug-study-sessions')

    if (savedTasks) setTasks(JSON.parse(savedTasks))
    if (savedGoals) setGoals(JSON.parse(savedGoals))
    if (savedSessions) setSessions(JSON.parse(savedSessions))
  }, [])

  useEffect(() => {
    localStorage.setItem('campusplug-study-tasks', JSON.stringify(tasks))
  }, [tasks])

  useEffect(() => {
    localStorage.setItem('campusplug-study-goals', JSON.stringify(goals))
  }, [goals])

  useEffect(() => {
    localStorage.setItem(
      'campusplug-study-sessions',
      JSON.stringify(sessions)
    )
  }, [sessions])

  const today = new Date().toISOString().split('T')[0]

  const totalTasks = tasks.length
  const completedTasks = tasks.filter((task) => task.completed).length

  const taskProgress =
    totalTasks === 0
      ? 0
      : Math.round((completedTasks / totalTasks) * 100)

  const totalStudyMinutes = sessions.reduce(
    (total, session) => total + Number(session.minutes || 0),
    0
  )

  const totalStudyHours = Math.floor(totalStudyMinutes / 60)
  const remainingStudyMinutes = totalStudyMinutes % 60

  const completedSessions = sessions.length

  const currentStreak = useMemo(() => {
    const studyDates = [
      ...new Set(
        sessions.map((session) => session.date)
      ),
    ].sort((a, b) => new Date(b) - new Date(a))

    if (studyDates.length === 0) return 0

    let streak = 0
    let checkDate = new Date()

    for (let i = 0; i < studyDates.length; i++) {
      const dateString = checkDate.toISOString().split('T')[0]

      if (studyDates.includes(dateString)) {
        streak++
        checkDate.setDate(checkDate.getDate() - 1)
      } else {
        break
      }
    }

    return streak
  }, [sessions])

  const filteredTasks = tasks.filter((task) => {
    if (taskFilter === 'Today') {
      return task.date === today
    }

    if (taskFilter === 'Upcoming') {
      return task.date > today && !task.completed
    }

    if (taskFilter === 'Completed') {
      return task.completed
    }

    return true
  })

  const resetTaskForm = () => {
    setTaskTitle('')
    setTaskSubject('')
    setTaskDate('')
    setTaskStart('')
    setTaskEnd('')
    setTaskPriority('Medium')
    setEditingTaskId(null)
  }

  const openNewTask = () => {
    resetTaskForm()
    setShowTaskModal(true)
  }

  const openEditTask = (task) => {
    setEditingTaskId(task.id)
    setTaskTitle(task.title)
    setTaskSubject(task.subject)
    setTaskDate(task.date)
    setTaskStart(task.start)
    setTaskEnd(task.end)
    setTaskPriority(task.priority)
    setShowTaskModal(true)
  }

  const closeTaskModal = () => {
    resetTaskForm()
    setShowTaskModal(false)
  }

  const saveTask = () => {
    if (!taskTitle.trim() || !taskDate) return

    if (editingTaskId) {
      setTasks(
        tasks.map((task) =>
          task.id === editingTaskId
            ? {
                ...task,
                title: taskTitle.trim(),
                subject: taskSubject.trim() || 'General',
                date: taskDate,
                start: taskStart,
                end: taskEnd,
                priority: taskPriority,
              }
            : task
        )
      )
    } else {
      const newTask = {
        id: Date.now(),
        title: taskTitle.trim(),
        subject: taskSubject.trim() || 'General',
        date: taskDate,
        start: taskStart,
        end: taskEnd,
        priority: taskPriority,
        completed: false,
      }

      setTasks([newTask, ...tasks])
    }

    closeTaskModal()
  }

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    )
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const createGoal = () => {
    if (!goalTitle.trim()) return

    const newGoal = {
      id: Date.now(),
      title: goalTitle.trim(),
      subject: goalSubject.trim() || 'General',
      target: goalTarget,
      progress: Number(goalProgress),
    }

    setGoals([newGoal, ...goals])

    setGoalTitle('')
    setGoalSubject('')
    setGoalTarget('')
    setGoalProgress(0)
    setShowGoalModal(false)
  }

  const updateGoalProgress = (id, value) => {
    const progress = Math.min(100, Math.max(0, Number(value)))

    setGoals(
      goals.map((goal) =>
        goal.id === id
          ? { ...goal, progress }
          : goal
      )
    )
  }

  const deleteGoal = (id) => {
    setGoals(goals.filter((goal) => goal.id !== id))
  }

  const addStudySession = () => {
    if (!sessionSubject.trim() || !sessionMinutes) return

    const newSession = {
      id: Date.now(),
      subject: sessionSubject.trim(),
      minutes: Number(sessionMinutes),
      date: today,
    }

    setSessions([newSession, ...sessions])

    setSessionSubject('')
    setSessionMinutes('')
    setShowSessionModal(false)
  }

  const formatDate = (date) => {
    if (!date) return ''

    return new Date(`${date}T00:00:00`).toLocaleDateString(
      'en-US',
      {
        month: 'short',
        day: 'numeric',
      }
    )
  }

  const formatTime = (time) => {
    if (!time) return ''

    return new Date(`2000-01-01T${time}`).toLocaleTimeString(
      'en-US',
      {
        hour: 'numeric',
        minute: '2-digit',
      }
    )
  }

  return (
    <main className="planner-page">

      {/* Header */}

      <section className="planner-header">
        <div>
          <span className="page-kicker">STAY CONSISTENT</span>
          <h1>Study Planner & Goal Tracker</h1>
          <p>
            Plan your study time, track your effort, and stay
            focused on your goals.
          </p>
        </div>

        <div className="header-actions">
          <button
            className="session-btn"
            onClick={() => setShowSessionModal(true)}
          >
            <Clock3 size={18} />
            Log Study Session
          </button>

          <button
            className="primary-btn"
            onClick={openNewTask}
          >
            <Plus size={19} />
            Add Task
          </button>
        </div>
      </section>

      {/* Stats */}

      <section className="stats-grid">

        <div className="stat-card">
          <div className="stat-icon">
            <TrendingUp size={21} />
          </div>
          <div>
            <span>Task Progress</span>
            <strong>{taskProgress}%</strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Clock3 size={21} />
          </div>
          <div>
            <span>Study Time</span>
            <strong>
              {totalStudyHours}h {remainingStudyMinutes}m
            </strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Check size={21} />
          </div>
          <div>
            <span>Tasks Completed</span>
            <strong>
              {completedTasks}/{totalTasks}
            </strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon streak-icon">
            <Flame size={21} />
          </div>
          <div>
            <span>Study Streak</span>
            <strong>{currentStreak} days</strong>
          </div>
        </div>

      </section>

      <section className="planner-layout">

        {/* Today's plan */}

        <div className="planner-main">

          <div className="section-heading">
            <div>
              <h2>Study Plan</h2>
              <p>Organize and complete your study tasks.</p>
            </div>

            <div className="task-filter">
              <select
                value={taskFilter}
                onChange={(e) => setTaskFilter(e.target.value)}
              >
                <option>All</option>
                <option>Today</option>
                <option>Upcoming</option>
                <option>Completed</option>
              </select>
              <ChevronDown size={15} />
            </div>
          </div>

          {filteredTasks.length === 0 ? (
            <div className="empty-box">
              <div className="empty-box-icon">
                <CalendarDays size={28} />
              </div>

              <h3>No study tasks yet</h3>
              <p>
                Add a task and start planning your study time.
              </p>

              <button
                className="empty-action"
                onClick={openNewTask}
              >
                <Plus size={17} />
                Add Study Task
              </button>
            </div>
          ) : (
            <div className="task-list">

              {filteredTasks.map((task) => (
                <div
                  className={`task-card ${
                    task.completed ? 'completed' : ''
                  }`}
                  key={task.id}
                >

                  <button
                    className={`task-check ${
                      task.completed ? 'checked' : ''
                    }`}
                    onClick={() => toggleTask(task.id)}
                    aria-label="Complete task"
                  >
                    {task.completed && <Check size={16} />}
                  </button>

                  <div className="task-info">
                    <div className="task-title-row">
                      <h3>{task.title}</h3>

                      <span
                        className={`priority ${task.priority.toLowerCase()}`}
                      >
                        {task.priority}
                      </span>
                    </div>

                    <div className="task-meta">
                      <span>
                        <BookOpen size={14} />
                        {task.subject}
                      </span>

                      <span>
                        <CalendarDays size={14} />
                        {formatDate(task.date)}
                      </span>

                      {task.start && task.end && (
                        <span>
                          <Clock3 size={14} />
                          {formatTime(task.start)} –{' '}
                          {formatTime(task.end)}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="task-actions">
                    <button
                      onClick={() => openEditTask(task)}
                      aria-label="Edit task"
                    >
                      <Pencil size={16} />
                    </button>

                    <button
                      className="task-delete"
                      onClick={() => deleteTask(task.id)}
                      aria-label="Delete task"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                </div>
              ))}

            </div>
          )}

        </div>

        {/* Goals */}

        <aside className="goals-section">

          <div className="section-heading">
            <div>
              <h2>My Goals</h2>
              <p>Keep your eyes on the target.</p>
            </div>

            <button
              className="small-add-btn"
              onClick={() => setShowGoalModal(true)}
              aria-label="Add goal"
            >
              <Plus size={18} />
            </button>
          </div>

          {goals.length === 0 ? (
            <div className="goal-empty">
              <Target size={26} />
              <h3>No goals yet</h3>
              <p>Create an academic goal to start tracking it.</p>

              <button
                className="empty-action"
                onClick={() => setShowGoalModal(true)}
              >
                <Plus size={17} />
                Create Goal
              </button>
            </div>
          ) : (
            <div className="goal-list">

              {goals.map((goal) => (
                <div className="goal-card" key={goal.id}>

                  <div className="goal-top">
                    <div className="goal-icon">
                      <Target size={20} />
                    </div>

                    <button
                      className="goal-delete"
                      onClick={() => deleteGoal(goal.id)}
                      aria-label="Delete goal"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>

                  <span className="goal-subject">
                    {goal.subject}
                  </span>

                  <h3>{goal.title}</h3>

                  {goal.target && (
                    <p className="goal-target">
                      Target: {formatDate(goal.target)}
                    </p>
                  )}

                  <div className="goal-progress-info">
                    <span>Progress</span>
                    <strong>{goal.progress}%</strong>
                  </div>

                  <div className="goal-progress">
                    <div
                      style={{
                        width: `${goal.progress}%`,
                      }}
                    />
                  </div>

                  <input
                    className="goal-slider"
                    type="range"
                    min="0"
                    max="100"
                    value={goal.progress}
                    onChange={(e) =>
                      updateGoalProgress(
                        goal.id,
                        e.target.value
                      )
                    }
                  />

                </div>
              ))}

            </div>
          )}

        </aside>

      </section>

      {/* Recent effort */}

      <section className="effort-section">

        <div className="section-heading">
          <div>
            <h2>Recent Study Effort</h2>
            <p>Your logged study sessions.</p>
          </div>

          <span className="session-count">
            {completedSessions} sessions
          </span>
        </div>

        {sessions.length === 0 ? (
          <div className="effort-empty">
            <Clock3 size={25} />
            <p>
              No study sessions logged yet. Start tracking
              your effort.
            </p>
          </div>
        ) : (
          <div className="session-list">

            {sessions.slice(0, 6).map((session) => (
              <div className="session-row" key={session.id}>

                <div className="session-subject">
                  <div className="session-icon">
                    <BookOpen size={18} />
                  </div>

                  <div>
                    <strong>{session.subject}</strong>
                    <span>{formatDate(session.date)}</span>
                  </div>
                </div>

                <strong className="session-duration">
                  {session.minutes} min
                </strong>

              </div>
            ))}

          </div>
        )}

      </section>

      {/* Task Modal */}

      {showTaskModal && (
        <div className="modal-overlay">
          <div className="modal-card">

            <div className="modal-header">
              <div>
                <h2>
                  {editingTaskId
                    ? 'Edit Study Task'
                    : 'Add Study Task'}
                </h2>
                <p>Plan your next study session.</p>
              </div>

              <button
                className="modal-close"
                onClick={closeTaskModal}
              >
                <X size={20} />
              </button>
            </div>

            <div className="form-group">
              <label>Task</label>
              <input
                type="text"
                placeholder="e.g. Read Chapter 4"
                value={taskTitle}
                onChange={(e) =>
                  setTaskTitle(e.target.value)
                }
              />
            </div>

            <div className="form-grid">

              <div className="form-group">
                <label>Subject</label>
                <input
                  type="text"
                  placeholder="e.g. Chemistry"
                  value={taskSubject}
                  onChange={(e) =>
                    setTaskSubject(e.target.value)
                  }
                />
              </div>

              <div className="form-group">
                <label>Date</label>
                <input
                  type="date"
                  value={taskDate}
                  onChange={(e) =>
                    setTaskDate(e.target.value)
                  }
                />
              </div>

            </div>

            <div className="form-grid">

              <div className="form-group">
                <label>Start Time</label>
                <input
                  type="time"
                  value={taskStart}
                  onChange={(e) =>
                    setTaskStart(e.target.value)
                  }
                />
              </div>

              <div className="form-group">
                <label>End Time</label>
                <input
                  type="time"
                  value={taskEnd}
                  onChange={(e) =>
                    setTaskEnd(e.target.value)
                  }
                />
              </div>

            </div>

            <div className="form-group">
              <label>Priority</label>

              <select
                value={taskPriority}
                onChange={(e) =>
                  setTaskPriority(e.target.value)
                }
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>

            <div className="modal-actions">
              <button
                className="cancel-btn"
                onClick={closeTaskModal}
              >
                Cancel
              </button>

              <button
                className="save-btn"
                onClick={saveTask}
                disabled={!taskTitle.trim() || !taskDate}
              >
                {editingTaskId ? 'Save Changes' : 'Add Task'}
                </button>
            </div>

          </div>
        </div>
      )}

      {/* Goal Modal */}

      {showGoalModal && (
        <div className="modal-overlay">
          <div className="modal-card">

            <div className="modal-header">
              <div>
                <h2>Create Academic Goal</h2>
                <p>Set something meaningful to work toward.</p>
              </div>

              <button
                className="modal-close"
                onClick={() => setShowGoalModal(false)}
              >
                <X size={20} />
              </button>
            </div>

            <div className="form-group">
              <label>Goal</label>
              <input
                type="text"
                placeholder="e.g. Score 280+ in JAMB"
                value={goalTitle}
                onChange={(e) =>
                  setGoalTitle(e.target.value)
                }
              />
            </div>

            <div className="form-group">
              <label>Subject / Category</label>
              <input
                type="text"
                placeholder="e.g. JAMB"
                value={goalSubject}
                onChange={(e) =>
                  setGoalSubject(e.target.value)
                }
              />
            </div>

            <div className="form-group">
              <label>Target Date</label>
              <input
                type="date"
                value={goalTarget}
                onChange={(e) =>
                  setGoalTarget(e.target.value)
                }
              />
            </div>

            <div className="form-group">
              <label>Current Progress: {goalProgress}%</label>

              <input
                className="goal-create-slider"
                type="range"
                min="0"
                max="100"
                value={goalProgress}
                onChange={(e) =>
                  setGoalProgress(e.target.value)
                }
              />
            </div>

            <div className="modal-actions">
              <button
                className="cancel-btn"
                onClick={() => setShowGoalModal(false)}
              >
                Cancel
              </button>

              <button
                className="save-btn"
                onClick={createGoal}
                disabled={!goalTitle.trim()}
              >
                Create Goal
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Study Session Modal */}

      {showSessionModal && (
        <div className="modal-overlay">
          <div className="modal-card small-modal">

            <div className="modal-header">
              <div>
                <h2>Log Study Session</h2>
                <p>Record the effort you put in today.</p>
              </div>

              <button
                className="modal-close"
                onClick={() => setShowSessionModal(false)}
              >
                <X size={20} />
              </button>
            </div>

            <div className="form-group">
              <label>Subject</label>
              <input
                type="text"
                placeholder="e.g. Mathematics"
                value={sessionSubject}
                onChange={(e) =>
                  setSessionSubject(e.target.value)
                }
              />
            </div>

            <div className="form-group">
              <label>Study Time (minutes)</label>
              <input
                type="number"
                min="1"
                placeholder="e.g. 60"
                value={sessionMinutes}
                onChange={(e) =>
                  setSessionMinutes(e.target.value)
                }
              />
            </div>

            <div className="modal-actions">
              <button
                className="cancel-btn"
                onClick={() => setShowSessionModal(false)}
              >
                Cancel
              </button>

              <button
                className="save-btn"
                onClick={addStudySession}
                disabled={
                  !sessionSubject.trim() ||
                  !sessionMinutes
                }
              >
                Log Session
              </button>
            </div>

          </div>
        </div>
      )}

    </main>
  )
}

export default page


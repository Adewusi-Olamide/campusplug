

"use client";

import React, { useEffect, useState } from "react";
import {
  Plus,
  Check,
  Trash2,
  Edit3,
  CalendarDays,
  Clock,
  BookOpen,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { createClient } from "@/lib/supabase/client";

import "./page.css";

const page = () => {
  const supabase = createClient();
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const [view, setView] = useState("week");
  const [currentWeek, setCurrentWeek] = useState(new Date());

  const [form, setForm] = useState({
    title: "",
    subject: "",
    task_date: "",
    start_time: "",
    end_time: "",
    priority: "medium",
  });

  /* ---------------- GET CURRENT USER ---------------- */

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error) {
        console.error("Error getting user:", error);
        setLoading(false);
        return;
      }

      if (!user) {
        setLoading(false);
        return;
      }

      setUser(user);
      await loadTasks(user.id);
    };

    getUser();
  }, []);

  /* ---------------- LOAD TASKS ---------------- */

  const loadTasks = async (userId) => {
    setLoading(true);

    const { data, error } = await supabase
      .from("study_tasks")
      .select("*")
      .eq("user_id", userId)
      .order("task_date", { ascending: true })
      .order("start_time", { ascending: true });

    if (error) {
      console.error("Error loading study tasks:", error);
      setLoading(false);
      return;
    }

    setTasks(data || []);
    setLoading(false);
  };

  /* ---------------- FORM INPUT ---------------- */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* ---------------- OPEN ADD FORM ---------------- */

  const openAddForm = () => {
    setEditingTask(null);

    setForm({
      title: "",
      subject: "",
      task_date: new Date().toISOString().split("T")[0],
      start_time: "",
      end_time: "",
      priority: "medium",
    });

    setShowForm(true);
  };

  /* ---------------- OPEN EDIT FORM ---------------- */

  const openEditForm = (task) => {
    setEditingTask(task);

    setForm({
      title: task.title || "",
      subject: task.subject || "",
      task_date: task.task_date || "",
      start_time: task.start_time || "",
      end_time: task.end_time || "",
      priority: task.priority || "medium",
    });

    setShowForm(true);
  };

  /* ---------------- CLOSE FORM ---------------- */

  const closeForm = () => {
    if (saving) return;

    setShowForm(false);
    setEditingTask(null);
  };

  /* ---------------- ADD / UPDATE TASK ---------------- */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("Please log in first.");
      return;
    }

    if (!form.title.trim()) {
      alert("Please enter a task title.");
      return;
    }

    if (!form.task_date) {
      alert("Please select a date.");
      return;
    }

    setSaving(true);

    if (editingTask) {
      const { data, error } = await supabase
        .from("study_tasks")
        .update({
          title: form.title.trim(),
          subject: form.subject.trim(),
          task_date: form.task_date,
          start_time: form.start_time || null,
          end_time: form.end_time || null,
          priority: form.priority,
          updated_at: new Date().toISOString(),
        })
        .eq("id", editingTask.id)
        .eq("user_id", user.id)
        .select()
        .single();

      if (error) {
        console.error("Error updating task:", error);
        alert("Could not update the task.");
        setSaving(false);
        return;
      }

      setTasks((prev) =>
        prev.map((task) => (task.id === data.id ? data : task))
      );
    } else {
      const newTask = {
        user_id: user.id,
        title: form.title.trim(),
        subject: form.subject.trim(),
        task_date: form.task_date,
        start_time: form.start_time || null,
        end_time: form.end_time || null,
        priority: form.priority,
        completed: false,
        task_key: `${user.id}-${Date.now()}`,
      };

      const { data, error } = await supabase
        .from("study_tasks")
        .insert(newTask)
        .select()
        .single();

      if (error) {
        console.error("Error creating task:", error);
        alert("Could not save the task.");
        setSaving(false);
        return;
      }

      setTasks((prev) => [...prev, data]);
    }

    setSaving(false);
    setShowForm(false);
    setEditingTask(null);

    setForm({
      title: "",
      subject: "",
      task_date: "",
      start_time: "",
      end_time: "",
      priority: "medium",
    });
  };

  /* ---------------- TOGGLE COMPLETION ---------------- */

  const toggleTask = async (task) => {
    const newCompletedState = !task.completed;

    // Update UI immediately
    setTasks((prev) =>
      prev.map((item) =>
        item.id === task.id
          ? { ...item, completed: newCompletedState }
          : item
      )
    );

    const { error } = await supabase
      .from("study_tasks")
      .update({
        completed: newCompletedState,
        updated_at: new Date().toISOString(),
      })
      .eq("id", task.id)
      .eq("user_id", user.id);

    if (error) {
      console.error("Error updating task:", error);

      // Revert if Supabase fails
      setTasks((prev) =>
        prev.map((item) =>
          item.id === task.id
            ? { ...item, completed: task.completed }
            : item
        )
      );

      alert("Could not save your progress.");
    }
  };

  /* ---------------- DELETE TASK ---------------- */

  const deleteTask = async (taskId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this study task?"
    );

    if (!confirmed) return;

    const previousTasks = [...tasks];

    setTasks((prev) => prev.filter((task) => task.id !== taskId));

    const { error } = await supabase
      .from("study_tasks")
      .delete()
      .eq("id", taskId)
      .eq("user_id", user.id);

    if (error) {
      console.error("Error deleting task:", error);

      setTasks(previousTasks);

      alert("Could not delete the task.");
    }
  };

  /* ---------------- CALENDAR HELPERS ---------------- */

  const getDateKey = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const getStartOfWeek = (date) => {
    const result = new Date(date);
    const day = result.getDay();

    result.setDate(result.getDate() - day);
    result.setHours(0, 0, 0, 0);

    return result;
  };

  const getWeekDays = (date) => {
    const start = getStartOfWeek(date);

    return Array.from({ length: 7 }, (_, index) => {
      const day = new Date(start);
      day.setDate(start.getDate() + index);

      return day;
    });
  };

  const weekDays = getWeekDays(currentWeek);

  const previousWeek = () => {
    const date = new Date(currentWeek);
    date.setDate(date.getDate() - 7);
    setCurrentWeek(date);
  };

  const nextWeek = () => {
    const date = new Date(currentWeek);
    date.setDate(date.getDate() + 7);
    setCurrentWeek(date);
  };

  const goToCurrentWeek = () => {
    setCurrentWeek(new Date());
  };

  const getTasksForDay = (date) => {
    const dateKey = getDateKey(date);

    return tasks
      .filter((task) => task.task_date === dateKey)
      .sort((a, b) =>
        (a.start_time || "").localeCompare(
          b.start_time || ""
        )
      );
  };

  const weekLabel = `${weekDays[0].toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "numeric",
    }
  )} - ${weekDays[6].toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })}`;


  /* ---------------- PROGRESS ---------------- */

  const completedTasks = tasks.filter((task) => task.completed).length;

  const progress =
    tasks.length === 0
      ? 0
      : Math.round((completedTasks / tasks.length) * 100);

  /* ---------------- TODAY ---------------- */

  const today = getDateKey(new Date());

  const todayTasks = tasks.filter((task) => task.task_date === today);

  /* ---------------- DATE FORMAT ---------------- */

  const formatDate = (date) => {
    if (!date) return "";

    return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  /* ---------------- TIME FORMAT ---------------- */

  const formatTime = (time) => {
    if (!time) return "";

    const [hours, minutes] = time.split(":");

    const date = new Date();
    date.setHours(Number(hours), Number(minutes));

    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  };

  /* ---------------- LOADING ---------------- */

  if (loading) {
    return (
      <main className="study-planner-page">
        <div className="planner-loading">
          <div className="planner-loader"></div>
          <p>Loading your study planner...</p>
        </div>
      </main>
    );
  }

  /* ---------------- PAGE ---------------- */

  return (
    <main className="study-planner-page">
      <div className="study-planner-container">

        {/* HEADER */}

        <section className="planner-header">
          <div>
            <span className="planner-label">STUDY PLANNER</span>

            <h1>
              Plan your study.
              <br />
              <span>Own your progress.</span>
            </h1>

            <p>
              Organize your study sessions, keep track of your tasks,
              and stay consistent.
            </p>
          </div>

          <button
            className="add-task-btn"
            onClick={openAddForm}
          >
            <Plus size={19} />
            Add Task
          </button>
        </section>

        {/* STATS */}

        <section className="planner-stats">

          <div className="planner-stat-card">
            <div className="stat-icon">
              <BookOpen size={20} />
            </div>

            <div>
              <span>Total Tasks</span>
              <strong>{tasks.length}</strong>
            </div>
          </div>

          <div className="planner-stat-card">
            <div className="stat-icon">
              <Check size={20} />
            </div>

            <div>
              <span>Completed</span>
              <strong>{completedTasks}</strong>
            </div>
          </div>

          <div className="planner-stat-card">
            <div className="stat-icon">
              <CalendarDays size={20} />
            </div>

            <div>
              <span>Today's Tasks</span>
              <strong>{todayTasks.length}</strong>
            </div>
          </div>

          <div className="planner-stat-card progress-stat">
            <div className="stat-icon">
              <span>{progress}%</span>
            </div>

            <div className="progress-stat-content">
              <span>Overall Progress</span>

              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>

        </section>

        {/* CALENDAR */}

        <section className="calendar-section">

          <div className="calendar-header">

            <div>
              <h2>Study Calendar</h2>
              <p>{weekLabel}</p>
            </div>

            <div className="calendar-controls">

              <button
                onClick={goToCurrentWeek}
                className="today-btn"
              >
                Today
              </button>

              <button
                onClick={previousWeek}
                aria-label="Previous week"
              >
                <ChevronLeft size={18} />
              </button>

              <button
                onClick={nextWeek}
                aria-label="Next week"
              >
                <ChevronRight size={18} />
              </button>

            </div>

          </div>

          <div className="planner-view-tabs">

            <button
              className={view === "week" ? "active" : ""}
              onClick={() => setView("week")}
            >
              Week
            </button>

            <button
              className={view === "today" ? "active" : ""}
              onClick={() => setView("today")}
            >
              Today
            </button>

            <button
              className={view === "all" ? "active" : ""}
              onClick={() => setView("all")}
            >
              All Tasks
            </button>

          </div>

          {view === "week" && (
            <div className="calendar-grid">

              {weekDays.map((day) => {
                const dateKey = getDateKey(day);
                const dayTasks = getTasksForDay(day);
                const isToday = dateKey === today;

                return (
                  <div
                    className={`calendar-day ${
                      isToday ? "calendar-day-today" : ""
                    }`}
                    key={dateKey}
                  >

                    <div className="calendar-day-header">

                      <div>
                        <span>
                          {day.toLocaleDateString("en-US", {
                            weekday: "short",
                          })}
                        </span>

                        <strong>{day.getDate()}</strong>
                      </div>

                      {isToday && <small>Today</small>}

                    </div>

                    <div className="calendar-day-tasks">

                      {dayTasks.length === 0 ? (
                        <button
                          className="calendar-add-task"
                          onClick={() => {
                            setForm({
                              title: "",
                              subject: "",
                              task_date: dateKey,
                              start_time: "",
                              end_time: "",
                              priority: "medium",
                            });

                            setEditingTask(null);
                            setShowForm(true);
                          }}
                        >
                          <Plus size={14} />
                          Add task
                        </button>
                      ) : (
                        <>
                          {dayTasks.map((task) => (
                            <div
                              className={`calendar-task ${
                                task.completed
                                  ? "calendar-task-completed"
                                  : ""
                              }`}
                              key={task.id}
                            >

                              <button
                                className={`calendar-task-check ${
                                  task.completed ? "checked" : ""
                                }`}
                                onClick={() => toggleTask(task)}
                              >
                                {task.completed && (
                                  <Check size={12} />
                                )}
                              </button>

                              <div
                                className="calendar-task-info"
                                onClick={() => openEditForm(task)}
                              >
                                <strong>{task.title}</strong>

                                {task.start_time && (
                                  <span>
                                    <Clock size={12} />
                                    {formatTime(task.start_time)}
                                  </span>
                                )}
                              </div>

                            </div>
                          ))}

                          <button
                            className="calendar-add-task"
                            onClick={() => {
                              setForm({
                                title: "",
                                subject: "",
                                task_date: dateKey,
                                start_time: "",
                                end_time: "",
                                priority: "medium",
                              });

                              setEditingTask(null);
                              setShowForm(true);
                            }}
                          >
                            <Plus size={14} />
                            Add
                          </button>
                        </>
                      )}

                    </div>

                  </div>
                );
              })}

            </div>
          )}

          {view === "today" && (
            <div className="calendar-task-list-view">

              {todayTasks.length === 0 ? (
                <div className="empty-planner">
                  <div className="empty-icon">
                    <CalendarDays size={35} />
                  </div>

                  <h3>No tasks for today</h3>

                  <p>
                    Your schedule is clear. Add a study task to get started.
                  </p>

                  <button
                    className="empty-add-btn"
                    onClick={() => {
                      setForm({
                        title: "",
                        subject: "",
                        task_date: today,
                        start_time: "",
                        end_time: "",
                        priority: "medium",
                      });

                      setEditingTask(null);
                      setShowForm(true);
                    }}
                  >
                    <Plus size={18} />
                    Add Today's Task
                  </button>
                </div>
              ) : (
                <div className="tasks-list">
                  {todayTasks.map((task) => (
                    <article
                      className={`study-task-card ${
                        task.completed ? "task-completed" : ""
                      }`}
                      key={task.id}
                    >

                      <button
                        className={`task-check ${
                          task.completed ? "checked" : ""
                        }`}
                        onClick={() => toggleTask(task)}
                      >
                        {task.completed && <Check size={16} />}
                      </button>

                      <div className="task-main">

                        <div className="task-top">

                          <div>
                            <h3>{task.title}</h3>

                            {task.subject && (
                              <span className="task-subject">
                                {task.subject}
                              </span>
                            )}
                          </div>

                          <span
                            className={`priority-badge priority-${task.priority}`}
                          >
                            {task.priority}
                          </span>

                        </div>

                        <div className="task-details">

                          <span>
                            <CalendarDays size={15} />
                            {formatDate(task.task_date)}
                          </span>

                          {task.start_time && (
                            <span>
                              <Clock size={15} />
                              {formatTime(task.start_time)}
                            </span>
                          )}

                        </div>

                      </div>

                      <div className="task-actions">

                        <button
                          onClick={() => openEditForm(task)}
                        >
                          <Edit3 size={17} />
                        </button>

                        <button
                          onClick={() => deleteTask(task.id)}
                        >
                          <Trash2 size={17} />
                        </button>

                      </div>

                    </article>
                  ))}
                </div>
              )}

            </div>
          )}

          {view === "all" && (
            <div className="calendar-task-list-view">

              {tasks.length === 0 ? (
                <div className="empty-planner">
                  <div className="empty-icon">
                    <CalendarDays size={35} />
                  </div>

                  <h3>Your planner is empty</h3>

                  <p>
                    Add your first study task and start building your study routine.
                  </p>

                  <button
                    className="empty-add-btn"
                    onClick={() => openAddForm()}
                  >
                    <Plus size={18} />
                    Add Your First Task
                  </button>
                </div>
              ) : (
                <div className="tasks-list">
                  {tasks.map((task) => (
                    <article
                      className={`study-task-card ${
                        task.completed ? "task-completed" : ""
                      }`}
                      key={task.id}
                    >

                      <button
                        className={`task-check ${
                          task.completed ? "checked" : ""
                        }`}
                        onClick={() => toggleTask(task)}
                      >
                        {task.completed && <Check size={16} />}
                      </button>

                      <div className="task-main">

                        <div className="task-top">

                          <div>
                            <h3>{task.title}</h3>

                            {task.subject && (
                              <span className="task-subject">
                                {task.subject}
                              </span>
                            )}
                          </div>

                          <span
                            className={`priority-badge priority-${task.priority}`}
                          >
                            {task.priority}
                          </span>

                        </div>

                        <div className="task-details">

                          <span>
                            <CalendarDays size={15} />
                            {formatDate(task.task_date)}
                          </span>

                          {task.start_time && (
                            <span>
                              <Clock size={15} />
                              {formatTime(task.start_time)}
                            </span>
                          )}

                        </div>

                      </div>

                      <div className="task-actions">

                        <button
                          onClick={() => openEditForm(task)}
                        >
                          <Edit3 size={17} />
                        </button>

                        <button
                          onClick={() => deleteTask(task.id)}
                        >
                          <Trash2 size={17} />
                        </button>

                      </div>

                    </article>
                  ))}
                </div>
              )}

            </div>
          )}

        </section>

        {/* TASK SECTION */}

        <section className="tasks-section">

          <div className="tasks-section-header">
            <div>
              <h2>Your Study Tasks</h2>
              <p>
                {tasks.length === 0
                  ? "You haven't added any study tasks yet."
                  : `${tasks.length} ${
                      tasks.length === 1 ? "task" : "tasks"
                    } in your planner.`}
              </p>
            </div>
          </div>

          {/* EMPTY STATE */}

          {tasks.length === 0 ? (
            <div className="empty-planner">
              <div className="empty-icon">
                <CalendarDays size={35} />
              </div>

              <h3>Your planner is empty</h3>

              <p>
                Add your first study task and start building
                your study routine.
              </p>

              <button
                className="empty-add-btn"
                onClick={openAddForm}
              >
                <Plus size={18} />
                Add Your First Task
              </button>
            </div>
          ) : (
            <div className="tasks-list">

              {tasks.map((task) => (
                <article
                  className={`study-task-card ${
                    task.completed ? "task-completed" : ""
                  }`}
                  key={task.id}
                >

                  <button
                    className={`task-check ${
                      task.completed ? "checked" : ""
                    }`}
                    onClick={() => toggleTask(task)}
                    aria-label={
                      task.completed
                        ? "Mark task incomplete"
                        : "Mark task complete"
                    }
                  >
                    {task.completed && <Check size={16} />}
                  </button>

                  <div className="task-main">

                    <div className="task-top">

                      <div>
                        <h3>{task.title}</h3>

                        {task.subject && (
                          <span className="task-subject">
                            {task.subject}
                          </span>
                        )}
                      </div>

                      <span
                        className={`priority-badge priority-${task.priority}`}
                      >
                        {task.priority}
                      </span>

                    </div>

                    <div className="task-details">

                      <span>
                        <CalendarDays size={15} />
                        {formatDate(task.task_date)}
                      </span>

                      {task.start_time && (
                        <span>
                          <Clock size={15} />
                          {formatTime(task.start_time)}

                          {task.end_time &&
                            ` - ${formatTime(task.end_time)}`}
                        </span>
                      )}

                    </div>

                  </div>

                  <div className="task-actions">

                    <button
                      onClick={() => openEditForm(task)}
                      aria-label="Edit task"
                    >
                      <Edit3 size={17} />
                    </button>

                    <button
                      onClick={() => deleteTask(task.id)}
                      aria-label="Delete task"
                    >
                      <Trash2 size={17} />
                    </button>

                  </div>

                </article>
              ))}

            </div>
          )}

        </section>

      </div>

      {/* ADD / EDIT MODAL */}

      {showForm && (
        <div className="planner-modal-overlay">

          <div className="planner-modal">

            <div className="modal-header">

              <div>
                <span className="modal-label">
                  {editingTask ? "EDIT TASK" : "NEW TASK"}
                </span>

                <h2>
                  {editingTask
                    ? "Edit study task"
                    : "Add study task"}
                </h2>
              </div>

              <button
                className="modal-close"
                onClick={closeForm}
                disabled={saving}
              >
                <X size={20} />
              </button>

            </div>

            <form onSubmit={handleSubmit}>

              <div className="form-group">
                <label htmlFor="title">
                  Task title
                </label>

                <input
                  id="title"
                  name="title"
                  type="text"
                  placeholder="e.g. Study Mathematics"
                  value={form.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">
                  Subject
                </label>

                <input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="e.g. Mathematics"
                  value={form.subject}
                  onChange={handleChange}
                />
              </div>

              <div className="form-row">

                <div className="form-group">
                  <label htmlFor="task_date">
                    Date
                  </label>

                  <input
                    id="task_date"
                    name="task_date"
                    type="date"
                    value={form.task_date}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="priority">
                    Priority
                  </label>

                  <select
                    id="priority"
                    name="priority"
                    value={form.priority}
                    onChange={handleChange}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

              </div>

              <div className="form-row">

                <div className="form-group">
                  <label htmlFor="start_time">
                    Start time
                  </label>

                  <input
                    id="start_time"
                    name="start_time"
                    type="time"
                    value={form.start_time}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="end_time">
                    End time
                  </label>

                  <input
                    id="end_time"
                    name="end_time"
                    type="time"
                    value={form.end_time}
                    onChange={handleChange}
                  />
                </div>

              </div>

              <div className="modal-actions">

                <button
                  type="button"
                  className="cancel-btn"
                  onClick={closeForm}
                  disabled={saving}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="save-task-btn"
                  disabled={saving}
                >
                  {saving
                    ? "Saving..."
                    : editingTask
                    ? "Save Changes"
                    : "Add Task"}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </main>
  );
};

export default page;

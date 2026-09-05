"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  Search,
  Check,
  Trash2,
  Edit3,
  CalendarDays,
  Clock,
  Filter,
  ListTodo,
  Plus,
  X,
} from "lucide-react";

import { createClient } from "@/lib/supabase/client";

import "./page.css";

const page = () => {
  const supabase = createClient();
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const [form, setForm] = useState({
    title: "",
    subject: "",
    task_date: "",
    start_time: "",
    end_time: "",
    priority: "medium",
  });

  /* ---------------- USER ---------------- */

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
      console.error("Error loading tasks:", error);
      setLoading(false);
      return;
    }

    setTasks(data || []);
    setLoading(false);
  };

  /* ---------------- DATE ---------------- */

  const getToday = () => {
    const date = new Date();

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const today = getToday();

  /* ---------------- FORM ---------------- */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const openAddForm = () => {
    setEditingTask(null);

    setForm({
      title: "",
      subject: "",
      task_date: today,
      start_time: "",
      end_time: "",
      priority: "medium",
    });

    setShowForm(true);
  };

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

  const closeForm = () => {
    if (saving) return;

    setShowForm(false);
    setEditingTask(null);
  };

  /* ---------------- ADD / UPDATE ---------------- */

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
        prev.map((task) =>
          task.id === data.id ? data : task
        )
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
  };

  /* ---------------- COMPLETE ---------------- */

  const toggleTask = async (task) => {
    const completed = !task.completed;

    setTasks((prev) =>
      prev.map((item) =>
        item.id === task.id
          ? { ...item, completed }
          : item
      )
    );

    const { error } = await supabase
      .from("study_tasks")
      .update({
        completed,
        updated_at: new Date().toISOString(),
      })
      .eq("id", task.id)
      .eq("user_id", user.id);

    if (error) {
      console.error("Error updating task:", error);

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

  /* ---------------- DELETE ---------------- */

  const deleteTask = async (taskId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmed) return;

    const previousTasks = [...tasks];

    setTasks((prev) =>
      prev.filter((task) => task.id !== taskId)
    );

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

  /* ---------------- FILTER ---------------- */

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch =
        task.title
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        task.subject
          ?.toLowerCase()
          .includes(search.toLowerCase());

      if (!matchesSearch) return false;

      if (filter === "today") {
        return task.task_date === today;
      }

      if (filter === "upcoming") {
        return task.task_date > today;
      }

      if (filter === "completed") {
        return task.completed;
      }

      if (filter === "pending") {
        return !task.completed;
      }

      if (filter === "high") {
        return task.priority === "high";
      }

      return true;
    });
  }, [tasks, search, filter, today]);

  /* ---------------- FORMAT ---------------- */

  const formatDate = (date) => {
    if (!date) return "";

    return new Date(`${date}T00:00:00`).toLocaleDateString(
      "en-US",
      {
        weekday: "short",
        month: "short",
        day: "numeric",
      }
    );
  };

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

  /* ---------------- STATS ---------------- */

  const completedCount = tasks.filter(
    (task) => task.completed
  ).length;

  const pendingCount = tasks.filter(
    (task) => !task.completed
  ).length;

  /* ---------------- LOADING ---------------- */

  if (loading) {
    return (
      <main className="tasks-page">
        <div className="tasks-loading">
          <div className="tasks-loader"></div>
          <p>Loading your tasks...</p>
        </div>
      </main>
    );
  }

  /* ---------------- PAGE ---------------- */

  return (
    <main className="tasks-page">
      <div className="tasks-container">

        {/* HEADER */}

        <section className="tasks-header">
          <div>
            <span className="tasks-label">
              MY TASKS
            </span>

            <h1>
              Stay on top of
              <br />
              <span>your study tasks.</span>
            </h1>

            <p>
              Manage your study tasks, track what you've
              completed, and stay organized.
            </p>
          </div>

          <button
            className="tasks-add-btn"
            onClick={openAddForm}
          >
            <Plus size={19} />
            Add Task
          </button>
        </section>

        {/* STATS */}

        <section className="tasks-stats">

          <div className="tasks-stat">
            <div className="tasks-stat-icon">
              <ListTodo size={20} />
            </div>

            <div>
              <span>Total Tasks</span>
              <strong>{tasks.length}</strong>
            </div>
          </div>

          <div className="tasks-stat">
            <div className="tasks-stat-icon">
              <Check size={20} />
            </div>

            <div>
              <span>Completed</span>
              <strong>{completedCount}</strong>
            </div>
          </div>

          <div className="tasks-stat">
            <div className="tasks-stat-icon">
              <Clock size={20} />
            </div>

            <div>
              <span>Pending</span>
              <strong>{pendingCount}</strong>
            </div>
          </div>

        </section>

        {/* CONTROLS */}

        <section className="tasks-controls">

          <div className="tasks-search">
            <Search size={18} />

            <input
              type="text"
              placeholder="Search tasks..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />
          </div>

          <div className="tasks-filter">
            <Filter size={17} />

            <select
              value={filter}
              onChange={(e) =>
                setFilter(e.target.value)
              }
            >
              <option value="all">All Tasks</option>
              <option value="today">Today</option>
              <option value="upcoming">Upcoming</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="high">High Priority</option>
            </select>
          </div>

        </section>

        {/* TASKS */}

        <section className="tasks-list-section">

          <div className="tasks-list-header">
            <div>
              <h2>
                {filter === "all"
                  ? "All Tasks"
                  : filter === "today"
                  ? "Today's Tasks"
                  : filter === "upcoming"
                  ? "Upcoming Tasks"
                  : filter === "completed"
                  ? "Completed Tasks"
                  : filter === "pending"
                  ? "Pending Tasks"
                  : "High Priority Tasks"}
              </h2>

              <p>
                {filteredTasks.length}{" "}
                {filteredTasks.length === 1
                  ? "task"
                  : "tasks"}
              </p>
            </div>
          </div>

          {filteredTasks.length === 0 ? (
            <div className="tasks-empty">

              <div className="tasks-empty-icon">
                <ListTodo size={34} />
              </div>

              <h3>
                {search
                  ? "No tasks found"
                  : "Nothing here yet"}
              </h3>

              <p>
                {search
                  ? "Try a different search term."
                  : "Add a task to start organizing your study."}
              </p>

              {!search && (
                <button
                  className="tasks-empty-btn"
                  onClick={openAddForm}
                >
                  <Plus size={18} />
                  Add Task
                </button>
              )}

            </div>
          ) : (
            <div className="tasks-list">

              {filteredTasks.map((task) => (
                <article
                  className={`task-item ${
                    task.completed
                      ? "task-item-completed"
                      : ""
                  }`}
                  key={task.id}
                >

                  <button
                    className={`task-item-check ${
                      task.completed
                        ? "task-item-checked"
                        : ""
                    }`}
                    onClick={() =>
                      toggleTask(task)
                    }
                  >
                    {task.completed && (
                      <Check size={16} />
                    )}
                  </button>

                  <div className="task-item-main">

                    <div className="task-item-top">

                      <div>
                        <h3>{task.title}</h3>

                        {task.subject && (
                          <span>
                            {task.subject}
                          </span>
                        )}
                      </div>

                      <span
                        className={`task-priority task-priority-${task.priority}`}
                      >
                        {task.priority}
                      </span>

                    </div>

                    <div className="task-item-details">

                      <span>
                        <CalendarDays size={15} />
                        {formatDate(task.task_date)}
                      </span>

                      {task.start_time && (
                        <span>
                          <Clock size={15} />
                          {formatTime(
                            task.start_time
                          )}

                          {task.end_time &&
                            ` - ${formatTime(
                              task.end_time
                            )}`}
                        </span>
                      )}

                    </div>

                  </div>

                  <div className="task-item-actions">

                    <button
                      onClick={() =>
                        openEditForm(task)
                      }
                    >
                      <Edit3 size={17} />
                    </button>

                    <button
                      onClick={() =>
                        deleteTask(task.id)
                      }
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

      {/* MODAL */}

      {showForm && (
        <div className="tasks-modal-overlay">

          <div className="tasks-modal">

            <div className="tasks-modal-header">

              <div>
                <span>
                  {editingTask
                    ? "EDIT TASK"
                    : "NEW TASK"}
                </span>

                <h2>
                  {editingTask
                    ? "Edit study task"
                    : "Add study task"}
                </h2>
              </div>

              <button
                onClick={closeForm}
                disabled={saving}
              >
                <X size={20} />
              </button>

            </div>

            <form onSubmit={handleSubmit}>

              <div className="tasks-form-group">
                <label>Task title</label>

                <input
                  name="title"
                  type="text"
                  placeholder="e.g. Study Mathematics"
                  value={form.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="tasks-form-group">
                <label>Subject</label>

                <input
                  name="subject"
                  type="text"
                  placeholder="e.g. Mathematics"
                  value={form.subject}
                  onChange={handleChange}
                />
              </div>

              <div className="tasks-form-row">

                <div className="tasks-form-group">
                  <label>Date</label>

                  <input
                    name="task_date"
                    type="date"
                    value={form.task_date}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="tasks-form-group">
                  <label>Priority</label>

                  <select
                    name="priority"
                    value={form.priority}
                    onChange={handleChange}
                  >
                    <option value="low">
                      Low
                    </option>

                    <option value="medium">
                      Medium
                    </option>

                    <option value="high">
                      High
                    </option>
                  </select>
                </div>

              </div>

              <div className="tasks-form-row">

                <div className="tasks-form-group">
                  <label>Start time</label>

                  <input
                    name="start_time"
                    type="time"
                    value={form.start_time}
                    onChange={handleChange}
                  />
                </div>

                <div className="tasks-form-group">
                  <label>End time</label>

                  <input
                    name="end_time"
                    type="time"
                    value={form.end_time}
                    onChange={handleChange}
                  />
                </div>

              </div>

              <div className="tasks-modal-actions">

                <button
                  type="button"
                  onClick={closeForm}
                  disabled={saving}
                >
                  Cancel
                </button>

                <button
                  type="submit"
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

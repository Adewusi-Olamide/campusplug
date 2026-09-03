'use client'

import React, { useEffect, useState } from 'react'
import {
  Plus,
  Search,
  Pin,
  PinOff,
  Pencil,
  Trash2,
  X,
  FileText,
  ArrowLeft,
} from 'lucide-react'
import './page.css'

const page = () => {
  const [notes, setNotes] = useState([])
  const [search, setSearch] = useState('')
  const [subjectFilter, setSubjectFilter] = useState('All')
  const [showEditor, setShowEditor] = useState(false)

  const [title, setTitle] = useState('')
  const [subject, setSubject] = useState('')
  const [content, setContent] = useState('')
  const [editingId, setEditingId] = useState(null)

  useEffect(() => {
    const savedNotes = localStorage.getItem('campusplug-notes')

    if (savedNotes) {
      setNotes(JSON.parse(savedNotes))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('campusplug-notes', JSON.stringify(notes))
  }, [notes])

  const openNewNote = () => {
    setTitle('')
    setSubject('')
    setContent('')
    setEditingId(null)
    setShowEditor(true)
  }

  const openEditNote = (note) => {
    setTitle(note.title)
    setSubject(note.subject)
    setContent(note.content)
    setEditingId(note.id)
    setShowEditor(true)
  }

  const closeEditor = () => {
    setTitle('')
    setSubject('')
    setContent('')
    setEditingId(null)
    setShowEditor(false)
  }

  const saveNote = () => {
    if (!title.trim() || !content.trim()) return

    if (editingId) {
      setNotes(
        notes.map((note) =>
          note.id === editingId
            ? {
                ...note,
                title: title.trim(),
                subject: subject.trim() || 'General',
                content: content.trim(),
                updatedAt: new Date().toISOString(),
              }
            : note
        )
      )
    } else {
      const newNote = {
        id: Date.now(),
        title: title.trim(),
        subject: subject.trim() || 'General',
        content: content.trim(),
        pinned: false,
        updatedAt: new Date().toISOString(),
      }

      setNotes([newNote, ...notes])
    }

    closeEditor()
  }

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id))
  }

  const togglePin = (id) => {
    setNotes(
      notes.map((note) =>
        note.id === id
          ? { ...note, pinned: !note.pinned }
          : note
      )
    )
  }

  const subjects = [
    'All',
    ...new Set(notes.map((note) => note.subject).filter(Boolean)),
  ]

  const filteredNotes = notes
    .filter((note) => {
      const matchesSearch =
        note.title.toLowerCase().includes(search.toLowerCase()) ||
        note.content.toLowerCase().includes(search.toLowerCase()) ||
        note.subject.toLowerCase().includes(search.toLowerCase())

      const matchesSubject =
        subjectFilter === 'All' || note.subject === subjectFilter

      return matchesSearch && matchesSubject
    })
    .sort((a, b) => {
      if (a.pinned !== b.pinned) {
        return a.pinned ? -1 : 1
      }

      return new Date(b.updatedAt) - new Date(a.updatedAt)
    })

  const getWordCount = (text) => {
    if (!text.trim()) return 0
    return text.trim().split(/\s+/).length
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  return (
    <main className="notes-page">

      {!showEditor ? (
        <>
          <section className="notes-header">
            <div>
              <h1>My Notes</h1>
              <p>Keep your class notes organized and easy to find.</p>
            </div>

            <button className="new-note-btn" onClick={openNewNote}>
              <Plus size={19} />
              New Note
            </button>
          </section>

          <section className="notes-toolbar">
            <div className="notes-search">
              <Search size={19} />
              <input
                type="text"
                placeholder="Search your notes..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="subject-filters">
              {subjects.map((subject) => (
                <button
                  key={subject}
                  className={subjectFilter === subject ? 'active' : ''}
                  onClick={() => setSubjectFilter(subject)}
                >
                  {subject}
                </button>
              ))}
            </div>
          </section>

          {filteredNotes.length === 0 ? (
            <div className="notes-empty">
              <div className="empty-icon">
                <FileText size={32} />
              </div>

              <h2>
                {notes.length === 0
                  ? 'No notes yet'
                  : 'No notes found'}
              </h2>

              <p>
                {notes.length === 0
                  ? 'Create your first note and keep your studies organized.'
                  : 'Try a different search or subject filter.'}
              </p>

              {notes.length === 0 && (
                <button
                  className="empty-create-btn"
                  onClick={openNewNote}
                >
                  <Plus size={18} />
                  Create Your First Note
                </button>
              )}
            </div>
          ) : (
            <section className="notes-grid">
              {filteredNotes.map((note) => (
                <article className="note-card" key={note.id}>

                  <div className="note-card-top">
                    <span className="note-subject">
                      {note.subject}
                    </span>

                    <button
                      className={`pin-btn ${
                        note.pinned ? 'pinned' : ''
                      }`}
                      onClick={() => togglePin(note.id)}
                      aria-label={
                        note.pinned ? 'Unpin note' : 'Pin note'
                      }
                    >
                      {note.pinned ? (
                        <Pin size={17} />
                      ) : (
                        <PinOff size={17} />
                      )}
                    </button>
                  </div>

                  <h2>{note.title}</h2>

                  <p className="note-preview">
                    {note.content}
                  </p>

                  <div className="note-card-bottom">
                    <span>
                      {getWordCount(note.content)} words ·{' '}
                      {formatDate(note.updatedAt)}
                    </span>

                    <div className="note-actions">
                      <button
                        onClick={() => openEditNote(note)}
                        aria-label="Edit note"
                      >
                        <Pencil size={16} />
                      </button>

                      <button
                        className="delete-note"
                        onClick={() => deleteNote(note.id)}
                        aria-label="Delete note"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                </article>
              ))}
            </section>
          )}
        </>
      ) : (
        <section className="note-editor-page">

          <button className="back-notes-btn" onClick={closeEditor}>
            <ArrowLeft size={19} />
            Back to Notes
          </button>

          <div className="editor-header">
            <div>
              <h1>
                {editingId ? 'Edit Note' : 'Create Note'}
              </h1>
              <p>
                {editingId
                  ? 'Update your study note.'
                  : 'Write down something worth remembering.'}
              </p>
            </div>
          </div>

          <div className="note-editor-card">

            <div className="editor-input">
              <label htmlFor="note-title">Title</label>
              <input
                id="note-title"
                type="text"
                placeholder="e.g. Newton's Laws of Motion"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="editor-input">
              <label htmlFor="note-subject">Subject</label>
              <input
                id="note-subject"
                type="text"
                placeholder="e.g. Physics"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>

            <div className="editor-input content-input">
              <div className="content-label">
                <label htmlFor="note-content">Your Note</label>
                <span>{getWordCount(content)} words</span>
              </div>

              <textarea
                id="note-content"
                placeholder="Start writing your notes..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>

            <div className="editor-actions">
              <button className="cancel-btn" onClick={closeEditor}>
                Cancel
              </button>

              <button
                className="save-note-btn"
                onClick={saveNote}
                disabled={!title.trim() || !content.trim()}
              >
                {editingId ? 'Save Changes' : 'Save Note'}
              </button>
            </div>

          </div>
        </section>
      )}

    </main>
  )
}

export default page

'use client'

import React, { useEffect, useState } from 'react'
import {
  Plus,
  Search,
  Pin,
  PinOff,
  Pencil,
  Trash2,
  FileText,
  ArrowLeft,
} from 'lucide-react'
import './page.css'
import { createClient } from '@/lib/supabase/client'

const page = () => {
  const supabase = createClient()

  const [notes, setNotes] = useState([])
  const [search, setSearch] = useState('')
  const [subjectFilter, setSubjectFilter] = useState('All')
  const [showEditor, setShowEditor] = useState(false)

  const [title, setTitle] = useState('')
  const [subject, setSubject] = useState('')
  const [content, setContent] = useState('')
  const [editingId, setEditingId] = useState(null)

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  // Load the logged-in student's notes
  useEffect(() => {
    const loadNotes = async () => {
      setLoading(true)

      try {
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser()

        if (userError) {
          throw userError
        }

        if (!user) {
          console.error('No logged-in user found.')
          setNotes([])
          return
        }

        const { data, error } = await supabase
          .from('notes')
          .select(
            'id, title, subject, content, pinned, created_at, updated_at'
          )
          .eq('user_id', user.id)
          .order('updated_at', { ascending: false })

        if (error) {
          throw error
        }

        setNotes(data || [])
      } catch (error) {
        console.error('Failed to load notes:', error?.message)
        console.error('Load error details:', error)
      } finally {
        setLoading(false)
      }
    }

    loadNotes()
  }, [])

  const openNewNote = () => {
    setTitle('')
    setSubject('')
    setContent('')
    setEditingId(null)
    setShowEditor(true)
  }

  const openEditNote = (note) => {
    setTitle(note.title)
    setSubject(note.subject || '')
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

  const saveNote = async () => {
    if (!title.trim() || !content.trim() || saving) return

    setSaving(true)

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser()

      if (userError) {
        throw userError
      }

      if (!user) {
        console.error('No logged-in user found.')
        return
      }

      if (editingId) {
        const { data, error } = await supabase
          .from('notes')
          .update({
            title: title.trim(),
            subject: subject.trim() || 'General',
            content: content.trim(),
            updated_at: new Date().toISOString(),
          })
          .eq('id', editingId)
          .eq('user_id', user.id)
          .select()
          .single()

        if (error) {
          throw error
        }

        setNotes((currentNotes) =>
          currentNotes.map((note) =>
            note.id === editingId ? data : note
          )
        )
      } else {
        const { data, error } = await supabase
          .from('notes')
          .insert({
            user_id: user.id,
            title: title.trim(),
            subject: subject.trim() || 'General',
            content: content.trim(),
            pinned: false,
          })
          .select()
          .single()

        if (error) {
          throw error
        }

        setNotes((currentNotes) => [data, ...currentNotes])
      }

      closeEditor()
    } catch (error) {
      console.error('Failed to save note:', error?.message)
      console.error('Save error   details:', error)
    } finally {
      setSaving(false)
    }
  }

  const deleteNote = async (id) => {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return

    const previousNotes = notes

    setNotes((currentNotes) =>
      currentNotes.filter((note) => note.id !== id)
    )

    const { error } = await supabase
      .from('notes')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id)

    if (error) {
      console.error('Failed to delete note:', error)
      setNotes(previousNotes)
    }
  }

  const togglePin = async (id) => {
    const note = notes.find((item) => item.id === id)

    if (!note) return

    const newPinnedState = !note.pinned

    setNotes((currentNotes) =>
      currentNotes.map((item) =>
        item.id === id
          ? {
              ...item,
              pinned: newPinnedState,
            }
          : item
      )
    )

    const { error } = await supabase
      .from('notes')
      .update({
        pinned: newPinnedState,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)

    if (error) {
      console.error('Failed to update pin:', error)

      setNotes((currentNotes) =>
        currentNotes.map((item) =>
          item.id === id
            ? {
                ...item,
                pinned: note.pinned,
              }
            : item
        )
      )
    }
  }

  const subjects = [
    'All',
    ...new Set(
      notes
        .map((note) => note.subject)
        .filter(Boolean)
    ),
  ]

  const filteredNotes = notes
    .filter((note) => {
      const matchesSearch =
        note.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        note.content
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        (note.subject || '')
          .toLowerCase()
          .includes(search.toLowerCase())

      const matchesSubject =
        subjectFilter === 'All' ||
        note.subject === subjectFilter

      return matchesSearch && matchesSubject
    })
    .sort((a, b) => {
      if (a.pinned !== b.pinned) {
        return a.pinned ? -1 : 1
      }

      return (
        new Date(b.updated_at) -
        new Date(a.updated_at)
      )
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
              <p>
                Keep your class notes organized and easy to find.
              </p>
            </div>

            <button
              className="new-note-btn"
              onClick={openNewNote}
            >
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
                  className={
                    subjectFilter === subject
                      ? 'active'
                      : ''
                  }
                  onClick={() =>
                    setSubjectFilter(subject)
                  }
                >
                  {subject}
                </button>
              ))}
            </div>
          </section>

          {loading ? (
            <div className="notes-empty">
              <div className="empty-icon">
                <FileText size={32} />
              </div>

              <h2>Loading your notes...</h2>

              <p>
                Getting your saved notes.
              </p>
            </div>
          ) : filteredNotes.length === 0 ? (
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
                <article
                  className="note-card"
                  key={note.id}
                >

                  <div className="note-card-top">
                    <span className="note-subject">
                      {note.subject}
                    </span>

                    <button
                      className={`pin-btn ${
                        note.pinned ? 'pinned' : ''
                      }`}
                      onClick={() =>
                        togglePin(note.id)
                      }
                      aria-label={
                        note.pinned
                          ? 'Unpin note'
                          : 'Pin note'
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
                      {formatDate(note.updated_at)}
                    </span>

                    <div className="note-actions">
                      <button
                        onClick={() =>
                          openEditNote(note)
                        }
                        aria-label="Edit note"
                      >
                        <Pencil size={16} />
                      </button>

                      <button
                        className="delete-note"
                        onClick={() =>
                          deleteNote(note.id)
                        }
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

          <button
            className="back-notes-btn"
            onClick={closeEditor}
          >
            <ArrowLeft size={19} />
            Back to Notes
          </button>

          <div className="editor-header">
            <div>
              <h1>
                {editingId
                  ? 'Edit Note'
                  : 'Create Note'}
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
              <label htmlFor="note-title">
                Title
              </label>

              <input
                id="note-title"
                type="text"
                placeholder="e.g. Newton's Laws of Motion"
                value={title}
                onChange={(e) =>
                  setTitle(e.target.value)
                }
              />
            </div>

            <div className="editor-input">
              <label htmlFor="note-subject">
                Subject
              </label>

              <input
                id="note-subject"
                type="text"
                placeholder="e.g. Physics"
                value={subject}
                onChange={(e) =>
                  setSubject(e.target.value)
                }
              />
            </div>

            <div className="editor-input content-input">
              <div className="content-label">
                <label htmlFor="note-content">
                  Your Note
                </label>

                <span>
                  {getWordCount(content)} words
                </span>
              </div>

              <textarea
                id="note-content"
                placeholder="Start writing your notes..."
                value={content}
                onChange={(e) =>
                  setContent(e.target.value)
                }
              />
            </div>

            <div className="editor-actions">

              <button
                className="cancel-btn"
                onClick={closeEditor}
              >
                Cancel
              </button>

              <button
                className="save-note-btn"
                onClick={saveNote}
                disabled={
                  !title.trim() ||
                  !content.trim() ||
                  saving
                }
              >
                {saving
                  ? 'Saving...'
                  : editingId
                    ? 'Save Changes'
                    : 'Save Note'}
              </button>

            </div>

          </div>
        </section>
      )}

    </main>
  )
}

export default page
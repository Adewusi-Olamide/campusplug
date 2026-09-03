'use client'

import React, { useEffect, useState } from 'react'
import {
  Plus,
  Search,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Trash2,
  X,
  BookOpen,
} from 'lucide-react'
import './page.css'

const page = () => {
  const [decks, setDecks] = useState([])
  const [selectedDeck, setSelectedDeck] = useState(null)
  const [currentCard, setCurrentCard] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [search, setSearch] = useState('')
  const [showCreate, setShowCreate] = useState(false)

  const [deckName, setDeckName] = useState('')
  const [subject, setSubject] = useState('')
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [newCards, setNewCards] = useState([])

  useEffect(() => {
    const savedDecks = localStorage.getItem('campusplug-flashcards')

    if (savedDecks) {
      setDecks(JSON.parse(savedDecks))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('campusplug-flashcards', JSON.stringify(decks))
  }, [decks])

  const addCard = () => {
    if (!question.trim() || !answer.trim()) return

    setNewCards([
      ...newCards,
      {
        question: question.trim(),
        answer: answer.trim(),
      },
    ])

    setQuestion('')
    setAnswer('')
  }

  const createDeck = () => {
    if (!deckName.trim() || !subject.trim() || newCards.length === 0) return

    const newDeck = {
      id: Date.now(),
      name: deckName.trim(),
      subject: subject.trim(),
      cards: newCards,
    }

    setDecks([...decks, newDeck])
    setDeckName('')
    setSubject('')
    setQuestion('')
    setAnswer('')
    setNewCards([])
    setShowCreate(false)
  }

  const openDeck = (deck) => {
    setSelectedDeck(deck)
    setCurrentCard(0)
    setFlipped(false)
  }

  const closeDeck = () => {
    setSelectedDeck(null)
    setCurrentCard(0)
    setFlipped(false)
  }

  const nextCard = () => {
    if (!selectedDeck) return

    setFlipped(false)

    setCurrentCard((prev) =>
      prev < selectedDeck.cards.length - 1 ? prev + 1 : 0
    )
  }

  const previousCard = () => {
    if (!selectedDeck) return

    setFlipped(false)

    setCurrentCard((prev) =>
      prev > 0 ? prev - 1 : selectedDeck.cards.length - 1
    )
  }

  const deleteDeck = (id) => {
    const updatedDecks = decks.filter((deck) => deck.id !== id)

    setDecks(updatedDecks)

    if (selectedDeck?.id === id) {
      closeDeck()
    }
  }

  const filteredDecks = decks.filter(
    (deck) =>
      deck.name.toLowerCase().includes(search.toLowerCase()) ||
      deck.subject.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <main className="flashcards-page">

      {!selectedDeck ? (
        <>
          <section className="flashcards-header">
            <div>
              <h1>Flashcards</h1>
              <p>Create and study flashcards to improve your memory.</p>
            </div>

            <button
              className="create-deck-btn"
              onClick={() => setShowCreate(true)}
            >
              <Plus size={19} />
              Create Deck
            </button>
          </section>

          <div className="flashcards-search">
            <Search size={19} />
            <input
              type="text"
              placeholder="Search your decks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {filteredDecks.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">
                <BookOpen size={32} />
              </div>

              <h2>No flashcard decks yet</h2>
              <p>Create your first deck and start studying.</p>

              <button
                className="empty-create-btn"
                onClick={() => setShowCreate(true)}
              >
                <Plus size={18} />
                Create Your First Deck
              </button>
            </div>
          ) : (
            <section className="deck-grid">
              {filteredDecks.map((deck) => (
                <div className="deck-card" key={deck.id}>
                  <div
                    className="deck-icon"
                    onClick={() => openDeck(deck)}
                  >
                    <BookOpen size={25} />
                  </div>

                  <div
                    className="deck-info"
                    onClick={() => openDeck(deck)}
                  >
                    <span>{deck.subject}</span>
                    <h3>{deck.name}</h3>
                    <p>{deck.cards.length} cards</p>
                  </div>

                  <div className="deck-actions">
                    <button
                      onClick={() => openDeck(deck)}
                      className="study-btn"
                    >
                      Study
                    </button>

                    <button
                      onClick={() => deleteDeck(deck.id)}
                      className="delete-btn"
                      aria-label="Delete deck"
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                </div>
              ))}
            </section>
          )}
        </>
      ) : (
        <section className="study-section">

          <button className="back-btn" onClick={closeDeck}>
            <ChevronLeft size={19} />
            Back to Decks
          </button>

          <div className="study-header">
            <div>
              <span>{selectedDeck.subject}</span>
              <h1>{selectedDeck.name}</h1>
            </div>

            <p>
              Card {currentCard + 1} of {selectedDeck.cards.length}
            </p>
          </div>

          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${
                  ((currentCard + 1) / selectedDeck.cards.length) * 100
                }%`,
              }}
            />
          </div>

          <div
            className={`flashcard ${flipped ? 'flipped' : ''}`}
            onClick={() => setFlipped(!flipped)}
          >
            <div className="card-label">
              {flipped ? 'ANSWER' : 'QUESTION'}
            </div>

            <div className="card-content">
              {flipped
                ? selectedDeck.cards[currentCard].answer
                : selectedDeck.cards[currentCard].question}
            </div>

            <div className="flip-hint">
              <RotateCcw size={16} />
              Tap to flip
            </div>
          </div>

          <div className="study-controls">
            <button onClick={previousCard}>
              <ChevronLeft size={21} />
              Previous
            </button>

            <button onClick={() => setFlipped(!flipped)}>
              <RotateCcw size={18} />
              Flip Card
            </button>

            <button onClick={nextCard}>
              Next
              <ChevronRight size={21} />
            </button>
          </div>

        </section>
      )}

      {showCreate && (
        <div className="modal-overlay">
          <div className="create-modal">

            <div className="modal-header">
              <div>
                <h2>Create Flashcard Deck</h2>
                <p>Add cards to your new study deck.</p>
              </div>

              <button
                className="modal-close"
                onClick={() => setShowCreate(false)}
              >
                <X size={20} />
              </button>
            </div>

            <div className="deck-inputs">
              <div className="input-group">
                <label>Deck name</label>
                <input
                  type="text"
                  placeholder="e.g. Organic Chemistry"
                  value={deckName}
                  onChange={(e) => setDeckName(e.target.value)}
                />
              </div>

              <div className="input-group">
                <label>Subject</label>
                <input
                  type="text"
                  placeholder="e.g. Chemistry"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>
            </div>

            <div className="card-builder">
              <h3>Add Cards</h3>

              <div className="input-group">
                <label>Question</label>
                <textarea
                  placeholder="Enter your question..."
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                />
              </div>

              <div className="input-group">
                <label>Answer</label>
                <textarea
                  placeholder="Enter the answer..."
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                />
              </div>

              <button className="add-card-btn" onClick={addCard}>
                <Plus size={18} />
                Add Card
              </button>
            </div>

            {newCards.length > 0 && (
              <div className="added-cards">
                <h3>Cards added ({newCards.length})</h3>

                {newCards.map((card, index) => (
                  <div className="added-card" key={index}>
                    <div>
                      <strong>{index + 1}. {card.question}</strong>
                      <p>{card.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <button
              className="save-deck-btn"
              onClick={createDeck}
              disabled={!deckName.trim() || !subject.trim() || newCards.length === 0}
            >
              Save Deck
            </button>

          </div>
        </div>
      )}

    </main>
  )
}

export default page

"use client";

import React, { useEffect, useMemo, useState } from "react";
import "./page.css";

const SUBJECTS = [
  "English Language",
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "Economics",
  "Government",
  "Literature in English",
  "Commerce",
  "Geography",
];

const QUESTION_BANK = {
  "English Language": [
    {
      question: "Choose the word nearest in meaning to 'Abundant'.",
      options: ["Scarce", "Plentiful", "Tiny", "Weak"],
      answer: 1,
    },
    {
      question: "Choose the correctly spelt word.",
      options: ["Occassion", "Ocassion", "Occasion", "Occasssion"],
      answer: 2,
    },
    {
      question: "If I had known, I _____ have helped you.",
      options: ["will", "would", "shall", "can"],
      answer: 1,
    },
    {
      question: "The opposite of 'Ancient' is _____",
      options: ["Modern", "Old", "Historic", "Past"],
      answer: 0,
    },
    {
      question:
        "Choose the word that best completes the sentence: She is good _____ mathematics.",
      options: ["on", "at", "in", "with"],
      answer: 1,
    },
  ],

  Mathematics: [
    {
      question: "Solve: 2x + 6 = 14.",
      options: ["2", "3", "4", "5"],
      answer: 2,
    },
    {
      question: "What is 15% of 200?",
      options: ["15", "20", "30", "35"],
      answer: 2,
    },
    {
      question: "Simplify: 3² + 4².",
      options: ["12", "20", "25", "49"],
      answer: 2,
    },
    {
      question: "What is the value of √144?",
      options: ["10", "11", "12", "14"],
      answer: 2,
    },
    {
      question: "If y = 3x and x = 4, what is y?",
      options: ["7", "10", "12", "14"],
      answer: 2,
    },
  ],

  Physics: [
    {
      question: "What is the SI unit of force?",
      options: ["Joule", "Newton", "Watt", "Pascal"],
      answer: 1,
    },
    {
      question: "Which quantity is measured in metres per second?",
      options: ["Force", "Energy", "Velocity", "Power"],
      answer: 2,
    },
    {
      question: "Which device is used to measure electric current?",
      options: ["Voltmeter", "Ammeter", "Barometer", "Thermometer"],
      answer: 1,
    },
    {
      question:
        "The acceleration due to gravity on Earth is approximately:",
      options: ["5.8 m/s²", "7.2 m/s²", "9.8 m/s²", "12.5 m/s²"],
      answer: 2,
    },
    {
      question:
        "Which form of energy is stored in a stretched spring?",
      options: [
        "Chemical energy",
        "Elastic potential energy",
        "Nuclear energy",
        "Sound energy",
      ],
      answer: 1,
    },
  ],

  Chemistry: [
    {
      question: "What is the chemical symbol for sodium?",
      options: ["So", "S", "Na", "Sd"],
      answer: 2,
    },
    {
      question: "A substance with a pH of 3 is:",
      options: ["Acidic", "Neutral", "Alkaline", "Metallic"],
      answer: 0,
    },
    {
      question: "What is the atomic number of carbon?",
      options: ["4", "6", "8", "12"],
      answer: 1,
    },
    {
      question:
        "Which gas is most abundant in Earth's atmosphere?",
      options: ["Oxygen", "Carbon dioxide", "Nitrogen", "Hydrogen"],
      answer: 2,
    },
    {
      question: "Water has the chemical formula:",
      options: ["CO₂", "H₂O", "O₂", "H₂"],
      answer: 1,
    },
  ],

  Biology: [
    {
      question: "The basic unit of life is the:",
      options: ["Tissue", "Organ", "Cell", "System"],
      answer: 2,
    },
    {
      question:
        "Which organ pumps blood around the human body?",
      options: ["Liver", "Heart", "Lung", "Kidney"],
      answer: 1,
    },
    {
      question: "Photosynthesis mainly occurs in the:",
      options: ["Nucleus", "Mitochondria", "Chloroplast", "Ribosome"],
      answer: 2,
    },
    {
      question: "Which blood cells help fight infections?",
      options: [
        "Red blood cells",
        "White blood cells",
        "Platelets",
        "Plasma",
      ],
      answer: 1,
    },
    {
      question:
        "Humans normally have how many pairs of chromosomes?",
      options: ["20", "21", "23", "25"],
      answer: 2,
    },
  ],

  Economics: [
    {
      question: "The basic economic problem is:",
      options: ["Inflation", "Scarcity", "Taxation", "Profit"],
      answer: 1,
    },
    {
      question: "Demand generally falls when price:",
      options: ["Falls", "Remains constant", "Rises", "Disappears"],
      answer: 2,
    },
    {
      question:
        "A market with only one seller is called:",
      options: [
        "Oligopoly",
        "Monopoly",
        "Perfect competition",
        "Duopoly",
      ],
      answer: 1,
    },
    {
      question: "GDP stands for:",
      options: [
        "Gross Domestic Product",
        "General Domestic Price",
        "Gross Development Plan",
        "General Development Product",
      ],
      answer: 0,
    },
    {
      question: "Money primarily serves as a:",
      options: [
        "Medium of exchange",
        "Natural resource",
        "Consumer good",
        "Raw material",
      ],
      answer: 0,
    },
  ],

  Government: [
    {
      question:
        "Democracy is commonly defined as government by the:",
      options: ["Military", "People", "Judiciary", "Monarch"],
      answer: 1,
    },
    {
      question:
        "The arm of government responsible for interpreting laws is the:",
      options: ["Executive", "Legislature", "Judiciary", "Cabinet"],
      answer: 2,
    },
    {
      question: "A constitution is a set of:",
      options: [
        "Political campaigns",
        "Fundamental rules and principles",
        "Court cases",
        "Election posters",
      ],
      answer: 1,
    },
    {
      question: "The legislature primarily makes:",
      options: [
        "Laws",
        "Budgets only",
        "Judgments",
        "Treaties only",
      ],
      answer: 0,
    },
    {
      question: "The right to vote is known as:",
      options: [
        "Sovereignty",
        "Franchise",
        "Citizenship",
        "Justice",
      ],
      answer: 1,
    },
  ],

  "Literature in English": [
    {
      question:
        "A comparison using 'like' or 'as' is called:",
      options: ["Metaphor", "Simile", "Irony", "Pun"],
      answer: 1,
    },
    {
      question:
        "A story's main character is usually called the:",
      options: [
        "Antagonist",
        "Protagonist",
        "Narrator",
        "Editor",
      ],
      answer: 1,
    },
    {
      question: "A play is primarily written to be:",
      options: ["Sung", "Performed", "Calculated", "Translated"],
      answer: 1,
    },
    {
      question:
        "A poem with fourteen lines is commonly called a:",
      options: ["Ballad", "Sonnet", "Epic", "Ode"],
      answer: 1,
    },
    {
      question: "The person who tells a story is the:",
      options: ["Narrator", "Audience", "Actor", "Publisher"],
      answer: 0,
    },
  ],

  Commerce: [
    {
      question: "Buying and selling goods is known as:",
      options: ["Commerce", "Manufacturing", "Mining", "Banking"],
      answer: 0,
    },
    {
      question:
        "A person who buys goods for personal use is a:",
      options: [
        "Producer",
        "Consumer",
        "Wholesaler",
        "Agent",
      ],
      answer: 1,
    },
    {
      question:
        "Insurance is primarily used to protect against:",
      options: ["Risk", "Profit", "Competition", "Demand"],
      answer: 0,
    },
    {
      question:
        "A person who buys goods in bulk and sells to retailers is a:",
      options: [
        "Consumer",
        "Wholesaler",
        "Producer",
        "Customer",
      ],
      answer: 1,
    },
    {
      question: "Advertising mainly helps businesses to:",
      options: [
        "Hide products",
        "Promote products",
        "Reduce quality",
        "Stop production",
      ],
      answer: 1,
    },
  ],

  Geography: [
    {
      question:
        "The imaginary line dividing Earth into Northern and Southern Hemispheres is the:",
      options: [
        "Prime Meridian",
        "Equator",
        "Tropic of Cancer",
        "Arctic Circle",
      ],
      answer: 1,
    },
    {
      question: "The largest continent is:",
      options: ["Africa", "Europe", "Asia", "Australia"],
      answer: 2,
    },
    {
      question:
        "The instrument used to measure atmospheric pressure is a:",
      options: [
        "Barometer",
        "Thermometer",
        "Anemometer",
        "Hygrometer",
      ],
      answer: 0,
    },
    {
      question:
        "A map scale shows the relationship between:",
      options: [
        "Rainfall and temperature",
        "Map distance and ground distance",
        "Population and area",
        "Latitude and longitude",
      ],
      answer: 1,
    },
    {
      question:
        "Which layer of the atmosphere contains most weather?",
      options: [
        "Stratosphere",
        "Troposphere",
        "Mesosphere",
        "Thermosphere",
      ],
      answer: 1,
    },
  ],
};

const EXAM_DURATION = 30 * 60;

const page = () => {
  const [stage, setStage] = useState("setup");

  const [selectedSubjects, setSelectedSubjects] = useState([
    "English Language",
  ]);

  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [answers, setAnswers] = useState({});
  const [marked, setMarked] = useState({});

  const [timeLeft, setTimeLeft] = useState(EXAM_DURATION);

  const [showSubmit, setShowSubmit] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);

  const [calcExpression, setCalcExpression] = useState("");
  const [calcDisplay, setCalcDisplay] = useState("0");

  const toggleSubject = (subject) => {
    if (subject === "English Language") return;

    setSelectedSubjects((prev) => {
      if (prev.includes(subject)) {
        return prev.filter((item) => item !== subject);
      }

      if (prev.length >= 4) return prev;

      return [...prev, subject];
    });
  };

  const startExam = () => {
    if (selectedSubjects.length !== 4) return;

    const generatedQuestions = selectedSubjects.flatMap((subject) =>
      (QUESTION_BANK[subject] || []).map((question) => ({
        ...question,
        subject,
      }))
    );

    setQuestions(generatedQuestions);
    setAnswers({});
    setMarked({});
    setCurrentQuestion(0);
    setTimeLeft(EXAM_DURATION);
    setStage("instructions");
  };

  const beginTest = () => {
    setStage("exam");
  };

  useEffect(() => {
    if (stage !== "exam") return;

    if (timeLeft <= 0) {
      setShowSubmit(false);
      setStage("results");
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [stage, timeLeft]);

  const selectAnswer = (optionIndex) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion]: optionIndex,
    }));
  };

  const goToQuestion = (index) => {
    if (index >= 0 && index < questions.length) {
      setCurrentQuestion(index);
    }
  };

  const toggleMark = () => {
    setMarked((prev) => ({
      ...prev,
      [currentQuestion]: !prev[currentQuestion],
    }));
  };

  const calculateScore = () => {
    return questions.reduce((score, question, index) => {
      return score + (answers[index] === question.answer ? 1 : 0);
    }, 0);
  };

  const score = useMemo(() => {
    if (!questions.length) return 0;

    return calculateScore();
  }, [answers, questions]);

  const answeredCount = Object.keys(answers).length;

  const markedCount = Object.values(marked).filter(Boolean).length;

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);

    const minutes = Math.floor((seconds % 3600) / 60);

    const secs = seconds % 60;

    return `${String(hours).padStart(2, "0")}:${String(
      minutes
    ).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const calculateExpression = (value) => {
    try {
      const expression = value
        .replace(/×/g, "*")
        .replace(/÷/g, "/")
        .replace(/−/g, "-");

      if (!/^[0-9+\-*/().%\s]+$/.test(expression)) {
        return "Error";
      }

      const converted = expression.replace(
        /(\d+(\.\d+)?)%/g,
        "($1/100)"
      );

      const result = Function(
        `"use strict"; return (${converted})`
      )();

      if (!Number.isFinite(result)) {
        return "Error";
      }

      return Number.isInteger(result)
        ? String(result)
        : String(Number(result.toFixed(10)));
    } catch {
      return "Error";
    }
  };

  const calcButton = (button) => {
    if (button === "C") {
      setCalcDisplay("0");
      setCalcExpression("");
      return;
    }

    if (button === "DEL") {
      const next = calcExpression.slice(0, -1);

      setCalcExpression(next);
      setCalcDisplay(next || "0");

      return;
    }

    if (button === "=") {
      if (!calcExpression) return;

      const result = calculateExpression(calcExpression);

      setCalcDisplay(result);

      if (result !== "Error") {
        setCalcExpression(result);
      }

      return;
    }

    const next = calcExpression + button;

    setCalcExpression(next);
    setCalcDisplay(next);
  };

  const restart = () => {
    setStage("setup");
    setSelectedSubjects(["English Language"]);
    setQuestions([]);
    setAnswers({});
    setMarked({});
    setCurrentQuestion(0);
    setTimeLeft(EXAM_DURATION);
    setShowSubmit(false);
    setShowCalculator(false);
    setCalcExpression("");
    setCalcDisplay("0");
  };

  if (stage === "setup") {
    return (
      <main className="cbt-page">
        <div className="cbt-container">
          <header className="cbt-header">
            <div>
              <span className="eyebrow">CampusPlug CBT</span>

              <h1>Choose Your Subjects</h1>

              <p>
                Select exactly four subjects for your practice
                examination.
              </p>
            </div>

            <div className="subject-counter">
              <strong>{selectedSubjects.length}/4</strong>
              <span>Subjects</span>
            </div>
          </header>

          <section className="setup-card">
            <div className="selection-notice">
              <span>i</span>

              <p>
                <strong>English Language is compulsory.</strong>{" "}
                Select three additional subjects to continue.
              </p>
            </div>

            <div className="subjects-grid">
              {SUBJECTS.map((subject) => {
                const selected = selectedSubjects.includes(subject);

                const compulsory =
                  subject === "English Language";

                return (
                  <button
                    key={subject}
                    type="button"
                    className={`subject-card ${
                      selected ? "selected" : ""
                    }`}
                    onClick={() => toggleSubject(subject)}
                  >
                    <span className="subject-check">
                      {selected ? "✓" : ""}
                    </span>

                    <span className="subject-name">
                      {subject}
                    </span>

                    {compulsory && (
                      <span className="compulsory">
                        Compulsory
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="selected-preview">
              <span>Selected:</span>

              <div>
                {selectedSubjects.map((subject) => (
                  <span
                    key={subject}
                    className="selected-pill"
                  >
                    {subject}
                  </span>
                ))}
              </div>
            </div>

            <button
              type="button"
              className="primary-button start-button"
              disabled={selectedSubjects.length !== 4}
              onClick={startExam}
            >
              Continue to Instructions →
            </button>
          </section>
        </div>
      </main>
    );
  }

  if (stage === "instructions") {
    return (
      <main className="cbt-page">
        <div className="cbt-container narrow">
          <section className="instructions-card">
            <span className="eyebrow">Before You Begin</span>

            <h1>CBT Instructions</h1>

            <p className="instructions-intro">
              Read the instructions carefully before starting
              your test.
            </p>

            <div className="exam-summary">
              <div>
                <span>Subjects</span>
                <strong>{selectedSubjects.length}</strong>
              </div>

              <div>
                <span>Questions</span>
                <strong>{questions.length}</strong>
              </div>

              <div>
                <span>Duration</span>
                <strong>30 mins</strong>
              </div>
            </div>

            <ul className="instruction-list">
              <li>
                You must answer each question by selecting one
                available option.
              </li>

              <li>
                You can move between questions using the
                navigation buttons or question navigator.c
              </li>

              <li>
                Use <strong>Mark for Review</strong> when you
                want to return to a question later.
              </li>

              <li>
                You can change an answer at any time before
                submitting.
              </li>

              <li>
                The calculator can be opened whenever you need
                it.
              </li>

              <li>
                The examination will automatically end when the
                countdown reaches zero.
              </li>

              <li>
                You can submit the examination before the timer
                ends.
              </li>
            </ul>

            <div className="selected-subjects">
              <strong>Your subjects</strong>

              <div>
                {selectedSubjects.map((subject) => (
                  <span key={subject}>{subject}</span>
                ))}
              </div>
            </div>

            <div className="instruction-actions">
              <button
                type="button"
                className="secondary-button"
                onClick={() => setStage("setup")}
              >
                ← Change Subjects
              </button>

              <button
                type="button"
                className="primary-button"
                onClick={beginTest}
              >
                Start Examination →
              </button>
            </div>
          </section>
        </div>
      </main>
    );
  }

  if (stage === "results") {
    const percentage = questions.length
      ? Math.round((score / questions.length) * 100)
      : 0;

    return (
      <main className="cbt-page">
        <div className="cbt-container narrow">
          <section className="results-card">
            <div className="result-icon">
              {percentage >= 50 ? "✓" : "!"}
            </div>

            <span className="eyebrow">
              Examination Complete
            </span>

            <h1>Your Results</h1>

            <div className="big-score">
              <strong>{score}</strong>

              <span>/ {questions.length}</span>
            </div>

            <div className="percentage">
              {percentage}%
            </div>

            <p className="result-message">
              {percentage >= 80
                ? "Excellent work! Keep pushing."
                : percentage >= 50
                ? "Good attempt. Keep practicing to improve."
                : "Keep studying and give it another try."}
            </p>

            <div className="result-stats">
              <div>
                <strong>{score}</strong>
                <span>Correct</span>
              </div>

              <div>
                <strong>{questions.length - score}</strong>
                <span>Incorrect</span>
              </div>

              <div>
                <strong>{answeredCount}</strong>
                <span>Answered</span>
              </div>
            </div>

            <div className="result-subjects">
              {selectedSubjects.map((subject) => {
                const subjectQuestions = questions.filter(
                  (question) => question.subject === subject
                );

                const subjectScore =
                  subjectQuestions.reduce(
                    (total, question) => {
                      const index =
                        questions.indexOf(question);

                      return (
                        total +
                        (answers[index] === question.answer
                          ? 1
                          : 0)
                      );
                    },
                    0
                  );

                return (
                  <div key={subject}>
                    <span>{subject}</span>

                    <strong>
                      {subjectScore}/
                      {subjectQuestions.length}
                    </strong>
                  </div>
                );
              })}
            </div>

            <div className="instruction-actions">
              <button
                type="button"
                className="secondary-button"
                onClick={() => {
                  setStage("exam");
                  setCurrentQuestion(0);
                }}
              >
                Review Questions
              </button>

              <button
                type="button"
                className="primary-button"
                onClick={restart}
              >
                Take Another Test
              </button>
            </div>
          </section>
        </div>
      </main>
    );
  }

  if (stage === "exam") {
    const question = questions[currentQuestion];

    if (!question) {
      return null;
    }

    const progress =
      questions.length > 0
        ? ((currentQuestion + 1) / questions.length) * 100
        : 0;

    const answeredProgress =
      questions.length > 0
        ? (answeredCount / questions.length) * 100
        : 0;

    const isLastQuestion =
      currentQuestion === questions.length - 1;

    return (
      <main className="cbt-page exam-page">
        <div className="cbt-container exam-container">
          <header className="exam-topbar">
            <div className="exam-brand">
              <span className="eyebrow">CampusPlug CBT</span>

              <strong>Computer Based Test</strong>
            </div>

            <div
              className={`timer ${
                timeLeft <= 300 ? "timer-warning" : ""
              }`}
            >
              <span>Time Left</span>

              <strong>{formatTime(timeLeft)}</strong>
            </div>

            <button
              type="button"
              className="submit-top-button"
              onClick={() => setShowSubmit(true)}
            >
              Submit Test
            </button>
          </header>

          <div className="exam-layout">
            <section className="question-panel">
              <div className="question-meta">
                <span>
                  Question {currentQuestion + 1} of{" "}
                  {questions.length}
                </span>

                <span className="subject-label">
                  {question.subject}
                </span>
              </div>

              <div className="progress-track">
                <div
                  style={{
                    width: `${progress}%`,
                  }}
                ></div>
              </div>

              <article className="question-card">
                <div className="question-heading">
                  <div className="question-number">
                    {currentQuestion + 1}
                  </div>

                  <button
                    type="button"
                    className={`mark-button ${
                      marked[currentQuestion]
                        ? "marked"
                        : ""
                    }`}
                    onClick={toggleMark}
                  >
                    {marked[currentQuestion]
                      ? "★ Marked"
                      : "☆ Mark for Review"}
                  </button>
                </div>

                <h1>{question.question}</h1>

                <div className="options">
                  {question.options.map((option, index) => {
                    const selected =
                      answers[currentQuestion] === index;

                    return (
                      <button
                        type="button"
                        key={index}
                        className={`option ${
                          selected
                            ? "option-selected"
                            : ""
                        }`}
                        onClick={() =>
                          selectAnswer(index)
                        }
                      >
                        <span className="option-letter">
                          {String.fromCharCode(65 + index)}
                        </span>

                        <span>{option}</span>

                        <span className="option-radio">
                          {selected ? "✓" : ""}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="question-actions">
                  <button
                    type="button"
                    className="secondary-button"
                    disabled={currentQuestion === 0}
                    onClick={() =>
                      goToQuestion(
                        currentQuestion - 1
                      )
                    }
                  >
                    ← Previous
                  </button>

                  {isLastQuestion ? (
                    <button
                      type="button"
                      className="primary-button"
                      onClick={() =>
                        setShowSubmit(true)
                      }
                    >
                      Submit Test
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="primary-button"
                      onClick={() =>
                        goToQuestion(
                          currentQuestion + 1
                        )
                      }
                    >
                      Next →
                    </button>
                  )}
                </div>
              </article>
            </section>

            <aside className="exam-sidebar">
              <div className="sidebar-card">
                <div className="sidebar-heading">
                  <h2>Question Navigator</h2>

                  <span>
                    {answeredCount}/{questions.length}
                  </span>
                </div>

                <div className="navigator-grid">
                  {questions.map((item, index) => (
                    <button
                      type="button"
                      key={index}
                      className={`nav-question ${
                        currentQuestion === index
                          ? "current"
                          : ""
                      } ${
                        answers[index] !== undefined
                          ? "answered"
                          : ""
                      } ${
                        marked[index] ? "marked" : ""
                      }`}
                      onClick={() =>
                        goToQuestion(index)
                      }
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>

                <div className="legend">
                  <div>
                    <span className="legend-dot answered-dot"></span>
                    Answered
                  </div>

                  <div>
                    <span className="legend-dot marked-dot"></span>
                    Marked for Review
                  </div>

                  <div>
                    <span className="legend-dot empty-dot"></span>
                    Not Answered
                  </div>
                </div>
              </div>

              <div className="sidebar-card progress-card">
                <h2>Exam Progress</h2>

                <div className="progress-number">
                  <strong>
                    {Math.round(answeredProgress)}%
                  </strong>

                  <span>answered</span>
                </div>

                <div className="progress-track">
                  <div
                    style={{
                      width: `${answeredProgress}%`,
                    }}
                  ></div>
                </div>

                <button
                  type="button"
                  className="calculator-open"
                  onClick={() =>
                    setShowCalculator(true)
                  }
                >
                  🧮 Open Calculator
                </button>
              </div>
            </aside>
          </div>
        </div>

        {showSubmit && (
          <div className="modal-overlay">
            <div className="modal-card">
              <div className="modal-icon">?</div>

              <h2>Submit Examination?</h2>

              <p>
                Are you sure you want to submit your
                examination? You will not be able to change
                your answers after submission.
              </p>

              {questions.length - answeredCount > 0 && (
                <div className="unanswered-warning">
                  You have{" "}
                  <strong>
                    {questions.length - answeredCount}
                  </strong>{" "}
                  unanswered question
                  {questions.length - answeredCount !== 1
                    ? "s"
                    : ""}
                  .
                </div>
              )}

              <div className="modal-actions">
                <button
                  type="button"
                  className="secondary-button"
                  onClick={() =>
                    setShowSubmit(false)
                  }
                >
                  Continue Test
                </button>

                <button
                  type="button"
                  className="primary-button"
                  onClick={() => {
                    setShowSubmit(false);
                    setStage("results");
                  }}
                >
                  Submit Test
                </button>
              </div>
            </div>
          </div>
        )}

        {showCalculator && (
          <div className="modal-overlay">
            <div className="calculator-modal">
              <div className="calculator-modal-header">
                <div>
                  <strong>Calculator</strong>

                  <span>For use during the examination</span>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setShowCalculator(false)
                  }
                >
                  ×
                </button>
              </div>

              <div className="calc-display">
                <span>
                  {calcExpression || "Ready"}
                </span>

                <strong>{calcDisplay}</strong>
              </div>

              <div className="calc-controls">
                <button
                  type="button"
                  onClick={() => calcButton("C")}
                >
                  Clear
                </button>

                <button
                  type="button"
                  onClick={() => calcButton("DEL")}
                >
                  Delete
                </button>
              </div>

              <div className="calc-grid">
                <button
                  type="button"
                  onClick={() => calcButton("%")}
                >
                  %
                </button>

                <button
                  type="button"
                  onClick={() => calcButton("÷")}
                >
                  ÷
                </button>

                <button
                  type="button"
                  onClick={() => calcButton("×")}
                >
                  ×
                </button>

                <button
                  type="button"
                  onClick={() => calcButton("−")}
                >
                  −
                </button>

                <button
                  type="button"
                  onClick={() => calcButton("7")}
                >
                  7
                </button>

                <button
                  type="button"
                  onClick={() => calcButton("8")}
                >
                  8
                </button>

                <button
                  type="button"
                  onClick={() => calcButton("9")}
                >
                  9
                </button>

                <button
                  type="button"
                  onClick={() => calcButton("+")}
                >
                  +
                </button>

                <button
                  type="button"
                  onClick={() => calcButton("4")}
                >
                  4
                </button>

                <button
                  type="button"
                  onClick={() => calcButton("5")}
                >
                  5
                </button>

                <button
                  type="button"
                  onClick={() => calcButton("6")}
                >
                  6
                </button>

                <button
                  type="button"
                  onClick={() => calcButton("1")}
                >
                  1
                </button>

                <button
                  type="button"
                  onClick={() => calcButton("2")}
                >
                  2
                </button>

                <button
                  type="button"
                  onClick={() => calcButton("3")}
                >
                  3
                </button>

                <button
                  type="button"
                  onClick={() => calcButton(".")}
                >
                  .
                </button>

                <button
                  type="button"
                  onClick={() => calcButton("0")}
                >
                  0
                </button>

                <button
                  type="button"
                  className="calc-equals"
                  onClick={() => calcButton("=")}
                >
                  =
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    );
  }

  return null;
};

export default page;

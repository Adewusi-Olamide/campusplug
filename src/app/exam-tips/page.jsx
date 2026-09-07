"use client";

import React from "react";
import Link from "next/link";
import {
  BookOpen,
  Brain,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Target,
  AlertTriangle,
  Laptop,
  Lightbulb,
  ArrowRight,
  ClipboardCheck,
  Trophy,
} from "lucide-react";

import "./page.css";

const preparationTips = [
  {
    icon: BookOpen,
    title: "Know Your Syllabus",
    description:
      "Start with the official UTME syllabus so you know exactly what topics you are expected to study.",
  },
  {
    icon: Target,
    title: "Set a Clear Target",
    description:
      "Set a realistic score target and break it into smaller weekly study goals.",
  },
  {
    icon: CalendarDays,
    title: "Create a Timetable",
    description:
      "Organize your subjects across the week and give extra attention to topics you find difficult.",
  },
  {
    icon: Brain,
    title: "Study Actively",
    description:
      "Don't just read. Explain concepts, make short notes, practise questions, and test yourself regularly.",
  },
  {
    icon: ClipboardCheck,
    title: "Practise Past Questions",
    description:
      "Use past questions to become familiar with question patterns and identify topics that need more revision.",
  },
  {
    icon: Trophy,
    title: "Track Your Progress",
    description:
      "Keep track of your practice scores and use your results to improve your weak areas.",
  },
];

const studyMethods = [
  {
    title: "Active Recall",
    description:
      "After studying a topic, close your notes and try to explain what you remember without looking.",
  },
  {
    title: "Spaced Revision",
    description:
      "Review important topics repeatedly over several days instead of trying to learn everything at once.",
  },
  {
    title: "Practice First",
    description:
      "After learning a topic, solve questions immediately. This helps you discover what you actually understand.",
  },
  {
    title: "Learn From Mistakes",
    description:
      "Don't simply check your score. Review every question you got wrong and understand why your answer was incorrect.",
  },
];

const examDayTips = [
  "Get enough rest before the examination.",
  "Arrive at your examination venue early.",
  "Follow all instructions given by examination officials.",
  "Read each question carefully before selecting an answer.",
  "Keep track of your remaining time throughout the test.",
  "If a question is difficult, move on and return to it later.",
];

const mistakes = [
  "Waiting until the last few weeks before starting serious preparation.",
  "Studying without following the official syllabus.",
  "Spending all your time on your favourite subject.",
  "Memorising answers without understanding the topic.",
  "Ignoring questions you repeatedly get wrong.",
  "Spending too much time on one difficult question during CBT practice.",
];

const Page = () => {
  return (
    <div className="exam-tips-page">

      {/* HERO */}
      <section className="exam-tips-hero">
        <div className="exam-tips-container">
          <div className="exam-tips-hero-content">
            <span className="exam-tips-badge">
              <Lightbulb size={16} />
              EXAM PREPARATION
            </span>

            <h1>
              Prepare Smart.
              <br />
              <span>Perform Better.</span>
            </h1>

            <p>
              Practical preparation tips to help you study effectively,
              practise confidently, and stay focused throughout your UTME
              preparation.
            </p>

            <div className="exam-tips-hero-actions">
              <Link href="/syllabus" className="exam-tips-primary-btn">
                Explore Syllabus
                <ArrowRight size={18} />
              </Link>

              <Link href="/study-guide" className="exam-tips-secondary-btn">
                Study Guide
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK INTRO */}
      <section className="exam-tips-intro">
        <div className="exam-tips-container">
          <div className="exam-tips-section-heading">
            <span>START HERE</span>
            <h2>Build a Better Preparation Strategy</h2>
            <p>
              Good exam preparation isn't about studying for endless hours.
              It's about having the right plan and using your study time
              effectively.
            </p>
          </div>

          <div className="exam-tips-grid">
            {preparationTips.map((tip, index) => {
              const Icon = tip.icon;

              return (
                <div className="exam-tip-card" key={index}>
                  <div className="exam-tip-icon">
                    <Icon size={22} />
                  </div>

                  <h3>{tip.title}</h3>

                  <p>{tip.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* STUDY METHODS */}
      <section className="exam-tips-methods">
        <div className="exam-tips-container">
          <div className="exam-tips-methods-layout">

            <div className="exam-tips-methods-heading">
              <span>STUDY SMARTER</span>
              <h2>
                Use study methods that actually help you remember.
              </h2>

              <p>
                Reading your notes repeatedly isn't always enough. Combine
                understanding, recall, revision, and practice.
              </p>
            </div>

            <div className="study-method-list">
              {studyMethods.map((method, index) => (
                <div className="study-method-item" key={index}>
                  <div className="study-method-number">
                    0{index + 1}
                  </div>

                  <div>
                    <h3>{method.title}</h3>
                    <p>{method.description}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* DAILY ROUTINE */}
      <section className="exam-tips-routine">
        <div className="exam-tips-container">

          <div className="exam-tips-section-heading">
            <span>DAILY ROUTINE</span>
            <h2>Make every study session count.</h2>
            <p>
              A simple study session can be more effective when you give each
              part of your time a purpose.
            </p>
          </div>

          <div className="routine-grid">

            <div className="routine-card">
              <div className="routine-card-top">
                <Clock3 size={22} />
                <span>01</span>
              </div>

              <h3>Learn</h3>
              <p>
                Study a topic and make sure you understand the main ideas
                before moving forward.
              </p>
            </div>

            <div className="routine-card">
              <div className="routine-card-top">
                <Brain size={22} />
                <span>02</span>
              </div>

              <h3>Recall</h3>
              <p>
                Put your notes away and try to remember the important points
                you just studied.
              </p>
            </div>

            <div className="routine-card">
              <div className="routine-card-top">
                <ClipboardCheck size={22} />
                <span>03</span>
              </div>

              <h3>Practise</h3>
              <p>
                Solve questions related to the topic and check your answers
                carefully.
              </p>
            </div>

            <div className="routine-card">
              <div className="routine-card-top">
                <CheckCircle2 size={22} />
                <span>04</span>
              </div>

              <h3>Review</h3>
              <p>
                Identify mistakes and revise the areas you still don't
                understand.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* CBT */}
      <section className="exam-tips-cbt">
        <div className="exam-tips-container">
          <div className="cbt-card">

            <div className="cbt-icon">
              <Laptop size={30} />
            </div>

            <div className="cbt-content">
              <span>CBT PREPARATION</span>

              <h2>Practise under exam-like conditions.</h2>

              <p>
                Regular CBT practice can help you become more comfortable with
                answering questions on a computer and managing your time.
              </p>

              <ul>
                <li>
                  <CheckCircle2 size={18} />
                  Practise answering questions within a time limit.
                </li>

                <li>
                  <CheckCircle2 size={18} />
                  Avoid spending too long on one question.
                </li>

                <li>
                  <CheckCircle2 size={18} />
                  Review your answers when time allows.
                </li>
              </ul>

              <Link href="./cbt" className="cbt-btn">
                Practise CBT
                <ArrowRight size={17} />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* MISTAKES */}
      <section className="exam-tips-mistakes">
        <div className="exam-tips-container">

          <div className="exam-tips-section-heading">
            <span>WATCH OUT</span>
            <h2>Common preparation mistakes</h2>
            <p>
              Avoid habits that can make your preparation less effective.
            </p>
          </div>

          <div className="mistakes-list">
            {mistakes.map((mistake, index) => (
              <div className="mistake-item" key={index}>
                <AlertTriangle size={19} />
                <p>{mistake}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* EXAM DAY */}
      <section className="exam-tips-exam-day">
        <div className="exam-tips-container">

          <div className="exam-day-layout">

            <div className="exam-day-content">
              <span>EXAM DAY</span>

              <h2>Stay calm and manage your time.</h2>

              <p>
                Your preparation doesn't stop when you reach the examination
                centre. Good time management and careful reading can make a
                difference.
              </p>
            </div>

            <div className="exam-day-list">
              {examDayTips.map((tip, index) => (
                <div className="exam-day-item" key={index}>
                  <CheckCircle2 size={19} />
                  <p>{tip}</p>
                </div>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* FINAL CTA */}
      <section className="exam-tips-final">
        <div className="exam-tips-container">
          <div className="exam-tips-final-card">

            <div>
              <span>READY TO START?</span>

              <h2>
                Turn your preparation
                <br />
                into progress.
              </h2>

              <p>
                Check the syllabus, build your study plan, and start
                practising today.
              </p>
            </div>

            <div className="exam-tips-final-actions">
              <Link href="/syllabus">
                View Syllabus
                <ArrowRight size={17} />
              </Link>

              <Link href="./study-timer">
                Study Planner
                <CalendarDays size={17} />
              </Link>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default Page;

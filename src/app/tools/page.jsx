"use client";

import React from "react";
import Link from "next/link";
import {
  CalendarDays,
  CheckSquare,
  Calculator,
  Timer,
  NotebookPen,
  Layers3,
  Target,
  ArrowRight,
} from "lucide-react";

import "./page.css";

const tools = [
  {
    title: "Study Planner",
    description:
      "Plan your study sessions, organize your schedule, and stay consistent.",
    icon: CalendarDays,
    href: "/study-timer",
  },
  {
    title: "Tasks & Goal Tracker",
    description:
      "Manage your study tasks and keep track of what you've completed.",
    icon: CheckSquare,
    href: "/tasks",
  },
  {
    title: "GPA Calculator",
    description:
      "Calculate your GPA quickly and keep track of your academic performance.",
    icon: Calculator,
    href: "/tools/calculator",
  },
  {
    title: "Exam Countdown",
    description:
      "Keep track of important exams and see exactly how much time is left.",
    icon: Timer,
    href: "/tools/exam-countdown",
  },
  {
    title: "Notes",
    description:
      "Write, organize, and keep your important study notes in one place.",
    icon: NotebookPen,
    href: "/notes",
  },
  {
    title: "Flashcards",
    description:
      "Review important concepts and test yourself with quick flashcards.",
    icon: Layers3,
    href: "/flashcards",
  },
  {
    title: "Focus Mode",
    description:
      "Block out distractions and create a focused environment for studying.",
    icon: Target,
    href: "/focus",
  },
];

const page = () => {
  return (
    <main className="tools-page">
      <div className="tools-container">

        {/* HEADER */}

        <section className="tools-header">
          <span className="tools-label">CAMPUSPLUG TOOLS</span>

          <h1>
            Everything you need
            <br />
            <span>to study smarter.</span>
          </h1>

          <p>
            Powerful tools designed to help you plan,
            study, stay organized, and keep track of your
            academic progress.
          </p>
        </section>

        {/* TOOLS */}

        <section className="tools-grid">

          {tools.map((tool) => {
            const Icon = tool.icon;

            return (
              <Link
                href={tool.href}
                className="tool-card"
                key={tool.title}
              >
                <div className="tool-card-top">
                  <div className="tool-icon">
                    <Icon size={23} />
                  </div>

                  <ArrowRight
                    className="tool-arrow"
                    size={20}
                  />
                </div>

                <div className="tool-card-content">
                  <h2>{tool.title}</h2>

                  <p>{tool.description}</p>
                </div>

                <span className="tool-open">
                  Open tool
                </span>
              </Link>
            );
          })}

        </section>

      </div>
    </main>
  );
};

export default page;

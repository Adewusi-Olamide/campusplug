'use client'

import React from 'react'
import Link from 'next/link'
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
BookMarked,
} from 'lucide-react'
import './page.css'

const Page = () => {
return (
<main className="dashboard-page">

  {/* Dashboard Header */}
  <section className="dashboard-header">
    <div>
      <p className="dashboard-label">Student Dashboard</p>
      <h1>Welcome back, Student 👋</h1>
      <p className="dashboard-subtitle">
        Stay organized, keep learning, and make progress every day.
      </p>
    </div>

    <Link href="/study-planner" className="planner-button">
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
        <strong>0 days</strong>
      </div>
    </div>

    <div className="stat-card">
      <div className="stat-icon">
        <Clock3 size={22} />
      </div>
      <div>
        <span>Study Time</span>
        <strong>0 hrs</strong>
      </div>
    </div>

    <div className="stat-card">
      <div className="stat-icon">
        <CheckCircle2 size={22} />
      </div>
      <div>
        <span>Completed</span>
        <strong>0 tasks</strong>
      </div>
    </div>

    <div className="stat-card">
      <div className="stat-icon">
        <BookMarked size={22} />
      </div>
      <div>
        <span>Saved Resources</span>
        <strong>0</strong>
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
          <p>Jump straight into your study tools.</p>
        </div>
      </div>

      <div className="tools-grid">

        <Link href="/calculator" className="tool-card">
          <div className="tool-icon">
            <Calculator size={24} />
          </div>
          <div>
            <h3>Calculator</h3>
            <p>Calculate answers quickly and easily.</p>
          </div>
          <ArrowRight className="tool-arrow" size={19} />
        </Link>

        <Link href="/cbt" className="tool-card">
          <div className="tool-icon">
            <ClipboardList size={24} />
          </div>
          <div>
            <h3>CBT Practice</h3>
            <p>Test your knowledge with practice questions.</p>
          </div>
          <ArrowRight className="tool-arrow" size={19} />
        </Link>

        <Link href="/flashcards" className="tool-card">
          <div className="tool-icon">
            <BookOpen size={24} />
          </div>
          <div>
            <h3>Flashcards</h3>
            <p>Review important topics and concepts.</p>
          </div>
          <ArrowRight className="tool-arrow" size={19} />
        </Link>

        <Link href="/notes" className="tool-card">
          <div className="tool-icon">
            <FileText size={24} />
          </div>
          <div>
            <h3>My Notes</h3>
            <p>Create and organize your study notes.</p>
          </div>
          <ArrowRight className="tool-arrow" size={19} />
        </Link>

      </div>
    </div>

    {/* Today's Progress */}
    <div className="progress-card">
      <div className="progress-heading">
        <div>
          <h2>Today's Progress</h2>
          <p>Keep building your study habit.</p>
        </div>
        <span>0%</span>
      </div>

      <div className="progress-bar">
        <div className="progress-fill"></div>
      </div>

      <div className="progress-footer">
        <span>0 of 0 tasks completed</span>
        <Link href="/study-planner">
          View planner <ArrowRight size={16} />
        </Link>
      </div>
    </div>

  </section>

  {/* Getting Started */}
  <section className="getting-started">
    <div className="getting-started-icon">
      <BookOpen size={25} />
    </div>

    <div className="getting-started-content">
      <h2>Ready to get started?</h2>
      <p>
        Explore your study tools and start building a productive learning routine.
      </p>
    </div>

    <Link href="/resources" className="resources-button">
      Explore Resources
      <ArrowRight size={18} />
    </Link>
  </section>

</main>

)
}

export default Page

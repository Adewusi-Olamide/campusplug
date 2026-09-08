'use client'

import React, { useEffect, useState } from 'react'
import {
  BarChart3,
  Users,
  Brain,
  Layers,
  FileText,
  Timer,
  Target,
  Activity,
  Calculator,
  CheckSquare,
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import './page.css'

const page = () => {
    const supabase = createClient();

  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        const { data, error } = await supabase
          .from('user_activity')
          .select('user_id, activity_type, created_at')
          .order('created_at', { ascending: false })

        if (error) {
          throw error
        }

        setActivities(data || [])
      } catch (error) {
        console.error('Failed to load analytics:', error)
      } finally {
        setLoading(false)
      }
    }

    loadAnalytics()
  }, [])

  const getCount = (type) => {
    return activities.filter(
      (activity) => activity.activity_type === type
    ).length
  }

  const uniqueUsers = new Set(
    activities.map((activity) => activity.user_id)
  ).size

  const totalActivity = activities.length

  const tools = [
    {
      name: 'CBT',
      type: 'cbt',
      icon: Brain,
    },
    {
      name: 'Calculator',
      type: 'calculator',
      icon: Calculator,
    },
    {
      name: 'Flashcards',
      type: 'flashcards',
      icon: Layers,
    },
    {
      name: 'Notes',
      type: 'notes',
      icon: FileText,
    },
    {
      name: 'Study Timer',
      type: 'timer',
      icon: Timer,
    },
    {
      name: 'Focus Mode',
      type: 'focus_mode',
      icon: Target,
    },
    {
      name: 'Tasks',
      type: 'task',
      icon: CheckSquare,
    },
  ]

  if (loading) {
    return (
      <main className="analytics-page">
        <div className="analytics-loading">
          Loading analytics...
        </div>
      </main>
    )
  }

  return (
    <main className="analytics-page">

      <section className="analytics-header">
        <div>
          <span className="analytics-eyebrow">
            CampusPlug Admin
          </span>

          <h1>Analytics</h1>

          <p>
            See how students are using CampusPlug.
          </p>
        </div>

        <div className="analytics-header-icon">
          <BarChart3 size={26} />
        </div>
      </section>

      <section className="analytics-stats">

        <div className="analytics-stat-card">
          <div className="stat-icon">
            <Users size={21} />
          </div>

          <div>
            <span>Active Users</span>
            <strong>{uniqueUsers}</strong>
          </div>
        </div>

        <div className="analytics-stat-card">
          <div className="stat-icon">
            <Activity size={21} />
          </div>

          <div>
            <span>Total Activity</span>
            <strong>{totalActivity}</strong>
          </div>
        </div>

        <div className="analytics-stat-card">
          <div className="stat-icon">
            <Brain size={21} />
          </div>

          <div>
            <span>CBT Uses</span>
            <strong>{getCount('cbt')}</strong>
          </div>
        </div>

      </section>

      <section className="analytics-section">

        <div className="section-heading">
          <div>
            <h2>Tool Usage</h2>
            <p>
              How often each CampusPlug tool is being used.
            </p>
          </div>
        </div>

        <div className="tool-usage-grid">

          {tools.map((tool) => {
            const Icon = tool.icon
            const count = getCount(tool.type)

            return (
              <div
                className="tool-usage-card"
                key={tool.type}
              >
                <div className="tool-card-top">
                  <div className="tool-icon">
                    <Icon size={21} />
                  </div>

                  <span>
                    {count} uses
                  </span>
                </div>

                <h3>{tool.name}</h3>

                <div className="usage-bar">
                  <div
                    className="usage-bar-fill"
                    style={{
                      width:
                        totalActivity > 0
                          ? `${(count / totalActivity) * 100}%`
                          : '0%',
                    }}
                  />
                </div>
              </div>
            )
          })}

        </div>

      </section>

      <section className="analytics-section">

        <div className="section-heading">
          <div>
            <h2>Recent Activity</h2>
            <p>
              The latest activity recorded by CampusPlug.
            </p>
          </div>
        </div>

        <div className="activity-table">

          {activities.length === 0 ? (
            <div className="no-activity">
              No activity recorded yet.
            </div>
          ) : (
            activities.slice(0, 20).map((activity) => (
              <div
                className="activity-row"
                key={activity.user_id + activity.created_at}
              >
                <div>
                  <strong>
                    {activity.activity_type}
                  </strong>

                  <span>
                    User: {activity.user_id}
                  </span>
                </div>

                <time>
                  {new Date(
                    activity.created_at
                  ).toLocaleString()}
                </time>
              </div>
            ))
          )}

        </div>

      </section>

    </main>
  )
}

export default page

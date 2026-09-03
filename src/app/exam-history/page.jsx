"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  FileText,
  RefreshCw,
  Trophy,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import "./page.css";

const page = () => {
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadAttempts = async () => {
    setLoading(true);
    setError("");

    try {
      const supabase = createClient();

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        throw userError;
      }

      if (!user) {
        setError("You must be logged in to view your exam history.");
        return;
      }

      const { data, error: attemptsError } = await supabase
        .from("quiz_attempts")
        .select("id, score, total_questions, created_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (attemptsError) {
        throw attemptsError;
      }

      setAttempts(data || []);
    } catch (err) {
      console.error("Error loading exam history:", err);
      setError(
        err?.message || "Something went wrong while loading your exam history."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAttempts();
  }, []);

  const getPercentage = (score, total) => {
    if (!total) return 0;
    return Math.round((score / total) * 100);
  };

  const getResultClass = (percentage) => {
    if (percentage >= 70) return "excellent";
    if (percentage >= 50) return "average";
    return "low";
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-NG", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString("en-NG", {
      hour: "numeric",
      minute: "2-digit",
    });
  };

  return (
    <main className="exam-history-page">
      <div className="exam-history-container">
        <Link href="/dashboard" className="back-link">
          <ArrowLeft size={18} />
          Back to Dashboard
        </Link>

        <section className="history-header">
          <div>
            <span className="history-eyebrow">CampusPlug CBT</span>
            <h1>Exam History</h1>
            <p>
              Keep track of all your previous CBT attempts and see how you
              performed.
            </p>
          </div>

          <button
            type="button"
            className="refresh-button"
            onClick={loadAttempts}
            disabled={loading}
          >
            <RefreshCw size={17} className={loading ? "spinning" : ""} />
            Refresh
          </button>
        </section>

        {!loading && !error && (
          <section className="history-summary">
            <div className="summary-card">
              <div className="summary-icon">
                <FileText size={21} />
              </div>
              <div>
                <span>Total Exams</span>
                <strong>{attempts.length}</strong>
              </div>
            </div>

            <div className="summary-card">
              <div className="summary-icon">
                <Trophy size={21} />
              </div>
              <div>
                <span>Best Score</span>
                <strong>
                  {attempts.length
                    ? `${Math.max(
                        ...attempts.map((attempt) =>
                          getPercentage(
                            attempt.score,
                            attempt.total_questions
                          )
                        )
                      )}%`
                    : "—"}
                </strong>
              </div>
            </div>

            <div className="summary-card">
              <div className="summary-icon">
                <Clock3 size={21} />
              </div>
              <div>
                <span>Latest Attempt</span>
                <strong>
                  {attempts.length
                    ? formatDate(attempts[0].created_at)
                    : "—"}
                </strong>
              </div>
            </div>
          </section>
        )}

        {loading && (
          <div className="history-state">
            <div className="loader"></div>
            <p>Loading your exam history...</p>
          </div>
        )}

        {!loading && error && (
          <div className="history-state error-state">
            <XCircle size={42} />
            <h2>Unable to load history</h2>
            <p>{error}</p>
            <button type="button" onClick={loadAttempts}>
              Try Again
            </button>
          </div>
        )}

        {!loading && !error && attempts.length === 0 && (
          <div className="history-state empty-state">
            <div className="empty-icon">
              <FileText size={40} />
            </div>
            <h2>No exams yet</h2>
            <p>
              Your completed CBT exams will appear here once you submit your
              first attempt.
            </p>
            <Link href="/cbt" className="start-exam-button">
              Take a CBT
            </Link>
          </div>
        )}

        {!loading && !error && attempts.length > 0 && (
          <section className="attempts-section">
            <div className="section-heading">
              <div>
                <h2>Previous Exams</h2>
                <p>Your most recent attempts appear first.</p>
              </div>
            </div>

            <div className="attempts-list">
              {attempts.map((attempt, index) => {
                const percentage = getPercentage(
                  attempt.score,
                  attempt.total_questions
                );

                return (
                  <article className="attempt-card" key={attempt.id}>
                    <div className="attempt-number">
                      <span>{attempts.length - index}</span>
                    </div>

                    <div className="attempt-info">
                      <h3>CBT Examination</h3>

                      <div className="attempt-meta">
                        <span>
                          <CalendarDays size={15} />
                          {formatDate(attempt.created_at)}
                        </span>

                        <span>
                          <Clock3 size={15} />
                          {formatTime(attempt.created_at)}
                        </span>
                      </div>
                    </div>

                    <div className="attempt-score">
                      <strong>
                        {attempt.score}/{attempt.total_questions}
                      </strong>
                      <span>Score</span>
                    </div>

                    <div
                      className={`attempt-percentage ${getResultClass(
                        percentage
                      )}`}
                    >
                      {percentage}%
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </main>
  );
};

export default page;

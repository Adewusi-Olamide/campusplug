'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Mail, ArrowLeft, GraduationCap, CheckCircle } from 'lucide-react'
import supabase from '@/lib/supabase'
import './page.css'

const page = () => {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleResetPassword = async (e) => {
    e.preventDefault()

    setError('')
    setSuccess(false)
    setLoading(true)

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })

    setLoading(false)

    if (error) {
      setError(error.message)
      return
    }

    setSuccess(true)
  }

  return (
    <main className="forgot-page">
      <div className="forgot-card">

        {/* Logo */}
        <div className="forgot-logo">
          <div className="logo-icon">
            <GraduationCap size={50} />
          </div>

          <span>
            Campus<span className="plug">Plug</span>
          </span>
        </div>

        {/* Header */}
        <div className="forgot-header">
          <h1>Forgot your password?</h1>

          <p>
            Enter your email address and we'll send you a link to reset your password.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="forgot-error">
            {error}
          </div>
        )}

        {/* Success */}
        {success ? (
          <div className="forgot-success">
            <CheckCircle size={24} />

            <div>
              <strong>Check your inbox</strong>
              <p>
                We've sent a password reset link to <strong>{email}</strong>.
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleResetPassword}>

            <div className="input-group">
              <label htmlFor="email">Email address</label>

              <div className="input-wrapper">
                <Mail size={19} />

                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="forgot-button"
              disabled={loading}
            >
              {loading ? 'Sending link...' : 'Send Reset Link'}
            </button>

          </form>
        )}

        {/* Back to Sign In */}
        <Link href="/signin" className="back-signin">
          <ArrowLeft size={17} />
          Back to Sign In
        </Link>

      </div>
    </main>
  )
}

export default page

'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  Lock,
  Eye,
  EyeOff,
  GraduationCap,
  CheckCircle,
  AlertCircle,
} from 'lucide-react'
import supabase from '@/lib/supabase'
import './page.css'

const page = () => {
  const router = useRouter()

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [checkingSession, setCheckingSession] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession()

      if (!data.session) {
        setError('This password reset link is invalid or has expired.')
      }

      setCheckingSession(false)
    }

    checkSession()
  }, [])

  const handleResetPassword = async (e) => {
    e.preventDefault()

    setError('')

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    setLoading(true)

    const { error } = await supabase.auth.updateUser({
      password,
    })

    setLoading(false)

    if (error) {
      setError(error.message)
      return
    }

    setSuccess(true)

    setTimeout(() => {
      router.push('/dashboard')
      router.refresh()
    }, 2000)
  }

  if (checkingSession) {
    return (
      <main className="reset-page">
        <div className="reset-card">
          <div className="reset-loading">
            <div className="loading-spinner"></div>
            <p>Verifying reset link...</p>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="reset-page">
      <div className="reset-card">

        {/* Logo */}
        <div className="reset-logo">
          <div className="logo-icon">
            <GraduationCap size={50} />
          </div>

          <span>
            <span className="plug">CampusPlug</span>
          </span>
        </div>

        {/* Header */}
        <div className="reset-header">
          <h1>Reset your password</h1>
          <p>
            Create a new password for your CampusPlug account.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="reset-error">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        {/* Success */}
        {success ? (
          <div className="reset-success">
            <CheckCircle size={24} />

            <div>
              <strong>Password updated!</strong>
              <p>
                Your password has been changed successfully. Redirecting you to your dashboard...
              </p>
            </div>
          </div>
        ) : !error ? (
          <form onSubmit={handleResetPassword}>

            {/* New Password */}
            <div className="input-group">
              <label htmlFor="password">New password</label>

              <div className="input-wrapper">
                <Lock size={19} />

                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={
                    showPassword ? 'Hide password' : 'Show password'
                  }
                >
                  {showPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="input-group">
              <label htmlFor="confirmPassword">
                Confirm new password
              </label>

              <div className="input-wrapper">
                <Lock size={19} />

                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm your new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  aria-label={
                    showConfirmPassword
                      ? 'Hide password'
                      : 'Show password'
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>
              </div>
            </div>

            <p className="password-hint">
              Password must be at least 6 characters long.
            </p>

            <button
              type="submit"
              className="reset-button"
              disabled={loading}
            >
              {loading ? 'Updating password...' : 'Reset Password'}
            </button>

          </form>
        ) : (
          <Link href="/forgot-password" className="try-again">
            Request a new reset link
          </Link>
        )}

        {/* Back */}
        {!success && (
          <Link href="/signin" className="back-signin">
            Back to Sign In
          </Link>
        )}

      </div>
    </main>
  )
}

export default page

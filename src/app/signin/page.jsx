'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Mail, Lock, Eye, EyeOff, GraduationCap } from 'lucide-react'
import supabase from '@/lib/supabase'
import { FaGoogle, FaGithub } from 'react-icons/fa'
import './page.css'

const page = () => {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSignIn = async (e) => {
    e.preventDefault()

    setError('')
    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    router.push('/dashboard')
  }

  return (
    <main className="signin-page">
      <div className="signin-card">

        <div className="signin-logo">
          <div className="logo-icon">
            <GraduationCap size={50} />
          </div>
          <span>Campus<span className="plug">Plug</span></span>
        </div>

        <div className="signin-header">
          <h1>Welcome back</h1>
          <p>Sign in to continue to your CampusPlug account.</p>
        </div>

        {error && (
          <div className="signin-error">
            {error}
          </div>
        )}

        <form onSubmit={handleSignIn}>

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

          <div className="input-group">
            <div className="password-label">
              <label htmlFor="password">Password</label>

              <Link href="/forgot-password">
                Forgot password?
              </Link>
            </div>

            <div className="input-wrapper">
              <Lock size={19} />

              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="signin-button"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>

        </form>

        <div className="signin-divider">
          <span>or</span>
        </div>

        <div className="social-buttons">
          <button type="button" className="social-button">
            <span className="google-icon"><FaGoogle /></span>
            Continue with Google
          </button>

          <button type="button" className="social-button">
            <span className="github-icon"><FaGithub /></span>
            Continue with GitHub
          </button>
        </div>

        <p className="signup-link">
          Don't have an account?{' '}
          <Link href="/signup">Create one</Link>
        </p>

      </div>
    </main>
  )
}

export default page

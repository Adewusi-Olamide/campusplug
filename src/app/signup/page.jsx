'use client'

import { createClient } from '@/lib/supabase/client'
import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, GraduationCap, Mail, Lock, User } from 'lucide-react'
import { FaGithub } from 'react-icons/fa'
import { CircleAlert } from 'lucide-react'
import './page.css'

const Page = () => {
  const router = useRouter()
  const supabase = createClient()

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    setError('')
    setSuccess('')

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    setLoading(true)

    try {
      const { data, error: signupError } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            full_name: fullName.trim(),
          },
        },
      })

      if (signupError) {
        console.error('Supabase signup error:', signupError)
        setError(signupError.message)
        return
      }

      if (data?.user && !data?.session) {
        setSuccess(
          'Account created successfully. Please check your email to verify your account.'
        )

        setTimeout(() => {
          router.push('/signin')
        }, 2500)

        return
      }

      if (data?.session) {
        router.push('/dashboard')
        return
      }

      setError('Something went wrong while creating your account.')
    } catch (error) {
      console.error('Signup error:', error)
      setError('Unable to create your account. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleGithubSignup = async () => {
    setError('')
    setSuccess('')

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) {
      console.error('GitHub signup error:', error)
      setError(error.message)
    }
  }

  return (
    <div className="signup-page">
      <div className="signup-container">

        {/* Left Side */}
        <div className="signup-info">
          <div className="signup-logo">
            <GraduationCap size={45} />
            <span>CampusPlug</span>
          </div>

          <div className="signup-info-content">
            <h1>Empower your<br />learning journey.</h1>
            <p>
              Create your CampusPlug account and get access to
              tools designed to make studying smarter and easier.
            </p>
          </div>

          <div className="signup-shape shape-one"></div>
          <div className="signup-shape shape-two"></div>
        </div>

        {/* Right Side */}
        <div className="signup-form-section">
          <div className="signup-form-wrapper">

            <div className="signup-heading">
              <h2>Create an account</h2>
              <p>Join CampusPlug and start learning smarter.</p>
            </div>

            {/* Social Signup */}
            <div className="social-buttons">
              <button
                type="button"
                className="social-btn github-btn"
                onClick={handleGithubSignup}
              >
                <FaGithub />
                Continue with GitHub
              </button>
            </div>

            {error && (
              <p className="password-error">
                <CircleAlert size={30} />
                {error}
              </p>
            )}

            {success && (
              <p className="signup-success">
                {success}
              </p>
            )}

            {/* Form */}
            <form className="signup-form" onSubmit={handleSubmit}>

              <div className="input-group">
                <label>Full name</label>
                <div className="input-wrapper">
                  <User size={18} />
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="input-group">
                <label>Email address</label>
                <div className="input-wrapper">
                  <Mail size={18} />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="input-group">
                <label>Password</label>
                <div className="input-wrapper">
                  <Lock size={18} />

                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              <div className="input-group">
                <label>Confirm password</label>

                <div className="input-wrapper">
                  <Lock size={18} />

                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) =>
                      setConfirmPassword(e.target.value)
                    }
                    required
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              <div className="terms">
                <input type="checkbox" id="terms" required />

                <label htmlFor="terms">
                  I agree to the <Link href="#">Terms of Service</Link> and{' '}
                  <Link href="#">Privacy Policy</Link>
                </label>
              </div>

              <button
                type="submit"
                className="signup-submit"
                disabled={loading}
              >
                {loading ? 'Creating account...' : 'Create Account'}
              </button>

            </form>

            <p className="signin-text">
              Already have an account?{' '}
              <Link href="/signin">Sign in</Link>
            </p>

          </div>
        </div>

      </div>
    </div>
  )
}

export default Page

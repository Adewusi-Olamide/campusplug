'use client'
import { supabase } from '@/lib/supabase'
import React, { useState } from 'react'
import Link from 'next/link'
import { Eye, EyeOff, GraduationCap, Mail, Lock, User } from 'lucide-react'
import { FaGoogle, FaGithub } from 'react-icons/fa'
import './page.css'

const page = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  return (
    <div className="signup-page">

      <div className="signup-container">

        {/* Left Side */}
        <div className="signup-info">
          <div className="signup-logo">
            <GraduationCap size={30} />
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

              <button className="social-btn google-btn">
                <FaGoogle />
                Continue with Google
              </button>

              <button className="social-btn github-btn">
                <FaGithub />
                Continue with GitHub
              </button>

            </div>


            <div className="divider">
              <span>or continue with email</span>
            </div>


            {/* Form */}
            <form className="signup-form">

              <div className="input-group">
                <label>Full name</label>

                <div className="input-wrapper">
                  <User size={18} />
                  <input
                    type="text"
                    placeholder="Enter your full name"
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
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
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
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                  >
                    {showConfirmPassword
                      ? <EyeOff size={18} />
                      : <Eye size={18} />
                    }
                  </button>
                </div>
              </div>


              <div className="terms">
                <input type="checkbox" id="terms" />
                <label htmlFor="terms">
                  I agree to the <Link href="#">Terms of Service</Link> and{' '}
                  <Link href="#">Privacy Policy</Link>
                </label>
              </div>


              <button type="submit" className="signup-submit">
                Create Account
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

export default page

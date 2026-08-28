'use client'
import { useState } from 'react'
import React from 'react'
import Link from 'next/link'
import './Navbar.css'

const Navbar = () => {
  return (
    <div>

        <div className='navbar'>

          <div className="left">
            <h1>CampusPlug</h1>
          </div>

          <div className="center">
            <p>Home</p>
            <p>Tools </p>
            <p>Resources</p>
            <p>Blog</p>
            <p>About Us</p>
          </div>

          <div className="right">

            <div className='search'>
              <input type='text' placeholder='Search tools...' />
              <p>⨀</p>
            </div>

            <p>⨀</p>
            <button>Sign In</button>

          </div>

        </div>
      
    </div>
  )
}

export default Navbar

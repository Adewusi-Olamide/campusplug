'use client'
import { useState } from 'react'
import React from 'react'
import Link from 'next/link'
import './Navbar.css'
import { usePathname } from 'next/navigation'
import { Search } from 'lucide-react'
import { Moon } from 'lucide-react'

const Navbar = () => {

  const pathname = usePathname();

  return (
    <div>

        <div className='navbar'>

          <div className="left">
            <h1>CampusPlug</h1>
          </div>

          <div className="center">
            <Link href="/" className={pathname === "/" ? "active" : ""}><p>Home</p></Link>
            <Link href="/tools" className={pathname === "/tools" ? "active" : ""}><p>Tools</p></Link>
            <Link href="/resources" className={pathname === "/resources" ? "active" : ""}><p>Resources</p></Link>
            <Link href="/blog" className={pathname === "/blog" ? "active" : ""}><p>Blog</p></Link>
            <Link href="/about" className={pathname === "/about" ? "active" : ""}><p>About Us</p></Link>
          </div>

          <div className="right">

            <div className='search'>
              <input type='text' placeholder='Search tools...' />
              <p><Search size={20} /></p>
            </div>

            <p><Moon size={20} /></p>

            <button>Sign In</button>

          </div>

        </div>
      
    </div>
  )
}

export default Navbar

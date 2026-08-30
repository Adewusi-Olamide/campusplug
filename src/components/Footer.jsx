'use client'
import React from 'react'
import './Footer.css'
import Link from 'next/link'
import { GraduationCapIcon } from 'lucide-react'
import "react-icons/fa";
import { FaTiktok, FaInstagram } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { FaYoutube } from 'react-icons/fa'


const Footer = () => {
  return (
    <div>

      <div className="ctn">
        <div className="footer">

          <div className="left">

            <Link href="/">
              <h2><GraduationCapIcon id="logo" size={50} />Campus<span className="campusplug">Plug</span></h2>
            </Link>

            <p id="p">Your all-in-one study companion</p>

            <p id="p">© {new Date().getFullYear()} CampusPlug. All right reserved</p>

          </div>

          <div className="center">

            <div className="header">
              <h1>Product</h1>
              <p>Features</p>
              <p>Tools</p>
              <p>Pricing</p>
              <p>Changelog</p>
            </div>

            <div className="header">
              <h1>Company</h1>
              <p>About Us</p>
              <p>Blog</p>
              <p>Resources</p>
              <p>Contact</p>
            </div>

            <div className="header">
              <h1>Resources</h1>
              <p>Study Tips</p>
              <p>Guides</p>
              <p>Help Center</p>
              <p>Community</p>
            </div>
    
          </div>

          <div className="right">
            <h1>Follow Us</h1>

            <div className="socials">
              <p><FaXTwitter  size={15} /></p>
              <p><FaTiktok size={15} /></p>
              <p><FaYoutube size={15} /></p>
              <p><FaInstagram size={15} /></p>
              
            </div>

            <div className="privacy">
              <p>Privacy Policy</p>
              <p id="terms">Terms of Service</p>
            </div>

          </div>

        </div>
      </div>
      
    </div>
  )
}

export default Footer

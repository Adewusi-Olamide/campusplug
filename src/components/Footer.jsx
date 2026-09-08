"use client";

import React from "react";
import Link from "next/link";
import "./Footer.css";

const Footer = () => {
  const openCookieSettings = () => {
    window.dispatchEvent(new Event("openCookieSettings"));
  };

  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Brand */}
        <div className="footer-brand">
          <Link href="/" className="footer-logo">
            <span>CampusPlug</span>
          </Link>

          <p>
            Your all-in-one student platform for smarter studying,
            better organization, and academic success.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-column">
          <h3>Quick Links</h3>

          <Link href="/">Home</Link>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/tools">Tools</Link>
          <Link href="/blog">Blog</Link>
        </div>

        {/* Resources */}
        <div className="footer-column">
          <h3>Resources</h3>

          <Link href="/resources">Study Resources</Link>
          <Link href="/tools/cbt">CBT Practice</Link>
          <Link href="/tools/flashcards">Flashcards</Link>
          <Link href="/tools/calculator">Calculator</Link>
        </div>

        {/* Account */}
        <div className="footer-column">
          <h3>Account</h3>

          <Link href="/profile">Profile</Link>
          <Link href="/login">Login</Link>
          <Link href="/signup">Create Account</Link>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} CampusPlug. All rights reserved.</p>

        <div className="footer-legal">
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/cookie-policy">Cookie Policy</Link>
          <Link href="/terms">Terms & Conditions</Link>
          <Link href="/disclaimer">Disclaimer</Link>

          <button
            type="button"
            className="footer-cookie-settings"
            onClick={openCookieSettings}
          >
            Cookie Settings
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

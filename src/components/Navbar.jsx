'use client'
import { useState } from 'react'
import React from 'react'
import Link from 'next/link'
import './Navbar.css'
import { usePathname, useRouter } from 'next/navigation'
import { Search } from 'lucide-react'
import { Moon } from 'lucide-react'
import { GraduationCapIcon } from 'lucide-react'
import { CircleAlert } from 'lucide-react'

const Navbar = () => {

  const pathname = usePathname();
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [noResults, setNoResults] = useState(false);

  // ADDED
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSearch = () => {

    const query = search.trim().toLowerCase();

    if (!query) return;

    setNoResults(false);

    if (query === "home") {
      router.push("/");
    }
    else if (query === "tools" || query === "tool") {
      router.push("/tools");
    }
    else if (query === "resources" || query === "resource") {
      router.push("/resources");
    }
    else if (query === "blog") {
      router.push("/blog");
    }
    else if (query === "about" || query === "about us") {
      router.push("/about");
    }
    else if (query === "signup" || query === "sign up") {
      router.push("/signup");
    }
    else if (query === "signin" || query === "sign in") {
      router.push("/signin");
    }
    else if (query === "dashboard" || query === "my profile") {
      router.push("/dashboard");
    }
    else if (query === "calculator" || query === "calculator") {
      router.push("/calculator");
    }
    else if (query === "cbt" || query === "cbt exam") {
      router.push("/cbt");
    }
    else {
      setNoResults(true);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div>

      <div className='navbar'>

        <Link href="/">
        <div className="left">
          <h1><GraduationCapIcon id="logo" size={50} /><span className="campusplug">CampusPlug</span></h1>
        </div>
        </Link>


        {/* ADDED: HAMBURGER BUTTON */}

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Open menu"
        >
          ☰
        </button>


        <div className="center">
          <Link href="/" className={pathname === "/" ? "active" : ""}>
            <p>Home</p>
          </Link>

          <Link href="/tools" className={pathname === "/tools" ? "active" : ""}>
            <p>Tools</p>
          </Link>

          <Link href="/resources" className={pathname === "/resources" ? "active" : ""}>
            <p>Resources</p>
          </Link>

          <Link href="/blog" className={pathname === "/blog" ? "active" : ""}>
            <p>Blog</p>
          </Link>

          <Link href="/about" className={pathname === "/about" ? "active" : ""}>
            <p>About Us</p>
          </Link>
        </div>


        <div className="right">

          <div className='search'>

            <input
              type='text'
              placeholder='Search tools...'
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setNoResults(false);
              }}
              onKeyDown={handleKeyDown}
            />

            <p>
              <Search
              size={20}
              onClick={handleSearch}
              style={{ cursor: "pointer" }}
              />
            </p>

          </div>

          {noResults && (
            <p className="no-results">
              <CircleAlert size={20} />No results found 
            </p>
          )}

          <p>
            <Moon size={20} />
          </p>

          <Link href="signup">
          <button>Get Started</button>
          </Link>

        </div>


        {/* ADDED: MOBILE DROPDOWN */}

        {menuOpen && (
          <div className="mobile-menu">

            <Link
              href="/"
              className={pathname === "/" ? "active" : ""}
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>

            <Link
              href="/tools"
              className={pathname === "/tools" ? "active" : ""}
              onClick={() => setMenuOpen(false)}
            >
              Tools
            </Link>

            <Link
              href="/resources"
              className={pathname === "/resources" ? "active" : ""}
              onClick={() => setMenuOpen(false)}
            >
              Resources
            </Link>

            <Link
              href="/blog"
              className={pathname === "/blog" ? "active" : ""}
              onClick={() => setMenuOpen(false)}
            >
              Blog
            </Link>

            <Link
              href="/about"
              className={pathname === "/about" ? "active" : ""}
              onClick={() => setMenuOpen(false)}
            >
              About Us
            </Link>

            {/* Mobile Search */}

            <div className="mobile-search">

              <input
                type="text"
                placeholder="Search tools..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setNoResults(false);
                }}
                onKeyDown={handleKeyDown}
              />

              <Search
                size={20}
                onClick={handleSearch}
                style={{ cursor: "pointer" }}
              />

            </div>

            {/* Mobile Moon */}

            <div className="mobile-option">
              <Moon size={20} />
              <span>Dark Mode</span>
            </div>

            {/* Mobile Get Started */}

            <Link href="signup">
            <button className="mobile-get-started">Get Started</button>
            </Link>

          </div>
        )}

      </div>

    </div>
  )
}

export default Navbar

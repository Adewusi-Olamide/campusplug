
'use client'
import { useState } from 'react'
import React from 'react'
import Link from 'next/link'
import './Navbar.css'
import { usePathname, useRouter } from 'next/navigation'
import { Search } from 'lucide-react'
import { Moon } from 'lucide-react'
import { CircleAlert } from 'lucide-react'

const Navbar = () => {

  const pathname = usePathname();
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [noResults, setNoResults] = useState(false);

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

        <div className="left">
          <h1>CampusPlug</h1>
        </div>

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

          <button>Sign In</button>

        </div>

      </div>

    </div>
  )
}

export default Navbar
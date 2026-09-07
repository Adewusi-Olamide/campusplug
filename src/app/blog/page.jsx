"use client";
import { useEffect } from "react";
import React, { useState } from "react";
import Image from "next/image";
import "./page.css";
import Link from "next/link";
import { articles } from "@/data/articles";

const page = () => {

  const text = "Practical study tips, student guides, productivity ideas, and useful resources to help you get the most out of your academic journey.";
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let index = 0;

    const typing = setInterval(() => {
      index++;


      setDisplayText(text.substring(0, index));

      if (index >= text.length) {
        clearInterval(typing);
      }
    }, 30);

    return () => clearInterval(typing);
  }, []);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const post = articles;

  const categories = [
    "All",
    "Study Tips",
    "Exams",
    "Productivity",
    "Learning",
  ];

  const filteredPosts = post.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || post.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="blog-page">

      {/* HERO */}
      <section className="blog-hero">
        <div className="blog-hero-content">
          <span className="blog-label">CAMPUSPLUG BLOG</span>

          <h1>
            Learn better.
            <br />
            <span>Achieve more.</span>
          </h1>

          <p>{displayText}</p>
        </div>
      </section>

      {/* SEARCH & CATEGORIES */}
      <section className="blog-controls">

        <div className="blog-search">
          <span>⌕</span>

          <input
            type="text"
            placeholder="Search articles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="blog-categories">
          {categories.map((item) => (
            <button
              key={item}
              className={category === item ? "active" : ""}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>

      </section>

      {/* ARTICLES */}
      <section className="blog-section">

        <div className="section-heading">

          <div>
            <span>OUR ARTICLES</span>
            <h2>Latest from CampusPlug</h2>
          </div>

          <p>
            Ideas, guides and resources made for students.
          </p>

        </div>

        {filteredPosts.length > 0 ? (

          <div className="blog-grid">

            {filteredPosts.map((post) => (

              <article
                className="blog-card"
                key={post.slug}
              >

                <div className="blog-card-image">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                  />
                </div>

                <Link href={`/blog/${post.slug}`}>
                <div className="blog-card-content">

                  <span className="post-category">
                    {post.category}
                  </span>

                  <h3>{post.title}</h3>

                  <p>{post.excerpt}</p>

                  <div className="card-bottom">

                    <div className="post-meta">
                      <span>{post.date}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>

                    <button
                      aria-label={`Read ${post.title}`}
                    >
                      →
                    </button>

                  </div>

                </div>
                </Link>

              </article>

            ))}

          </div>

        ) : (

          <div className="no-results">

            <div>⌕</div>

            <h3>No articles found</h3>

            <p>
              Try searching for something else or choose
              another category.
            </p>

          </div>

        )}

      </section>

      {/* NEWSLETTER */}
      <section className="blog-newsletter">

        <div>

          <span>STAY IN THE LOOP</span>

          <h2>
            Get useful study tips in your inbox.
          </h2>

          <p>
            New guides, resources and student tips — straight to you.
          </p>

        </div>

        <div className="newsletter-form">

          <input
            type="email"
            placeholder="Enter your email"
          />

          <Link href="/signup">
          <button>
            Subscribe
          </button>
          </Link>

        </div>

      </section>

    </div>
  );
};

export default page;

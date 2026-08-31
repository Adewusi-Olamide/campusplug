"use client";
import { useEffect } from "react";
import React, { useState } from "react";
import Image from "next/image";
import "./page.css";

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

  const posts = [
    {
      id: 1,
      title: "How to Study Smarter and Not Just Harder",
      excerpt:
        "Discover simple study strategies that can help you understand topics faster and remember what you learn for longer.",
      category: "Study Tips",
      date: "August 28, 2026",
      readTime: "5 min read",
      image: "/images/study-smart.jpg",
    },
    {
      id: 2,
      title: "How to Prepare for Your Next Exam",
      excerpt:
        "A practical guide to organizing your revision, managing your time, and walking into your next exam prepared.",
      category: "Exams",
      date: "August 24, 2026",
      readTime: "6 min read",
      image: "/images/exam-prep.jpg",
    },
    {
      id: 3,
      title: "5 Ways to Stay Focused While Studying",
      excerpt:
        "Struggling to concentrate? Try these simple techniques to make your study sessions more productive.",
      category: "Productivity",
      date: "August 20, 2026",
      readTime: "4 min read",
      image: "/images/focus.jpg",
    },
    {
      id: 4,
      title: "Why Flashcards Are Great for Revision",
      excerpt:
        "Learn how active recall and flashcards can make revision more effective and less stressful.",
      category: "Learning",
      date: "August 17, 2026",
      readTime: "4 min read",
      image: "/images/flashcards.jpg",
    },
    {
      id: 5,
      title: "Building Better Study Habits",
      excerpt:
        "Small, consistent habits can make a huge difference in your academic journey. Here's where to start.",
      category: "Study Tips",
      date: "August 12, 2026",
      readTime: "5 min read",
      image: "/images/study-habits.jpg",
    },
    {
      id: 6,
      title: "How to Manage Your Time as a Student",
      excerpt:
        "Balance classes, assignments, revision, and your personal life with a simple approach to time management.",
      category: "Productivity",
      date: "August 8, 2026",
      readTime: "7 min read",
      image: "/images/time-management.jpg",
    },
  ];

  const categories = [
    "All",
    "Study Tips",
    "Exams",
    "Productivity",
    "Learning",
  ];

  const filteredPosts = posts.filter((post) => {
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

      {/* FEATURED ARTICLE */}
      {category === "All" && search === "" && (
        <section className="featured-section">

          <div className="featured-image">
            <Image
              src="/images/featured-blog.jpg"
              alt="Student studying"
              fill
            />
          </div>

          <div className="featured-content">

            <span className="post-category">
              FEATURED
            </span>

            <h2>
              Study smarter, stay consistent, and make your
              academic journey easier.
            </h2>

            <p>
              Your grades aren't only about how long you study.
              Learn how effective study techniques, consistency,
              and the right resources can change the way you learn.
            </p>

            <div className="post-info">
              <span>CampusPlug Team</span>
              <span>•</span>
              <span>August 30, 2026</span>
              <span>•</span>
              <span>6 min read</span>
            </div>

            <button className="read-button">
              Read article →
            </button>

          </div>

        </section>
      )}

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
                key={post.id}
              >

                <div className="blog-card-image">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                  />
                </div>

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

          <button>
            Subscribe
          </button>

        </div>

      </section>

    </div>
  );
};

export default page;

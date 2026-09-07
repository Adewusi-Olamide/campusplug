"use client";

import React, { useState } from "react";
import {
  BookOpen,
  Search,
  ArrowRight,
  GraduationCap,
  Library,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import './page.css'

const textbooks = [
  {
    subject: "Use of English",
    slug: "use-of-english",
    books: [
      {
        title:
          "English Lexis and Structure for Senior Secondary Schools and Colleges (Revised Edition)",
        author: "A. Bamgbose",
        publisher: "Heinemann",
        year: "2002",
      },
      {
        title:
          "New Oxford Secondary English Course Book Six for Senior Secondary Schools",
        author: "Banjo et al.",
        publisher: "UP Plc",
        year: "2004",
      },
      {
        title: "Essential Oral English for Schools and Colleges",
        author: "O. J. Caesar",
        publisher: "Tonad",
        year: "2003",
      },
      {
        title: "Mastering English Usage and Communication Skills",
        author: "D. I. Egbe",
        publisher: "Tisons",
        year: "1996",
      },
      {
        title: "Oral English for Schools and Colleges",
        author: "B. Elugbe",
        publisher: "Heinemann",
        year: "2000",
      },
      {
        title: "Senior English Project 3",
        author: "N. J. H. Grant, S. Nnamonu & D. Jowitt",
        publisher: "Longman",
        year: "1998",
      },
      {
        title: "Round-up English: A Complete Guide",
        author: "Idowu et al.",
        publisher: "Longman",
        year: "1998",
      },
      {
        title: "Oral English at Your Fingertips for Schools and Colleges",
        author: "U. Idris",
        publisher: "M. Youngbrain",
        year: "2001",
      },
      {
        title: "Common Errors in English",
        author: "Nnamonu & Jowitt",
        publisher: "Longman",
        year: "1989",
      },
      {
        title: "University Matriculation Use of English",
        author: "Obinna",
        publisher: "Sunray",
        year: "2001",
      },
      {
        title: "Countdown English Language (Revised Edition)",
        author: "Ogunsanwo et al.",
        publisher: "Evans",
        year: "2005",
      },
    ],
  },

  {
    subject: "Mathematics",
    slug: "mathematics",
    books: [
      {
        title: "Distinction in Mathematics: Comprehensive Revision Text (3rd Edition)",
        author: "A. A. Adelodun",
        publisher: "FNPL",
        year: "2000",
      },
      {
        title:
          "Basic Mathematics for Senior Secondary Schools and Remedial Students in Higher Institutions",
        author: "J. A. B. Anyebe",
        publisher: "Kenny Moore",
        year: "1998",
      },
      {
        title: "New General Mathematics for West Africa SSS 1 to 3",
        author: "Channon & Smith",
        publisher: "Longman",
        year: "2001",
      },
      {
        title: "New School Mathematics for Senior Secondary Schools",
        author: "David-Osuagwu et al.",
        publisher: "Africana-FIRST",
        year: "2000",
      },
      {
        title: "Algebra and Calculus for Schools and Colleges",
        author: "Ibude et al.",
        publisher: "LINCEL",
        year: "2003",
      },
      {
        title: "Further Mathematics Project Books 1 to 3",
        author: "Tuttuh-Adegun et al.",
        publisher: "NPS Educational",
        year: "1997",
      },
    ],
  },

  {
    subject: "Physics",
    slug: "physics",
    books: [
      {
        title: "Essential Principles of Physics",
        author: "Ike",
        publisher: "ENIC",
        year: "2014",
      },
      {
        title: "Numerical Problems and Solutions in Physics",
        author: "Ike",
        publisher: "ENIC",
        year: "2014",
      },
      {
        title: "Fundamentals of Physics",
        author: "Nelson",
        publisher: "Hart Davis Education",
        year: "1977",
      },
      {
        title: "Advanced Level Physics (Sixth Edition)",
        author: "Nelson & Parker",
        publisher: "Heinemann",
        year: "1989",
      },
      {
        title: "Senior Secondary School Physics",
        author: "Okeke & Anyakoha",
        publisher: "Pacific Printers",
        year: "2000",
      },
      {
        title: "Comprehensive Certificate Physics",
        author: "Olumuyionwa & Ogunkoya",
        publisher: "University Press",
        year: "1992",
      },
    ],
  },

  {
    subject: "Chemistry",
    slug: "chemistry",
    books: [
      {
        title:
          "New School Chemistry for Senior Secondary Schools (4th Edition)",
        author: "Ababio",
        publisher: "Africana FIRST",
        year: "2009",
      },
      {
        title: "Senior Secondary Chemistry, Books 1, 2 and 3",
        author: "Bajah et al.",
        publisher: "Longman",
        year: "1999/2000",
      },
      {
        title:
          "Understanding Chemistry for Schools and Colleges (Revised Edition)",
        author: "Ojokuku",
        publisher: "Press-On Chemresources",
        year: "2012",
      },
      {
        title:
          "Essential: Chemistry for Senior Secondary Schools (2nd Edition)",
        author: "Odesina",
        publisher: "Tonad",
        year: "2008",
      },
      {
        title: "Countdown to WASSCE/SSCE, NECO, JME Chemistry",
        author: "Uche, Adenuga & Iwuagwu",
        publisher: "Evans",
        year: "2003",
      },
    ],
  },

  {
    subject: "Biology",
    slug: "biology",
    books: [
      {
        title: "Senior Secondary School Biology: Books 1-3",
        author: "Ndu et al.",
        publisher: "Longman",
        year: "2001",
      },
      {
        title: "Essentials of Biology",
        author: "Odunfa",
        publisher: "Heinemann",
        year: "2001",
      },
      {
        title: "Biology for Senior Secondary Schools: Books 1-3",
        author: "Ogunniyi et al.",
        publisher: "Macmillan",
        year: "2000",
      },
      {
        title: "Modern Biology, SS Science Series (New Edition)",
        author: "Ramalingam",
        publisher: "AFP",
        year: "2005",
      },
      {
        title: "Biology for Senior Secondary Schools (Revised Edition)",
        author: "STAN",
        publisher: "Heinemann",
        year: "2004",
      },
      {
        title: "Biology for West African Schools",
        author: "Stone & Cozens",
        publisher: "Longman",
        year: "1982",
      },
      {
        title: "Handbook of Practical Biology (2nd Edition)",
        author: "Usua",
        publisher: "University Press Limited",
        year: "1997",
      },
    ],
  },

  {
    subject: "Agricultural Science",
    slug: "agricultural-science",
    books: [
      {
        title: "Agricultural Science for Senior Secondary Schools",
        author: "Various Authors",
        publisher: "Various Publishers",
        year: "Various Editions",
      },
      {
        title: "Agricultural Science: A Practical Approach",
        author: "Various Authors",
        publisher: "Various Publishers",
        year: "Various Editions",
      },
    ],
  },

  {
    subject: "Economics",
    slug: "economics",
    books: [
      {
        title: "Economics for Senior Secondary Schools",
        author: "Various Authors",
        publisher: "Various Publishers",
        year: "Various Editions",
      },
      {
        title: "Comprehensive Economics for Senior Secondary Schools",
        author: "Various Authors",
        publisher: "Various Publishers",
        year: "Various Editions",
      },
    ],
  },

  {
    subject: "Commerce",
    slug: "commerce",
    books: [
      {
        title: "Commerce for Senior Secondary Schools",
        author: "Various Authors",
        publisher: "Various Publishers",
        year: "Various Editions",
      },
      {
        title: "Comprehensive Commerce for Senior Secondary Schools",
        author: "Various Authors",
        publisher: "Various Publishers",
        year: "Various Editions",
      },
    ],
  },

  {
    subject: "Accounting",
    slug: "accounting",
    books: [
      {
        title: "Financial Accounting for Senior Secondary Schools",
        author: "Various Authors",
        publisher: "Various Publishers",
        year: "Various Editions",
      },
      {
        title: "Comprehensive Financial Accounting",
        author: "Various Authors",
        publisher: "Various Publishers",
        year: "Various Editions",
      },
    ],
  },

  {
    subject: "Government",
    slug: "government",
    books: [
      {
        title: "Government for Senior Secondary Schools",
        author: "Various Authors",
        publisher: "Various Publishers",
        year: "Various Editions",
      },
      {
        title: "Comprehensive Government for Senior Secondary Schools",
        author: "Various Authors",
        publisher: "Various Publishers",
        year: "Various Editions",
      },
    ],
  },

  {
    subject: "History",
    slug: "history",
    books: [
      {
        title: "History for Senior Secondary Schools",
        author: "Various Authors",
        publisher: "Various Publishers",
        year: "Various Editions",
      },
      {
        title: "Comprehensive History for Senior Secondary Schools",
        author: "Various Authors",
        publisher: "Various Publishers",
        year: "Various Editions",
      },
    ],
  },

  {
    subject: "Geography",
    slug: "geography",
    books: [
      {
        title: "Geography for Senior Secondary Schools",
        author: "Various Authors",
        publisher: "Various Publishers",
        year: "Various Editions",
      },
      {
        title: "Comprehensive Geography for Senior Secondary Schools",
        author: "Various Authors",
        publisher: "Various Publishers",
        year: "Various Editions",
      },
    ],
  },

  {
    subject: "Literature in English",
    slug: "literature-in-english",
    books: [
      {
        title: "Literature in English for Senior Secondary Schools",
        author: "Various Authors",
        publisher: "Various Publishers",
        year: "Various Editions",
      },
      {
        title: "Comprehensive Literature in English",
        author: "Various Authors",
        publisher: "Various Publishers",
        year: "Various Editions",
      },
    ],
  },

  {
    subject: "Christian Religious Studies",
    slug: "christian-religious-studies",
    books: [
      {
        title: "Christian Religious Studies for Senior Secondary Schools",
        author: "Various Authors",
        publisher: "Various Publishers",
        year: "Various Editions",
      },
      {
        title: "Comprehensive Christian Religious Studies",
        author: "Various Authors",
        publisher: "Various Publishers",
        year: "Various Editions",
      },
    ],
  },

  {
    subject: "Islamic Religious Studies",
    slug: "islamic-religious-studies",
    books: [
      {
        title: "Islamic Religious Studies for Senior Secondary Schools",
        author: "Various Authors",
        publisher: "Various Publishers",
        year: "Various Editions",
      },
      {
        title: "Comprehensive Islamic Religious Studies",
        author: "Various Authors",
        publisher: "Various Publishers",
        year: "Various Editions",
      },
    ],
  },

  {
    subject: "Computer Studies",
    slug: "computer-studies",
    books: [
      {
        title: "Computer Studies for Senior Secondary Schools",
        author: "Various Authors",
        publisher: "Various Publishers",
        year: "Various Editions",
      },
      {
        title: "Comprehensive Computer Studies",
        author: "Various Authors",
        publisher: "Various Publishers",
        year: "Various Editions",
      },
    ],
  },

  {
    subject: "Fine Art",
    slug: "fine-art",
    books: [
      {
        title: "Fine Art for Senior Secondary Schools",
        author: "Various Authors",
        publisher: "Various Publishers",
        year: "Various Editions",
      },
      {
        title: "Comprehensive Fine Art",
        author: "Various Authors",
        publisher: "Various Publishers",
        year: "Various Editions",
      },
    ],
  },

  {
    subject: "French",
    slug: "french",
    books: [
      {
        title: "French for Senior Secondary Schools",
        author: "Various Authors",
        publisher: "Various Publishers",
        year: "Various Editions",
      },
      {
        title: "Comprehensive French for Senior Secondary Schools",
        author: "Various Authors",
        publisher: "Various Publishers",
        year: "Various Editions",
      },
    ],
  },

  {
    subject: "Arabic",
    slug: "arabic",
    books: [
      {
        title: "Arabic for Senior Secondary Schools",
        author: "Various Authors",
        publisher: "Various Publishers",
        year: "Various Editions",
      },
      {
        title: "Comprehensive Arabic for Senior Secondary Schools",
        author: "Various Authors",
        publisher: "Various Publishers",
        year: "Various Editions",
      },
    ],
  },

  {
    subject: "Music",
    slug: "music",
    books: [
      {
        title: "Music for Senior Secondary Schools",
        author: "Various Authors",
        publisher: "Various Publishers",
        year: "Various Editions",
      },
      {
        title: "Comprehensive Music for Senior Secondary Schools",
        author: "Various Authors",
        publisher: "Various Publishers",
        year: "Various Editions",
      },
    ],
  },

  {
    subject: "Physical & Health Education",
    slug: "physical-and-health-education",
    books: [
      {
        title: "Physical and Health Education for Senior Secondary Schools",
        author: "Various Authors",
        publisher: "Various Publishers",
        year: "Various Editions",
      },
      {
        title: "Comprehensive Physical and Health Education",
        author: "Various Authors",
        publisher: "Various Publishers",
        year: "Various Editions",
      },
    ],
  },
];

const Page = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("All");

  const filteredTextbooks = textbooks
    .filter((subject) => {
      const matchesSubject =
        selectedSubject === "All" || subject.subject === selectedSubject;

      const matchesSearch =
        subject.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        subject.books.some(
          (book) =>
            book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.author.toLowerCase().includes(searchTerm.toLowerCase())
        );

      return matchesSubject && matchesSearch;
    });

  return (
    <main className="textbooks-page">
      <section className="textbooks-hero">
        <div className="textbooks-hero-content">
          <span className="textbooks-badge">
            <Library size={16} />
            JAMB Study Resources
          </span>

          <h1>Recommended Textbooks</h1>

          <p>
            Discover useful textbooks and study materials to help you prepare
            confidently for your UTME subjects.
          </p>
        </div>
      </section>

      <section className="textbooks-section">
        <div className="textbooks-container">
          <div className="textbooks-heading">
            <div>
              <span className="section-label">Study Materials</span>
              <h2>Choose your subject</h2>
              <p>
                Find recommended books for your subjects and use them alongside
                the JAMB syllabus.
              </p>
            </div>

            <div className="textbooks-count">
              <BookOpen size={18} />
              {filteredTextbooks.length} subjects
            </div>
          </div>

          <div className="textbooks-controls">
            <div className="textbooks-search">
              <Search size={20} />
              <input
                type="text"
                placeholder="Search subjects, books or authors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="textbooks-filter">
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
              >
                <option value="All">All Subjects</option>

                {textbooks.map((subject) => (
                  <option key={subject.slug} value={subject.subject}>
                    {subject.subject}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {filteredTextbooks.length > 0 ? (
            <div className="textbooks-grid">
              {filteredTextbooks.map((subject) => (
                <article className="textbook-card" key={subject.slug}>
                  <div className="textbook-card-top">
                    <div className="textbook-icon">
                      <BookOpen size={22} />
                    </div>

                    <div>
                      <h3>{subject.subject}</h3>
                      <span>
                        {subject.books.length} recommended resources
                      </span>
                    </div>
                  </div>

                  <div className="book-list">
                    {subject.books.map((book, index) => (
                      <div className="book-item" key={index}>
                        <div className="book-number">{index + 1}</div>

                        <div className="book-details">
                          <h4>{book.title}</h4>

                          <p>
                            {book.author} • {book.publisher}
                          </p>

                          <span>{book.year}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Link
                    href={`/syllabus/${subject.slug}`}
                    className="syllabus-link"
                  >
                    View {subject.subject} syllabus
                    <ArrowRight size={17} />
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <div className="textbooks-empty">
              <BookOpen size={42} />
              <h3>No textbooks found</h3>
              <p>
                Try searching for another subject, textbook or author.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="textbooks-note">
        <div className="textbooks-container">
          <div className="note-box">
            <div className="note-icon">
              <GraduationCap size={25} />
            </div>

            <div>
              <h3>Study smarter, not harder</h3>
              <p>
                You do not need to read every textbook listed here. Pick one
                or two reliable books that match your syllabus, understand the
                topics properly, and practise plenty of past questions.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="textbooks-source">
        <div className="textbooks-container">
          <div className="source-card">
            <div className="source-icon">
              <ExternalLink size={24} />
            </div>

            <div>
              <h3>Check the official JAMB syllabus</h3>
              <p>
                Always compare your study materials with the official JAMB
                syllabus so you know exactly what topics you are expected to
                cover.
              </p>
            </div>

            <a
              href="https://ibass.jamb.gov.ng/e-syllabus"
              target="_blank"
              rel="noopener noreferrer"
              className="source-button"
            >
              Official JAMB E-Syllabus
              <ExternalLink size={17} />
            </a>
          </div>
        </div>
      </section>

      <section className="textbooks-cta">
        <div className="textbooks-container">
          <div className="cta-content">
            <span className="section-label">Ready to prepare?</span>

            <h2>Turn your textbooks into better results.</h2>

            <p>
              Combine the right study materials with a solid study plan and
              consistent CBT practice.
            </p>

            <div className="cta-buttons">
              <Link href="/study-guide" className="cta-primary">
                Study Guide
                <ArrowRight size={18} />
              </Link>

              <Link href="./cbt" className="cta-secondary">
                Practice CBT
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Page;

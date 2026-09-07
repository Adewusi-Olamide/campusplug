"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search,
  BookOpen,
  Calculator,
  Atom,
  FlaskConical,
  Leaf,
  BriefcaseBusiness,
  Landmark,
  Globe,
  Palette,
  Languages,
  Laptop,
  Music,
  HeartPulse,
  X,
  ArrowRight,
} from "lucide-react";

import "./page.css";

const subjects = [
  {
    name: "Use of English",
    slug: "use-of-english",
    category: "Compulsory",
    icon: BookOpen,
    description: "Comprehension, lexis and structure, oral forms and prescribed texts.",
  },
  {
    name: "Mathematics",
    slug: "mathematics",
    category: "Science",
    icon: Calculator,
    description: "Number, algebra, geometry, trigonometry, statistics and probability.",
  },
  {
    name: "Physics",
    slug: "physics",
    category: "Science",
    icon: Atom,
    description: "Mechanics, heat, waves, electricity, magnetism and modern physics.",
  },
  {
    name: "Chemistry",
    slug: "chemistry",
    category: "Science",
    icon: FlaskConical,
    description: "Atomic structure, bonding, stoichiometry, organic chemistry and more.",
  },
  {
    name: "Biology",
    slug: "biology",
    category: "Science",
    icon: Leaf,
    description: "Living organisms, ecology, genetics, evolution and physiology.",
  },
  {
    name: "Agricultural Science",
    slug: "agricultural-science",
    category: "Science",
    icon: Leaf,
    description: "Soil, crops, livestock, farm management and agricultural practices.",
  },
  {
    name: "Economics",
    slug: "economics",
    category: "Commercial",
    icon: BriefcaseBusiness,
    description: "Demand and supply, markets, national income and economic development.",
  },
  {
    name: "Commerce",
    slug: "commerce",
    category: "Commercial",
    icon: BriefcaseBusiness,
    description: "Trade, business organizations, finance, insurance and marketing.",
  },
  {
    name: "Accounting",
    slug: "accounting",
    category: "Commercial",
    icon: Calculator,
    description: "Bookkeeping, financial accounting and accounting principles.",
  },
  {
    name: "Government",
    slug: "government",
    category: "Arts & Social Science",
    icon: Landmark,
    description: "Political concepts, Nigerian government and international relations.",
  },
  {
    name: "History",
    slug: "history",
    category: "Arts & Social Science",
    icon: Landmark,
    description: "Nigerian, African and world history.",
  },
  {
    name: "Geography",
    slug: "geography",
    category: "Arts & Social Science",
    icon: Globe,
    description: "Physical geography, human geography, environment and map work.",
  },
  {
    name: "Literature in English",
    slug: "literature-in-english",
    category: "Arts",
    icon: BookOpen,
    description: "Prose, poetry, drama, literary devices and prescribed works.",
  },
  {
    name: "Christian Religious Studies",
    slug: "christian-religious-studies",
    category: "Arts",
    icon: BookOpen,
    description: "Biblical teachings, events, personalities and Christian principles.",
  },
  {
    name: "Islamic Religious Studies",
    slug: "islamic-religious-studies",
    category: "Arts",
    icon: BookOpen,
    description: "Qur'an, Hadith, Islamic history, beliefs and practices.",
  },
  {
    name: "Computer Studies",
    slug: "computer-studies",
    category: "Science",
    icon: Laptop,
    description: "Computer fundamentals, hardware, software and data processing.",
  },
  {
    name: "Fine Art",
    slug: "fine-art",
    category: "Arts",
    icon: Palette,
    description: "Drawing, painting, design, art history and artistic concepts.",
  },
  {
    name: "French",
    slug: "french",
    category: "Languages",
    icon: Languages,
    description: "French comprehension, grammar, vocabulary and communication.",
  },
  {
    name: "Arabic",
    slug: "arabic",
    category: "Languages",
    icon: Languages,
    description: "Arabic comprehension, grammar, vocabulary and literature.",
  },
  {
    name: "Music",
    slug: "music",
    category: "Arts",
    icon: Music,
    description: "Music theory, notation, history, instruments and musical elements.",
  },
  {
    name: "Physical & Health Education",
    slug: "physical-and-health-education",
    category: "Science",
    icon: HeartPulse,
    description: "Physical fitness, sports, health education and recreation.",
  },
];

const categories = [
  "All",
  "Compulsory",
  "Science",
  "Commercial",
  "Arts",
  "Arts & Social Science",
  "Languages",
];

const Page = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filteredSubjects = subjects.filter((subject) => {
    const matchesSearch = subject.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || subject.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="syllabus-page">

      {/* Hero */}
      <section className="syllabus-hero">
        <div className="syllabus-container">

          <div className="syllabus-badge">
            <BookOpen size={16} />
            JAMB UTME SYLLABUS
          </div>

          <h1>
            Know what to study.
            <span> Study with direction.</span>
          </h1>

          <p>
            Explore the JAMB UTME syllabus for your subjects and know exactly
            what you need to cover before examination day.
          </p>

          <div className="official-note">
            <span></span>
            Based on JAMB's official syllabus resources
          </div>

        </div>
      </section>


      {/* Syllabus Content */}
      <section className="syllabus-section">
        <div className="syllabus-container">

          <div className="syllabus-header">
            <div>
              <small>JAMB SUBJECTS</small>
              <h2>Choose your subject</h2>
              <p>
                Select a subject to view its syllabus and study topics.
              </p>
            </div>

            <div className="subject-number">
              <strong>{filteredSubjects.length}</strong>
              <span>Subjects</span>
            </div>
          </div>


          {/* Search */}
          <div className="syllabus-search">
            <Search size={20} />

            <input
              type="text"
              placeholder="Search for a subject..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            {search && (
              <button onClick={() => setSearch("")}>
                <X size={18} />
              </button>
            )}
          </div>


          {/* Categories */}
          <div className="syllabus-categories">

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


          {/* Subjects */}
          {filteredSubjects.length > 0 ? (

            <div className="subjects-grid">

              {filteredSubjects.map((subject) => {

                const Icon = subject.icon;

                return (
                  <Link
                    href={`/syllabus/${subject.slug}`}
                    className="subject-card"
                    key={subject.slug}
                  >

                    <div className="subject-top">

                      <div className="subject-icon">
                        <Icon size={22} />
                      </div>

                      <span>{subject.category}</span>

                    </div>

                    <h3>{subject.name}</h3>

                    <p>{subject.description}</p>

                    <div className="view-syllabus">
                      View syllabus
                      <ArrowRight size={17} />
                    </div>

                  </Link>
                );

              })}

            </div>

          ) : (

            <div className="syllabus-empty">

              <Search size={30} />

              <h3>No subject found</h3>

              <p>
                No JAMB subject matches your search.
              </p>

              <button
                onClick={() => {
                  setSearch("");
                  setCategory("All");
                }}
              >
                Clear search
              </button>

            </div>

          )}

        </div>
      </section>


      {/* Official Source */}
      <section className="official-source">
        <div className="syllabus-container">

          <div className="official-box">

            <div className="official-source-icon">
              <BookOpen size={24} />
            </div>

            <div>
              <h3>Official JAMB syllabus</h3>

              <p>
                CampusPlug organizes the syllabus into an easier format for
                students to study and track.
              </p>
            </div>

            <a
              href="https://ibass.jamb.gov.ng/e-syllabus"
              target="_blank"
              rel="noopener noreferrer"
            >
              JAMB IBASS
              <ArrowRight size={17} />
            </a>

          </div>

        </div>
      </section>

    </div>
  );
};

export default Page;

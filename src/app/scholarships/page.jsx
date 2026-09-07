"use client";

import React, { useState } from "react";
import {
  Search,
  GraduationCap,
  CalendarDays,
  Wallet,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Globe,
  BookOpen,
} from "lucide-react";
import Link from "next/link";
import "./page.css";

const scholarships = [
  {
    title: "Nigerian Scholarship Award",
    provider: "Federal Ministry of Education",
    category: "Undergraduate",
    type: "Nigeria",
    amount: "₦450,000",
    deadline: "Check official portal",
    status: "Available",
    description:
      "Federal scholarship support for eligible Nigerian students in tertiary institutions, with increased grants under the revised national scholarship programme.",
    eligibility:
      "Eligible Nigerian undergraduate students enrolled in recognised tertiary institutions.",
    link: "https://education.gov.ng/federal-scholarships-board/",
  },

  {
    title: "Education Bursary Award",
    provider: "Federal Ministry of Education",
    category: "Undergraduate",
    type: "Nigeria",
    amount: "₦450,000",
    deadline: "Check official portal",
    status: "Available",
    description:
      "A federal education support award designed to reduce the financial burden on eligible Nigerian students.",
    eligibility:
      "Eligible Nigerian students who meet the requirements of the Federal Scholarship Board.",
    link: "https://education.gov.ng/federal-scholarships-board/",
  },

  {
    title: "Aliko Dangote STEM Scholars",
    provider: "Aliko Dangote Foundation",
    category: "Undergraduate",
    type: "Nigeria",
    amount: "Up to ₦600,000 yearly",
    deadline: "Programme rollout",
    status: "Announced",
    description:
      "A major education support initiative announced for undergraduate students in Nigerian public universities and polytechnics.",
    eligibility:
      "Nigerian undergraduate students who meet the programme's eventual selection requirements.",
    link: "https://www.dangote.com/",
  },

  {
    title: "Mauritius-Africa Scholarship Scheme",
    provider: "Government of Mauritius",
    category: "Undergraduate",
    type: "International",
    amount: "Scholarship support",
    deadline: "Check official announcement",
    status: "Check",
    description:
      "Scholarship opportunities for eligible Nigerian undergraduate and postgraduate students for study in Mauritius.",
    eligibility:
      "Eligible Nigerian students meeting the academic and admission requirements.",
    link: "https://education.gov.ng/",
  },

  {
    title: "Government of Serbia Scholarship Programme",
    provider: "Government of Serbia",
    category: "Undergraduate & Postgraduate",
    type: "International",
    amount: "Tuition support",
    deadline: "2026 cycle",
    status: "Closed",
    description:
      "A scholarship programme for eligible Nigerian students pursuing undergraduate or postgraduate studies in Serbia.",
    eligibility:
      "Eligible Nigerian applicants who satisfy the programme's academic and application requirements.",
    link: "https://education.gov.ng/",
  },

  {
    title: "Morocco Undergraduate Scholarship",
    provider: "Government of Morocco",
    category: "Undergraduate",
    type: "International",
    amount: "Tuition + monthly stipend",
    deadline: "15 July 2026",
    status: "Closed",
    description:
      "Scholarship opportunity for eligible Nigerian students seeking undergraduate study in Morocco.",
    eligibility:
      "Eligible Nigerian undergraduate applicants selected through the relevant Nigerian scholarship process.",
    link: "https://education.gov.ng/",
  },

  {
    title: "Morocco Vocational Training Scholarship",
    provider: "Government of Morocco",
    category: "Vocational",
    type: "International",
    amount: "Training + monthly stipend",
    deadline: "15 July 2026",
    status: "Closed",
    description:
      "Vocational training scholarship opportunity available through the Nigerian Federal Ministry of Education's international scholarship notices.",
    eligibility:
      "Eligible Nigerian applicants who satisfy the programme requirements.",
    link: "https://education.gov.ng/",
  },

  {
    title: "Commonwealth Scholarships",
    provider: "Commonwealth Scholarship Commission",
    category: "Postgraduate",
    type: "International",
    amount: "Varies",
    deadline: "Check official announcement",
    status: "Check",
    description:
      "Scholarship and fellowship opportunities for eligible Nigerian students pursuing postgraduate study through Commonwealth programmes.",
    eligibility:
      "Eligible Nigerian postgraduate applicants meeting the relevant Commonwealth requirements.",
    link: "https://education.gov.ng/2026-2027-commonwealth-scholarships/",
  },
];

const categories = [
  "All",
  "Undergraduate",
  "Postgraduate",
  "Vocational",
];

const types = ["All", "Nigeria", "International"];

const Page = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedType, setSelectedType] = useState("All");

  const filteredScholarships = scholarships.filter((scholarship) => {
    const matchesSearch =
      scholarship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scholarship.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scholarship.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      scholarship.category.includes(selectedCategory);

    const matchesType =
      selectedType === "All" || scholarship.type === selectedType;

    return matchesSearch && matchesCategory && matchesType;
  });

  return (
    <main className="scholarships-page">
      <section className="scholarships-hero">
        <div className="scholarships-container">
          <div className="scholarships-hero-content">
            <span className="scholarships-badge">
              <GraduationCap size={16} />
              Scholarship Opportunities
            </span>

            <h1>Find scholarships that can support your education.</h1>

            <p>
              Explore verified scholarship opportunities for Nigerian
              students, from local awards to international programmes.
            </p>

            <div className="hero-stats">
              <div>
                <strong>{scholarships.length}+</strong>
                <span>Opportunities</span>
              </div>

              <div>
                <strong>Nigeria</strong>
                <span>Focused</span>
              </div>

              <div>
                <strong>Official</strong>
                <span>Sources</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="scholarships-section">
        <div className="scholarships-container">
          <div className="scholarships-heading">
            <div>
              <span className="section-label">Explore Opportunities</span>
              <h2>Scholarships for students</h2>
              <p>
                Search by study level or scholarship location to find
                opportunities that may fit you.
              </p>
            </div>
          </div>

          <div className="scholarships-controls">
            <div className="scholarships-search">
              <Search size={20} />

              <input
                type="text"
                placeholder="Search scholarships..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              {types.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {filteredScholarships.length > 0 ? (
            <div className="scholarships-grid">
              {filteredScholarships.map((scholarship) => (
                <article
                  className="scholarship-card"
                  key={scholarship.title}
                >
                  <div className="scholarship-card-top">
                    <div className="scholarship-icon">
                      <GraduationCap size={23} />
                    </div>

                    <span
                      className={`scholarship-status ${scholarship.status
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      {scholarship.status}
                    </span>
                  </div>

                  <div className="scholarship-card-content">
                    <span className="scholarship-provider">
                      {scholarship.provider}
                    </span>

                    <h3>{scholarship.title}</h3>

                    <p>{scholarship.description}</p>

                    <div className="scholarship-info">
                      <div>
                        <Wallet size={17} />
                        <span>{scholarship.amount}</span>
                      </div>

                      <div>
                        <CalendarDays size={17} />
                        <span>{scholarship.deadline}</span>
                      </div>

                      <div>
                        <BookOpen size={17} />
                        <span>{scholarship.category}</span>
                      </div>

                      <div>
                        <Globe size={17} />
                        <span>{scholarship.type}</span>
                      </div>
                    </div>

                    <div className="eligibility-box">
                      <strong>Eligibility</strong>
                      <p>{scholarship.eligibility}</p>
                    </div>

                    <a
                      href={scholarship.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="scholarship-button"
                    >
                      Official Source
                      <ExternalLink size={16} />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="scholarships-empty">
              <Search size={42} />
              <h3>No scholarships found</h3>
              <p>
                Try searching for another scholarship, provider or study
                level.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="scholarship-safety">
        <div className="scholarships-container">
          <div className="safety-box">
            <div className="safety-icon">
              <ShieldCheck size={26} />
            </div>

            <div>
              <h3>Stay safe from scholarship scams</h3>

              <p>
                CampusPlug does not charge students to access scholarship
                information. Always verify opportunities through the official
                organisation before submitting personal information or paying
                any fee.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="scholarship-cta">
        <div className="scholarships-container">
          <div className="scholarship-cta-content">
            <span className="section-label">Keep preparing</span>

            <h2>Your scholarship journey starts with preparation.</h2>

            <p>
              Keep your grades strong, follow your syllabus and practise
              consistently while you look for opportunities.
            </p>

            <div className="scholarship-cta-buttons">
              <Link href="/study-guide" className="scholarship-primary">
                Study Guide
                <ArrowRight size={18} />
              </Link>

              <Link href="/syllabus" className="scholarship-secondary">
                Explore Syllabus
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

"use client";

import React from "react";
import Link from "next/link";
import {
  BookOpen,
  Target,
  CalendarDays,
  Brain,
  ClipboardCheck,
  Clock3,
  AlertTriangle,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  Lightbulb,
  Laptop,
} from "lucide-react";

import "./page.css";

const studySteps = [
  {
    icon: Target,
    number: "01",
    title: "Know your target",
    description:
      "Set a realistic UTME score target and understand the requirements for the course and school you want.",
  },
  {
    icon: BookOpen,
    number: "02",
    title: "Know your syllabus",
    description:
      "Use the JAMB syllabus to identify the topics you need to cover for each of your four subjects.",
  },
  {
    icon: CalendarDays,
    number: "03",
    title: "Create a timetable",
    description:
      "Divide your available study time across your subjects and give extra attention to difficult topics.",
  },
  {
    icon: Brain,
    number: "04",
    title: "Study actively",
    description:
      "Don't just read. Explain concepts, solve questions, make short notes and test yourself regularly.",
  },
  {
    icon: ClipboardCheck,
    number: "05",
    title: "Practise with questions",
    description:
      "Use past questions and CBT practice to become familiar with JAMB's question style and timing.",
  },
  {
    icon: TrendingUp,
    number: "06",
    title: "Track your progress",
    description:
      "Review your scores, identify weak areas and adjust your study plan as you improve.",
  },
];

const subjectGuides = [
  {
    title: "Use of English",
    slug: "use-of-english",
    description:
      "Focus on comprehension, grammar, vocabulary, sentence interpretation, and other UTME English skills.",
  },
  {
    title: "Mathematics",
    slug: "mathematics",
    description:
      "Build strong foundations in algebra, geometry, statistics, trigonometry, and problem-solving.",
  },
  {
    title: "Physics",
    slug: "physics",
    description:
      "Understand mechanics, electricity, waves, heat, optics, and modern physics.",
  },
  {
    title: "Chemistry",
    slug: "chemistry",
    description:
      "Master atomic structure, bonding, stoichiometry, organic chemistry, acids, bases, and reactions.",
  },
  {
    title: "Biology",
    slug: "biology",
    description:
      "Study cells, genetics, ecology, evolution, reproduction, human systems, and living organisms.",
  },
  {
    title: "Agricultural Science",
    slug: "agricultural-science",
    description:
      "Study crop production, animal production, soil science, farm management, and agricultural economics.",
  },
  {
    title: "Economics",
    slug: "economics",
    description:
      "Understand demand and supply, markets, production, national income, money, and economic development.",
  },
  {
    title: "Commerce",
    slug: "commerce",
    description:
      "Study trade, business organizations, banking, insurance, transportation, and commercial activities.",
  },
  {
    title: "Accounting",
    slug: "accounting",
    description:
      "Practise financial accounting, bookkeeping, ledgers, trial balance, final accounts, and accounting principles.",
  },
  {
    title: "Government",
    slug: "government",
    description:
      "Study political institutions, constitutions, democracy, Nigerian government, and international relations.",
  },
  {
    title: "History",
    slug: "history",
    description:
      "Learn important Nigerian, African, and world historical events, people, movements, and developments.",
  },
  {
    title: "Geography",
    slug: "geography",
    description:
      "Study physical and human geography, maps, climate, population, resources, and environmental processes.",
  },
  {
    title: "Literature in English",
    slug: "literature-in-english",
    description:
      "Develop skills in prose, poetry, drama, literary appreciation, themes, characters, and literary devices.",
  },
  {
    title: "Christian Religious Studies",
    slug: "christian-religious-studies",
    description:
      "Study biblical teachings, Christian principles, important events, personalities, and their applications.",
  },
  {
    title: "Islamic Religious Studies",
    slug: "islamic-religious-studies",
    description:
      "Study the Qur'an, Hadith, Islamic history, practices, beliefs, ethics, and Islamic institutions.",
  },
  {
    title: "Computer Studies",
    slug: "computer-studies",
    description:
      "Study computer fundamentals, hardware, software, data processing, networking, and information technology.",
  },
  {
    title: "Fine Art",
    slug: "fine-art",
    description:
      "Study drawing, painting, design, art history, artistic principles, and practical visual arts concepts.",
  },
  {
    title: "French",
    slug: "french",
    description:
      "Develop French comprehension, vocabulary, grammar, communication, and knowledge of French texts.",
  },
  {
    title: "Arabic",
    slug: "arabic",
    description:
      "Study Arabic comprehension, grammar, vocabulary, literature, and language usage.",
  },
  {
    title: "Music",
    slug: "music",
    description:
      "Study musical elements, notation, theory, history, instruments, and musical appreciation.",
  },
  {
    title: "Physical & Health Education",
    slug: "physical-and-health-education",
    description:
      "Study physical fitness, sports, health education, human movement, and basic principles of physical activity.",
  },
]

const mistakes = [
  "Studying without a clear timetable",
  "Ignoring difficult topics until the last minute",
  "Only reading without practising questions",
  "Memorising answers instead of understanding concepts",
  "Never reviewing previous mistakes",
  "Spending too much time on one question during CBT",
];

const examTips = [
  "Read every question carefully before selecting an answer.",
  "Keep an eye on the timer throughout the examination.",
  "Skip difficult questions and return to them later.",
  "Don't change an answer without a good reason.",
  "Stay calm if you encounter difficult questions.",
  "Use the practice period to become comfortable with the CBT interface.",
];

const Page = () => {
  return (
    <div className="study-guide-page">

      {/* Hero */}

      <section className="study-guide-hero">
        <div className="study-guide-container">

          <div className="study-guide-badge">
            <BookOpen size={16} />
            UTME STUDY GUIDE
          </div>

          <h1>
            Study smarter.
            <span> Prepare with purpose.</span>
          </h1>

          <p>
            A practical guide to help you organise your preparation,
            practise effectively and walk into your UTME with confidence.
          </p>

          <div className="hero-actions">
            <Link href="/syllabus" className="primary-guide-btn">
              Explore syllabus
              <ArrowRight size={17} />
            </Link>

            <Link href="/tools" className="secondary-guide-btn">
              Explore study tools
            </Link>
          </div>

        </div>
      </section>


      {/* Preparation Steps */}

      <section className="guide-section">
        <div className="study-guide-container">

          <div className="guide-section-heading">
            <small>YOUR PREPARATION</small>

            <h2>
              A simple way to prepare for UTME
            </h2>

            <p>
              You don't need to study everything at once. Build a system,
              stay consistent and keep improving.
            </p>
          </div>


          <div className="study-steps">

            {studySteps.map((step) => {

              const Icon = step.icon;

              return (
                <div className="study-step" key={step.number}>

                  <div className="step-top">

                    <div className="step-icon">
                      <Icon size={21} />
                    </div>

                    <span>{step.number}</span>

                  </div>

                  <h3>{step.title}</h3>

                  <p>{step.description}</p>

                </div>
              );
            })}

          </div>

        </div>
      </section>


      {/* How To Study */}

      <section className="study-method-section">
        <div className="study-guide-container">

          <div className="method-grid">

            <div className="method-content">

              <small>HOW TO STUDY</small>

              <h2>
                Make your study sessions count.
              </h2>

              <p>
                The goal isn't to spend the most hours studying. The goal is
                to use your time effectively and remember what you learn.
              </p>

              <div className="method-list">

                <div>
                  <CheckCircle2 size={19} />
                  <span>
                    Break large topics into smaller study sessions.
                  </span>
                </div>

                <div>
                  <CheckCircle2 size={19} />
                  <span>
                    Test yourself after studying instead of only rereading.
                  </span>
                </div>

                <div>
                  <CheckCircle2 size={19} />
                  <span>
                    Review topics you previously struggled with.
                  </span>
                </div>

                <div>
                  <CheckCircle2 size={19} />
                  <span>
                    Mix learning with CBT practice and past questions.
                  </span>
                </div>

              </div>

            </div>


            <div className="study-method-card">

              <div className="method-card-icon">
                <Brain size={28} />
              </div>

              <h3>Active recall</h3>

              <p>
                Close your book and try to explain what you just learned
                from memory. Then check what you missed.
              </p>

              <div className="method-card-tip">
                <Lightbulb size={18} />

                <span>
                  Ask yourself: "What can I remember without looking?"
                </span>
              </div>

            </div>

          </div>

        </div>
      </section>


      {/* Subject Strategies */}

      <section className="guide-section subject-guide-section">
        <div className="study-guide-container">

          <div className="guide-section-heading">

            <small>SUBJECT STRATEGY</small>

            <h2>
              Study each subject differently.
            </h2>

            <p>
              Different subjects require different approaches. Focus on the
              skills each subject tests.
            </p>

          </div>


          <div className="subject-guide-grid">

            {subjectGuides.map((subject) => (

              <div className="subject-guide-card" key={subject.title}>

                <div className="subject-guide-icon">
                  <BookOpen size={20} />
                </div>

                <h3>{subject.title}</h3>

                <p>{subject.description}</p>

                {subject.slug ? (
                <Link href={`/syllabus/${subject.slug}`}>
                    View Syllabus
                    <ArrowRight size={16} />
                </Link>
                ) : (
                <Link href="/syllabus">
                    View All Subjects
                    <ArrowRight size={16} />
                </Link>
                )}


              </div>

            ))}

          </div>

        </div>
      </section>


      {/* Timetable */}

      <section className="timetable-section">
        <div className="study-guide-container">

          <div className="timetable-box">

            <div className="timetable-icon">
              <CalendarDays size={27} />
            </div>

            <div>

              <small>STUDY TIMETABLE</small>

              <h2>
                Plan your time before you start.
              </h2>

              <p>
                Create a timetable that fits your daily routine. Give each
                subject enough attention and include time for revision and
                practice.
              </p>

              <Link href="./study-timer">
                Open Study Planner
                <ArrowRight size={17} />
              </Link>

            </div>

          </div>

        </div>
      </section>


      {/* Common Mistakes */}

      <section className="guide-section">
        <div className="study-guide-container">

          <div className="guide-section-heading">

            <small>AVOID THESE</small>

            <h2>
              Common preparation mistakes
            </h2>

            <p>
              Avoiding these habits can make your preparation more organised
              and effective.
            </p>

          </div>


          <div className="mistakes-grid">

            {mistakes.map((mistake, index) => (

              <div className="mistake-item" key={mistake}>

                <div className="mistake-number">
                  {index + 1}
                </div>

                <span>{mistake}</span>

              </div>

            ))}

          </div>

        </div>
      </section>


      {/* CBT Tips */}

      <section className="cbt-section">
        <div className="study-guide-container">

          <div className="cbt-box">

            <div className="cbt-heading">

              <div className="cbt-icon">
                <Laptop size={25} />
              </div>

              <div>
                <small>EXAM DAY</small>

                <h2>Be ready for CBT.</h2>
              </div>

            </div>


            <div className="exam-tips">

              {examTips.map((tip) => (

                <div className="exam-tip" key={tip}>
                  <CheckCircle2 size={18} />
                  <span>{tip}</span>
                </div>

              ))}

            </div>

          </div>

        </div>
      </section>


      {/* Final CTA */}

      <section className="guide-cta">
        <div className="study-guide-container">

          <div className="guide-cta-content">

            <div>
              <small>KEEP GOING</small>

              <h2>
                Your preparation starts with one good study session.
              </h2>

              <p>
                Use CampusPlug to study, practise and keep track of your
                progress.
              </p>
            </div>

            <Link href="/tools">
              Start studying
              <ArrowRight size={17} />
            </Link>

          </div>

        </div>
      </section>

    </div>
  );
};

export default Page;
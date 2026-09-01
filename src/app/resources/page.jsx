'use client'
import React from 'react'
import './page.css'
import Link from 'next/link'
import Image from 'next/image'
import { GraduationCap } from 'lucide-react'
import { useState } from 'react'
import { Brain } from 'lucide-react'
import { useEffect } from 'react'
import { Notebook } from 'lucide-react'
import { Lightbulb } from 'lucide-react'
import { NotebookPen } from 'lucide-react'
import { BookOpenText } from 'lucide-react'
import { Layers } from 'lucide-react'
import { Gift } from 'lucide-react'
import { Star } from 'lucide-react'
import { Globe } from 'lucide-react'
import { CircleAlert } from 'lucide-react'
import { ShieldCheck } from 'lucide-react'

const page = () => {

  const text = "Curated materials, guides, and tools designed to help students learn smarter, stay organised, and achieve more.";
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

  return (
    <div>
      
      <div className="box">
        <div className="container">
          <div className="left">
            <h3>All-in-one Study Companion <GraduationCap fontWeight={800} size={20} /></h3>
            <h1>Everything You Need <br /><span className="students"> To Study</span> </h1>
            
            <p className="displaytext">{displayText}</p>

            <div className="content">
              <button id="all"><Brain size={20} /> All</button>
              <button className="notebookpen"><NotebookPen id="notebookpen" size={20} /> Study Guides</button>
              <button className="lightbulb"><Lightbulb id="lightbulb" size={20} /> Exam Tips</button>
              <button className="notebook"><Notebook id="notebook" size={20} /> Textbooks</button>
            </div>

          </div>

          <div className="right">
            <Image className="image" src="/images/books.png" width={1000} height={1000} alt='homepage' />
          </div>
        </div>

        <div className="container-2">

          <div className="head">
            <h1>All Resources</h1>
          </div>

          {/* first content */}

          <div className="content">

            <div className="syllabus">
              <p className="syllabus-img"><Notebook size={30} /></p>
              <h3>JAMB Syllabus</h3>
              <p> Official UTME syllabus for all subjects. Know  what to study and what to expect.</p>
              <div className="button">
                <button className="left">Syllabus</button>
                <button className="right">→</button>
              </div>
            </div>

            <div className="syllabus">
              <p className="guide-img"><GraduationCap size={35} /></p>
              <h3>UTME Study Guides</h3>
              <p>Topic-by-topic study notes and explanations to help you  understand better.</p>
              <div className="button">
                <button className="left">Study Guides</button>
                <button className="right">→</button>
              </div>
            </div>

            <div className="syllabus">
              <p className="flashcard-img"><Layers size={30} /></p>
              <h3>Flashcards</h3>
              <p>Flashcards improve memory, boost recalls, and make studying faster and easier</p>
              <div className="button">
                <button className="left">Flashcards</button>
                <button className="right">→</button>
              </div>
            </div>

            <div className="syllabus">
              <p className="tips-img"><Lightbulb size={30} /></p>
              <h3>Exam Preparation Tips</h3>
              <p>Smart strategies, time management and CBT tips to excel in your exams.</p>
              <div className="button">
                <button className="left">Preparation tips</button>
                <button className="right">→</button>
              </div>
            </div>

          </div>

          {/* second content */}

          <div className="content">

            <div className="syllabus">
              <p className="textbook-img"><BookOpenText size={30} /></p>
              <h3>Recommended Textbooks</h3>
              <p>Best textbook for each subject recommended by top students and teachers.</p>
              <div className="button">
                <button className="left">Textbooks</button>
                <button className="right">→</button>
              </div>
            </div>

            <div className="syllabus">
              <p className="tips-img"><Star size={30} /></p>
              <h3>Subject Revision Notes</h3>
              <p>Quick revision notes and key formulas to help you revise faster and smarter.</p>
              <div className="button">
                <button className="left">Revision</button>
                <button className="right">→</button>
              </div>
            </div>

            <div className="syllabus">
              <p className="textbook-img"><Gift size={30} /></p>
              <h3>Scholarships in Nigeria</h3>
              <p>Latest  local and international scholarship for Nigerian students and applicants.</p>
              <div className="button">
                <button className="left">Scholarships</button>
                <button className="right">→</button>
              </div>
            </div>

            <div className="syllabus">
              <p className="syllabus-img"><Globe size={30} /></p>
              <h3>Official JAMB Resources</h3>
              <p>Important links to the official JAMB servicees, portals and helpfuul information.</p>
              <div className="button">
                <button className="left">Study Guides</button>
                <button className="right">→</button>
              </div>
            </div>

          </div>
        </div>

        <div className="container-3">

          <div className="left">
            <p className="alert"><CircleAlert size={50} /></p>

            <div className="notice">
              <h1>Important notice</h1>
              <p>CampusPlug does not provide official JAMB past questions. We provide original practice questions, <br /> study guides, and resources to help prepare better for Exams "UTME included".</p>
            </div>
          </div>

          <div className="right">
            <p  className="check"><ShieldCheck size={60} /></p>
          </div>

        </div>
      </div>
      
    </div>
  )
}

export default page

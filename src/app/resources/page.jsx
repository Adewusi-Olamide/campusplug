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

const page = () => {

  const text = "Curated materials, guides, and tools to help you learn smarter, stay organised, and achieve more.";
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let index = 0;

    const typing = setInterval(() => {
      index++;


      setDisplayText(text.substring(0, index));

      if (index >= text.length) {
        clearInterval(typing);
      }
    }, 40);

    return () => clearInterval(typing);
  }, []);

  return (
    <div>
      
      <div className="box">
        <div className="container">
          <div className="left">
            <h3>All-in-one Study Companion <GraduationCap fontWeight={800} size={20} /></h3>
            <h1>Everything You Need <br /><span className="students"> To Study</span> </h1>
            
            <p>{displayText}</p>

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
      </div>
      
    </div>
  )
}

export default page

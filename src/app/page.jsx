'use client'
import { useState } from 'react'
import { useEffect } from 'react'
import React from 'react'
import Image from 'next/image'
import './page.css'

const page = () => {

  const text = "Smart, free and easy-to-use tools to help you study better, plan smarter , and achieve more.";
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let index = 0;

    const typing = setInterval(() => {
      index++;


      setDisplayText(text.substring(0, index));

      if (index >= text.length) {
        clearInterval(typing);
      }
    }, 50);

    return () => clearInterval(typing);
  }, []);

  return (
    <div>

      <div className='box'>

        <div className="ctn">
          <div className="left">
            <h1>All the Tools <br /> <span className="students">Students</span> Need, <br /> All in One Place.</h1>
            
            <p>{displayText}</p>

            <div className="hero-search">
              <i  data-lucide='search'></i>
              <input type="text" id='hero-search'  placeholder='Search for a tool' />
              <button id='heroSearchBtn'>Search</button>
            </div>

            <div className="popular-tools">
              <strong>Popular right now:</strong>
              <button data-search='GPA Calculator'>GPA Calculator</button>
              <button data-search='Study Timer'>Study Timer</button>
              <button data-search='Exam Countdown'>Exam Countdown</button>
              <button data-search='Flashcard Maker'>Flashcard Maker</button>
            </div>

          </div>

          <div className="right">
            <Image className='img' src="/images/IMG-20260827-WA0071 (1).jpg" width={800} height={800} alt='homepage' />
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default page

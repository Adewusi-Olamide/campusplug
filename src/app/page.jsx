'use client'
import { useState } from 'react'
import { useEffect } from 'react'
import React from 'react'
import Image from 'next/image'
import { CheckSquare } from 'lucide-react'
import { GraduationCap } from 'lucide-react'
import { Calculator } from 'lucide-react'
import { Calendar } from 'lucide-react'
import { ArrowRightSquare } from 'lucide-react'
import { Clock } from 'lucide-react'
import { Search } from 'lucide-react'
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
            <h3>All-in-one Study Companion <GraduationCap fontWeight={800} size={20} /></h3>
            <h1>Study Smarter, <br /> <span className="students">Achieve More</span> </h1>
            
            <p>{displayText}</p>

            <div className="buttons">
              <button className='get-started'>Get Started Free →</button>
              <button className='explore'>Explore Features</button>
            </div>

          </div>

          <div className="right">
            <Image className='img' src="/images/boy.png" width={900} height={900} alt='homepage' />
          </div>
        </div>

        <div className="ctn-2">
          <p>POWERFUL FEATURES</p>
          <h1>Everything You Need To Succeed</h1>

          <div className="features">

            <div className="d">
              <p className='clock'><Clock size={25} /></p>
              <h2>Smart Study Timer</h2>
              <p>Stay focused with the study timer <br /> feature and boost productivity.</p>
            </div>

            <div className="d">
              <p className='check'><CheckSquare size={25} /></p>
              <h2>Task & Goal Tracker</h2>
              <p>Organize tasks, set goals, and <br /> track your daily progress.</p>
            </div>

            <div className="d">
              <p className='calculator'><Calculator size={25} /></p>
              <h2>GPA Calculator</h2>
              <p>Calculate your GPA and track <br /> academic performance.</p>
            </div>

            <div className="d">
              <p className='calendar'><Calendar size={25} /></p>
              <h2>Exam Countdown</h2>
              <p>Never miss a deadline with <br /> smart countdown reminders.</p>
            </div>

          </div>
        </div>

      </div>
      
    </div>
  )
}

export default page

'use client'
import { useState } from 'react'
import { useEffect } from 'react'
import Image from 'next/image'
import { CheckSquare } from 'lucide-react'
import { GraduationCap } from 'lucide-react'
import { Calculator } from 'lucide-react'
import { Calendar } from 'lucide-react'
import { Clock } from 'lucide-react'
import { Layers } from 'lucide-react'
import { Notebook } from 'lucide-react'
import { Target } from 'lucide-react'
import { Check } from 'lucide-react'
import './page.css'
import Link from 'next/link'

const page = () => {

  const text = "Smart, free and easy-to-use tools to help you study better, plan smarter, and achieve more.";
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

      <div className='box'>

        <div className="ctn">
          <div className="left">
            <h3>All-in-one Study Companion <GraduationCap fontWeight={800} size={20} /></h3>
            <h1>Study Smarter, <span className="students">Achieve More</span> </h1>
            
            <p className="displaytext1">{displayText}</p>

            <div className="buttons">
              <Link href="/dashboard"><button className='get-started'>My Dashboard</button></Link>
              <Link href="/signin"><button className='explore'>Sign In</button></Link>
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

            <Link href="/study-timer">
            <div className="d">
              <p className='clock'><Clock size={25} /></p>
              <h2>Smart Study Planner</h2>
              <p>Stay focused with the study planner feature and boost productivity.</p>
            </div>
            </Link>

            <Link href="/tasks">
            <div className="d">
              <p className='check'><CheckSquare size={25} /></p>
              <h2>Tasks & Goal Tracker</h2>
              <p>Organize tasks, set goals, and track your daily progress.</p>
            </div>
            </Link>

            <Link href="/calculator">
            <div className="d">
              <p className='calculator'><Calculator size={25} /></p>
              <h2>GPA Calculator</h2>
              <p>Calculate your GPA and track academic performance.</p>
            </div>
            </Link>

            <Link href="/exam-countdown">
            <div className="d">
              <p className='calendar'><Calendar size={25} /></p>
              <h2>Exam Countdown</h2>
              <p>Never miss a deadline with smart countdown reminders.</p>
            </div>
            </Link>

          </div>
        </div>

        <div className="ctn-3">

            <div className="features">
              <div className="left">
                <h3>STUDY TOOLS</h3>
                <h1>Smart Tools for Better Results</h1>
                <p>Use our easy-to-use tools to plan your <br /> study sessions, track your progress, and stay consistent every day.</p>
                <Link href="/tools"><button>Explore All Tools →</button></Link>
              </div>
              
              <Link href="/notes">
              <div className="tools">
                <p className="note"><Notebook size={25} /></p>
                <h1>Notes</h1>
                <p>Create and organize beautiful notes.</p>
                <button>Open Tool →</button>
              </div>
              </Link>

              <Link href="/flashcard">
              <div className="tools">
                <p className="flashcard"><Layers size={25} /></p>
                <h1>Flashcards</h1>
                <p>Learn faster with smart flashcards.</p>
                <button>Open Tool →</button>
              </div>
              </Link>

              <Link href="/focus">
              <div className="tools">
                <p className="focus"><Target size={25} /></p>
                <h1>Focus Mode</h1>
                <p>Eliminate distractions and stay in flow.</p>
                <button>Open Tool →</button>
              </div>
              </Link>
          </div>

        </div>

        <div className="ctn-4">
          <div className="features">
            <div className="left">
              <h1>Ready to Level Up <br /> Your  Study Game?</h1>
              <p>Join thousands of students who are already <br /> studying smarter and achieving more.</p>
            </div>

            <div  className="center">
              <Link href="/signup"><button>Get  Started Free →</button></Link>

              <div className="content">
                <p><Check className="check" size={15} />Free Forever</p>
                <p><Check className="check" size={15} />No Credit Card</p>
                <p><Check className="check" size={15} />Easy To Use</p>
              </div>
            </div>

            <div className="right">
              <Image src="/images/schoolbag.png" width={200} height={200} alt='' />
            </div>
          </div>
        </div>

      </div>
      
    </div>
  )
}

export default page

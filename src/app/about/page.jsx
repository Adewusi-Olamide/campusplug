'use client'
import './page.css'
import { useState } from 'react'
import { useEffect } from 'react'
import React from 'react'
import Link from 'next/link'
import { GraduationCap } from 'lucide-react'
import Image from 'next/image'
import { BookOpen } from 'lucide-react'
import { Globe } from 'lucide-react'
import { ShieldCheck } from 'lucide-react'
import { CircuitBoard } from 'lucide-react'

const page = () => {

  const text = "CampusPlug consists of an all-in-one study companion designed to enable students learn smarter, stay organized, and achieve more.";
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

        <div className="containers">
          <div className="left">
            <h3>All-in-one Study Companion <GraduationCap fontWeight={800} size={20} /></h3>
            <h1>Empowering students, <br /><span className="students"> Building futures.</span> </h1>
            
            <p className="displaytext2">{displayText}</p>

            <Link href="/resources"><button>Explore Resources →</button></Link>

          </div>

          <div className="right">
            <Image className="image" src="/images/pc.png" width={1000} height={1000} alt='homepage' />
          </div>
        </div>

        <div className="containers-2">

          <div className="head">
            <h3>OUR MISSION</h3>
            <h1>Why  CampusPlug?</h1>
            <p>We believe every student deserves the right tools to succeed. <br />
            CampusPlug makes quality study resources acccesible, organized, <br /> and easy to use anytime, anywhere.</p>
          </div>

          <div className="about">
            
            <div>
              <p className="icon"><BookOpen size={25} /></p>
              <h1>Student Focused</h1>
              <p>Built specifically for students and their academic journey. </p>
            </div>

            <div>
              <p className="icon"><Globe size={25} /></p>
              <h1>Accessible</h1>
              <p>Access study materials anytime, anywhere.</p>
            </div>

            <div>
              <p className="icon"><CircuitBoard size={25} /></p>
              <h1>Smart & Simple</h1>
              <p>Powerful features with a clean, easy-to-use design.</p>
            </div>

            <div>
              <p className="icon"><ShieldCheck size={25} /></p>
              <h1>Reliable Content</h1>
              <p>Curated resources you can trust for better learning.</p>
            </div>

          </div>

        </div>

        <div className="containers-3">
          <div className="left">

            <h3>OUR STORY<GraduationCap fontWeight={800} size={20} /></h3>
            <h1>How it all started</h1>
            <p>CampusPlug was created with a simple idea: studying should be easier not harder. As students ourselves,
              we faced the same challenges "scattered notes, hard-to-find resources, and lack of organization."
              <br /> <br /> <br />So we built CampusPlug to bring everything together in one place and help students focus on what matters most "learning and growing."
            </p>
          </div>

          <div className="right">
            <Image className="image" src="/images/campuspc.png" width={1000} height={1000} alt='homepage' />
          </div>
        </div>

        <div className="containers-4">
        
          <div className="left">
            <p className="grad"><GraduationCap size={50} /></p>

            <div className="notice">
              <h1>Ready to study smarter?</h1>
              <p>Join thousands of students already using CampusPlug <br /> to power their academic success.</p>
            </div>
          </div>

          <div className="right">
            <Link href="/signup">
            <button>Get Started for Free</button>
            </Link>
          </div>

        </div>

      </div>
      
    </div>
  )
}

export default page

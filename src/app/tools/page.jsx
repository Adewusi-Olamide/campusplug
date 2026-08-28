import React from 'react'
import './page.css'
import Image from 'next/image'

const page = () => {
  return (
    <div>
      <main className='tools-hero'>
          <div className="hero-content">
            <span className="hero-small-title">CAMPUS PLUG TOOLS</span>
            <h1>Explore All <span>Tools</span></h1>
            <p>Powerful, easy-to-use tools to help you study smarter, stay organized and get things done.</p>
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

          <div className="hero-image">
            <Image src="/images/UYFAE4615.JPG" alt='' width={500} height={500} />
          </div>

          <section className='tools-section'>
             <aside className="tools-sidebar">
              <h3>Categories</h3>

              <div className="category-list">
                <button className="category-active" data-category='all'>
                  <i data-lucide='layout-grid'></i>
                  <span>All Tools</span>
                  <b>20</b>
                </button>

                <button className="category" data-category='academic'>
                  <i data-lucide='graduation-cap'></i>
                  <span>Academic</span>
                  <b>6</b>
                </button>

                <button className="category" data-category='calculator'>
                  <i data-lucide='calculator'></i>
                  <span>Calculators</span>
                  <b>5</b>
                </button>

                <button className="category" data-category='productivity'>
                  <i data-lucide='timer'></i>
                  <span>Productivity</span>
                  <b>4</b>
                </button>

                <button className="category" datacategory='organisation'>
                  <i data-lucide='calender'></i>
                  <span>Organisation</span>
                  <b>2</b>
                </button>

                <button className="category" data-category='utilities'>
                  <i data-lucide='wrench'></i>
                  <span>Utilities</span>
                  <b>2</b>
                </button>

                <button className="category" data-category='fun'>
                  <i data-lucide='smile'></i>
                  <span>Fun</span>
                  <b>1</b>
                </button>
              </div>

              <div className="rocket-card">
                <Image src="/images/IKXN7803.PNG" alt='' width={100} height={100} />
                <h3>Have an idea for a tool?</h3>
                <p>Tell us what tool you need and we might build it!</p>
                <button>Request a Tool</button>
              </div>
             </aside>

             <div className="tools-content">
              <div className="tools-heading">
                <h2>All Tools</h2>
                <select name="" id="sortTools">
                <option value="popular">Sort by:  Popular</option>
                <option value="az">Sort A-Z</option>
                </select>
              </div>

              <section className="tool-category" data-name='academic'>
                <div className="category-heading"></div>
                <div className="section-title">
                  <span className="section-icon-purple">
                    <i data-lucide='graduation-cap'></i>
                  </span>
                  <h2>Academic Tools</h2>
                </div>

                <p>Tools to help you learn, calculate and excel in your studies</p>
                <div>
                  <a href="#">View all➡</a>
                </div>

                <div className="tool-grid">
                  <article className="tool-card" data-name='GPA Calculator' data-category={'academic calculators'}>
                    <div className="tool-icon-green">
                      <i data-lucide='calculator'></i>
                    </div>
                    <h3>GPA Calculator</h3>
                    <p>Calculate your GPA and track your academic performance.</p>
                    <a href="#">Use Now <span>➡</span></a>
                  </article>

                  <article className='tool-card' data-name='Percentage Calculator' data-category='academic calculators'>
                    <div className="tool-icon-orange">
                      <i data-lucide='percent'></i>
                    </div>
                    <h3>Percentage Calculator</h3>
                    <p>Quickly calculate percentages for your grades and scores.</p>
                    <a href="#">Use Now <span>➡</span></a>
                  </article>

                  <article className="tool-card" data-name='Grade Calculator' data-category='academic'>
                    <div className="tool-icon-blue">
                      <i data-lucide='clipboard-check'></i>
                    </div>
                    <h3>Grade Calcculator</h3>
                    <p>Find out the grades you need  to achieve your goal.</p>
                    <a href="#">Use Now <span>➡</span></a>
                  </article>

                  <article className="tool-card" data-name='Exam Countdown' data-category='academic organisation'>
                    <div className="tool-icon-pink">
                      <i data-lucide='calender-days'></i>
                    </div>
                    <h3>Exam Countdown</h3>
                    <p>Countdown to your exams and never miss an important date.</p>
                    <a href="#">Use Now <span>➡</span></a>
                  </article>
                </div>
              </section>

              <section className="tool-category" data-section='productivity'>
                <div className="category-heading">
                  <div>
                    <div className="section-title">
                      <span className="section-icon-blue-purple">
                        <i data-lucide='zap'></i>
                      </span>
                      <h2>Productivity Tools</h2>
                    </div>
                    <p>Stay focused, manage your time and get more done.</p>
                  </div>
                  <a href="#">View  all➡</a>
                </div>

                <div className="tool-grid">
                  <article className="tool-card" data-name='Study Timer' data-category='productivity'>
                    <div className="tool-icon-blue">
                      <i data-lucide='timer'></i>
                    </div>
                    <h3>Study Timer</h3>
                    <p>Stay focused with our pomodoro timer and boost productivity.</p>
                    <a href="#">Use Now <span>➡</span></a>
                  </article>

                  <article className="tool-card" data-name='Study Timetable' data-category='productivity organisation'>
                    <div className="tool-icon-purple">
                      <i data-lucide='calender'></i>
                    </div>
                    <h3>Study Timetable</h3>
                    <p>Create a personalized study timetable that works for you.</p>
                    <a href="#">Use Now <span>➡</span></a>
                  </article>

                  <article className="tool-card" data-name='To do List' data-category='productivity organisation'>
                    <div className="tool-icon-green">
                      <i data-lucide='list-check'></i>
                    </div>
                    <h3>To Do List</h3>
                    <p>Organize your tasks and never miss what matters.</p>
                    <a href="#">Use Now <span>➡</span></a>
                  </article>

                  <article className="tool-card" data-name='Notes Organizer' data-category='organization'>
                    <div className="tool-icon-blue">
                      <i data-lucide='folder'></i>
                    </div>
                    <h3>Notes Organizer</h3>
                    <p>Organize your notes by subjects, topic and tags.</p>
                    <a href="#">Use Now <span>➡</span></a>
                  </article>
                </div>
              </section>
             </div>
          </section>

          <section className="tool-category" data-section='utilities'>
            <div className="category-heading">
              <div>
                <div className="section-title">
                  <span className="section-icon-pink-purple">
                    <i data-lucide='smile'></i>
                  </span>
                  <h2>Utility & Fun Tools</h2>
                </div>
                <p>Helpful utilities and fun tools for everyday student life.</p>
              </div>
              <a href="#">View all➡</a>
            </div>

            <div className="tool-grid">
              <article className="tool-card" data-name='Unit Converter' data-category='utilities'>
                <div className="tool-icon">
                  <i data-lucide='refresh-cw'></i>
                </div>
                <h3>Unit Converter</h3>
                <p>Convert between different units quickly and accurately.</p>
                <a href="#">Use Now <span>➡</span></a>
              </article>

               <article className="tool-card" data-name='Flascard Maker' data-category='academic fun'>
                <div className="tool-icon">
                  <i data-lucide='refresh-book-open'></i>
                </div>
                <h3>Flashcard Maker</h3>
                <p>Create digital flashcards to study and remember better.</p>
                <a href="#">Use Now <span>➡</span></a>
              </article>

               <article className="tool-card" data-name='Quiz Generator' data-category='fun academic'>
                <div className="tool-icon">
                  <i data-lucide='help-circle'></i>
                </div>
                <h3>Quiz Generator</h3>
                <p>Generate quizzes from your notes and test your knowledge.</p>
                <a href="#">Use Now <span>➡</span></a>
              </article>

               <article className="tool-card" data-name='Budget Calculator' data-category='Calculators'>
                <div className="tool-icon">
                  <i data-lucide='wallet'></i>
                </div>
                <h3>Budget Calculator</h3>
                <p>Manage your finances and plan your student budget.</p>
                <a href="#">Use Now <span>➡</span></a>
              </article>
            </div>
          </section>

          <section className="stats-section">
            <div className="stat">
              <div className="stat-icon-purple">
                <i data-lucide='users'></i>
              </div>
              <div>
                <strong>10,000+</strong>
                <span>Students using our tools</span>
              </div>
            </div>

            <div className="stat">
              <div className="stat-icon-blue">
                <i data-lucide='shield-check'></i>
              </div>

              <div>
                <strong>100% Free</strong>
                <span>All tools are free to use</span>
              </div>
            </div>

            <div className="stat">
              <div className="stat-icon-yellow">
                <i data-lucide='zap'></i>
              </div>
              <div>
                <strong>No Sign Up</strong>
                <span>Use tools instantly</span>
              </div>
            </div>

            <div className="stat">
              <div className="stat-iconn-green">
                <i data-lucide='lock'></i>
              </div>

              <div>
                <strong>Safe & Private</strong>
                <span>Your data stays private with us</span>
              </div>
            </div>
          </section>
      </main>
    </div>
  )
}

export default page

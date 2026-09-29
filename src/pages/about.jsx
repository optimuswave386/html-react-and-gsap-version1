import { React } from 'react'
import ScrollTrigger from 'gsap/ScrollTrigger'

import '../assets/css/main.css' // Import main CSS file
import Header from '../components/header.jsx'
import HeaderForAboutPage from '../components/headerForAboutPage.jsx'
import Footer from '../components/footer.jsx'

function About() {

  return (
    <>

      <Header />

      <div className="container">

        <div id="gridcontainer">

            <div id="one">
              <HeaderForAboutPage />    
            </div>

            <div id="two">

                <div className="px-4 py-5 mb-0 mt-0" style={{backgroundColor: '#ffffff'}}>

                  <div className="row px-0 py-0 mb-0 mt-0">
                
                    <div className="col-12" style={{backgroundColor: '#ffffff'}}><h1>About Me</h1>
                      <div>
                        <p className="lead" style={{backgroundColor: 'azure', padding: '10px'}}>
                          The world of technology is evolving at a breathtaking pace. From the early days of dial-up modems and Windows 95 to today's AI-driven cloud infrastructure and quantum computing, I&apos;ve lived through — and worked through — it all. This is my story of how I navigated an ever-shifting industry, the skills I gained, the challenges I faced, and where I stand today.
                        </p>
                      </div>

                      <section style={{border: '1px solid #fafafa', padding: '45px 20px 0px 20px'}}>
                        
                        <h4>The Early Days: Dial-Up, Windows, and Web Design</h4>
                        <p><span>Like many tech enthusiasts of my generation, my journey began with Microsoft Windows and the pages of PC Magazine. Back in the late '90s, I was introduced to web development through Microsoft FrontPage, although I didn’t fully grasp how the internet or operating systems worked. Internet connectivity was unreliable, and downloading a single image via modem could take several minutes. Things changed when I got a DSL line, and later access to a T1/E1 campus network, which opened up a whole new world. I began experimenting with Adobe Photoshop, Macromedia Flash, Dreamweaver, and QuickTime, gaining a foundation in creative and multimedia software. These tools were bundled with tech magazines and became my first real playground for learning.</span></p>
                      
                      <hr />
                      
                        <h4>Breaking Into the Industry: Multimedia and QA</h4>
                        <p><span>My first professional break came when I started working with Adobe Director, creating multimedia content for CDs. It was an exciting time—I was creating digital products that combined sound, video, and interaction. From there, I shifted my focus to web development with PHP and MySQL, but soon found my calling in software testing and quality assurance. Using tools like WinRunner and QTP, I worked on testing business applications and began to understand the importance of QA in delivering stable software. Along the way, I built a strong foundation in enterprise database systems like IBM DB2 and Oracle, broadening my technical skill set.</span></p>
                      
                      <hr />
                      
                        <h4>Diving Deeper: Cybersecurity and Networking</h4>
                        <p><span>To stay ahead, I pursued training in ethical hacking through the EC-Council, learning about malware, viruses, penetration testing, and cyber defense strategies. This knowledge led to a role as a networking consultant, where I supported network devices for corporate clients. By this time, I was proficient across both Mac and Windows environments, and my understanding of technology had become both broad and deep—from operating systems and software to databases and networking. To broaden my technical expertise, I completed many other training courses over time, which introduced me to cybersecurity fundamentals—malware, viruses, and ethical hacking techniques. This knowledge led to a consulting role in network device support for corporate clients, marking my entry into professional networking. By this point, I had developed a strong working knowledge of both Mac and Windows operating systems, as well as a holistic view of how technology integrates across hardware, software, and network layers. However, after several years in tech, I decided to take a break.</span></p>
                    
                      <hr />

                      <h4>Navigating a Career Through the Evolving World of Technology</h4>
                        <p><span>The foundational learning platform for aspiring and experienced networking professionals in recent years has been Google search engine, almost every major networking hardware manufacturer has introduced its own education and certification platforms—designed to serve everyone from novice users to seasoned experts. Today's networking devices come in diverse hardware and software configurations, with emerging technologies like quantum computing pushing the boundaries of possibility. However, the learning curve has steepened considerably. Unlike the relatively straightforward tech landscape of the early Windows era, modern roles in IT are far more competitive. The oversupply of tech professionals in combination with the breakneck pace of innovation has made it harder to secure stable roles, even as overall productivity in the sector has surged. Tech giants such as Apple have played a pivotal role in stabilizing the global market, fostering brand competition and creating user ecosystems that span across continents. Meanwhile, Google has led the charge in artificial intelligence, applying advanced machine learning and statistical models to revolutionize data science, analytics, and search. Its AI-powered search capabilities, supported by vast cloud data centers, now provide tools and insights at a scale previously unimaginable.</span></p>

                      <hr />
                    
                        <h4>Shifting Gears: From Tech to Sales — and Back Again</h4>
                        <p><span>After several years in the field, I took a break from tech. Re-entering the industry wasn’t easy. I explored a sales-oriented role, which, while insightful, didn’t align with my core interests or skill set. This transition marked the beginning of a six-year period of unemployment, during which I took the opportunity to complete a degree in cybersecurity. Despite the gap in employment, I remained committed to learning and keeping pace with the fast-moving tech world.</span></p>
                      
                      <hr />
                      
                        <h4>Today&apos;s Tech Landscape: AI, Cloud, and Challenges of Re-entry</h4>
                        <p><span>Today’s computing environment is dominated by cloud technologies, artificial intelligence, and automation. Platforms like Cisco NetAcad and certifications from other manufacturers now serve a wide range of users—from novices to professionals—yet the barriers to entry have grown. Jobs are increasingly competitive. Technologies like quantum computing and machine learning demand specialized knowledge. Companies like Google and Apple continue to lead the charge, building AI-powered tools that redefine productivity, data analysis, and global connectivity. While the oversupply of tech talent makes finding roles more difficult, the complexity of these systems means there's always more to learn—and that's where I continue to invest my time and energy. Returning to the workforce proved challenging. I moved into a sales-oriented role, but ultimately found myself facing a six-year stretch of unemployment. During this period, I pursued further education and successfully completed a degree in cybersecurity. Despite the additional credentials, re-entering the tech workforce has remained difficult. The rise of cloud technologies, AI, and automation has reshaped the job market. As computing algorithms grow increasingly complex, keeping up with evolving tools, platforms, and best practices has become a full-time endeavor in itself.</span></p>
                      
                      </section>

                                        <br />
                  <p className='pt-5'>Looking back, my career has been shaped by constant change. From the dial-up days to the era of AI, I&apos;ve grown with the industry&apos;learning, adapting, and evolving. While the path hasn&apos;t always been linear, the knowledge and experience I&apos;ve gained are invaluable. I&apos;m currently exploring new opportunities in cybersecurity, cloud infrastructure, and AI-driven technologies. The journey isn&apos;t over&dash;it&apos;s just taking a new direction.</p>

                    </div>

                  </div>

                </div>

            </div>

            <div id="seven">
              <Footer />
            </div>
        
        </div>

      </div>

    </>

  )

}

export default About

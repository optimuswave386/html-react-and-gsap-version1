import { React } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, NavLink, BrowserRouter } from 'react-router-dom'
import '../assets/css/main.css' // Import main CSS file
import '../assets/css/timeline.css' // Import main CSS file
import Star from '../assets/images/star.png' // Import star image
import Header from '../components/header.jsx'
import FooterForDashboardPage from '../components/footerForDashboardPage.jsx'
import QuoteCard_formatted from '../components/quotesCard.jsx' 

function MyResume() {

  return (
    <>

      <Header />

      <div className="container">

        <div id="gridcontainer">

            <div id="one" className="pb-0 pt-5 pe-5">
                <h1>Résumé & Career Highlights</h1>
                <p className="fs-5 mb-0">
                  This section provides a snapshot of my career—showcasing the skills, achievements, and professional milestones that have shaped my career journey and continue to guide my future goals. I enjoy combining technical skills with problem-solving and collaboration—whether it’s building dashboards, creating prototypes, or supporting digital transformation initiatives. I’m always learning new tools and technologies to stay ahead in the ever-evolving IT landscape.
                </p>
                <QuoteCard_formatted />
            </div>

            <div id="two" className="p-0 pb-5">

<p className="fs-4 mb-0">
<h3>Professional Experience</h3>
</p>

<div className="timeline">
            <p style={{marginLeft: '-20px', backgroundColor: 'white'}}>
              Over 10+ years information technology experience,<br />
- Acquired a broadened outlook as non-technical salesperson over the last ten years<br />
- Learned cybersecurity/analytics, adding greatly to my technical expertise<br />
- Well-versed with requirements in consultant roles for information security<br />
- International job experience with vendors of multinational corporations<br /><br />
            </p>
            <div className="timelineevent">
                <span className="timelinestar"><img src={Star} alt="Star" /></span>
                <div className="timelineeventdetails">
                    <div className="timelinedate" style={{padding: '5px'}}>2025-present</div>
                    <div className="timelinedescription">Freelance web designer/developer is a self-employed professional who creates, designs, builds, and maintains websites for different clients. They combine creative skills to make websites visually appealing and user-friendly with technical skills to ensure the websites function properly. Freelancers may work with businesses, individuals, or organizations and are typically paid per project, by the hour, or through ongoing maintenance services.
                    </div>
                </div>
            </div>             
            <div className="timelineevent" style={{
              backgroundColor: 'white'
            }}>
                <span className="timelinestar"><img src={Star} alt="Star" /></span>
                <div className="timelineeventdetails">
                    <div className="timelinedate" style={{padding: '5px'}}>2019-2024</div>
                    <div className="timelinedescription">IS Analyst 
                      or Information Support Analyst bridges the gap between business needs and technology, focusing on designing, implementing, maintaining, and troubleshooting an organization's IT infrastructure, including hardware, software, and networks, to ensure smooth operations, resolve user issues, and support strategic tech goals. Their role involves technical support, system analysis, user training, and working with developers and management to enhance IT performance and security.
                    </div>
                </div>
            </div>
            <div className="timelineevent" style={{ backgroundColor: '#ffffff'}}>
                <span className="timelinestar"><img src={Star} alt="Star" /></span>
                <div className="timelineeventdetails">
                    <div className="timelinedate" style={{padding: '5px'}}>2013-2018</div>
                    <div className="timelinedescription">Sales Assistant 
                      buys/sells computers, software, phones, and related services in retail/wholesale, focusing on customer needs, demonstrating products (like internet plans, mobile accessories), handling transactions, managing stock/displays, and providing basic technical advice to ensure customer satisfaction with their tech purchases. They are the frontline, connecting customers with the right hardware and services, explaining features, and keeping the store stocked and presentable, often bridging the gap between complex tech and everyday users.
                    </div>
                </div>
            </div>
            <div className="timelineevent">
                <span className="timelinestar"><img src={Star} alt="Star" /></span>
                <div className="timelineeventdetails">
                    <div className="timelinedate" style={{padding: '5px'}}>2009-2012</div>
                    <div className="timelinedescription">Web and Systems Engineer
                      is responsible for designing, developing, and maintaining an organization's web applications and IT systems. They ensure websites are functional, user-friendly, and secure while managing servers, databases, and network infrastructure to support overall business operations. Their role combines web development skills with system administration to optimize performance and reliability.
                    </div>
                </div>
            </div>
            <div className="timelineevent">
                <span className="timelinestar"><img src={Star} alt="Star" /></span>
                <div className="timelineeventdetails">
                    <div className="timelinedate" style={{padding: '5px'}}>2005-2008</div>
                    <div className="timelinedescription">QA Analyst
                      ensures that software products meet quality standards and function as intended by designing and executing test plans, identifying bugs, and collaborating with developers to resolve issues. They play a crucial role in maintaining the reliability and performance of applications before they reach end-users. They focus on both manual and automated testing to validate functionality, usability, and security. They also document test results and contribute to continuous improvement processes within the development lifecycle.
                    </div>
                </div>
            </div>
            <div className="timelineevent">
                <span className="timelinestar"><img src={Star} alt="Star" /></span>
                <div className="timelineeventdetails">
                    <div className="timelinedate" style={{padding: '5px'}}>2001-2004</div>
                    <div className="timelinedescription">Web Designer / Developer
                      creates and maintains websites, focusing on both the visual design and technical functionality. They use design principles to craft user-friendly layouts and coding skills to build interactive features, ensuring a seamless online experience for visitors. They collaborate with clients to understand their needs and translate them into effective web solutions, often working with HTML, CSS, JavaScript, and various web development tools.
                    </div>
                </div>
            </div>
            <p>&nbsp;</p>
</div>

            </div>

            <div id="seven">
              <FooterForDashboardPage />
            </div>
        
        </div>

      </div>

    </>
  )
}

export default MyResume
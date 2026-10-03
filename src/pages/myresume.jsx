import '../assets/css/main.css'
import '../assets/css/timeline.css'
import Star from '../assets/images/star.png' // Import star image
import Header from '../components/header.jsx'
import FooterForDashboardPage from '../components/footerForDashboardPage.jsx'
import QuoteCard_formatted from '../components/quotesCard.jsx'

// ---------- Resume data: edit content here ----------

const summary =
  'Versatile IT Professional with over 10 years of cross-functional experience bridging technical development, quality assurance, and stakeholder communication in enterprise projects. Proven track record in translating complex business requirements into scalable software solutions, managing vendor relations, and ensuring high-reliability software delivery. Recently upskilled via the Arkansas ReSkill Program, expanding technical capabilities in cybersecurity architecture, risk analysis, and data analytics. Adept at navigating cross-cultural enterprise environments and collaborating with cross-functional teams to align IT initiatives with core business goals.'

const highlights = [
  '- Acquired a broadened outlook as a non-technical salesperson over ten years',
  '- Learned cybersecurity/analytics, adding greatly to my technical expertise',
  '- Well-versed with requirements in consultant roles for information security',
  '- International job experience with vendors of multinational corporations',
]

const stats = [
  { value: '1,000+', label: 'staff members reached in large-scale technical projects' },
  { value: '200+', label: 'end users supported on enterprise projects' },
  { value: '100+', label: 'technical issues resolved in enterprise applications' },
  { value: '99%', label: 'defect resolution rate in quality assurance roles' },
  { value: '5+', label: 'academic institutions of coursework in IT, cybersecurity and emerging tech' },
]

const projects = [
  {
    title: 'Angular & .NET API / React & SpringBoot Microservices',
    description:
      'Developed a responsive webstore frontend utilizing Material UI, integrating seamlessly with a backend. Configured services to dynamically parse and adapt webstore product feeds driven by databases running containerized in Docker. Identified and resolved system-level workflow blocks between frontend components and backend services.',
    tags: ['Angular', '.NET API', 'React', 'SpringBoot', 'OAuth', 'Material UI', 'Docker'],
  },
  {
    title: 'MERN Stack with Next.js & Stripe',
    description:
      'Engineered a scalable, full-stack JavaScript architecture utilizing React.js for dynamic client-side state management. Built custom RESTful APIs using Express middleware to enforce secure user authentication workflows and robust data isolation, validated with Claude and Google AI.',
    tags: ['Node.js', 'React', 'Express', 'MongoDB', 'Next.js', 'Stripe', 'Vercel'],
  },
  {
    title: 'Laravel Enterprise Application Demo',
    description:
      'Designed a functional web application from scratch featuring Blade templating, custom JavaScript, and stylized Flowbite components. Integrated advanced access controls using Spatie Auth, automated database seeding for rapid deployment testing, and validated routing endpoints using Postman.',
    tags: ['Laravel', 'Blade', 'Flowbite', 'Spatie Auth', 'Postman'],
  },
]

// Timeline - newest first (original content)
const experience = [
  {
    date: '2025 – present',
    title: 'Freelance Web Designer / Developer',
    description:
      'A self-employed professional who creates, designs, builds, and maintains websites for different clients. They combine creative skills to make websites visually appealing and user-friendly with technical skills to ensure the websites function properly. Freelancers may work with businesses, individuals, or organizations and are typically paid per project, by the hour, or through ongoing maintenance services.',
  },
  {
    date: '2019 – 2024',
    title: 'IS Analyst (Information Support Analyst)',
    description:
      "Bridges the gap between business needs and technology, focusing on designing, implementing, maintaining, and troubleshooting an organization's IT infrastructure, including hardware, software, and networks, to ensure smooth operations, resolve user issues, and support strategic tech goals. The role involves technical support, system analysis, user training, and working with developers and management to enhance IT performance and security.",
  },
  {
    date: '2013 – 2018',
    title: 'Sales Assistant',
    description:
      'Buys/sells computers, software, phones, and related services in retail/wholesale, focusing on customer needs, demonstrating products (like internet plans, mobile accessories), handling transactions, managing stock/displays, and providing basic technical advice to ensure customer satisfaction with their tech purchases. They are the frontline, connecting customers with the right hardware and services, explaining features, and keeping the store stocked and presentable, often bridging the gap between complex tech and everyday users.',
  },
  {
    date: '2009 – 2012',
    title: 'Web and Systems Engineer',
    description:
      "Responsible for designing, developing, and maintaining an organization's web applications and IT systems. They ensure websites are functional, user-friendly, and secure while managing servers, databases, and network infrastructure to support overall business operations. Their role combines web development skills with system administration to optimize performance and reliability.",
  },
  {
    date: '2005 – 2008',
    title: 'QA Analyst',
    description:
      'Ensures that software products meet quality standards and function as intended by designing and executing test plans, identifying bugs, and collaborating with developers to resolve issues. They play a crucial role in maintaining the reliability and performance of applications before they reach end-users. They focus on both manual and automated testing to validate functionality, usability, and security. They also document test results and contribute to continuous improvement processes within the development lifecycle.',
  },
  {
    date: '2001 – 2004',
    title: 'Web Designer / Developer',
    description:
      'Creates and maintains websites, focusing on both the visual design and technical functionality. They use design principles to craft user-friendly layouts and coding skills to build interactive features, ensuring a seamless online experience for visitors. They collaborate with clients to understand their needs and translate them into effective web solutions, often working with HTML, CSS, JavaScript, and various web development tools.',
  },
]

const education = [
  {
    school: 'Pulaski Technical College',
    place: 'Little Rock, AR',
    degree: 'Associate in Applied Science',
    date: 'December 2024',
    lines: [
      'Computer Information Systems with Cybersecurity',
    ],
  },
  {
    school: 'Andrews University',
    place: 'Berrien Springs, MI',
    degree: 'Bachelor in Technology',
    date: 'December 2004',
    lines: [
            'Transfer Credits: Digital Multimedia/Computer Science',
      'Non-Degree Credits: Marketing/Accounting',
    ],
  },
]

const trainings = [
  { year: '2026', name: 'Freecodecamp' },
  { year: '2025', name: 'GOOGLE Professional Certificates' },
  { year: '2024', name: 'Cisco ENSAv7' },
  { year: '2023', name: 'Cisco ITNv7, SRWEv7' },
  { year: '2023', name: 'NDG Linux I/II' },
  { year: '2022', name: 'NetAcad Intro to Cybersecurity' },
]

const skills = [
  { label: 'Web Development', items: ['Laravel', 'Springboot', 'Wordpress', 'VS Code', 'TextEdit'] },
  { label: 'Languages', items: ['Java/JavaScript', 'PHP/ASP/C#', 'VBScript', 'dotnet (.NET)', 'React (Nodejs)'] },
  { label: 'Cloud Technologies', items: ['Google Cloud', 'BigQuery', 'Oracle Express'] },
  { label: 'Databases', items: ['MySQL', 'MongoDB', 'SQL Server', 'PostgreSQL'] },
  { label: 'Agile & Scrum', items: ['JIRA', 'Trello', 'ChatGPT', 'Claude', 'Google AI'] },
  { label: 'Data Analytics', items: ['Python', 'Power BI (PivotTables, Power Query, dashboards)'] },
  { label: 'Networking', items: ['Wireshark', 'Cisco IOS', 'Git', 'Docker', 'Postman', 'Terminal (Mac)'] },
  { label: 'Operating Systems', items: ['Apple Mac', 'Linux/Unix', 'Windows'] },
  { label: 'Tools', items: ['Microsoft Office (Word, Excel, Powerpoint)', 'Google Apps'] },
]

const expertise = [
  'Requirements Gathering & Analysis (BRD, FRD, SRS)',
  'User Stories & Use Cases',
  'Software Testing & QA',
  'UAT Planning & Coordination',
  'Agile/Scrum & SDLC Methodologies',
  'Full-Stack Web Development',
  'Systems & API Debugging',
  'Vulnerability Assessment & Cybersecurity',
  'Stakeholder Communication & Cross-Functional Alignment',
]

// ---------- Small helpers ----------

function Section({ num, title, children }) {
  return (
    <section className="rsection">
      <header className="rsection-head">
        <span className="rsection-num">{num}</span>
        <h3>{title}</h3>
      </header>
      {children}
    </section>
  )
}

// ---------- Page ----------

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

          <div id="two" className="resumepage p-0 pb-5">

            <div className="rcols">

              {/* ---------- Left column ---------- */}
              <div className="rcol">

                <Section num="01" title="Summary">
                  <p className="rlead">{summary}</p>
                  <p className="rsub">Over 10+ years of information technology experience:</p>
                  <ul className="rbullets">
                    {highlights.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                </Section>

                <Section num="02" title="Key Achievements">
                  <div className="rstats">
                    {stats.map((s) => (
                      <div className="rstat" key={s.value}>
                        <div className="rstat-value">{s.value}</div>
                        <div className="rstat-label">{s.label}</div>
                      </div>
                    ))}
                  </div>
                </Section>

                <Section num="03" title="Current Projects">
                  <div className="rprojects">
                    {projects.map((p) => (
                      <article className="rproject" key={p.title}>
                        <h4>{p.title}</h4>
                        <p>{p.description}</p>
                        <div className="rtags">
                          {p.tags.map((t) => (
                            <span className="rtag" key={t}>{t}</span>
                          ))}
                        </div>
                      </article>
                    ))}
                  </div>
                </Section>

                <Section num="04" title="Education & Trainings">
                  <div className="redu">
                    <div>
                      <h4 className="rsmallhead">Education</h4>
                      {education.map((e) => (
                        <div className="rschool" key={e.school}>
                          <div className="rschool-date">{e.date}</div>
                          <div className="rschool-degree">{e.degree}</div>
                          <div className="rschool-name">{e.school}, {e.place}</div>
                          {e.lines.length > 0 && (
                            <ul className="rbullets rbullets-tight">
                              {e.lines.map((l) => (
                                <li key={l}>{l}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                    <div>
                      <h4 className="rsmallhead">Trainings</h4>
                      <ul className="rtrainings">
                        {trainings.map((t) => (
                          <li key={t.name}>
                            <span className="rtrain-year">{t.year}</span>
                            <span>{t.name}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Section>

              </div>

              {/* ---------- Right column ---------- */}
              <div className="rcol">

                <Section num="05" title="Professional Experience">
                  <div className="timeline">
                    {experience.map((job) => (
                      <div className="timelineevent" key={job.date}>
                        <span className="timelinestar">
                          <img src={Star} alt="" />
                        </span>
                        <div className="timelineeventdetails">
                          <div className="timelinedate">{job.date}</div>
                          <div className="timelinetitle">{job.title}</div>
                          <div className="timelinedescription">{job.description}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Section>

                <Section num="06" title="Technical Skills">
                  <div className="rskills">
                    {skills.map((g) => (
                      <div className="rskillgroup" key={g.label}>
                        <h4 className="rsmallhead">{g.label}</h4>
                        <div className="rtags">
                          {g.items.map((i) => (
                            <span className="rtag" key={i}>{i}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </Section>

                <Section num="07" title="Areas of Expertise">
                  <div className="rtags rtags-lg">
                    {expertise.map((x) => (
                      <span className="rtag rtag-lg" key={x}>{x}</span>
                    ))}
                  </div>
                </Section>

              </div>
            </div>

            <p className="rfootnote">
              More information and technical details about projects &amp; reference letters are available on request for interviews.
            </p>
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

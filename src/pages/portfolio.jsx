import { useRef } from 'react'
import { Link, Outlet } from 'react-router-dom'
import '../assets/css/main.css'
import Header from '../components/header.jsx'
import HeaderForPortfolioPage from '../components/headerForPortfolioPage.jsx'
import Footer from '../components/footer.jsx'
import { gsap } from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

// Internal project routes (rendered by <Outlet /> below).
// /portfolio/1 Tic-tac-toe, /2 Three.js viewer, /3 Redux, /4 Version 1
const PROJECTS = [
  { to: '/portfolio/3', label: 'Version 1' },
  { to: '/portfolio/1', label: 'Tic-tac-toe' },
  { to: '/portfolio/2', label: 'Threejs 3d model viewer' },
]
 
const GUIDES = [
  { href: 'https://getbootstrap.com/docs/5.3/getting-started/introduction/', label: 'Bootstrap quick start guide' },
  { href: 'https://vitejs.dev/guide/', label: 'Bootstrap Vite guide' },
  { href: 'https://www.npmjs.com/package/bootstrap', label: 'Bootstrap npm starter' },
  { href: 'https://react.dev', label: 'Learning about React' },
  { href: 'https://docker.com', label: 'Docker for beginners' },
  { href: 'https://github.com', label: 'Github deployment' },
  { href: 'https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Tutorial/Getting_started_with_WebGL', label: 'WebGL instructions' },
]

const ArrowIcon = () => (
  <svg className="bi" width="16" height="16" aria-hidden="true">
    <use xlinkHref="#arrow-right-circle"></use>
  </svg>
)

function Portfolio() {
  const progressbarRef = useRef(null)

  useGSAP(() => {
    gsap.to('#progress-bar', {
      width: '100%',
      ease: 'none',
      scrollTrigger: {
        trigger: document.documentElement,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
      },
    })
  }, { scope: progressbarRef })

  return (
    <>
      <div ref={progressbarRef}>
        <div id="progress-bar"></div>
      </div>

      <Header />

      {/*
        No grid wrapper and no .container around the scroller: the horizontal
        scroller section is a direct, full-width child of this <div>, so
        ScrollTrigger can pin it without any transformed / overflow-clipped /
        flex ancestors in the way.
      */}
      <div className="portfolio-page">

        {/* Horizontal scroller lives in here (full width) */}
        <HeaderForPortfolioPage />

        <section className="container px-4 py-5">
          <h1 className="display-5 fw-bold">My Portfolio</h1>

          <main>
            <h1 className="text-body-emphasis">Get started with portfolio</h1>
            <p className="fs-5 col-md-8 mb-5">
              I bring together selected projects that show versatility, clarity, and intention. Each piece is presented with context about the challenge, the approach, and the result. The aim is simple — share work that is honest, functional, and built with care.
            </p>

            <hr className="col-3 col-md-2 mb-5" />

            <div className="row g-5">
              <div className="col-md-6">
                <h2 className="text-body-emphasis">Starter projects</h2>
                <p>
                  Ready to go beyond the starter template? Check out these open
                  source projects that you can quickly duplicate to a new GitHub
                  repository.
                </p>
                <ul className="list-unstyled ps-0 mx-1">
                  {PROJECTS.map(({ to, label }) => (
                    <li key={to}>
                      <Link className="icon-link mb-1" to={to}>
                        <ArrowIcon />
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="col-md-6">
                <h2 className="text-body-emphasis">Guides</h2>
                <p>
                  Read more detailed instructions and documentation on using the techstack used for building this website.
                </p>
                <ul className="list-unstyled ps-0 mx-1">
                  {GUIDES.map(({ href, label }) => (
                    <li key={href}>
                      <a className="icon-link mb-1" href={href} target="_blank" rel="noopener noreferrer">
                        <ArrowIcon />
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </main>
        </section>

        {/* Routed project pages render here */}
        <section className='p-5'>
          <Outlet />
        </section>
      
      </div>

      <Footer />
    </>
  )
}

export default Portfolio

import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import '../assets/css/hscroll.css'
import bike from '../assets/images/portfolio/bike.jpg'
import prixy from '../assets/images/portfolio/prixy.jpg'
import junoon from '../assets/images/portfolio/junoonDvd.jpg'

gsap.registerPlugin(ScrollTrigger)

const SLIDES = [
  { img: bike, alt: 'bicycle', title: 'Vintage Motorized Bicycle Concept' },
  { img: prixy, alt: 'prixy', title: 'Animated Pencil Character Environment' },
  { img: junoon, alt: 'junoon', title: '"Junoon" Motion Graphic & Concert Visuals' },
]

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function HeaderforPortfolioPage() {
  const rootRef = useRef(null)     // scope for gsap selectors + cleanup
  const sectionRef = useRef(null)  // pinned element (clips the track)
  const trackRef = useRef(null)    // the wide strip that slides left

  const today = new Date()
  const dateLabel = `${DAYS[today.getDay()]}, ${MONTHS[today.getMonth()]} ${today.getDate()}, ${today.getFullYear()}`

  useGSAP(() => {
    // Date line reveal
    gsap.to('.diagonal-reveal', {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      duration: 1.5,
      ease: 'power3.inOut',
    })

    const section = sectionRef.current
    const track = trackRef.current
    const mm = gsap.matchMedia()

    // Users who prefer reduced motion get a plain, natively scrollable strip (see CSS).
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // Measured, never hard-coded: how far the track overflows the viewport.
      const getDistance = () => Math.max(0, track.scrollWidth - section.clientWidth)
      // Stop the pin just under the fixed navbar.
      const getOffset = () => document.querySelector('header .navbar')?.offsetHeight ?? 0

      gsap.to(track, {
        x: () => -getDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          pin: true,                          // pin the section itself...
          pinSpacing: true,                   // ...and reserve the scroll distance so nothing overlaps
          scrub: 0.6,
          anticipatePin: 1,
          start: () => `top top+=${getOffset()}`,
          end: () => `+=${getDistance()}`,    // 1px of scroll per 1px of travel
          invalidateOnRefresh: true,          // re-measure on resize / orientation change
        },
      })
    })

    // Layout is width-deterministic (panels are 100% wide), but refresh once
    // everything has loaded anyway. Cleanup is handled by useGSAP + this return.
    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    return () => window.removeEventListener('load', refresh)
  }, { scope: rootRef })

  return (
    <div ref={rootRef}>
      <section className="pf-hero">
        <div className="pf-hero-inner">
          <div className="pf-hero-date diagonal-reveal">{dateLabel}</div>
          <h2 className="pf-hero-title">
            A collection of projects from my student years that shaped the way I think, create, and solve problems.
          </h2>
          <p className="pf-hero-text">
            These early works reflect my curiosity, experimentation, and willingness to learn by building—from first ideas and prototypes to projects that challenged me to turn concepts into something tangible.
          </p>
        </div>
      </section>

      <section className="hscroll" ref={sectionRef} aria-label="Classic projects">
        <div className="hscroll-track" ref={trackRef}>
          {SLIDES.map(({ img, alt, title }, i) => (
            <article className="hscroll-panel" key={alt}>
                <img className="hscroll-img" src={img} alt={alt} />
              
              <div className="hscroll-caption">
                <span className="hscroll-index">
                  {String(i + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}
                </span>
                <h2 className="hscroll-title">{title}</h2>
              </div>
            </article>
          ))}
        </div>
      </section>

    </div>
  )
}

export default HeaderforPortfolioPage

import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import '../assets/css/about.css'

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function HeaderforAboutPage() {
  const rootRef = useRef(null)

  const today = new Date()
  const dateLabel = `${DAYS[today.getDay()]}, ${MONTHS[today.getMonth()]} ${today.getDate()}, ${today.getFullYear()}`

  // Same diagonal reveal as before, but scoped to this hero and cleaned up on unmount.
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.diagonal-reveal', {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        duration: 1.5,
        ease: 'power3.inOut',
        stagger: 0.08,
      })
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <section className="about-hero" ref={rootRef}>
      <div className="about-hero-inner">
        <p className="about-hero-date diagonal-reveal">{dateLabel}</p>

        <h1 className="about-hero-title diagonal-reveal">
          Hi, I'm <Link to="/about">name</Link> from location.
        </h1>

        <p className="about-hero-text">
          I'm a technology professional with hands-on experience in software testing, web development, multimedia design, and network consulting. My career has spanned over a decade of industry shifts—from the early Windows and dial-up days to today’s AI-powered, cloud-native environments.
        </p>

        <p className="about-hero-cta diagonal-reveal">
          Any questions? See my <Link to="/myresume">resume</Link> or <Link to="/portfolio">portfolio</Link> instead!
        </p>
      </div>
    </section>
  )
}

export default HeaderforAboutPage

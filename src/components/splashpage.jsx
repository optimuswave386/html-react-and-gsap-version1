import { Link } from 'react-router-dom'
import '../assets/css/splash.css'

// Splash / landing hero. CSS only (see splash.css). Uses <Link> so it works with your HashRouter.
const SECTIONS = [
  {
    no: '01',
    title: 'Storefront',
    text: 'Browse a collection of books and electronics, add what you like to your cart, and check out.',
    to: '/products',
    cta: 'Browse products',
  },
  {
    no: '02',
    title: 'Portfolio',
    text: 'Selected projects, from student-year experiments to recent builds, with context on the challenge, the approach and the result.',
    to: '/portfolio',
    cta: 'See the work',
  },
  {
    no: '03',
    title: 'About',
    text: 'Background, experience and how to get in touch with the person who built all of this.',
    to: '/about',
    cta: 'Read more',
  },
]

function SplashPage() {
  return (
    <section className="splash"> 
      <div className="splash-inner">
        <p className="splash-eyebrow">Welcome</p>

        <h1 className="splash-title">
          A personal website with a storefront, a portfolio, and the person behind them.
        </h1>

        <p className="splash-lead">
          This site brings three things together in one place: a storefront where you can shop for books and electronics, a portfolio of projects I have built and designed, and some background on who I am and how I work.
        </p>

        <nav className="splash-cards" aria-label="Site sections">
          {SECTIONS.map(({ no, title, text, to, cta }) => (
            <Link className="splash-card" to={to} key={to}>
              <span className="splash-card-no">{no}</span>
              <span className="splash-card-title">{title}</span>
              <span className="splash-card-text">{text}</span>
              <span className="splash-card-cta">{cta} →</span>
            </Link>
          ))}
        </nav>
          
        <div className="splash-about">
          <h2 className="splash-about-label">About the creator</h2>
          <p>
            I’m a technology professional with hands-on experience in software testing, web development, multimedia design and network consulting, and a degree in cybersecurity. My career spans more than a decade of industry change, from the early Windows and dial-up days to today’s AI-powered, cloud-native environments. I’m passionate about continuous learning, and I do my best work where adaptability, collaboration and clear communication help bridge technology and business.
          </p>
        </div>

        <p className="splash-foot">
          The products are available to purchase once you <Link to="/login">sign in</Link>. Any questions? <Link to="/helpcenter">Ask here</Link>.
        </p>
      </div>
    </section>
  )
}

export default SplashPage

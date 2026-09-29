import '../assets/css/main.css'
import '../assets/css/links.css' // new: page-specific layout, loaded after main.css
import Header from '../components/header.jsx'
import DesignNotes from '../components/designNotes.jsx'
import Footer from '../components/footer.jsx'

// Data lives in one place instead of 15 hand-written <li>s.
// Add a link = add one line here.
const LINKS = [
  { category: 'coding', name: 'LeetCode', url: 'https://leetcode.com' },
  { category: 'coding', name: 'freeCodeCamp.org', url: 'https://www.freecodecamp.org' },
  { category: 'coding', name: 'Net Ninja', url: 'https://www.thenetninja.co.uk' },
  { category: 'coding', name: 'GeeksforGeeks', url: 'https://www.geeksforgeeks.org' },
  { category: 'coding', name: 'W3Schools', url: 'https://www.w3schools.com' },
  { category: 'coding', name: 'ByteGrad', url: 'https://www.bytegrad.com' },
  { category: 'css', name: 'Coding2Go', url: 'https://www.coding2go.com' },
  { category: 'css', name: 'CSS-Tricks', url: 'https://css-tricks.com' },
  { category: 'websites', name: 'Web Dev Simplified', url: 'https://www.webdevsimplified.com' },
  { category: 'websites', name: 'Chrome DevTools', url: 'https://developer.chrome.com/docs/devtools/' },
  { category: 'websites', name: 'Flux Academy', url: 'https://www.flux-academy.com/' },
  { category: 'media', name: 'Traversy Media', url: 'https://www.traversymedia.com' },
  { category: 'training', name: 'Simplilearn', url: 'https://www.simplilearn.com' },
  { category: 'networking', name: 'Cisco / Netacad', url: 'https://www.netacad.com' },
  { category: 'system', name: 'Docker', url: 'https://www.docker.com' },
]

// Group by category, keeping categories in alphabetical order.
const GROUPS = Object.entries(
  LINKS.reduce((acc, link) => {
    ;(acc[link.category] ||= []).push(link)
    return acc
  }, {})
).sort(([a], [b]) => a.localeCompare(b))

function Links() {
  return (
    <>
      <Header />

      <div className="links-layout">
        {/* Column 1: the links */}
        <main className="links-main">
          <p className="links-eyebrow">Bookmarks / {LINKS.length} resources</p>
          <h1 className="display-5 fw-bold">My Links</h1>
          <p className="links-intro">
            The sites I keep coming back to for learning, reference and inspiration.
          </p>

          {GROUPS.map(([category, items]) => (
            <section className="links-group" key={category} aria-labelledby={`grp-${category}`}>
              <h2 className="links-group-title" id={`grp-${category}`}>
                <span>{category}</span>
                <span className="links-group-count">{String(items.length).padStart(2, '0')}</span>
              </h2>
              <ul className="links-list">
                {items.map(({ name, url }) => (
                  <li key={url}>
                    <a className="links-row" href={url} target="_blank" rel="noopener noreferrer">
                      <span className="links-row-name">{name}</span>
                      <span className="links-row-arrow" aria-hidden="true">↗</span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </main>

        {/* Column 2: design notes, stretched to the same height as column 1 */}
        <aside className="links-side">
          <DesignNotes />
        </aside>
      </div>

      <Footer />
    </>
  )
}

export default Links

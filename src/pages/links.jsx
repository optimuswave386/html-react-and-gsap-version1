import '../assets/css/main.css'
import '../assets/css/links.css' // new: page-specific layout, loaded after main.css
import Header from '../components/header.jsx'
import DesignNotes from '../components/designNotes.jsx'
import Footer from '../components/footer.jsx'

function Links() {
  return (
    <>
      <Header />

      <div className="links-layout">

        {/* Column 1: the links */}        
        <DesignNotes forLinksOnly={true} showDesignNotes={false} />

        {/* Column 2: design notes, stretched to the same height as column 1 */}
        <aside className="links-side">
          <DesignNotes forLinksOnly={false} showDesignNotes={true} />
        </aside>

      </div>

      <Footer />
    </>
  )
}

export default Links

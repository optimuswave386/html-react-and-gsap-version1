import { Link } from 'react-router-dom'

// Hero for the Products page. Styles live in products.css (.shop-hero*), CSS only.
// <Link> keeps the links working with your router (HashRouter gives /#/helpcenter, /#/cart)
// on localhost and in production, instead of hard-coding http://localhost:5173.
function HeaderForProductsPage() {
  return (
    <section className="shop-hero">
      <p className="shop-hero-eyebrow">Shop</p>

      <h1 className="shop-hero-title">
        Browse our collection of books and electronics, handpicked to keep you entertained, informed, and connected.
      </h1>

      <p className="shop-hero-text">
        Whether you’re upgrading your tech or finding your next great read, you’re in the right place.
      </p>

      <p className="shop-hero-links">
        <span>
          Any questions? Feel free to <Link to="/helpcenter">ask here</Link>. 
          Ready to check out? <Link to="/cart" className="shop-hero-cta">View your cart</Link>.
        </span>
      </p>
    </section>
  )
}

export default HeaderForProductsPage

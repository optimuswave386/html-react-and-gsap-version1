import { React, useState, useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route, Link, NavLink, BrowserRouter, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import '../assets/css/main.css' // Import main CSS file
import Header from '../components/header.jsx'
import HeaderForProductsPage from '../components/headerForProductsPage.jsx'
import FooterForDashboardPage from '../components/footerForDashboardPage.jsx'
import axios from 'axios';
import { decrementCartCount } from '../redux/cartSlice.jsx';
import '../assets/css/pageHero.css';

const CartTotal = ({ cartItems }) => {
  // Function to calculate the total price
  const calculateTotal = (items) => {
    return items.reduce((total, item) => {
      // Add the price of the current item * its quantity to the running total
      return total + item.price * item.quantity;
    }, 0); // Start the initial total at 0
  };

  const totalPrice = calculateTotal(cartItems);

  return (
    <span>
      {/* Display the calculated total price / Total Price: */}
      ${totalPrice.toFixed(2)}
    </span>
  );
};

function ShoppingCart() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [cartItemCount, setCartItemCount] = useState(0);
    const [cartItems, setCartItems] = useState([]);
    
    useEffect(() => {
        // Simulate fetching cart item count from an API or state management
        const fetchCartItemCount = async () => {
            try {
                const response = await axios.get('http://localhost:3000/cart');        
                console.log("Fetch cart item count", response.data.length);
                const count = response.data.length;
                setCartItemCount(cartItemCount + count); // Example: setting it to 2 items
                setCartItems([response.data]);
            } catch (error) {
                console.error("Error fetching cart item count:", error);
                setCartItemCount(0); // Example: setting it to 0 items
            }
        };
        fetchCartItemCount();
    }, []);

    const handleRemoveProduct = async (productId) => {
      try {
          await axios.delete(`http://localhost:3000/cart/${productId}`);
          // After successful deletion, update the cart item count and items
          setCartItemCount(prevCount => prevCount - 1);
          dispatch(decrementCartCount());
          setCartItems(prevItems => {
              const updatedItems = prevItems[0].filter(item => item.id !== productId);
              return [updatedItems];
          });
      } catch (error) {
          console.error("Error removing product from cart:", error);
      }
    };

  return (
        <>

      <Header />

      <div className="container">

        <div id="gridcontainer">
 
            <div id="one">
                <section className="page-hero page-hero--orders">
                            <span className="page-hero__dots" />
                            <span className="page-hero__eyebrow">Cart</span>
                            <h1 className="page-hero__title">Your shopping cart</h1>
                            <p className="page-hero__text fs-5">
A curated list of books and electronics items are available in the products section — including top sellers, practical gadgets, and interesting niches customers actually love. They’re easy to browse and ready to ship, so start adding to your cart today!                            </p>
                            <Link to="/helpcenter" className="page-hero__btn">Any questions? Ask here</Link>
                  </section>
            </div>

            <div id="two">
                <div className="p-5 mb-0 bg-white">
                {cartItemCount === 0 && <><h3>Your Shopping Cart is Empty</h3><p>Looks like you haven't added any items to your cart yet.</p> <p>Browse our products and start shopping!</p></>}
                {cartItemCount > 0 && <>
                                        <div className="row w-100 p-0 m-0 bg-white">
                                          <div className="col-12 order-md-2 p-0 m-0 bg-white">
                                            <h3>Your Shopping Cart has {cartItemCount} items</h3>
                                            <p>Review your selected items below and proceed to checkout when you're ready.</p>
                                            <p><button className="btn btn-primary" onClick={() => navigate('/checkout')}>Proceed to Checkout</button></p>
                                            <ul className="list-group mb-3 w-100">
                                            {cartItems[0].map(products => (
                                                <li key={products.id} className="list-group-item d-flex justify-content-between lh-condensed">
                                                    <button className="position-absolute top-0 start-0 btn btn-sm" onClick={() => handleRemoveProduct(products.id)}>x</button>
                                                    <div className="bg-white p-0">
                                                    <h6 className="my-0">&nbsp;{products.name}</h6>
                                                    {/* <small className="text-muted">&nbsp;Quantity: {products.quantity}</small> */}
                                                    <small className="text-muted">&nbsp;Quantity: <select id="quantity" name="quantity" defaultValue={products.quantity} onChange={async (e) => {
                                                                                                      const newQuantity = parseInt(e.target.value);
                                                                                                      try {
                                                                                                          await axios.patch(`http://localhost:3000/cart/${products.id}`, {
                                                                                                              quantity: newQuantity
                                                                                                          });
                                                                                                          // Update the cart items state to reflect the new quantity
                                                                                                          setCartItems(prevItems => {
                                                                                                              const updatedItems = prevItems[0].map(item => {
                                                                                                                  if (item.id === products.id) {
                                                                                                                      return { ...item, quantity: newQuantity };
                                                                                                                  }
                                                                                                                  return item;
                                                                                                              });
                                                                                                              return [updatedItems];
                                                                                                          });
                                                                                                      } catch (error) {
                                                                                                          console.error("Error updating product quantity:", error);
                                                                                                      }
                                                                                                  }} >
                                                                                                    <option value="1">1</option>
                                                                                                    <option value="2">2</option>
                                                                                                    <option value="3">3</option>
                                                                                                    <option value="4">4</option>
                                                                                                    <option value="5">5</option>
                                                                                                    <option value="6">6</option>
                                                                                                  </select></small>
                                                  </div>
                                                  <span className="text-muted">${products.price}</span>
                                                </li>
                                            ))}
                                              <li className="list-group-item d-flex justify-content-between">
                                                <span>Total (USD)</span>
                                                <strong><CartTotal cartItems={cartItems[0]} /></strong>
                                              </li>
                                            </ul>
                                            
                                          </div>
                                        </div>
                                      </>}

                <p>Secure & Trusted Checkout</p>
                <p>All payments are encrypted and processed securely for your peace of mind.</p>
                <p>Fast Shipping Available</p>
                <p>Delivery options and estimated arrival times will be shown at checkout.</p>

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

export default ShoppingCart;
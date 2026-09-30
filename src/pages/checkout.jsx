import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import '../assets/css/main.css' // Import main CSS file
import Header from '../components/header.jsx'
import FooterForDashboardPage from '../components/footerForDashboardPage.jsx'
import { setCartCount } from '../redux/cartSlice.jsx';
import '../assets/css/pageHero.css';

const API = 'http://localhost:3000';
const authHeaders = () => ({ headers: { authorization: `Bearer ${localStorage.getItem('authToken')}` } });

export default function Checkout() {

  const dispatch = useDispatch();
  const [cartItems, setCartItems] = useState([]);
  const [loadingCart, setLoadingCart] = useState(true);

  const [customer, setCustomer] = useState({ name: '', email: '', address: '' });
  const [placingOrder, setPlacingOrder] = useState(false);
  const [orderError, setOrderError] = useState(null);
  const [orderResult, setOrderResult] = useState(null);

  useEffect(() => {
    async function fetchCart() {
      try {
        const response = await axios.get(`${API}/cart`);
        setCartItems(response.data || []);
      } catch (error) {
        console.error("Error fetching cart:", error);
        setCartItems([]);
      } finally {
        setLoadingCart(false);
      }
    }
    fetchCart();
  }, []);

  const total = cartItems.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0);

  function handleCustomerChange(e) {
    const { name, value } = e.target;
    setCustomer(prev => ({ ...prev, [name]: value }));
  }

  async function handlePlaceOrder(e) {
    e.preventDefault();
    if (cartItems.length === 0) return;
    if (!customer.name || !customer.email || !customer.address) {
      setOrderError('Please fill in your name, email, and address.');
      return;
    }

    setOrderError(null);
    setPlacingOrder(true);

    const orderItems = cartItems.map(item => ({
      productId: item.productId ?? item.id,
      name: item.name,
      category: item.category,
      price: item.price,
      quantity: item.quantity
    }));

    // Try to create a real Stripe payment intent. If Stripe isn't configured
    // on the server (or the call fails for any reason), fall back to a
    // locally-generated reference so the order can still be completed —
    // swap this for real card confirmation once Stripe Elements is wired up.
    let paymentIntentId = `demo_${Date.now()}`;
    try {
      const intentResponse = await axios.post(`${API}/payment/create-payment-intent`, {
        items: orderItems,
        customer
      }, authHeaders());
      if (intentResponse.data && intentResponse.data.paymentIntentId) {
        paymentIntentId = intentResponse.data.paymentIntentId;
      }
    } catch (error) {
      console.warn('Payment intent creation unavailable, continuing with a demo reference:', error.message);
    }

    try {
      const orderResponse = await axios.post(`${API}/payment/order`, {
        items: orderItems,
        total,
        customer,
        paymentIntentId,
        paymentStatus: 'paid'
      }, authHeaders());

      await axios.delete(`${API}/cart`);

      setOrderResult(orderResponse.data);
      setCartItems([]);
      dispatch(setCartCount(0));
    } catch (error) {
      console.error('Error placing order:', error);
      const expired = error.response && [401, 403].includes(error.response.status);
      setOrderError(expired
        ? 'Your session has expired. Please log in again to place your order.'
        : 'Something went wrong while placing your order. Please try again.');
    } finally {
      setPlacingOrder(false);
    }
  }

  return (
    <>
      <Header />

      <div className="container">
        <div id="gridcontainer">

          <div id="one">
            <section className="page-hero page-hero--orders">
                                        <span className="page-hero__dots" />
                                        <span className="page-hero__eyebrow">Shop</span>
                                        <h1 className="page-hero__title">Checkout</h1>
                                        <p className="page-hero__text fs-5">
Review your order and enter your details below to complete your purchase. Your cart clears automatically once the order is placed.</p>                                        <Link to="/helpcenter" className="page-hero__btn">Any questions? Ask here</Link>
                              </section>
          </div>

          <div id="two">
            <div className="p-5 mb-0 bg-white">

              {/* <h2 className="mb-0">Checkout</h2> */}
              <hr />

              {loadingCart && <p>Loading your cart&hellip;</p>}

              {!loadingCart && orderResult && (
                <div>
                  <h3>Thanks, your order is in!</h3>
                  <p>Order reference: <strong>{orderResult._id}</strong> &mdash; Total: <strong>${orderResult.total.toFixed(2)}</strong></p>
                  {/* <p><Link to="/orders" className="btn btn-primary">View your orders</Link></p> */}
                  <p className="d-flex gap-2">
  <Link to="/products" className="btn btn-primary">Continue shopping</Link>
  <Link to="/" className="btn btn-outline-secondary">Back to frontpage</Link>
</p>
                </div>
              )}

              {!loadingCart && !orderResult && cartItems.length === 0 && (
                <div>
                  <p>Your cart is empty, so there&apos;s nothing to check out yet.</p>
                  <p><Link to="/products" className="btn btn-primary">Browse products</Link></p>
                </div>
              )}

              {!loadingCart && !orderResult && cartItems.length > 0 && (
                <div className="row">

                  <div className="col-12 col-md-6">
                    <h3>Order Summary</h3>
                    <ul className="list-group mb-3">
                      {cartItems.map(item => (
                        <li key={item.id} className="list-group-item d-flex justify-content-between">
                          <span>{item.name} &times; {item.quantity}</span>
                          <span>${(item.price * item.quantity).toFixed(2)}</span>
                        </li>
                      ))}
                      <li className="list-group-item d-flex justify-content-between">
                        <strong>Total</strong>
                        <strong>${total.toFixed(2)}</strong>
                      </li>
                    </ul>
                  </div>

                  <div className="col-12 col-md-6">
                    <h3>Customer Details</h3>
                    <form onSubmit={handlePlaceOrder}>
                      <input type="text" name="name" placeholder="Full Name" className="form-control my-2" value={customer.name} onChange={handleCustomerChange} required />
                      <input type="email" name="email" placeholder="Email Address" className="form-control my-2" value={customer.email} onChange={handleCustomerChange} required />
                      <textarea name="address" placeholder="Shipping Address" className="form-control my-2" value={customer.address} onChange={handleCustomerChange} required />

                      {orderError && <p className="text-danger">{orderError}</p>}

                      <button type="submit" className="btn btn-primary mt-2" disabled={placingOrder}>
                        {placingOrder ? 'Placing order…' : `Pay $${total.toFixed(2)}`}
                      </button>
                    </form>
                  </div>

                </div>
              )}

            </div>
          </div>

          <div id="seven">
            <FooterForDashboardPage />
          </div>

        </div>
      </div>
    </>
  );

}
import { React, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import DesignNotes from './designNotes';
import HeaderforAboutPage from './headerForAboutPage.jsx'
import { setCartCount } from '../redux/cartSlice.jsx';
import { logout } from '../redux/authSlice.jsx';

function Header() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoggedIn = useSelector(state => state.auth.isAuthenticated);

    function handleLogout() {
        dispatch(logout());
        navigate('/login', { replace: true });
    }
    const cartCount = useSelector(state => state.cart.count);

    useEffect(() => {
        async function fetchCartCount() {
            try {
                const response = await axios.get('http://localhost:3000/cart');
                dispatch(setCartCount(response.data.length));
            } catch (error) {
                console.error('Error fetching cart count:', error);
            }
        }
        fetchCartCount();
    }, [dispatch]);

    return (
        <>
            <svg style={{ display: 'none' }}>
            <symbol id="cart" xmlns="http://www.w3.org/2000/svg" fill="white" stroke="none" className="bi bi-cart" viewBox="0 0 16 16">
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
            </symbol>
            <symbol id="bag" xmlns="http://www.w3.org/2000/svg" fill="white" stroke="none" strokeWidth="0" className="bi bi-bag" viewBox="0 0 16 16">
                <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z"/>
            </symbol>
            <symbol id="person" xmlns="http://www.w3.org/2000/svg" fill="white" className="bi bi-person" viewBox="0 0 16 16">
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
            </symbol>
            <symbol id="logout" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/>
                <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
            </symbol>
            <symbol id="website" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                <path d="M2.5 4a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1m2-.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0m1 .5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1"/>
                <path d="M2 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2zm12 1a1 1 0 0 1 1 1v2H1V3a1 1 0 0 1 1-1zM1 13V6h4v8H2a1 1 0 0 1-1-1m5 1V6h9v7a1 1 0 0 1-1 1z"/>
            </symbol>
            <symbol id="speedometer2" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 4a.5.5 0 0 1 .5.5V6a.5.5 0 0 1-1 0V4.5A.5.5 0 0 1 8 4zM3.732 5.732a.5.5 0 0 1 .707 0l.915.914a.5.5 0 1 1-.708.708l-.914-.915a.5.5 0 0 1 0-.707zM2 10a.5.5 0 0 1 .5-.5h1.586a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 10zm9.5 0a.5.5 0 0 1 .5-.5h1.5a.5.5 0 0 1 0 1H12a.5.5 0 0 1-.5-.5zm.754-4.246a.389.389 0 0 0-.527-.02L7.547 9.31a.91.91 0 1 0 1.302 1.258l3.434-4.297a.389.389 0 0 0-.029-.518z"></path>
                <path fillRule="evenodd" d="M0 10a8 8 0 1 1 15.547 2.661c-.442 1.253-1.845 1.602-2.932 1.25C11.309 13.488 9.475 13 8 13c-1.474 0-3.31.488-4.615.911-1.087.352-2.49.003-2.932-1.25A7.988 7.988 0 0 1 0 10zm8-7a7 7 0 0 0-6.603 9.329c.203.575.923.876 1.68.63C4.397 12.533 6.358 12 8 12s3.604.532 4.923.96c.757.245 1.477-.056 1.68-.631A7 7 0 0 0 8 3z"></path>
            </symbol>
            <symbol id="table" fill="currentColor" viewBox="0 0 16 16">
                <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm15 2h-4v3h4V4zm0 4h-4v3h4V8zm0 4h-4v3h3a1 1 0 0 0 1-1v-2zm-5 3v-3H6v3h4zm-5 0v-3H1v2a1 1 0 0 0 1 1h3zm-4-4h4V8H1v3zm0-4h4V4H1v3zm5-3v3h4V4H6zm4 4H6v3h4V8z"></path>
            </symbol>
            <symbol id="grid" fill="currentColor" viewBox="0 0 16 16">
                <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3z"></path>
            </symbol>
            <symbol id="people-circle" fill="currentColor" viewBox="0 0 16 16">
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1v-1c0-1-1-4-6-4s-6 3-6 4v1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z"/>
            </symbol>
            </svg>

            <header data-bs-theme="light">

                <div className="collapse text-bg-light" id="navbarHeader">
                    <div className="container">
                    <div className="row">
                        <div className="col-sm-8 col-md-7 py-4 px-5">
                        <h4>About</h4>
                        <p className="text-body-secondary">
                            I'm a technology professional with hands-on experience in software testing, web development, multimedia design, and network consulting. My career has spanned over a decade of industry shifts—from the early Windows and dial-up days to today’s AI-powered, cloud-native environments. I hold a degree in cybersecurity and have trained in ethical hacking, database systems, and enterprise qa tools. With a strong foundation in both creative and technical disciplines, I'm passionate about continuous learning and exploring how evolving technologies like "AI" and automation are reshaping the modern "IT" landscape. I have recently learned about data analytics and how these algorithms are applied to business problems. I thrive in roles that require adaptability, collaboration, and clear communication—bridging the gap between technology and business to deliver meaningful results.
                        </p>
                        </div>
                        <div className="col-sm-4 offset-md-1 py-4 px-5">
                        <h4>Contact</h4>
                        <p>Feel free to <a href="#">contact me</a> for consultation or project proposals, thank you!</p>
                        {/* <ul className="list-group list-group-flush">
                            <li className="list-group-item">Github</li>
                        </ul> */}
                        </div>
                    </div>
                    </div>
                </div>

                <div className="navbar navbar-dark bg-dark shadow-sm fixed-top">
                    <div className="container">
                    <Link to="/" className="navbar-brand d-flex align-items-center"><strong>A website</strong></Link>
                    {/* <a href="index.html" className="navbar-brand d-flex align-items-center">
                        <strong>A website</strong>
                    </a> */}

                    {isLoggedIn && (
                    <nav className="top-icon-nav" aria-label="Site sections">
                            <Link to="/" title="Website" aria-label="Website">
                                <svg width="20" height="20" role="img"><use xlinkHref="#website"></use></svg>
                            </Link>
                            <Link to="/dashboard" title="Dashboard" aria-label="Dashboard">
                                <svg width="20" height="20" role="img"><use xlinkHref="#speedometer2"></use></svg>
                            </Link>
                            <Link to="/orders" title="Orders" aria-label="Orders">
                                <svg width="20" height="20" role="img"><use xlinkHref="#table"></use></svg>
                            </Link>
                        </nav>
                    )}

                    <div className="d-flex align-items-center gap-3 ms-auto me-2">
                    {isLoggedIn ? (
                        <button type="button" onClick={handleLogout} title="Log out" aria-label="Log out"
                                className="btn p-0 border-0 d-flex align-items-center text-white">
                            <svg className="d-block" width="22" height="22" role="img" aria-hidden="true">
                                <use xlinkHref="#logout"></use>
                            </svg>
                        </button>
                    ) : (
                        <Link to="/login" className="d-flex align-items-center" aria-label="Login User">
                            <svg className="d-block" width="26" height="26" role="img" aria-hidden="true">
                                <use xlinkHref="#person"></use>
                            </svg>
                        </Link>
                    )}
                    <Link to="/products" title="Products" className="d-flex align-items-center text-white" aria-label="Products">
                        <svg className="d-block" width="20" height="20" role="img" aria-hidden="true">
                            <use xlinkHref="#grid"></use>
                        </svg>
                    </Link>
                    <Link to="/cart" className="position-relative d-flex align-items-center" aria-label="Shopping Cart">
                        <svg className="d-block" width="24" height="24" role="img" aria-hidden="true">
                            <use xlinkHref="#cart"></use>
                        </svg>
                        {cartCount > 0 && (
                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                {cartCount}
                                <span className="visually-hidden">items in cart</span>
                            </span>
                        )}
                    </Link>
                    </div>
                    <button 
                        id ="navbartogglebutton"
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarHeader"
                        aria-controls="navbarHeader"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                         <span className="navbar-toggler-icon"></span>
                    </button>
                    </div>
                </div>

            </header>

        </>
    );
}

export default Header;
import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/pageHero.css';

function HeaderForOrdersPage() {
    return (
        <section className="page-hero page-hero--orders">
            <span className="page-hero__dots" />
            <span className="page-hero__eyebrow">Orders</span>
            <h1 className="page-hero__title">Your orders at a glance</h1>
            <p className="page-hero__text fs-5">
                A summary of the items you ordered, payment information, and delivery status. Use the sidebar to navigate through different features.
            </p>
            <Link to="/helpcenter" className="page-hero__btn">Any questions? Ask here</Link>
        </section>
    )
}

export default HeaderForOrdersPage
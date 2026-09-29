import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/pageHero.css';

function HeaderForDashboardPage() {
    return (
        <section className="page-hero page-hero--dashboard">
            <span className="page-hero__dots" />
            <span className="page-hero__eyebrow">Overview</span>
            <h1 className="page-hero__title">Welcome to your dashboard</h1>
            <p className="page-hero__text fs-5">
                Find an overview of your activities, statistics, and quick access to various sections. Use the sidebar to navigate through different features.
            </p>
            <Link to="/helpcenter" className="page-hero__btn">Any questions? Ask here</Link>
        </section>
    )
}

export default HeaderForDashboardPage
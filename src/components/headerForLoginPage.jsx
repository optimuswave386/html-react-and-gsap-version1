import React from 'react';
import { Link } from 'react-router-dom';

function HeaderForLoginPage() { 
    return (
        <>
            <p className="fs-5 mb-0">
            Sign up to create an account and access this personal website. This website is intended for personal use and is accessible only to a small group of trusted users. Creating an account allows you to sign in with your own username and password to access private content. All accounts are managed privately, and access is granted only to approved individuals. Any questions? Feel free to <Link to="/helpcenter">ask here</Link>. 
            </p>
        </>
    )
}

export default HeaderForLoginPage
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PasswordReset = () => {  
    return (
        <>
            <h3>Reset Password</h3>
            <form id="loginResetForm" className="bg-white">
                <div className="p-0 mb-3 bg-white">
                    <label htmlFor="resetpassword" className="form-label">Password</label>
                    <input type="password" className="form-control" id="resetpassword" placeholder="Enter new password" autoComplete="new-password"></input>
                </div>
                <button id="resetButton" type="submit" className="btn btn-primary">Reset Password</button>
            </form>
        </>
    ); 
}

const RegisterUser = () => {  
    return (
        <>
            <h3>Register New User</h3>
            <form id="registerUserForm" className="bg-white">
                <div className="p-0 mb-3 bg-white">
                    <label htmlFor="registeredname" className="form-label">Name</label>
                    <input type="name" className="form-control" id="registeredname" placeholder="Enter name" autoComplete="off"></input>
                </div>
                <div className="p-0 mb-3 bg-white">
                    <label htmlFor="registeredage" className="form-label">Age</label>
                    <input type="age" className="form-control" id="registeredage" placeholder="age" autoComplete="off"></input>
                </div>
                <div className="p-0 mb-3 bg-white">
                    <label htmlFor="registeredemail" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="registeredemail" placeholder="Enter email" autoComplete="off"></input>
                </div>
                <div className="mb-3 bg-white">    
                    <label htmlFor="registeredpassword" className="form-label">Password</label>
                    <input type="password" className="form-control" id="registeredpassword" placeholder="Enter password" autoComplete="off"></input>
                </div>
                <button id="registerButton" type="submit" className="btn btn-primary">Register</button>
            </form>
        </>
    ); 
}

const SetCookie = (name, value, days) => {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + days);
    const expires = "expires=" + expirationDate.toUTCString();
    const path = "path=/"; // Cookie accessible across the entire site             
    document.cookie = `${name}=${value}; ${expires}; ${path}; Secure; SameSite=Strict`;
    console.log('Cookie set:', document.cookie);
}

const getCookieValue = (name) => {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i=0;i < ca.length;i++) {
        let c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function preventDefaultSubmit(e) {
    e.preventDefault();
    const loginButton = document.getElementById('loginButton');
    loginButton.focus();
    loginButton.click();
    loginButton.blur();
}

function LoginForm({isAuthenticated, setIsUserAuthenticated}) {

    const [showPasswordReset, setShowPasswordReset] = useState(false);
    const [showRegisterUser, setShowRegisterUser] = useState(false);
    const [jwtToken, setJwtToken] = useState("");
    const [userdata, setUserdata] = useState({});
    const navigate = useNavigate();

    const loginButton = document.getElementById('loginButton');
    if (loginButton) {
        loginButton.addEventListener('click', async (e) => {
            e.preventDefault();
            const emailInput = document.getElementById('email');
            const passwordInput = document.getElementById('password');
            const email = emailInput.value;
            const password = passwordInput.value;
            
            console.log('Login button clicked with email:', email);

            // Simple validation
            if (!email || !password) {
                console.log('Please enter both email and password.');
                return;
            }

            try {
                await axios.post(import.meta.env.VITE_EXPRESSAPI_URL + 'user/login', {
                    email: email,
                    password: password
                })
                .then(response => {
                    
                    console.log('Login successful:', response.data);
                    setJwtToken(response.data.token);
                    setUserdata({ email: email });
                    localStorage.setItem('authToken', response.data.token);
                    //console.log('Session token:', localStorage.getItem('authToken'));
                    
                    let cookieStore = document.cookie;
                    const name = "email";
                    const value = email;
                    SetCookie(name, value, 1);
                    console.log('Cookie set:', getCookieValue('email'), cookieStore);
                    
                    setIsUserAuthenticated(true);

                    // For demonstration, we will just navigate to the dashboard
                    //navigate('/dashboard', { replace: true });
                    //navigate('/dashboard', { state: userdata, replace: true });
                    navigate('/dashboard', { state: { email: email }, replace: true });

                })
                .catch(error => {
                    console.error('Error during login:', error);
                });
            } catch (error) {
                console.error('Unexpected error:', error);
            }
            
            // Here you would typically send the login data to your server or API
            console.log('Login request submitted.');
            console.log('JWT Token:', jwtToken);
            console.log('User Data:', userdata);
            
        });
    }

    return (
        <>
        {isAuthenticated && <p>You are logged in now.</p>}
        {isAuthenticated === false && 
            <>
                <div className="container p-0">
                    <form id="loginForm" onSubmit={preventDefaultSubmit} className="bg-white">
                        <div className="p-0 mt-3 mb-3 bg-white">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="email" placeholder="Enter email" autoComplete="off"></input>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" placeholder="Password" autoComplete="current-password"></input>
                        </div>
                        <button id="loginButton" type="submit" className="btn btn-primary">Login</button>
                    </form>            
                </div>
                <p className="mt-3">
                    <a href="#" value="Forgot Password?" onClick={(e) => { 
                                e.preventDefault(); // Prevents the browser from navigating to the href="#"
                                setShowRegisterUser(false);
                                setShowPasswordReset(true);
                        }}>Forgot Password?</a> | <a href="#" value="Register" onClick={(e) => {
                                e.preventDefault(); // Prevents the browser from navigating to the href="#"
                                setShowRegisterUser(true);
                                setShowPasswordReset(false);
                        }}>Register</a>
                </p>
            </>
        }
        {showPasswordReset && <PasswordReset />}
        {showRegisterUser && <RegisterUser /> }
        </>
    );
}

export default LoginForm;
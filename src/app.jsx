import React from 'react'
import { BrowserRouter, HashRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom'
import Dashboard from './pages/dashboard.jsx'
import Orders from './pages/orders.jsx'
import Products from './pages/products.jsx'
import ShoppingCart from './pages/shoppingcart.jsx'
import Checkout from './pages/checkout.jsx'
import About from './pages/about.jsx'
import Portfolio from './pages/portfolio.jsx'
import Links from './pages/links.jsx'
import Interests from './pages/interests.jsx'
import Helpcenter from './pages/helpcenter.jsx'
import MyResume from './pages/myresume.jsx'
import NotFound from './pages/notfound.jsx'
import Project1 from './components/portfolioProject1.jsx'
import Project2 from './components/portfolioProject2.jsx'
import Project3 from './components/portfolioProject3.jsx'
import Project4 from './components/portfolioProject3.jsx'
import Index from './index.jsx'
import { Login, Register, ForgotPassword, ResetPassword } from './pages/auth.jsx'
import LoginProtectedRoute from './components/loginProtectedRoute.jsx'
import ErrorBoundary from './components/errorBoundary.jsx'


export default function App() {

  return (
    
    <>
    
    {/* 
      <Route path="/portfolio" element={<Portfolio text="" type="" />} />
      <Route path="/portfolio/:portfolioid" element={<Portfolio />} />
      <Route path="/portfolio/threejs/app1" element={<WebApp1 />} /> 
    */}

    <Router>
      <ErrorBoundary>
        <Routes>
          <Route index path="/" element={<Index />} />
          <Route element={<LoginProtectedRoute adminOnly />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/orders" element={<Orders />} />
          </Route>
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<ShoppingCart />} />
          <Route element={<LoginProtectedRoute />}>
            <Route path="/checkout" element={<Checkout />} />
          </Route>
          <Route path="/about" element={<About />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/portfolio/*" element={<Portfolio />}>
            <Route path="1" element={<Project1 />} />
            <Route path="2" element={<Project2 />} />
            <Route path="3" element={<Project3 />} />
          </Route>
          <Route path="/links" element={<Links />} />
          <Route path="/interests" element={<Interests />} />
          <Route path="/helpcenter" element={<Helpcenter />} />
          <Route path="/myresume" element={<MyResume />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ErrorBoundary>
      </Router>

    </>
  )
}
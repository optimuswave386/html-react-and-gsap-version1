import { Lazy, Suspense } from 'react'
import { useRef } from 'react'
import { React, useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, NavLink, BrowserRouter } from 'react-router-dom'
import { gsap } from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react';
import './assets/css/main.css' // Import main CSS file
import './assets/css/design-system.css' // Design tokens/hero/notes styles (also pulled in via main.css)
import Header from './components/header.jsx'
import HeaderforAboutPage from './components/headerForAboutPage.jsx'
import HeaderforProductsPage from './components/headerForProductsPage.jsx'
import PortfolioProjects from './components/portfolioProjects.jsx'
import Footer from './components/footer.jsx'
import Coverpage from './components/splashpage.jsx'
import DesignNotes from './components/designNotes';

//import sphere from './assets/images/sphere.png'
//import landingvideo from './assets/video/15863507-uhd_3840_2160_30fps.mp4'

function uuidToNormalizedNumber(uuidStr) {
  // Remove hyphens from the UUID string
  const hex = uuidStr.replace(/-/g, '');
  
  // Parse the 32-character hex string as a 128-bit integer using BigInt
  const bigIntValue = BigInt('0x' + hex);
  
  // 2^128 as a BigInt
  const max128Bit = 2n ** 128n;
  
  // Convert to a number between 0 (inclusive) and 1 (exclusive)
  return Number(bigIntValue) / Number(max128Bit);
}

gsap.registerPlugin(ScrollTrigger);

function Index() {

  {/* CSS Colorchanger v1 */}
  // Generates a number between 0 and 1
  // Applied to Div#One for random background color using CSS variable
  const [randomNumber] = useState((uuidToNormalizedNumber(crypto.randomUUID()))); //Math.random()
  const rootElementforDocument = document.documentElement;
  let rand = randomNumber; 
  rootElementforDocument.style.setProperty('--rand-value', rand);

  const progressbarRef = useRef(null);

  useEffect(() => {
    
      document.title = "Welcome to My React App";
      
    });
    
    useGSAP(() => {
      gsap.to("#progress-bar", {
        width: "100%",
        //scaleX: 1, // Performance tip: scaleX is smoother than animating width
        ease: "none",
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "bottom bottom",
          scrub: true // Links animation directly to scroll position
        }
      }, { scope: progressbarRef });

      return () => {
        // Cleanup if necessary

      }

  }, []);

  return (
    <>

      <div ref={progressbarRef}>  
        <div id="progress-bar"></div>
      </div>

      <Header />

      <div className="container">

        <div id="gridcontainer">             

            <div id="one" className="">

                <Coverpage />

            </div>

            <div id="two">

                <section className="">
                    <PortfolioProjects />
                </section>

            </div>

            <div id="seven">
              <Footer />
            </div>
        
        </div>

      </div>

    </>
  )
}

export default Index

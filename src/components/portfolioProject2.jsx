import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import SphereModel from './portfolioProject2Model.jsx';
import threejs from '../assets/images/sphere.png';

export default function Project2() {
  return (
    <>
    <div className="container-fluid p-0 m-0">
        <div className="row">
            <div className="col-12 bg-white text-dark">

                <h1><span className="alert alert-warning" style={{ padding: '3px' }}>Graphics / Hardware Acceleration is required</span><br />ThreeJS/drei </h1>
                <p>A WebGL is used for rendering this 3D model, please make sure that your browser or system is 
                  able to initialize a WebGL rendering context, which is necessary for Three.js to function. 
                  Any problems can be caused by several factors like Hardware Acceleration and Drivers, or 
                  Browser and System Issues. It might cause the browser to fall back to a 
                  software rendering mode, which can be significantly slower than graphics card based hardware acceleration.</p>
                
                {/* <img src={threejs} alt="3d sphere" style={{ width: '150px', height: '150px' }} /> */}
                
        <center>
        <div style={{ width: '45vw', height: '45vh', top: '10px' }}>
          <Canvas camera={{ position: [0, 0, 5] }}>
              <ambientLight intensity={0.5} />
              <directionalLight position={[0, 10, 5]} intensity={1} />
              <Suspense fallback={null}>
                <SphereModel />
              </Suspense>
              <OrbitControls />
              {/* optionally, add environment */}
              <Environment preset="studio" /> 
          </Canvas> 
        </div>
        </center>

        <div className="text-bg-dark text-light"></div>

            </div>
        </div>
    </div>
    </>
  );
}
'use client';

import React, { Suspense, useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import barcodeUrl from '@/design/barcode.svg';
import { Model } from '@/components/Model';
import Header from '@/components/Header';
import ModelLoader from '@/components/ModelLoader';

const Grid = () => {
  const startX = 800; // Start further left to cover the receding area
  const spacingX = 240;
  const spacingY = 180;
  const slope = spacingY / (2 * spacingX); // 180 / 480 = 0.375

  const verticals = Array.from({ length: 10 }, (_, i) => startX + i * spacingX);
  const yCenters = Array.from({ length: 20 }, (_, i) => -600 + i * spacingY);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden" style={{ perspective: '1200px' }}>
      <svg 
        viewBox="0 0 1920 1080" 
        className="absolute inset-0 w-full h-full pointer-events-none" 
        preserveAspectRatio="xMidYMid slice" 
        xmlns="http://www.w3.org/2000/svg"
        style={{
          transform: 'rotateY(-35deg) rotateX(2deg) scale(1.4) translateX(150px)',
          transformOrigin: 'right center'
        }}
      >
        <defs>
          <clipPath id="grid-clip">
            <rect x={startX} y="-500" width="1500" height="2000" />
          </clipPath>
        </defs>
        <g stroke="#000000" strokeWidth="1.5" strokeOpacity="0.15" fill="none" clipPath="url(#grid-clip)">
          {/* Verticals */}
          {verticals.map(x => (
            <line key={`v-${x}`} x1={x} y1="-500" x2={x} y2="2000" />
          ))}

          {/* Up-Right Lines */}
          {yCenters.map(y => {
            const x1 = startX - 500;
            const y1 = y - (-slope) * (x1 - startX);
            const x2 = startX + 2000;
            const y2 = y - (-slope) * (x2 - startX);
            return <line key={`ur-${y}`} x1={x1} y1={y1} x2={x2} y2={y2} />
          })}

          {/* Down-Right Lines */}
          {yCenters.map(y => {
            const x1 = startX - 500;
            const y1 = y - slope * (x1 - startX);
            const x2 = startX + 2000;
            const y2 = y - slope * (x2 - startX);
            return <line key={`dr-${y}`} x1={x1} y1={y1} x2={x2} y2={y2} />
          })}
        </g>
      </svg>
    </div>
  );
};

export default function Hero() {
  const [modelProps, setModelProps] = useState({ scale: 4.5, positionY: 0, shadowY: -3.8 });
  const [isCtrlPressed, setIsCtrlPressed] = useState(false);
  const [showZoomHint, setShowZoomHint] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Control' || e.key === 'Meta') setIsCtrlPressed(true);
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'Control' || e.key === 'Meta') setIsCtrlPressed(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const handleWheel = () => {
    if (isMobile) return; // Don't show hint on mobile/tablet
    if (!isCtrlPressed) {
      setShowZoomHint(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setShowZoomHint(false), 3000);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setShowZoomHint(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setShowZoomHint(false), 3000);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      
      if (window.innerWidth < 768) {
        // Mobile
        setModelProps({ scale: 3.2, positionY: 0, shadowY: -2 });
      } else if (window.innerWidth < 1024) {
        // Tablet
        setModelProps({ scale: 4.0, positionY: -0.5, shadowY: -3.8 });
      } else {
        // Desktop
        setModelProps({ scale: 4.5, positionY: 0, shadowY: -4.2 });
      }
    };

    handleResize(); // Set initial size
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="relative w-full h-dvh bg-[#FAFAFA] text-[#000000] overflow-hidden font-sans selection:bg-black selection:text-white">
      <Grid />

      {/* 3D Model Canvas */}
      <div className="absolute inset-0 z-10" onWheel={handleWheel} onTouchStart={handleTouchStart}>
        <ModelLoader />
        <Canvas shadows={{ type: THREE.PCFShadowMap }} camera={{ position: [0, 0, 10], fov: 35 }}>
          <ambientLight intensity={0.8} />
          {/* Main light shining directly from the viewer's perspective (camera is at 0, 0, 10) */}
          <directionalLight
            position={[0, 2, 10]}
            intensity={2}
            castShadow
            shadow-mapSize={1024}
          />
          {/* Soft fill light from the side to show depth */}
          <directionalLight position={[5, 0, 5]} intensity={0.8} />
          {/* Backlight to separate the model from the background */}
          <directionalLight position={[-5, 5, -5]} intensity={0.8} />
          <Environment preset="city" />
          
          <Suspense fallback={null}>
            <Model position={[0, modelProps.positionY, 0]} scale={modelProps.scale} />
            <ContactShadows
              position={[0, modelProps.shadowY, 0]}
              opacity={0.4}
              scale={15}
              blur={2}
              far={4}
            />
          </Suspense>
          
          <OrbitControls
            enableZoom={isMobile || isCtrlPressed}
            enableRotate={true}
            enablePan={false}
            touches={{
              ONE: undefined,              // Let single-finger pass through for page scrolling
              TWO: THREE.TOUCH.DOLLY_ROTATE // Two-finger rotate + pinch-to-zoom
            }}
          />
        </Canvas>

        {/* Interaction Hint Overlay */}
        <div className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-500 z-30 ${showZoomHint ? 'opacity-100' : 'opacity-0'}`}>
          <div className="bg-black/80 text-white px-6 py-4 rounded-2xl text-sm font-medium tracking-wide backdrop-blur-md border border-white/10 shadow-2xl flex flex-col items-center gap-2">
            <div className="flex gap-2 mb-1">
              <div className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-white opacity-50"></div>
            </div>
            {isMobile ? 'Use two fingers to rotate & zoom' : 'Use Ctrl + scroll to zoom'}
          </div>
        </div>
      </div>

      {/* UI Overlay */}
      <div className="absolute inset-0 z-20 pointer-events-none flex flex-col md:block px-6 py-6 md:p-0">
        
        {/* Header */}
        <Header />

        {/* Content */}
        <div className="flex flex-col grow md:absolute md:left-12 md:top-1/2 md:-translate-y-1/2 md:w-[380px] md:block pointer-events-none">
          <h1 className="text-4xl md:text-[3vw] font-black mt-8 md:mt-0 mb-4 pointer-events-auto">אתה הולך למות</h1>
          
          {/* Spacer for 3D Model on Mobile */}
          <div className="grow md:hidden"></div>
          
          <div className="pointer-events-auto mb-4 md:mb-0 hidden md:block">
            <p className="text-[12px] leading-[1.8] mb-6 font-medium">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p className="text-[12px] leading-[1.8] font-medium">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-end pointer-events-auto md:block mt-auto">
          <div className="md:absolute md:bottom-12 md:left-12">
            <Image src={barcodeUrl} alt="Barcode" className="h-8 md:h-12 w-auto" />
          </div>
          <div className="md:absolute md:bottom-10 md:right-12 text-[10px] font-medium opacity-40 tracking-wider">
            © 2026 by Heru Fahrizal.
          </div>
        </div>

      </div>
    </div>
  );
}

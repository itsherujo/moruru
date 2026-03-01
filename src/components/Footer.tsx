'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const containerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // This creates the "sticky reveal" effect using GSAP parallax
    // The text starts pushed up and moves down as you scroll, 
    // making it feel like it's fixed underneath the previous section.
    gsap.fromTo(
      contentRef.current,
      { yPercent: -30, scale: 0.95, opacity: 0 },
      {
        yPercent: 0,
        scale: 1,
        opacity: 1,
        ease: 'power2.out',
        force3D: true,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom', 
          end: 'bottom bottom',
          scrub: 1.5, // Even smoother catch-up
        },
      }
    );
  }, { scope: containerRef });

  return (
    <footer 
      ref={containerRef} 
      className="relative w-full h-[60vh] md:h-[80vh] bg-[#FAFAFA] text-[#050505] overflow-hidden"
      style={{ 
        clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)",
        WebkitClipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" // Safari compatibility
      }}
    >
      {/* Top Border */}
      <div className="absolute top-0 left-0 w-full h-px bg-[#050505] opacity-10 z-10"></div>
      
      {/* Animated Content Wrapper */}
      <div 
        ref={contentRef} 
        className="w-full h-full flex flex-col items-center justify-center relative translate-z-0 will-change-[transform,opacity]"
      >
        <h1 className="text-[18vw] md:text-[15vw] font-black tracking-tighter leading-none text-center select-none will-change-transform">
          @JOFRZL
        </h1>

        {/* Floating elements around the big text */}
        <div className="absolute top-1/4 left-10 md:left-24 text-[10px] font-medium uppercase tracking-widest opacity-40 hidden md:block">
          Digital <br /> Experience
        </div>
        <div className="absolute bottom-1/4 right-10 md:right-24 text-[10px] font-medium uppercase tracking-widest opacity-40 hidden md:block text-right">
          Creative <br /> Developer
        </div>
      </div>
      
      {/* Bottom Details */}
      <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12 text-[10px] font-medium uppercase tracking-widest opacity-40">
        All Rights Reserved
      </div>
      <div className="absolute bottom-6 right-6 md:bottom-12 md:right-12 text-[10px] font-medium uppercase tracking-widest opacity-40">
        2026 ©
      </div>
    </footer>
  );
}

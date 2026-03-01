import React from 'react';

export default function ComingSoon() {
  return (
    <section className="relative w-full bg-[#050505] text-[#FAFAFA] py-24 md:py-40 px-6 md:px-12 overflow-hidden font-sans">
      {/* Top Border */}
      <div className="absolute top-0 left-0 w-full h-px bg-[#FAFAFA] opacity-20"></div>
      
      <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-16 relative z-10">
        
        {/* Left Side: Big Text */}
        <div className="flex flex-col">
          <span className="text-[10px] font-medium tracking-[0.2em] uppercase opacity-50 mb-6">
            // Chapter 02
          </span>
          <h2 className="text-6xl md:text-[8vw] font-black leading-[0.85] tracking-tighter">
            COMING<br />SOON
          </h2>
        </div>
        
        {/* Right Side: Details */}
        <div className="flex flex-col max-w-sm w-full">
          <p className="text-[12px] leading-[1.8] font-medium opacity-70 mb-10">
            The next phase of the experience is currently under construction. New environments, interactive elements, and deeper lore will be unlocked in the upcoming update. Stay tuned for the transmission.
          </p>
          
          {/* Loading Bar */}
          <div className="w-full flex flex-col gap-3">
            <div className="flex justify-between text-[10px] font-medium uppercase tracking-wider opacity-50">
              <span>System Status</span>
              <span className="animate-pulse">Loading...</span>
            </div>
            <div className="w-full h-px bg-[#FAFAFA]/20 relative">
              {/* Animated loading bar */}
              <div className="absolute top-0 left-0 h-full bg-[#FAFAFA] w-[30%]"></div>
            </div>
          </div>
        </div>

      </div>
      
      {/* Background Grid (Subtle) */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]" 
        style={{ 
          backgroundImage: 'linear-gradient(#FAFAFA 1px, transparent 1px), linear-gradient(90deg, #FAFAFA 1px, transparent 1px)', 
          backgroundSize: '40px 40px',
          backgroundPosition: 'center center'
        }}
      ></div>
    </section>
  );
}

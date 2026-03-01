'use client';

import React from 'react';

export default function Header() {
  return (
    <header className="flex justify-between items-start pointer-events-auto md:absolute md:top-0 md:left-0 md:w-full md:px-12 md:py-10">
      <div className="flex items-center gap-2">
        <img src="/logo.svg" alt="Logo" className="w-6 h-6 md:w-8 md:h-8" />
        <span className="text-xl md:text-2xl font-medium tracking-tight mt-1">JO</span>
      </div>
      <nav className="hidden md:flex gap-10 text-sm font-medium tracking-wide">
        <a href="#" className="hover:opacity-60 transition-opacity">Home</a>
        <a href="#" className="hover:opacity-60 transition-opacity">About</a>
        <a href="#" className="hover:opacity-60 transition-opacity relative">Work</a>
        <a href="#" className="hover:opacity-60 transition-opacity">Contact</a>
      </nav>
    </header>
  );
}

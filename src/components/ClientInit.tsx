'use client';

import { useEffect } from 'react';

/**
 * ClientInit handles global client-side initialization logic, 
 * such as patching browser APIs or global library settings.
 */
export default function ClientInit() {
  useEffect(() => {
    // Suppress specific Three.js deprecation warnings caused by internal library usage
    const originalWarn = console.warn;
    console.warn = (...args) => {
      if (
        typeof args[0] === 'string' && 
        (args[0].includes('THREE.Clock: This module has been deprecated') || 
         args[0].includes('THREE.Quaternion: .setFromEuler() has been renamed'))
      ) {
        return;
      }
      originalWarn(...args);
    };

    return () => {
      // Restore original warn on unmount if necessary, 
      // though usually global patches like this persist.
      console.warn = originalWarn;
    };
  }, []);

  return null; // This component doesn't render anything
}

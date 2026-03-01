'use client';

import { useProgress } from '@react-three/drei';
import { useEffect, useRef, useState } from 'react';

export default function ModelLoader() {
  const { progress, active } = useProgress();
  const [visible, setVisible] = useState(true);
  const fadeTimerRef = useRef<NodeJS.Timeout | null>(null);
  const hideTimerRef = useRef<NodeJS.Timeout | null>(null);
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active && progress === 100) {
      // Fade out, then hide
      fadeTimerRef.current = setTimeout(() => {
        if (loaderRef.current) {
          loaderRef.current.style.opacity = '0';
        }
      }, 200);
      hideTimerRef.current = setTimeout(() => {
        setVisible(false);
      }, 1000);
    }
    return () => {
      if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, [active, progress]);

  if (!visible) return null;

  const displayProgress = Math.round(progress);

  return (
    <div
      ref={loaderRef}
      className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none"
      style={{ transition: 'opacity 0.7s ease-out' }}
    >
      <div className="flex flex-col items-center gap-6">
        {/* Animated circular progress ring */}
        <div className="relative w-16 h-16">
          {/* Outer track */}
          <svg className="w-full h-full -rotate-90" viewBox="0 0 64 64">
            <circle
              cx="32"
              cy="32"
              r="28"
              fill="none"
              stroke="#00000010"
              strokeWidth="2"
            />
            {/* Progress arc */}
            <circle
              cx="32"
              cy="32"
              r="28"
              fill="none"
              stroke="#000000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 28}`}
              strokeDashoffset={`${2 * Math.PI * 28 * (1 - progress / 100)}`}
              style={{ transition: 'stroke-dashoffset 0.3s ease-out' }}
            />
          </svg>

          {/* Center percentage */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[11px] font-medium tracking-wider tabular-nums">
              {displayProgress}
            </span>
          </div>
        </div>

        {/* Label */}
        <div className="flex flex-col items-center gap-1.5">
          <span className="text-[10px] font-semibold tracking-[0.3em] uppercase opacity-40">
            Loading Model
          </span>
          {/* Animated dots */}
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-1 h-1 rounded-full bg-black/30"
                style={{
                  animation: `loaderPulse 1.2s ease-in-out ${i * 0.2}s infinite`,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes loaderPulse {
          0%, 80%, 100% {
            opacity: 0.2;
            transform: scale(0.8);
          }
          40% {
            opacity: 1;
            transform: scale(1.2);
          }
        }
      `}</style>
    </div>
  );
}

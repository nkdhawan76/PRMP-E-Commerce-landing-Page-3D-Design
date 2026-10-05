import React, { useEffect, useRef } from 'react';

interface CustomCursorProps {
  mousePosRef: React.RefObject<{ x: number; y: number; isTouch: boolean }>;
}

export const CustomCursor: React.FC<CustomCursorProps> = ({ mousePosRef }) => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cursorRef.current;
    if (!el) return;

    let rafId: number;
    const updateCursor = () => {
      if (mousePosRef.current && !mousePosRef.current.isTouch) {
        const { x, y } = mousePosRef.current;
        el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      }
      rafId = requestAnimationFrame(updateCursor);
    };

    rafId = requestAnimationFrame(updateCursor);
    return () => cancelAnimationFrame(rafId);
  }, [mousePosRef]);

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="hidden lg:block fixed top-0 left-0 pointer-events-none z-50 transition-opacity duration-300"
      style={{
        mixBlendMode: 'exclusion',
        willChange: 'transform',
      }}
    >
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="block"
      >
        {/* Outer circle: r=22.75, strokeWidth=2.5 */}
        <circle
          cx="24"
          cy="24"
          r="22.75"
          stroke="#FFFFFF"
          strokeWidth="2.5"
          fill="none"
        />
        {/* Custom Japanese / decorative glyph path (stylized avant-garde prompt mark) */}
        <path
          d="M17 17H31M24 17V33M18.5 24.5L15 29.5M29.5 24.5L33 29.5"
          stroke="#FFFFFF"
          strokeWidth="2.5"
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
        <circle cx="24" cy="24" r="1.5" fill="#FFFFFF" />
      </svg>
    </div>
  );
};

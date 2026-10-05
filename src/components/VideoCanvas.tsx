import React, { useEffect, useRef, useState } from 'react';
import { VIDEO_LEFT, VIDEO_RIGHT } from '../data/archiveItems';

interface VideoCanvasProps {
  canvasContainerRef: React.RefObject<HTMLDivElement | null>;
  mousePosRef: React.RefObject<{ x: number; y: number; isTouch: boolean }>;
  isMobile: boolean;
}

export const VideoCanvas: React.FC<VideoCanvasProps> = ({
  canvasContainerRef,
  mousePosRef,
  isMobile,
}) => {
  const leftVideoRef = useRef<HTMLVideoElement>(null);
  const rightVideoRef = useRef<HTMLVideoElement>(null);
  const activeSideRef = useRef<'left' | 'right'>('right');

  const [leftLoaded, setLeftLoaded] = useState(false);
  const [rightLoaded, setRightLoaded] = useState(false);
  const [forceShow, setForceShow] = useState(false);

  // Fallback timer to show video canvas even if one metadata is slow
  useEffect(() => {
    const timer = setTimeout(() => {
      setForceShow(true);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const isLoaded = (leftLoaded && rightLoaded) || forceShow;

  // Video interaction loop
  useEffect(() => {
    const left = leftVideoRef.current;
    const right = rightVideoRef.current;
    if (!left || !right) return;

    let rafId: number;
    const isTouch =
      typeof window !== 'undefined' &&
      ('ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        window.innerWidth < 1024);

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isTouch) {
      // Touch mode: alternate autoplay
      left.pause();
      right.pause();

      if (!prefersReducedMotion) {
        // Left plays first
        left.style.display = 'block';
        right.style.display = 'none';
        left.currentTime = 0;
        left.play().catch(() => {});

        const handleLeftEnded = () => {
          left.style.display = 'none';
          right.style.display = 'block';
          right.currentTime = 0;
          right.play().catch(() => {});
        };

        const handleRightEnded = () => {
          right.style.display = 'none';
          left.style.display = 'block';
          left.currentTime = 0;
          left.play().catch(() => {});
        };

        left.addEventListener('ended', handleLeftEnded);
        right.addEventListener('ended', handleRightEnded);

        return () => {
          left.removeEventListener('ended', handleLeftEnded);
          right.removeEventListener('ended', handleRightEnded);
        };
      }
    } else {
      // Desktop mode: cursor scrubbing via RAF
      // Pause both videos
      left.pause();
      right.pause();
      left.style.display = 'none';
      right.style.display = 'block';

      const updateScrubbing = () => {
        if (!mousePosRef.current) {
          rafId = requestAnimationFrame(updateScrubbing);
          return;
        }

        const cursorX = mousePosRef.current.x;
        const width = window.innerWidth;
        const center = width / 2;
        const deadZone = Math.max(50, width * 0.05);
        const centerLeft = center - deadZone;
        const centerRight = center + deadZone;

        if (cursorX >= centerLeft && cursorX <= centerRight) {
          // Inside dead zone: keep currentTime at 0, show whichever was last active
          if (activeSideRef.current === 'right') {
            right.style.display = 'block';
            left.style.display = 'none';
            if (!right.seeking && right.currentTime !== 0) {
              right.currentTime = 0;
            }
          } else {
            left.style.display = 'block';
            right.style.display = 'none';
            if (!left.seeking && left.currentTime !== 0) {
              left.currentTime = 0;
            }
          }
        } else if (cursorX < centerLeft) {
          // Cursor is left of dead zone: show RIGHT video
          activeSideRef.current = 'right';
          right.style.display = 'block';
          left.style.display = 'none';

          const dist = centerLeft - cursorX;
          const progress = Math.min(1, Math.max(0, dist / centerLeft));

          if (right.duration && !right.seeking) {
            const targetTime = progress * right.duration;
            if (Math.abs(right.currentTime - targetTime) > 0.03) {
              right.currentTime = targetTime;
            }
          }
        } else {
          // Cursor is right of dead zone: show LEFT video
          activeSideRef.current = 'left';
          left.style.display = 'block';
          right.style.display = 'none';

          const dist = cursorX - centerRight;
          const availableRange = width - centerRight;
          const progress = Math.min(1, Math.max(0, dist / availableRange));

          if (left.duration && !left.seeking) {
            const targetTime = progress * left.duration;
            if (Math.abs(left.currentTime - targetTime) > 0.03) {
              left.currentTime = targetTime;
            }
          }
        }

        rafId = requestAnimationFrame(updateScrubbing);
      };

      rafId = requestAnimationFrame(updateScrubbing);
      return () => cancelAnimationFrame(rafId);
    }
  }, [mousePosRef]);

  return (
    <div
      id="main-canvas"
      ref={canvasContainerRef}
      className={`pointer-events-none overflow-hidden transition-opacity duration-300 ease-out ${
        isLoaded ? 'opacity-100' : 'opacity-0'
      } ${
        isMobile
          ? 'fixed left-0 top-[220px] w-screen h-[calc(100vh-220px)] z-0'
          : 'fixed inset-0 w-full h-full z-0'
      }`}
      style={{
        backgroundColor: '#000000',
      }}
    >
      {/* LEFT Video */}
      <video
        ref={leftVideoRef}
        src={VIDEO_LEFT}
        muted
        playsInline
        preload="auto"
        onLoadedData={() => setLeftLoaded(true)}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
        style={{ display: 'none' }}
      />

      {/* RIGHT Video */}
      <video
        ref={rightVideoRef}
        src={VIDEO_RIGHT}
        muted
        playsInline
        preload="auto"
        onLoadedData={() => setRightLoaded(true)}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
        style={{ display: 'block' }}
      />
    </div>
  );
};

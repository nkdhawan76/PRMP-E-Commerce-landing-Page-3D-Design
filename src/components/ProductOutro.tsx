import React from 'react';
import { motion } from 'motion/react';

interface ProductOutroProps {
  onOpenView: () => void;
  onOpenPrivacy: () => void;
  outroInfoRef: React.RefObject<HTMLDivElement | null>;
  outroBuyRef: React.RefObject<HTMLDivElement | null>;
  outroOverlayRef: React.RefObject<HTMLDivElement | null>;
  outroFooterRef: React.RefObject<HTMLElement | null>;
  circleSymbolRef: React.RefObject<HTMLSpanElement | null>;
  isMobile: boolean;
}

export const ProductOutro: React.FC<ProductOutroProps> = ({
  onOpenView,
  onOpenPrivacy,
  outroInfoRef,
  outroBuyRef,
  outroOverlayRef,
  outroFooterRef,
  circleSymbolRef,
  isMobile,
}) => {
  return (
    <>
      {/* 1I. White Overlay (z-index: 12) */}
      <div
        id="outro-overlay"
        ref={outroOverlayRef}
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none z-12 bg-white"
        style={{
          opacity: 0,
          willChange: 'opacity',
        }}
      />

      {/* 1E. Product Info (Bottom Right) */}
      <motion.div
        id="outro-info"
        ref={outroInfoRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.45 }}
        data-outro-offset={isMobile ? '132' : '166'}
        className={`fixed z-20 pointer-events-none flex flex-col items-center ${
          isMobile
            ? 'left-0 right-0 bottom-[48px]'
            : 'right-[32px] bottom-[80px] w-[330px]'
        }`}
        style={{
          mixBlendMode: 'exclusion',
          willChange: 'transform',
        }}
      >
        {/* Top block */}
        <div
          className={`flex flex-col items-start ${
            isMobile ? 'w-[252px] mb-[12px]' : 'w-full mb-[32px]'
          }`}
        >
          {/* Circle icon */}
          <div
            className={`relative flex items-center justify-center ${
              isMobile ? 'w-[20px] h-[20px] mb-2' : 'w-[30px] h-[30px] mb-3'
            }`}
          >
            <svg
              className="w-full h-full block"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="20"
                cy="20"
                r="18.75"
                stroke="#FFFFFF"
                strokeWidth={isMobile ? 2 : 2.5}
                fill="none"
              />
            </svg>
            <span
              id="circle-symbol"
              ref={circleSymbolRef}
              className={`absolute inset-0 flex items-center justify-center text-[#FFFFFF] uppercase tracking-[-0.04em] font-medium leading-none select-none ${
                isMobile ? 'text-[10px]' : 'text-[15px]'
              }`}
              style={{ fontFamily: '"Inter Tight", sans-serif' }}
            >
              8
            </span>
          </div>

          {/* Collection label */}
          <h2
            className={`text-[#FFFFFF] uppercase font-medium leading-[100%] tracking-[-0.04em] text-center w-full ${
              isMobile ? 'text-[20px]' : 'text-[30px]'
            }`}
            style={{ fontFamily: '"Inter Tight", sans-serif' }}
          >
            ARCHIVE COLLECTION
            <br />
            &quot;PROMPT&quot;
          </h2>
        </div>

        {/* Price */}
        <div
          className={`text-[#FFFFFF] font-medium leading-[100%] tracking-[-0.04em] text-center ${
            isMobile ? 'text-[60px]' : 'text-[80px]'
          }`}
          style={{ fontFamily: '"Inter Tight", sans-serif' }}
        >
          $97,33
        </div>
      </motion.div>

      {/* 1F. "View" Button (Bottom Right, Initially Hidden) */}
      <div
        id="outro-buy"
        ref={outroBuyRef}
        onClick={onOpenView}
        role="button"
        tabIndex={0}
        aria-label="View collection item"
        className={`fixed z-20 pointer-events-auto bg-[#FFFFFF] rounded-[1335px] flex items-center justify-center cursor-pointer select-none transition-shadow hover:shadow-2xl active:scale-95 ${
          isMobile
            ? 'left-[16px] right-[16px] bottom-[60px] h-[100px]'
            : 'right-[32px] bottom-[32px] w-[330px] h-[174px]'
        }`}
        style={{
          mixBlendMode: 'exclusion',
          transformOrigin: 'right bottom',
          transform: 'scale(0)',
          willChange: 'transform',
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onOpenView();
          }
        }}
      >
        <span
          className={`text-[#FFFFFF] font-medium tracking-[-0.04em] leading-none ${
            isMobile ? 'text-[72px]' : 'text-[110px]'
          }`}
          style={{
            mixBlendMode: 'exclusion',
            fontFamily: '"Inter Tight", sans-serif',
          }}
        >
          view
        </span>
      </div>

      {/* 1J. Footer */}
      <footer
        id="outro-footer"
        ref={outroFooterRef}
        className={`fixed pointer-events-none z-20 flex items-center text-[#FFFFFF] font-medium uppercase tracking-[-0.02em] ${
          isMobile
            ? 'left-[16px] right-[16px] bottom-[24px] justify-between text-[11px]'
            : 'left-[16px] bottom-[32px] gap-[80px] text-[13px]'
        }`}
        style={{
          mixBlendMode: 'exclusion',
          opacity: 0,
          willChange: 'opacity',
          fontFamily: '"Inter Tight", sans-serif',
        }}
      >
        <span>PRMPT (R) 2026</span>
        <button
          onClick={onOpenPrivacy}
          type="button"
          aria-label="View privacy policy"
          className="pointer-events-auto hover:opacity-75 transition-opacity cursor-pointer uppercase"
        >
          PRIVACY POLICY
        </button>
      </footer>
    </>
  );
};

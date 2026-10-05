import React from 'react';
import { motion } from 'motion/react';

interface HeaderNavProps {
  onOpenAbout: () => void;
  onOpenCart: () => void;
  onOpenMenu: () => void;
  cartCount: number;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  onOpenAbout,
  onOpenCart,
  onOpenMenu,
  cartCount,
}) => {
  return (
    <>
      {/* 1B. Logo (Top Left) */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0 }}
        className="fixed top-4 left-4 lg:top-8 lg:left-8 z-20 pointer-events-none"
        style={{ mixBlendMode: 'exclusion' }}
      >
        <div className="w-[124px] sm:w-[266px] lg:w-[355px]">
          <svg
            viewBox="0 0 355 110"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto block"
            aria-label="prmpt archive logo"
          >
            {/* Wordmark: prmpt */}
            {/* p */}
            <path
              d="M12 28H28V36C33 30 40 26 49 26C65 26 77 39 77 56C77 74 65 86 49 86C40 86 33 82 28 76V108H12V28ZM28 56C28 66 35 73 44 73C54 73 61 65 61 56C61 46 54 39 44 39C35 39 28 46 28 56Z"
              fill="#FFFFFF"
            />
            {/* r */}
            <path
              d="M90 28H106V40C111 31 119 26 130 26C133 26 137 27 140 28V43C136 41 131 40 126 40C115 40 106 48 106 61V84H90V28Z"
              fill="#FFFFFF"
            />
            {/* m */}
            <path
              d="M152 28H168V38C173 30 181 26 191 26C200 26 208 31 212 39C218 30 227 26 237 26C252 26 261 36 261 52V84H245V54C245 44 240 39 232 39C224 39 218 45 218 55V84H202V54C202 44 197 39 189 39C181 39 175 45 175 55V84H159V28H152Z"
              fill="#FFFFFF"
            />
            {/* p */}
            <path
              d="M272 28H288V36C293 30 300 26 309 26C325 26 337 39 337 56C337 74 325 86 309 86C300 86 293 82 288 76V108H272V28ZM288 56C288 66 295 73 304 73C314 73 321 65 321 56C321 46 314 39 304 39C295 39 288 46 288 56Z"
              fill="#FFFFFF"
            />
            {/* Circled R mark */}
            <circle
              cx="342"
              cy="24"
              r="10"
              stroke="#FFFFFF"
              strokeWidth="1.8"
              fill="none"
            />
            <path
              d="M339 19H342.5C344.2 19 345.5 19.8 345.5 21.2C345.5 22.4 344.6 23.1 343.3 23.3L345.7 28H343.8L341.6 23.7H340.5V28H339V19ZM340.5 22.4H342.3C343.2 22.4 343.8 21.9 343.8 21.2C343.8 20.5 343.2 20.1 342.3 20.1H340.5V22.4Z"
              fill="#FFFFFF"
            />
          </svg>
        </div>
      </motion.div>

      {/* 1C. Caption (Below Logo, Left Side) */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.3 }}
        className="fixed z-20 pointer-events-none left-4 lg:left-8 top-[118px] sm:top-[180px] lg:top-[244px] w-[calc(100vw-32px)] sm:w-[calc(50vw-48px)] lg:w-[692px]"
        style={{ mixBlendMode: 'exclusion' }}
      >
        <p
          className="text-[#FFFFFF] text-[12px] leading-[140%] tracking-[-0.04em] font-medium"
          style={{ fontFamily: '"Inter Tight", sans-serif' }}
        >
          When switching between videos near the center, do not reset currentTime to 0 abruptly. Add a small dead zone: if cursor is within +/-50px of center, keep both videos at currentTime = 0 and show whichever was last active.
        </p>
      </motion.div>

      {/* 1D. Header Navigation (Top Right) */}
      <motion.header
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.15 }}
        className="fixed top-4 right-4 lg:top-8 lg:right-8 z-20 pointer-events-none w-auto lg:w-[330px] h-[30px] flex items-center justify-between"
        style={{ mixBlendMode: 'exclusion' }}
      >
        {/* ABOUT text (hidden on mobile) */}
        <button
          onClick={onOpenAbout}
          type="button"
          aria-label="Open About Information"
          className="hidden lg:inline-block pointer-events-auto text-[#FFFFFF] text-[15px] uppercase font-medium tracking-normal hover:opacity-75 transition-opacity cursor-pointer text-left"
          style={{ fontFamily: '"Inter Tight", sans-serif' }}
        >
          ABOUT
        </button>

        {/* Right sub-group: Hamburger icon + [ CART ] */}
        <div className="flex items-center gap-[20px] lg:gap-[50px] ml-auto">
          {/* Hamburger SVG icon */}
          <button
            onClick={onOpenMenu}
            type="button"
            aria-label="Toggle navigation menu"
            className="pointer-events-auto hover:opacity-75 transition-opacity cursor-pointer p-0.5"
          >
            <svg
              className="w-[24px] h-[24px] lg:w-[30px] lg:h-[30px] block"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 14H40"
                stroke="#FFFFFF"
                strokeWidth="2.5"
                strokeLinecap="square"
              />
              <path
                d="M0 26H40"
                stroke="#FFFFFF"
                strokeWidth="2.5"
                strokeLinecap="square"
              />
            </svg>
          </button>

          {/* [ CART ] text */}
          <button
            onClick={onOpenCart}
            type="button"
            aria-label="View shopping cart"
            className="pointer-events-auto text-[#FFFFFF] text-[13px] lg:text-[15px] font-medium uppercase tracking-normal hover:opacity-75 transition-opacity cursor-pointer flex items-center gap-1.5"
            style={{ fontFamily: '"Inter Tight", sans-serif' }}
          >
            <span>[ CART{cartCount > 0 ? ` : ${cartCount}` : ''} ]</span>
          </button>
        </div>
      </motion.header>
    </>
  );
};

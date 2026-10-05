/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { ARCHIVE_ITEMS, ArchiveItem, CIRCLE_SYMBOLS } from './data/archiveItems';
import { CustomCursor } from './components/CustomCursor';
import { HeaderNav } from './components/HeaderNav';
import { VideoCanvas } from './components/VideoCanvas';
import { BlackPanelGallery } from './components/BlackPanelGallery';
import { ProductOutro } from './components/ProductOutro';
import {
  ItemDetailModal,
  CartDrawer,
  AboutModal,
  MenuDrawer,
  PrivacyModal,
} from './components/Modals';

gsap.registerPlugin(ScrollTrigger);

// Layout generator algorithm
function buildLayout(count: number, cols: number): number[][] {
  const rows: number[][] = [];
  let currentImg = 0;
  let r = 0;

  while (currentImg < count) {
    const row = new Array(cols).fill(-1);
    const a = (r * 2 + (r % 2)) % cols;
    row[a] = currentImg++;

    if (currentImg < count && r % 3 === 0) {
      let b = (a + 2) % cols;
      if (b === a) {
        b = (a + 1) % cols;
      }
      row[b] = currentImg++;
    }

    rows.push(row);
    r++;
  }
  return rows;
}

export default function App() {
  const [cols, setCols] = useState<number>(4);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isTouchDevice, setIsTouchDevice] = useState<boolean>(false);

  // Modals state
  const [selectedItem, setSelectedItem] = useState<ArchiveItem | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isAboutOpen, setIsAboutOpen] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState<boolean>(false);

  // Cart state
  const [cart, setCart] = useState<Array<{ item: ArchiveItem; size: string; quantity: number }>>([
    { item: ARCHIVE_ITEMS[0], size: 'L', quantity: 1 },
  ]);

  // DOM refs
  const scrollSpacerRef = useRef<HTMLDivElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const blackPanelRef = useRef<HTMLDivElement>(null);
  const innerWrapperRef = useRef<HTMLDivElement>(null);

  const outroOverlayRef = useRef<HTMLDivElement>(null);
  const outroInfoRef = useRef<HTMLDivElement>(null);
  const outroBuyRef = useRef<HTMLDivElement>(null);
  const outroFooterRef = useRef<HTMLElement>(null);
  const circleSymbolRef = useRef<HTMLSpanElement>(null);

  // Mouse position reference for RAF video scrub and cursor
  const mousePosRef = useRef<{ x: number; y: number; isTouch: boolean }>({
    x: typeof window !== 'undefined' ? window.innerWidth / 2 : 500,
    y: typeof window !== 'undefined' ? window.innerHeight / 2 : 500,
    isTouch: false,
  });

  // Card cell elements map: index -> { cellEl, cardEl }
  const cardCellsRef = useRef<Map<number, { cellEl: HTMLDivElement; cardEl: HTMLDivElement }>>(
    new Map()
  );

  const registerCardCell = useCallback(
    (index: number, cellEl: HTMLDivElement | null, cardEl: HTMLDivElement | null) => {
      if (cellEl && cardEl) {
        cardCellsRef.current.set(index, { cellEl, cardEl });
      } else {
        cardCellsRef.current.delete(index);
      }
    },
    []
  );

  // Responsive column determination
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const touch =
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia('(pointer: coarse)').matches;

      setIsTouchDevice(touch);
      setIsMobile(width < 640);

      if (width < 640) {
        setCols(2);
      } else if (width < 1024) {
        setCols(3);
      } else {
        setCols(4);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const layoutRows = useMemo(() => {
    return buildLayout(ARCHIVE_ITEMS.length, cols);
  }, [cols]);

  // Mouse move listener
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mousePosRef.current.x = e.clientX;
      mousePosRef.current.y = e.clientY;
      mousePosRef.current.isTouch = false;
    };

    const onTouchStart = () => {
      mousePosRef.current.isTouch = true;
      setIsTouchDevice(true);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('touchstart', onTouchStart, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchstart', onTouchStart);
    };
  }, []);

  // Main RAF Scroll Driver & Height Calculation Loop
  useEffect(() => {
    let rafId: number;
    let lastScrollY = -1;
    let lastSymbolTime = 0;
    let symbolIdx = 0;

    const tick = () => {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      const vh = window.innerHeight;

      // Calculate inner wrapper scroll height & dynamic spacer height
      if (innerWrapperRef.current && scrollSpacerRef.current) {
        const wrapScrollHeight = innerWrapperRef.current.offsetHeight || innerWrapperRef.current.scrollHeight;
        const maxScroll = Math.max(0, wrapScrollHeight - vh);
        const targetSpacerHeight = vh + maxScroll + 2 * vh;

        // Keep spacer height in sync
        const currentSpacerStyle = scrollSpacerRef.current.style.height;
        const expectedStyle = `${targetSpacerHeight}px`;
        if (currentSpacerStyle !== expectedStyle) {
          scrollSpacerRef.current.style.height = expectedStyle;
        }

        // SCROLL PHASES
        if (blackPanelRef.current && canvasContainerRef.current) {
          if (scrollY <= vh) {
            // PHASE 1: Panel slides up from translateY(100vh) to translateY(0)
            const panelOffset = Math.max(0, vh - scrollY);
            blackPanelRef.current.style.transform = `translate3d(0, ${panelOffset}px, 0)`;
            innerWrapperRef.current.style.transform = 'translate3d(0, 0, 0)';
            canvasContainerRef.current.style.visibility = 'visible';
          } else {
            // PHASE 2 & OUTRO: Panel fixed at top
            blackPanelRef.current.style.transform = 'translate3d(0, 0, 0)';
            canvasContainerRef.current.style.visibility = 'hidden';

            const phase2Offset = Math.min(maxScroll, scrollY - vh);
            innerWrapperRef.current.style.transform = `translate3d(0, ${-phase2Offset}px, 0)`;
          }

          // OUTRO PHASE: scrollY > vh + maxScroll
          const outroStart = vh + maxScroll;
          if (scrollY > outroStart) {
            const outroDistance = Math.max(1, vh - 100);
            const outroProgress = Math.max(0, Math.min(1, (scrollY - outroStart) / outroDistance));

            // White overlay fade in
            if (outroOverlayRef.current) {
              outroOverlayRef.current.style.opacity = `${outroProgress}`;
            }

            // Outro product info slide up
            if (outroInfoRef.current) {
              const offsetPx = isMobile ? 132 : 166;
              outroInfoRef.current.style.transform = `translate3d(0, ${-outroProgress * offsetPx}px, 0)`;
            }

            // "view" button scale up
            if (outroBuyRef.current) {
              outroBuyRef.current.style.transform = `scale(${outroProgress})`;
            }

            // Footer fade in
            if (outroFooterRef.current) {
              outroFooterRef.current.style.opacity = `${outroProgress}`;
            }
          } else {
            // Reset outro elements
            if (outroOverlayRef.current) outroOverlayRef.current.style.opacity = '0';
            if (outroInfoRef.current) outroInfoRef.current.style.transform = 'translate3d(0, 0, 0)';
            if (outroBuyRef.current) outroBuyRef.current.style.transform = 'scale(0)';
            if (outroFooterRef.current) outroFooterRef.current.style.opacity = '0';
          }
        }
      }

      // Card scale computation per-frame in RAF
      cardCellsRef.current.forEach(({ cellEl, cardEl }) => {
        if (!cellEl || !cardEl) return;
        const rect = cellEl.getBoundingClientRect();
        const top = rect.top;
        const bottom = rect.bottom;

        if (bottom <= 0 || top >= vh) {
          cardEl.style.transform = 'scale(0)';
        } else {
          // Enter: scales from 0 to 1 as it enters viewport
          const enter = (vh - top) / (vh * 0.6);
          // Exit: scales from 1 to 0 as it exits top
          const exit = bottom / (vh * 0.4);
          const scale = Math.max(0, Math.min(1, Math.min(enter, exit)));
          cardEl.style.transform = `scale(${scale})`;
        }
      });

      // Circle symbol randomizer (throttled 80ms on scroll)
      const now = performance.now();
      if (Math.abs(scrollY - lastScrollY) > 2 && now - lastSymbolTime > 80) {
        if (circleSymbolRef.current) {
          symbolIdx = (symbolIdx + 1) % CIRCLE_SYMBOLS.length;
          const nextSymbol = CIRCLE_SYMBOLS[symbolIdx];
          circleSymbolRef.current.textContent = nextSymbol;
        }
        lastSymbolTime = now;
        lastScrollY = scrollY;
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [isMobile]);

  // Cart operations
  const handleAddToCart = (item: ArchiveItem, size: string) => {
    setCart((prev) => {
      const idx = prev.findIndex((entry) => entry.item.id === item.id && entry.size === size);
      if (idx > -1) {
        const copy = [...prev];
        copy[idx].quantity += 1;
        return copy;
      }
      return [...prev, { item, size, quantity: 1 }];
    });
  };

  const handleUpdateQty = (index: number, delta: number) => {
    setCart((prev) => {
      const copy = [...prev];
      copy[index].quantity += delta;
      if (copy[index].quantity <= 0) {
        copy.splice(index, 1);
      }
      return copy;
    });
  };

  const handleRemoveFromCart = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  // Scroll jump handlers
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollToGallery = () => {
    const vh = window.innerHeight;
    window.scrollTo({ top: vh + 10, behavior: 'smooth' });
  };

  const handleScrollToOutro = () => {
    if (innerWrapperRef.current) {
      const vh = window.innerHeight;
      const wrapScrollHeight = innerWrapperRef.current.offsetHeight || innerWrapperRef.current.scrollHeight;
      const maxScroll = Math.max(0, wrapScrollHeight - vh);
      window.scrollTo({ top: vh + maxScroll + vh * 0.8, behavior: 'smooth' });
    }
  };

  return (
    <div
      id="scroll-spacer"
      ref={scrollSpacerRef}
      className={`relative select-none bg-white text-white ${
        !isTouchDevice ? 'cursor-none' : 'cursor-auto'
      }`}
      style={{
        height: '500vh',
        minHeight: '100vh',
        width: '100%',
        overflowX: 'hidden',
      }}
    >
      {/* 1A. Custom Cursor (Desktop Only) */}
      <CustomCursor mousePosRef={mousePosRef} />

      {/* 1B, 1C, 1D: Logo, Caption, Header Navigation */}
      <HeaderNav
        onOpenAbout={() => setIsAboutOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenMenu={() => setIsMenuOpen(true)}
        cartCount={cart.reduce((sum, c) => sum + c.quantity, 0)}
      />

      {/* 1G & 1H: Full-Viewport Video Background */}
      <VideoCanvas
        canvasContainerRef={canvasContainerRef}
        mousePosRef={mousePosRef}
        isMobile={isMobile}
      />

      {/* SECTION 2: Black Panel (Gallery) */}
      <BlackPanelGallery
        blackPanelRef={blackPanelRef}
        innerWrapperRef={innerWrapperRef}
        registerCardCell={registerCardCell}
        cols={cols}
        layoutRows={layoutRows}
        onSelectItem={(item) => setSelectedItem(item)}
      />

      {/* 1E, 1F, 1I, 1J: Product Info, View Button, White Overlay, Footer */}
      <ProductOutro
        onOpenView={() => setSelectedItem(ARCHIVE_ITEMS[0])}
        onOpenPrivacy={() => setIsPrivacyOpen(true)}
        outroInfoRef={outroInfoRef}
        outroBuyRef={outroBuyRef}
        outroOverlayRef={outroOverlayRef}
        outroFooterRef={outroFooterRef}
        circleSymbolRef={circleSymbolRef}
        isMobile={isMobile}
      />

      {/* Interactive Modals and Drawers (Rule 0 Compliance) */}
      <ItemDetailModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        onAddToCart={handleAddToCart}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQty={handleUpdateQty}
        onRemove={handleRemoveFromCart}
      />

      <AboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
      />

      <MenuDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onScrollToTop={handleScrollToTop}
        onScrollToGallery={handleScrollToGallery}
        onScrollToOutro={handleScrollToOutro}
        onOpenAbout={() => setIsAboutOpen(true)}
      />

      <PrivacyModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
      />
    </div>
  );
}

import React, { useState } from 'react';
import { ArchiveItem } from '../data/archiveItems';

interface ItemDetailModalProps {
  item: ArchiveItem | null;
  onClose: () => void;
  onAddToCart: (item: ArchiveItem, size: string) => void;
}

export const ItemDetailModal: React.FC<ItemDetailModalProps> = ({
  item,
  onClose,
  onAddToCart,
}) => {
  const [selectedSize, setSelectedSize] = useState('M');
  const [added, setAdded] = useState(false);

  if (!item) return null;

  const handleAdd = () => {
    onAddToCart(item, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-item-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-12 bg-black/85 backdrop-blur-md transition-opacity"
    >
      <div
        className="relative w-full max-w-4xl bg-neutral-950 border border-white/20 text-white overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
        style={{ fontFamily: '"Inter Tight", sans-serif' }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          aria-label="Close details"
          className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center bg-black/60 border border-white/20 text-white hover:bg-white hover:text-black transition-colors cursor-pointer"
        >
          ✕
        </button>

        {/* Left Column: Image */}
        <div className="w-full md:w-1/2 h-72 sm:h-96 md:h-auto relative bg-black shrink-0 overflow-hidden">
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4 bg-black/80 px-2.5 py-1 text-xs font-mono uppercase tracking-widest border border-white/10">
            {item.code}
          </div>
        </div>

        {/* Right Column: Metadata & Purchase */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="flex items-center justify-between text-xs text-neutral-400 uppercase tracking-widest mb-2">
              <span>{item.category}</span>
              <span>{item.season}</span>
            </div>

            <h2 id="modal-item-title" className="text-2xl sm:text-3xl font-medium tracking-tight mb-2">
              {item.title}
            </h2>

            <div className="text-2xl font-mono text-neutral-200 mb-6">
              {item.price}
            </div>

            <p className="text-sm text-neutral-300 leading-relaxed mb-6 font-normal">
              {item.description}
            </p>

            {/* Technical Specs */}
            <div className="space-y-2 border-t border-white/10 pt-4 mb-6 text-xs">
              <div className="flex justify-between text-neutral-400">
                <span>Fabrication</span>
                <span className="text-white text-right font-medium">{item.fabric}</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Archive Edition</span>
                <span className="text-white font-medium">{item.edition}</span>
              </div>
            </div>

            {/* Features */}
            <div className="mb-6">
              <span className="text-xs uppercase tracking-widest text-neutral-400 block mb-2 font-medium">
                Construction Details
              </span>
              <ul className="text-xs space-y-1.5 text-neutral-300 list-disc list-inside">
                {item.details.map((detail, i) => (
                  <li key={i}>{detail}</li>
                ))}
              </ul>
            </div>

            {/* Size selector */}
            <div className="mb-6">
              <span className="text-xs uppercase tracking-widest text-neutral-400 block mb-2 font-medium">
                Select Size
              </span>
              <div className="flex gap-2">
                {['S', 'M', 'L', 'XL'].map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`w-10 h-10 text-xs font-mono border transition-colors cursor-pointer ${
                      selectedSize === size
                        ? 'bg-white text-black border-white'
                        : 'bg-transparent text-neutral-300 border-white/20 hover:border-white'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Action button */}
          <button
            onClick={handleAdd}
            type="button"
            className="w-full py-4 text-xs uppercase tracking-widest font-medium transition-all bg-white text-black hover:bg-neutral-200 active:scale-[0.99] cursor-pointer"
          >
            {added ? 'ADDED TO ARCHIVE CART' : `ACQUIRE PIECE (${item.price})`}
          </button>
        </div>
      </div>
    </div>
  );
};

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: Array<{ item: ArchiveItem; size: string; quantity: number }>;
  onUpdateQty: (index: number, delta: number) => void;
  onRemove: (index: number) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQty,
  onRemove,
}) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-xs transition-opacity"
    >
      <div
        className="w-full max-w-md bg-neutral-950 border-l border-white/20 text-white h-full flex flex-col justify-between p-6 sm:p-8"
        style={{ fontFamily: '"Inter Tight", sans-serif' }}
      >
        <div>
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
            <h3 className="text-lg uppercase tracking-wider font-medium">
              Archive Cart [{cart.reduce((acc, c) => acc + c.quantity, 0)}]
            </h3>
            <button
              onClick={onClose}
              type="button"
              className="p-1 text-neutral-400 hover:text-white transition-colors cursor-pointer"
            >
              ✕
            </button>
          </div>

          {cart.length === 0 ? (
            <div className="py-16 text-center text-neutral-500 text-sm">
              Your archive cart is currently empty.
              <p className="mt-2 text-xs text-neutral-600">
                Browse the collection grid and select a piece to acquire.
              </p>
            </div>
          ) : (
            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
              {cart.map((entry, idx) => (
                <div
                  key={`${entry.item.id}-${entry.size}`}
                  className="flex gap-4 p-3 bg-neutral-900 border border-white/10 items-center justify-between"
                >
                  <img
                    src={entry.item.imageUrl}
                    alt={entry.item.title}
                    className="w-16 h-20 object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0 pr-2">
                    <p className="text-xs uppercase text-neutral-400 font-mono">
                      {entry.item.code} · Size {entry.size}
                    </p>
                    <p className="text-sm font-medium truncate">{entry.item.title}</p>
                    <p className="text-xs text-neutral-300 font-mono mt-0.5">
                      {entry.item.price}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className="flex items-center border border-white/20">
                      <button
                        onClick={() => onUpdateQty(idx, -1)}
                        className="px-2 py-0.5 text-xs hover:bg-white hover:text-black cursor-pointer"
                      >
                        -
                      </button>
                      <span className="px-2 text-xs font-mono">{entry.quantity}</span>
                      <button
                        onClick={() => onUpdateQty(idx, 1)}
                        className="px-2 py-0.5 text-xs hover:bg-white hover:text-black cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => onRemove(idx)}
                      className="text-[10px] text-neutral-500 hover:text-red-400 cursor-pointer"
                    >
                      REMOVE
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="border-t border-white/10 pt-4 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-neutral-400">Total Archive Value</span>
              <span className="font-mono text-lg font-medium text-white">$97,33</span>
            </div>
            <button
              onClick={() => alert('Archive checkout initialized. Order reference PRMPT-AW26-RESERVE recorded.')}
              type="button"
              className="w-full py-3.5 bg-white text-black text-xs uppercase tracking-widest font-medium hover:bg-neutral-200 transition-colors cursor-pointer"
            >
              PROCEED TO SECURE CHECKOUT
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
    >
      <div
        className="w-full max-w-xl bg-neutral-950 border border-white/20 text-white p-6 sm:p-10 relative"
        style={{ fontFamily: '"Inter Tight", sans-serif' }}
      >
        <button
          onClick={onClose}
          type="button"
          aria-label="Close about modal"
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center border border-white/20 text-neutral-400 hover:text-white hover:border-white transition-colors cursor-pointer"
        >
          ✕
        </button>

        <span className="text-xs uppercase tracking-widest text-neutral-400 block mb-2 font-mono">
          PROVENANCE & MANIFESTO
        </span>
        <h2 className="text-2xl font-medium tracking-tight mb-4">
          PRMPT ARCHIVE SYSTEM
        </h2>

        <div className="space-y-4 text-sm text-neutral-300 leading-relaxed font-normal">
          <p>
            PRMPT is an independent design laboratory at the convergence of architectural silhouette engineering and interactive digital media.
          </p>
          <p>
            The AW26 Archive Collection represents our investigation into kinetic garments—clothing shaped not merely for static presentation, but for spatial displacement and aerodynamic tension.
          </p>
          <div className="p-4 bg-neutral-900 border-l-2 border-white text-xs font-mono text-neutral-400">
            &quot;When switching between videos near the center, do not reset currentTime to 0 abruptly. Add a small dead zone: if cursor is within +/-50px of center, keep both videos at currentTime = 0 and show whichever was last active.&quot;
          </div>
          <p className="text-xs text-neutral-500">
            Tokyo · Berlin · New York · Paris / All garments manufactured in numbered limited quantities under ethical atelier standards.
          </p>
        </div>
      </div>
    </div>
  );
};

interface MenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onScrollToTop: () => void;
  onScrollToGallery: () => void;
  onScrollToOutro: () => void;
  onOpenAbout: () => void;
}

export const MenuDrawer: React.FC<MenuDrawerProps> = ({
  isOpen,
  onClose,
  onScrollToTop,
  onScrollToGallery,
  onScrollToOutro,
  onOpenAbout,
}) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-xs"
    >
      <div
        className="w-full max-w-sm bg-neutral-950 border-l border-white/20 text-white h-full p-8 flex flex-col justify-between"
        style={{ fontFamily: '"Inter Tight", sans-serif' }}
      >
        <div>
          <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-8">
            <span className="text-xs uppercase tracking-widest text-neutral-400 font-mono">
              NAVIGATION
            </span>
            <button
              onClick={onClose}
              type="button"
              className="text-neutral-400 hover:text-white cursor-pointer"
            >
              ✕
            </button>
          </div>

          <nav className="space-y-6 text-xl tracking-tight uppercase font-medium">
            <button
              onClick={() => {
                onClose();
                onScrollToTop();
              }}
              className="block w-full text-left hover:text-neutral-400 transition-colors cursor-pointer"
            >
              01. Hero / Motion View
            </button>
            <button
              onClick={() => {
                onClose();
                onScrollToGallery();
              }}
              className="block w-full text-left hover:text-neutral-400 transition-colors cursor-pointer"
            >
              02. Archive Gallery Grid
            </button>
            <button
              onClick={() => {
                onClose();
                onScrollToOutro();
              }}
              className="block w-full text-left hover:text-neutral-400 transition-colors cursor-pointer"
            >
              03. Collection Buy / Outro
            </button>
            <button
              onClick={() => {
                onClose();
                onOpenAbout();
              }}
              className="block w-full text-left hover:text-neutral-400 transition-colors cursor-pointer text-neutral-400"
            >
              04. Manifesto / About
            </button>
          </nav>
        </div>

        <div className="border-t border-white/10 pt-4 text-xs text-neutral-500 font-mono">
          PRMPT ® 2026 ARCHIVE
        </div>
      </div>
    </div>
  );
};

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
    >
      <div
        className="w-full max-w-lg bg-neutral-950 border border-white/20 text-white p-6 sm:p-8 relative"
        style={{ fontFamily: '"Inter Tight", sans-serif' }}
      >
        <button
          onClick={onClose}
          type="button"
          aria-label="Close privacy modal"
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center border border-white/20 text-neutral-400 hover:text-white cursor-pointer"
        >
          ✕
        </button>

        <span className="text-xs uppercase tracking-widest text-neutral-400 block mb-2 font-mono">
          LEGAL & COMPLIANCE
        </span>
        <h2 className="text-xl font-medium tracking-tight mb-4">
          PRMPT PRIVACY POLICY
        </h2>

        <div className="space-y-3 text-xs text-neutral-300 leading-relaxed font-normal">
          <p>
            PRMPT Archive respects your digital sovereignty. We do not store tracking cookies, sell personal browsing metadata, or deploy third-party advertising telemetry.
          </p>
          <p>
            Interactive scroll parameters, viewport geometries, and cursor coordinates are calculated purely client-side inside your browser environment to power visual transitions.
          </p>
          <p className="text-neutral-500 pt-2 border-t border-white/10">
            Effective Date: March 2026 · PRMPT Architecture Lab.
          </p>
        </div>
      </div>
    </div>
  );
};

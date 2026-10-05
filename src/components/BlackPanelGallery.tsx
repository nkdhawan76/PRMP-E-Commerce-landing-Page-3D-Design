import React, { useState } from 'react';
import { ARCHIVE_ITEMS, ArchiveItem } from '../data/archiveItems';

interface BlackPanelGalleryProps {
  blackPanelRef: React.RefObject<HTMLDivElement | null>;
  innerWrapperRef: React.RefObject<HTMLDivElement | null>;
  registerCardCell: (index: number, cellEl: HTMLDivElement | null, cardEl: HTMLDivElement | null) => void;
  cols: number;
  layoutRows: number[][];
  onSelectItem: (item: ArchiveItem) => void;
}

export const BlackPanelGallery: React.FC<BlackPanelGalleryProps> = ({
  blackPanelRef,
  innerWrapperRef,
  registerCardCell,
  cols,
  layoutRows,
  onSelectItem,
}) => {
  const [imageErrorMap, setImageErrorMap] = useState<Record<number, boolean>>({});

  const handleImageError = (id: number) => {
    setImageErrorMap((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div
      ref={blackPanelRef}
      className="fixed inset-0 bg-black z-10 overflow-hidden pointer-events-auto"
      style={{
        transform: 'translate3d(0, 100vh, 0)',
        willChange: 'transform',
      }}
    >
      {/* Inner wrapper */}
      <div
        ref={innerWrapperRef}
        className="w-full pb-[30vh]"
        style={{
          paddingTop: 'min(400px, 40vh)',
          willChange: 'transform',
        }}
      >
        <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-12">
          {/* Subtle editorial archive header within black panel */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-8 text-[12px] uppercase tracking-wider text-white/50 font-medium">
            <span>PRMPT / ARCHIVE COLLECTION 2026</span>
            <span>INDEX [ 01 — 10 ]</span>
          </div>

          {/* Grid Layout */}
          <div className="flex flex-col gap-6 sm:gap-8 lg:gap-10">
            {layoutRows.map((row, rowIndex) => (
              <div
                key={`row-${rowIndex}`}
                className="grid gap-6 sm:gap-8 lg:gap-10 w-full"
                style={{
                  gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
                }}
              >
                {row.map((itemIdx, colIndex) => {
                  const isLeftHalf = colIndex < cols / 2;
                  const transformOrigin = isLeftHalf ? 'right bottom' : 'left bottom';

                  if (itemIdx === -1) {
                    // Empty spacer cell
                    return (
                      <div
                        key={`cell-${rowIndex}-${colIndex}`}
                        className="w-full aspect-[2/3] pointer-events-none"
                        aria-hidden="true"
                      />
                    );
                  }

                  const item = ARCHIVE_ITEMS[itemIdx];
                  const hasError = imageErrorMap[item.id];

                  return (
                    <div
                      key={`cell-${rowIndex}-${colIndex}-${item.id}`}
                      ref={(el) => {
                        // We register the cell container
                        // Card child will be registered via child ref
                      }}
                      className="w-full aspect-[2/3] relative"
                    >
                      <div
                        ref={(cardEl) => {
                          const parent = cardEl?.parentElement as HTMLDivElement | null;
                          registerCardCell(itemIdx, parent, cardEl);
                        }}
                        onClick={() => onSelectItem(item)}
                        role="button"
                        tabIndex={0}
                        aria-label={`View ${item.title} details`}
                        className="bp-card group w-full h-full relative cursor-pointer overflow-hidden bg-neutral-950 border border-white/10 transition-colors hover:border-white/40 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
                        style={{
                          transformOrigin,
                          transform: 'scale(0)',
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            onSelectItem(item);
                          }
                        }}
                      >
                        {/* Image */}
                        {!hasError ? (
                          <img
                            src={item.imageUrl}
                            alt={item.title}
                            loading="lazy"
                            decoding="async"
                            referrerPolicy="no-referrer"
                            onError={() => handleImageError(item.id)}
                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col justify-between p-6 bg-neutral-900 border border-neutral-800 text-white">
                            <span className="text-xs uppercase tracking-widest text-neutral-400">
                              {item.code}
                            </span>
                            <div>
                              <p className="text-sm font-semibold mb-1">{item.title}</p>
                              <p className="text-xs text-neutral-400">{item.fabric}</p>
                            </div>
                            <span className="text-xs text-neutral-400">{item.price}</span>
                          </div>
                        )}

                        {/* Subtle dark gradient scrim for typography legibility */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none opacity-80 group-hover:opacity-95 transition-opacity" />

                        {/* Top tag */}
                        <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-white/80 pointer-events-none">
                          <span className="bg-black/60 px-2 py-0.5 rounded-none backdrop-blur-xs border border-white/10">
                            {item.code}
                          </span>
                          <span className="text-white/60">
                            {String(itemIdx + 1).padStart(2, '0')}/10
                          </span>
                        </div>

                        {/* Bottom product title & price */}
                        <div className="absolute bottom-3 left-3 right-3 flex flex-col pointer-events-none">
                          <div className="flex items-end justify-between gap-2">
                            <h3 className="text-white text-[13px] sm:text-[14px] font-medium leading-tight tracking-tight line-clamp-1">
                              {item.title}
                            </h3>
                            <span className="text-white/90 font-mono text-[12px] sm:text-[13px] shrink-0">
                              {item.price}
                            </span>
                          </div>
                          <span className="text-[11px] text-white/50 uppercase tracking-wider mt-0.5">
                            {item.category} · {item.season}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

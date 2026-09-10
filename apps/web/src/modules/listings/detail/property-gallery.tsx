'use client';

import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { type PointerEvent, useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

type Tab = 'photos' | 'plans';

const SWIPE_THRESHOLD = 50;
const SWIPE_INTENT_THRESHOLD = 10;
const AUTOPLAY_DELAY_MS = 5000;

export function PropertyGallery({
  title,
  images,
  floorPlans
}: {
  title: string;
  images: string[];
  floorPlans: string[];
}) {
  const t = useTranslations('ListingDetail');
  const [tab, setTab] = useState<Tab>('photos');
  const [index, setIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [paused, setPaused] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const dragStartX = useRef<number | null>(null);
  const activePointerId = useRef<number | null>(null);
  const hasSwipedRef = useRef(false);

  const items = tab === 'photos' ? images : floorPlans;
  const active = items[index] ?? items[0];

  function selectTab(next: Tab) {
    setTab(next);
    setIndex(0);
  }

  function step(delta: 1 | -1) {
    setIndex((current) => (current + delta + items.length) % items.length);
  }

  useEffect(() => {
    if (lightboxOpen) {
      dialogRef.current?.focus();
    }
  }, [lightboxOpen]);

  useEffect(() => {
    if (tab !== 'photos' || images.length <= 1 || lightboxOpen || paused || dragging) return;

    const id = setInterval(() => {
      setIndex((current) => (current + 1) % images.length);
    }, AUTOPLAY_DELAY_MS);

    return () => clearInterval(id);
  }, [tab, images.length, lightboxOpen, paused, dragging]);

  function handleDialogKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Escape') setLightboxOpen(false);
    if (e.key === 'ArrowLeft') step(-1);
    if (e.key === 'ArrowRight') step(1);
  }

  function handlePointerDown(e: PointerEvent<HTMLDivElement>) {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    dragStartX.current = e.clientX;
    activePointerId.current = e.pointerId;
    hasSwipedRef.current = false;
    setPaused(true);
    setDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  }

  function handlePointerMove(e: PointerEvent<HTMLDivElement>) {
    if (dragStartX.current === null || activePointerId.current !== e.pointerId) return;
    const delta = e.clientX - dragStartX.current;
    if (Math.abs(delta) > SWIPE_INTENT_THRESHOLD) hasSwipedRef.current = true;
    setDragOffset(delta);
  }

  function handlePointerEnd(e: PointerEvent<HTMLDivElement>) {
    if (dragStartX.current === null || activePointerId.current !== e.pointerId) return;
    setDragging(false);
    setDragOffset((offset) => {
      if (Math.abs(offset) > SWIPE_THRESHOLD && items.length > 1) {
        step(offset > 0 ? -1 : 1);
      }
      return 0;
    });
    dragStartX.current = null;
    activePointerId.current = null;
  }

  function handleImageClick() {
    if (hasSwipedRef.current) {
      hasSwipedRef.current = false;
      return;
    }
    setLightboxOpen(true);
  }

  return (
    <div>
      {floorPlans.length > 0 ? (
        <div className="mb-4 inline-flex gap-1 rounded-full bg-muted p-1">
          {(['photos', 'plans'] as const).map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => selectTab(value)}
              className={cn(
                'rounded-full px-4 py-2 text-sm font-medium transition-colors',
                tab === value
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {value === 'photos' ? t('galleryPhotosTab') : t('galleryPlansTab')}
            </button>
          ))}
        </div>
      ) : null}

      {/* biome-ignore lint/a11y/noStaticElementInteractions: hover only pauses the autoplay timer, drag/click interactivity lives on the buttons inside */}
      <div
        className="group relative aspect-[16/9] w-full touch-pan-y select-none overflow-hidden rounded-3xl bg-muted"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <button
          type="button"
          onClick={handleImageClick}
          className={cn(
            'absolute inset-0 block size-full',
            dragging ? 'cursor-grabbing' : 'cursor-grab'
          )}
          style={{
            transform: `translateX(${dragOffset}px)`,
            transition: dragging ? 'none' : 'transform 300ms ease'
          }}
        >
          <Image
            src={active ?? ''}
            alt={`${title} — ${index + 1}/${items.length}`}
            fill
            priority
            draggable={false}
            onDragStart={(e) => e.preventDefault()}
            className={cn(
              'pointer-events-none transition-transform duration-500 group-hover:scale-110',
              tab === 'photos' ? 'object-cover' : 'object-contain p-4'
            )}
          />
        </button>

        {items.length > 1 ? (
          <>
            <button
              type="button"
              onClick={() => step(-1)}
              className="absolute left-3 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-navy-900 opacity-0 transition-opacity hover:bg-white group-hover:opacity-100 sm:opacity-100"
              aria-label={t('galleryPrevious')}
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              className="absolute right-3 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-navy-900 opacity-0 transition-opacity hover:bg-white group-hover:opacity-100 sm:opacity-100"
              aria-label={t('galleryNext')}
            >
              <ChevronRight className="size-4" />
            </button>
          </>
        ) : null}

        {tab === 'photos' && items.length > 1 ? (
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
            {items.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`${i + 1}/${items.length}`}
                className={cn(
                  'h-1.5 rounded-full bg-white/60 transition-all',
                  i === index ? 'w-5 bg-white' : 'w-1.5 hover:bg-white/80'
                )}
              />
            ))}
          </div>
        ) : null}
      </div>

      {items.length > 1 ? (
        <div className="mt-3 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1">
          {items.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setIndex(i)}
              className={cn(
                'relative aspect-[4/3] w-24 shrink-0 snap-start overflow-hidden rounded-xl ring-2 transition-opacity',
                i === index ? 'ring-secondary' : 'ring-transparent opacity-70 hover:opacity-100'
              )}
            >
              <Image
                src={src}
                alt=""
                fill
                draggable={false}
                onDragStart={(e) => e.preventDefault()}
                className={cn(
                  'pointer-events-none',
                  tab === 'photos' ? 'object-cover' : 'bg-muted object-contain p-1'
                )}
              />
            </button>
          ))}
        </div>
      ) : null}

      {lightboxOpen ? (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={title}
          tabIndex={-1}
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/90 p-4 outline-none sm:p-10"
          onClick={(e) => {
            if (e.target === e.currentTarget) setLightboxOpen(false);
          }}
          onKeyDown={handleDialogKeyDown}
        >
          <button
            type="button"
            onClick={() => setLightboxOpen(false)}
            className="absolute right-4 top-4 flex size-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            aria-label={t('galleryClose')}
          >
            <X className="size-5" />
          </button>

          {items.length > 1 ? (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  step(-1);
                }}
                className="absolute left-4 flex size-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:left-8"
                aria-label={t('galleryPrevious')}
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  step(1);
                }}
                className="absolute right-4 flex size-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:right-8"
                aria-label={t('galleryNext')}
              >
                <ChevronRight className="size-5" />
              </button>
            </>
          ) : null}

          <div
            className="relative h-full max-h-[80vh] w-full max-w-5xl touch-pan-y select-none overflow-hidden"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerEnd}
            onPointerCancel={handlePointerEnd}
          >
            <div
              className="relative size-full"
              style={{
                transform: `translateX(${dragOffset}px)`,
                transition: dragging ? 'none' : 'transform 300ms ease'
              }}
            >
              <Image
                src={active ?? ''}
                alt={`${title} — ${index + 1}/${items.length}`}
                fill
                draggable={false}
                onDragStart={(e) => e.preventDefault()}
                className={cn(
                  'pointer-events-none',
                  tab === 'photos' ? 'object-contain' : 'bg-white object-contain'
                )}
              />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

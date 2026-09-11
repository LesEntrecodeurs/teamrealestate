'use client';

import { Check, ChevronDown, type LucideIcon, Search } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils';

export interface SelectOption {
  value: string;
  label: string;
}

export function SelectField({
  value,
  onChange,
  options,
  placeholder,
  searchable = false,
  searchPlaceholder,
  ariaLabel,
  icon: Icon,
  variant = 'field',
  tone = 'dark'
}: {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder: string;
  searchable?: boolean;
  searchPlaceholder?: string;
  ariaLabel?: string;
  icon?: LucideIcon;
  /** 'field' = full-width bar segment (dark text on transparent/white). 'chip' = compact rounded pill. */
  variant?: 'field' | 'chip';
  /** Chip only: 'dark' = glass pill for a photo/navy backdrop, 'light' = muted pill for a white bar. */
  tone?: 'dark' | 'light';
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [rect, setRect] = useState<{ top: number; left: number; width: number } | null>(null);
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => setMounted(true), []);

  // The dropdown panel is portaled to <body> — this field is used inside
  // sections with overflow-hidden (clip-path/rounded edges), which would
  // otherwise clip the panel wherever it extends beyond the trigger.
  useEffect(() => {
    if (!open) return;

    function updateRect() {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      setRect({ top: r.bottom + 6, left: r.left, width: r.width });
    }

    updateRect();
    window.addEventListener('scroll', updateRect, { passive: true, capture: true });
    window.addEventListener('resize', updateRect);
    return () => {
      window.removeEventListener('scroll', updateRect, { capture: true });
      window.removeEventListener('resize', updateRect);
    };
  }, [open]);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      const target = e.target as Node;
      if (ref.current?.contains(target)) return;
      if (panelRef.current?.contains(target)) return;
      setOpen(false);
      setQuery('');
    }
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  useEffect(() => {
    if (open && searchable) searchRef.current?.focus();
  }, [open, searchable]);

  const selected = options.find((o) => o.value === value);
  const filtered = searchable
    ? options.filter((o) => o.label.toLowerCase().includes(query.toLowerCase()))
    : options;

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          'flex items-center whitespace-nowrap transition-colors focus:outline-none',
          variant === 'chip'
            ? cn(
                'gap-1.5 rounded-full border px-2.5 py-1.5 text-xs font-medium sm:text-sm',
                tone === 'dark'
                  ? 'border-white/25 bg-white/10 text-white/85 hover:border-white/45 hover:bg-white/20'
                  : 'border-navy-100 bg-navy-50 text-navy-600 hover:border-navy-200 hover:bg-navy-100/70'
              )
            : 'h-13 w-full gap-2 rounded-xl bg-transparent px-3 text-left text-base text-navy-900'
        )}
      >
        {Icon ? (
          <Icon
            className={cn(
              'size-3.5 shrink-0',
              variant === 'chip'
                ? tone === 'dark'
                  ? 'text-white/70'
                  : 'text-navy-400'
                : 'size-4 text-navy-400'
            )}
          />
        ) : null}
        <span
          className={cn(
            variant === 'chip' ? '' : 'flex-1 truncate',
            variant === 'chip'
              ? tone === 'dark'
                ? selected
                  ? 'text-white'
                  : 'text-white/85'
                : selected
                  ? 'text-navy-900'
                  : 'text-navy-600'
              : selected
                ? 'text-navy-900'
                : 'text-navy-400'
          )}
        >
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDown
          className={cn(
            'size-3 transition-transform',
            variant === 'chip'
              ? tone === 'dark'
                ? 'text-white/60'
                : 'text-navy-400'
              : 'size-4 text-navy-400',
            open && 'rotate-180'
          )}
        />
      </button>

      {open && mounted && rect
        ? createPortal(
            <div
              ref={panelRef}
              style={{ top: rect.top, left: rect.left, width: rect.width }}
              className="fixed z-50 max-h-64 overflow-hidden rounded-md border border-navy-100 bg-white shadow-xl shadow-navy-950/15"
            >
              {searchable ? (
                <div className="flex items-center gap-2 border-b border-navy-100 px-3 py-2.5">
                  <Search className="size-4 shrink-0 text-navy-400" />
                  <input
                    ref={searchRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={searchPlaceholder}
                    className="w-full bg-transparent text-sm text-navy-900 placeholder:text-navy-400 focus:outline-none"
                  />
                </div>
              ) : null}

              <ul className="max-h-52 overflow-y-auto py-1">
                {filtered.length === 0 ? (
                  <li className="px-3 py-2.5 text-sm text-navy-400">—</li>
                ) : (
                  filtered.map((option) => (
                    <li key={option.value}>
                      <button
                        type="button"
                        onClick={() => {
                          onChange(option.value);
                          setOpen(false);
                          setQuery('');
                        }}
                        className={cn(
                          'flex w-full items-center justify-between px-3 py-2.5 text-left text-sm transition-colors hover:bg-navy-50',
                          option.value === value ? 'text-cyan-600' : 'text-navy-700'
                        )}
                      >
                        {option.label}
                        {option.value === value ? <Check className="size-4" /> : null}
                      </button>
                    </li>
                  ))
                )}
              </ul>
            </div>,
            document.body
          )
        : null}
    </div>
  );
}

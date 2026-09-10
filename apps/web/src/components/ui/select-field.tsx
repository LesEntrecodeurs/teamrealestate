'use client';

import { Check, ChevronDown, Search } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
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
  ariaLabel
}: {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder: string;
  searchable?: boolean;
  searchPlaceholder?: string;
  ariaLabel?: string;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const ref = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery('');
      }
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
        className="flex h-13 w-full items-center justify-between rounded-xl bg-transparent px-3 text-left text-base text-navy-900 transition-colors focus:outline-none"
      >
        <span className={selected ? 'text-navy-900' : 'text-navy-400'}>
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDown
          className={cn('size-4 text-navy-400 transition-transform', open && 'rotate-180')}
        />
      </button>

      {open ? (
        <div className="absolute left-0 right-0 top-[calc(100%+6px)] z-20 max-h-64 overflow-hidden rounded-md border border-navy-100 bg-white shadow-xl shadow-navy-950/15">
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
        </div>
      ) : null}
    </div>
  );
}

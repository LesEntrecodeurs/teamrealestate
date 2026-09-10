'use client';

import { Check, Link2, Mail, Share2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.51 1.49-3.9 3.77-3.9 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.89h2.78l-.44 2.91h-2.34V22c4.78-.76 8.44-4.92 8.44-9.94Z" />
    </svg>
  );
}

function LinkedInIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.11 20.45H3.56V9h3.55v11.45Z" />
    </svg>
  );
}

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M18.24 2.75h3.13l-6.84 7.82 8.05 10.68h-6.3l-4.93-6.45-5.65 6.45H2.57l7.32-8.36L2.16 2.75h6.46l4.46 5.9 5.16-5.9Zm-1.1 16.66h1.74L7.02 4.5H5.15l11.99 14.91Z" />
    </svg>
  );
}

export function PropertyShare({ title }: { title: string }) {
  const t = useTranslations('ListingDetail');
  const [copied, setCopied] = useState(false);
  const [canNativeShare, setCanNativeShare] = useState(false);
  const [pageUrl, setPageUrl] = useState('');

  useEffect(() => {
    setCanNativeShare(typeof navigator !== 'undefined' && 'share' in navigator);
    setPageUrl(window.location.href);
  }, []);

  const iconButtonClass =
    'flex size-10 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-secondary hover:text-secondary';

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard API unavailable (older browser, insecure context) — no-op
    }
  }

  async function handleNativeShare() {
    try {
      await navigator.share({ title, url: window.location.href });
    } catch {
      // user cancelled the native share sheet — no-op
    }
  }

  return (
    <div className="flex items-center gap-2">
      <span className="mr-1 text-sm font-medium text-muted-foreground">{t('shareTitle')}</span>

      {canNativeShare ? (
        <button
          type="button"
          onClick={handleNativeShare}
          className={iconButtonClass}
          aria-label={t('shareTitle')}
        >
          <Share2 className="size-4" />
        </button>
      ) : null}

      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`}
        target="_blank"
        rel="noopener noreferrer"
        className={iconButtonClass}
        aria-label={t('shareFacebook')}
      >
        <FacebookIcon className="size-4" />
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`}
        target="_blank"
        rel="noopener noreferrer"
        className={iconButtonClass}
        aria-label={t('shareLinkedin')}
      >
        <LinkedInIcon className="size-4" />
      </a>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(pageUrl)}`}
        target="_blank"
        rel="noopener noreferrer"
        className={iconButtonClass}
        aria-label={t('shareX')}
      >
        <XIcon className="size-4" />
      </a>
      <a
        href={`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(pageUrl)}`}
        className={iconButtonClass}
        aria-label={t('shareEmail')}
      >
        <Mail className="size-4" />
      </a>

      <button
        type="button"
        onClick={handleCopy}
        className={cn(iconButtonClass, copied && 'border-secondary text-secondary')}
        aria-label={copied ? t('shareCopied') : t('shareCopyLink')}
      >
        {copied ? <Check className="size-4" /> : <Link2 className="size-4" />}
      </button>
    </div>
  );
}

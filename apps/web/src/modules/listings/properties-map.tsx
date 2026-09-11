'use client';

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useRef } from 'react';
import { getLocationCoordinates } from './detail/location-coordinates';
import { formatPrice } from './listing-card';
import type { Listing } from './types';

const MARKER_ICON = L.divIcon({
  className: '',
  html: '<span style="display:block;width:16px;height:16px;border-radius:9999px;background:#00a0be;border:2px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,.4);"></span>',
  iconSize: [16, 16],
  iconAnchor: [8, 8]
});

/** Spreads listings that share the same neighbourhood coordinates so their markers don't stack exactly on top of each other. */
function jitter(id: string) {
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = (hash * 31 + id.charCodeAt(i)) | 0;
  const angle = (hash % 360) * (Math.PI / 180);
  const radius = 0.0015 + ((hash >> 8) % 100) / 100000;
  return { dLat: Math.cos(angle) * radius, dLng: Math.sin(angle) * radius };
}

export function PropertiesMap({ listings, locale }: { listings: Listing[]; locale: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    const map = L.map(containerRef.current, { scrollWheelZoom: false }).setView(
      [49.6116, 6.1319],
      12
    );
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19
    }).addTo(map);
    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const markers = listings.map((listing) => {
      const base = getLocationCoordinates(listing.location);
      const { dLat, dLng } = jitter(listing.id);
      const href = `/${listing.transactionType === 'sale' ? 'acheter' : 'louer'}/${listing.slug}`;
      const marker = L.marker([base.lat + dLat, base.lng + dLng], { icon: MARKER_ICON }).addTo(map);
      marker.bindPopup(
        `<a href="${href}" style="text-decoration:none;color:#15273f;">
          <strong style="display:block;font-size:13px;margin-bottom:2px;">${listing.title}</strong>
          <span style="color:#00a0be;font-weight:700;">${formatPrice(listing, locale)}</span>
        </a>`
      );
      return marker;
    });

    if (markers.length > 0) {
      const group = L.featureGroup(markers);
      map.fitBounds(group.getBounds().pad(0.3), { maxZoom: 15 });
    }

    return () => {
      for (const marker of markers) marker.remove();
    };
  }, [listings, locale]);

  return <div ref={containerRef} className="h-full min-h-[320px] w-full" />;
}

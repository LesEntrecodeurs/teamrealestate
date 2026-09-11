'use client';

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useRef } from 'react';
import { getLocationCoordinates } from './detail/location-coordinates';
import { formatPrice } from './listing-card';
import type { Listing } from './types';

const MARKER_ICON = L.divIcon({
  className: 'map-pin',
  html: `
    <span style="position:relative;display:block;width:36px;height:46px;">
      <span style="position:absolute;left:50%;top:15px;width:22px;height:22px;margin-left:-11px;margin-top:-11px;border-radius:9999px;background:rgba(0,160,190,.45);animation:radar-pulse 2.2s ease-out infinite;"></span>
      <span class="map-pin-dot" style="position:absolute;left:50%;top:0;width:30px;height:30px;margin-left:-15px;border-radius:50% 50% 50% 0;background:#00a0be;border:2.5px solid #fff;box-shadow:0 3px 8px rgba(10,20,32,.4);transform:rotate(-45deg);"></span>
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="position:absolute;left:50%;top:15px;margin-left:-7.5px;margin-top:-9px;">
        <path d="M3 9.5 12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z" />
      </svg>
    </span>
  `,
  iconSize: [36, 46],
  iconAnchor: [18, 44],
  popupAnchor: [0, -40]
});

/** Spreads listings that share the same neighbourhood coordinates so their markers don't stack exactly on top of each other. */
function jitter(id: string) {
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = (hash * 31 + id.charCodeAt(i)) | 0;
  const angle = (hash % 360) * (Math.PI / 180);
  const radius = 0.0015 + ((hash >> 8) % 100) / 100000;
  return { dLat: Math.cos(angle) * radius, dLng: Math.sin(angle) * radius };
}

export function PropertiesMap({
  listings,
  locale,
  onVisibleChange
}: {
  listings: Listing[];
  locale: string;
  onVisibleChange?: (visibleIds: Set<string>) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    const map = L.map(containerRef.current, { scrollWheelZoom: false }).setView(
      [49.6116, 6.1319],
      12
    );

    const streetLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19
    });
    const satelliteLayer = L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      {
        attribution:
          'Tiles © Esri — Source: Esri, Maxar, Earthstar Geographics, and the GIS User Community',
        maxZoom: 19
      }
    );
    streetLayer.addTo(map);

    const ViewToggle = L.Control.extend({
      options: { position: 'topright' },
      onAdd() {
        const container = L.DomUtil.create('div', 'map-view-toggle');
        container.innerHTML = `
          <button type="button" data-view="street" class="active">Plan</button>
          <button type="button" data-view="satellite">Satellite</button>
        `;
        L.DomEvent.disableClickPropagation(container);
        container.addEventListener('click', (event) => {
          const target = event.target as HTMLElement;
          const view = target.dataset.view;
          if (!view) return;

          for (const btn of Array.from(container.querySelectorAll('button'))) {
            btn.classList.toggle('active', btn === target);
          }
          if (view === 'satellite') {
            map.removeLayer(streetLayer);
            map.addLayer(satelliteLayer);
          } else {
            map.removeLayer(satelliteLayer);
            map.addLayer(streetLayer);
          }
        });
        return container;
      }
    });
    new ViewToggle().addTo(map);

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const markerEntries = listings.map((listing) => {
      const base = getLocationCoordinates(listing.location);
      const { dLat, dLng } = jitter(listing.id);
      const latlng = L.latLng(base.lat + dLat, base.lng + dLng);
      const href = `/${listing.transactionType === 'sale' ? 'acheter' : 'louer'}/${listing.slug}`;
      const marker = L.marker(latlng, { icon: MARKER_ICON }).addTo(map);
      marker.bindPopup(
        `<a href="${href}" style="display:block;width:168px;text-decoration:none;color:#15273f;">
          <span style="display:block;position:relative;width:100%;aspect-ratio:16/10;border-radius:10px;overflow:hidden;background:#f2f4f6;">
            <img src="${listing.image}" alt="" style="width:100%;height:100%;object-fit:cover;display:block;" />
          </span>
          <strong style="display:-webkit-box;-webkit-line-clamp:1;-webkit-box-orient:vertical;overflow:hidden;margin-top:8px;font-size:13px;line-height:1.3;">${listing.title}</strong>
          <span style="display:block;margin-top:2px;color:#00a0be;font-weight:700;font-size:13px;">${formatPrice(listing, locale)}</span>
        </a>`,
        { maxWidth: 200, className: 'map-pin-popup' }
      );
      return { id: listing.id, latlng, marker };
    });

    function updateVisible() {
      if (!onVisibleChange || !mapRef.current) return;
      const bounds = mapRef.current.getBounds();
      const visible = new Set<string>();
      for (const entry of markerEntries) {
        if (bounds.contains(entry.latlng)) visible.add(entry.id);
      }
      onVisibleChange(visible);
    }

    map.on('moveend', updateVisible);

    if (markerEntries.length > 0) {
      const group = L.featureGroup(markerEntries.map((entry) => entry.marker));
      map.fitBounds(group.getBounds().pad(0.3), { maxZoom: 15 });
    }
    updateVisible();

    return () => {
      map.off('moveend', updateVisible);
      for (const entry of markerEntries) entry.marker.remove();
    };
  }, [listings, locale, onVisibleChange]);

  return <div ref={containerRef} className="h-full min-h-[320px] w-full" />;
}

import { getLocationCoordinates } from './location-coordinates';

const BBOX_DEGREES = 0.012;

export function PropertyMap({ location }: { location: string }) {
  const { lat, lng } = getLocationCoordinates(location);
  const bbox = [
    lng - BBOX_DEGREES,
    lat - BBOX_DEGREES,
    lng + BBOX_DEGREES,
    lat + BBOX_DEGREES
  ].join(',');
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lng}`;

  return (
    <div className="mt-4 overflow-hidden rounded-xl border border-border">
      <iframe
        src={src}
        title={`Carte — ${location}`}
        loading="lazy"
        className="h-64 w-full grayscale-[15%]"
      />
    </div>
  );
}

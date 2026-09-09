const BOSTON = {
  lat: 42.34358,
  lng: -71.07192,
  heading: 168,
  pitch: 2,
}

function src({ lat, lng, heading, pitch } = BOSTON) {
  return `https://www.google.com/maps?hl=en&gl=us&layer=c&cbll=${lat},${lng}&cbp=11,${heading},0,0,${pitch}&output=svembed`
}

export function StreetView({ className = '' }: { className?: string }) {
  return (
    <figure className={`street-view ${className}`.trim()}>
      <iframe
        title="Street View, Boston"
        src={src()}
        loading="lazy"
        allow="accelerometer; gyroscope; fullscreen; clipboard-write"
        referrerPolicy="no-referrer-when-downgrade"
      />
      <figcaption>South End, Boston</figcaption>
    </figure>
  )
}

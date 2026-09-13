const BOSTON = {
  lat: 42.34912,
  lng: -71.11491,
  heading: 185,
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
        allow="accelerometer; gyroscope; fullscreen; clipboard-write; web-share"
        referrerPolicy="no-referrer-when-downgrade"
      />
      <figcaption>8 Egmont St, Boston</figcaption>
    </figure>
  )
}

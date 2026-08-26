type Props = {
  src: string
  alt?: string
  caption?: string
  className?: string
  slot?: string
}

export function Photo({ src, alt = '', caption, className = '', slot }: Props) {
  return (
    <figure className={`photo ${className}`.trim()} data-slot={slot}>
      <div className="photo-crop" data-parallax>
        <img src={src} alt={alt} />
      </div>
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  )
}

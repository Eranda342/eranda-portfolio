import { useState, useRef, useEffect } from 'react';

interface ProjectImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
}

export function ProjectImage({ src, alt, className = '', style }: ProjectImageProps) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // If the image is already complete (e.g. cached) upon mount, mark as loaded
    if (imgRef.current?.complete) {
      setLoaded(true);
    }
  }, []);

  return (
    <div className={`relative ${className}`} style={style}>
      {/* Shimmer Placeholder */}
      <div 
        className={`absolute inset-0 bg-[#0f172a] animate-pulse transition-opacity duration-500 ease-in-out z-0 ${loaded ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      />
      
      {/* Actual Image */}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={`block w-full h-auto transition-opacity duration-500 ease-in-out relative z-10 ${loaded ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  );
}

interface ProfileImageProps {
  src: string;
  alt: string;
  size?: number;
  className?: string;
  priority?: boolean;
}

export function ProfileImage({ 
  src, 
  alt, 
  size = 120, 
  className = "", 
  priority = false 
}: ProfileImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={`rounded-lg object-cover aspect-square ${className}`}
      data-priority={priority}
    />
  );
}
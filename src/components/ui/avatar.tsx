import * as React from 'react';

import { cn } from '@/lib/utils';

type AvatarProps = {
  /**
   * Image source URL
   */
  src?: string;

  /**
   * Alt text for the image
   */
  alt?: string;

  /**
   * Fallback initials (e.g., "JD" for John Doe)
   */
  fallback?: string;

  /**
   * Size variant
   */
  size?: 'sm' | 'md' | 'lg' | 'xl';

  /**
   * Custom className
   */
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

const sizeClasses = {
  sm: 'h-5 w-5 text-[10px]',
  md: 'h-6 w-6 text-[11.5px]',
  lg: 'h-8 w-8 text-sm',
  xl: 'h-10 w-10 text-base',
};

/**
 * Avatar component with image or fallback initials
 *
 * @example
 * ```tsx
 * <Avatar src="/avatar.jpg" alt="John Doe" fallback="JD" />
 * <Avatar fallback="JD" size="lg" />
 * ```
 */
export function Avatar({
  src,
  alt = '',
  fallback,
  size = 'md',
  className,
  ...props
}: AvatarProps) {
  const [imageError, setImageError] = React.useState(false);

  const showFallback = !src || imageError;

  return (
    <div
      className={cn(
        'relative inline-flex items-center justify-center rounded-md bg-[#19bbe8] text-white font-semibold overflow-hidden',
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {!showFallback && src
        ? (
            <img
              src={src}
              alt={alt}
              className="h-full w-full object-cover"
              onError={() => setImageError(true)}
            />
          )
        : (
            <span className="uppercase select-none">{fallback}</span>
          )}
    </div>
  );
}

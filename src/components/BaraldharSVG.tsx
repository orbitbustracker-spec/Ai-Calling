'use client';

import React from 'react';
import { cn } from '../lib/utils';

interface BaraldharSVGProps extends React.SVGAttributes<SVGSVGElement> {
  /**
   * The SVG content or viewBox dimensions
   * @example "0 0 100 100"
   */
  viewBox?: string;
  /**
   * Size of the SVG
   * @example "24" for 24x24px
   */
  size?: 'sm' | 'md' | 'lg' | 'xl' | number;
  /**
   * Fill color of the SVG
   */
  fill?: string;
  /**
   * Stroke color of the SVG
   */
  stroke?: string;
  /**
   * The SVG path or content
   */
  children?: React.ReactNode;
}

const sizeMap = {
  sm: '16px',
  md: '24px',
  lg: '32px',
  xl: '48px',
};

/**
 * BaraldharSVG Component
 * Flexible SVG component for rendering custom SVG graphics
 * 
 * @example
 * ```tsx
 * <BaraldharSVG size="md" fill="currentColor">
 *   <circle cx="50" cy="50" r="40" />
 * </BaraldharSVG>
 * ```
 */
export const BaraldharSVG = React.forwardRef<
  SVGSVGElement,
  BaraldharSVGProps
>(
  (
    {
      viewBox = '0 0 24 24',
      size = 'md',
      fill = 'currentColor',
      stroke = 'none',
      className,
      children,
      ...props
    },
    ref
  ) => {
    const sizeValue = typeof size === 'number' ? `${size}px` : sizeMap[size];

    return (
      <svg
        ref={ref}
        viewBox={viewBox}
        width={sizeValue}
        height={sizeValue}
        fill={fill}
        stroke={stroke}
        className={cn(
          'inline-block',
          className
        )}
        {...props}
      >
        {children}
      </svg>
    );
  }
);

BaraldharSVG.displayName = 'BaraldharSVG';

import React from 'react';

interface DottedBackgroundProps {
  className?: string;
  dotSize?: number;
  gap?: number;
  dotColor?: string;
  glow?: boolean;
}

export const DottedBackground: React.FC<DottedBackgroundProps> = ({
  className = '',
  dotSize = 1.5,
  gap = 24,
  dotColor = 'rgba(255, 255, 255, 0.12)',
  glow = true
}) => {
  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden select-none z-0 ${className}`}>
      {/* SVG Pattern Dotted Grid */}
      <svg
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 50%, #000 30%, transparent 85%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 50%, #000 30%, transparent 85%)'
        }}
      >
        <defs>
          <pattern
            id="dotted-grid-pattern"
            width={gap}
            height={gap}
            patternUnits="userSpaceOnUse"
          >
            <circle cx={gap / 2} cy={gap / 2} r={dotSize} fill={dotColor} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dotted-grid-pattern)" />
      </svg>

      {/* Subtle Volt Ambient Core Glow */}
      {glow && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[radial-gradient(ellipse_at_center,rgba(226,249,57,0.04),transparent_70%)] blur-2xl pointer-events-none" />
      )}
    </div>
  );
};

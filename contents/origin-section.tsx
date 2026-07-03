import React from 'react';

interface OriginSectionProps {
  origin: string;
}

export function OriginSection({ origin }: OriginSectionProps) {
  return (
    <div className="pt-4 border-t border-border-subtle/60">
      <h4 className="text-label-sm font-bold text-primary mb-1 flex items-center gap-1 transition-colors duration-200">
        <svg
          className="w-4 h-4 text-primary transition-all duration-300 hover:scale-110"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
        </svg>
        Origin
      </h4>
      <p className="text-label-sm text-on-surface-variant leading-relaxed">
        {origin}
      </p>
    </div>
  );
}

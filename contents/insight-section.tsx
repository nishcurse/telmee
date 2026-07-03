import React from 'react';

interface InsightSectionProps {
  insight: string;
}

export function InsightSection({ insight }: InsightSectionProps) {
  return (
    <div className="mt-6 p-4 rounded-xl glassmorphic border border-solid">
      <div className="flex items-center gap-2 mb-2">
        <svg
          className="w-4 h-4 text-primary transition-all duration-300 hover:scale-110 hover:animate-pulse-soft"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
        </svg>
        <span className="text-[10px] font-bold text-primary uppercase tracking-widest transition-all duration-200">
          Contextual Insight
        </span>
      </div>
      <p className="font-body-md text-body-md text-on-surface-variant/80 leading-relaxed italic">
        {insight}
      </p>
    </div>
  );
}

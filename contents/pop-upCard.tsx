

import React, { useState } from 'react';
import cssText from "data-text:~/style.css"
import { DefinitionSection } from './definition-section';
import { OriginSection } from './origin-section';
import { InsightSection } from './insight-section';
import { useOverlayStore } from "@store/store"; 
import type { DictionaryCardProps } from "@app-types/selection-types";


export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}


export function DictionaryCard({
  word,
  pronunciation,
  definitions,
  origin,
  insight,
  onBookmark,
}: DictionaryCardProps) {
  const popupVisible  = useOverlayStore(st => st.popupVisible);
  if(!popupVisible) {
    return null;
  }
  const position = useOverlayStore( st => st.position);
  const data = useOverlayStore( st => st.data);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    onBookmark?.();
  };

  const handlePronunciation = () => {
    setIsPlayingAudio(true);
    // audio playback logic would go here
    setTimeout(() => setIsPlayingAudio(false), 150);
  };

  return (
    <div data-telmee-overlay className=" w-full max-w-[360px] ">
      <div className="glassmorphic rounded-xl shadow-toolkit p-6 relative">
        {/* Bookmark Button */}
        <button
          onClick={handleBookmark}
          className="absolute top-4 right-4 flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-all ripple-effect shadow-sm"
          title={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
          aria-label="Bookmark"
        >
          <svg
            className={`w-5 h-5 transition-all duration-300 ${isBookmarked ? 'animate-pulse-soft' : ''}`}
            fill={isBookmarked ? 'currentColor' : 'none'}
            stroke="currentColor"
            viewBox="0 0 24 24"
            style={{
              transform: isBookmarked ? 'scale(1.1)' : 'scale(1)',
            }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 5a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 19V5z"
            />
          </svg>
        </button>

        {/* Header Section */}
        <div className="flex flex-col gap-1 mb-6">
          <div className="flex items-baseline gap-2">
            <h3 className="font-headline-lg text-headline-md text-on-surface font-bold">
              {word}
            </h3>
            <span className="font-label-sm text-label-sm text-on-surface-variant/60 italic">
              {pronunciation}
            </span>
          </div>

          {/* Pronunciation Button */}
          <div className="flex items-center gap-2 mt-1">
            <button
              onClick={handlePronunciation}
              className={`ripple-effect w-8 h-8 flex items-center justify-center rounded-full bg-primary-container text-white hover:opacity-90 transition-all ${
                isPlayingAudio ? 'scale-90' : ''
              }`}
              title="Listen pronunciation"
              aria-label="Play pronunciation"
            >
              <svg
                className={`w-5 h-5 transition-all duration-300 ${isPlayingAudio ? 'animate-pulse-soft' : ''}`}
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.26 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
              </svg>
            </button>
            <span className="text-label-sm text-on-surface-variant/70 font-medium">
              UK / US English
            </span>
          </div>
        </div>

        {/* Definitions Section */}
        <div className="space-y-5">
          {definitions.map((def, index) => (
            <DefinitionSection key={index} definition={def} />
          ))}

          {/* Origin Section */}
          <OriginSection origin={origin} />
        </div>

        {/* Insight Section */}
        <InsightSection insight={insight} />
      </div>
    </div>
  );
}

/// <reference types="chrome" />

import type { Dictonaryresp } from "@app-types/selection-types"
import { useOverlayStore, useSearchStore, useBookmarkStore} from "@store/store"
import { useSelectionFloating } from "./hooks/useSelectionFloating"
import cssText from "data-text:~/style.css"
import React, { useState } from "react"

import { DefinitionSection } from "./definition-section"
import { InsightSection } from "./insight-section"
import { OriginSection } from "./origin-section"

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

export default function DictionaryCard() {
  const popupVisible = useOverlayStore((st) => st.popupVisible)
  const position = useOverlayStore((st) => st.position)
  const data = useSearchStore((st) => st.data)
  const intialize = useBookmarkStore((st) => st.initialize)
  const addWord = useBookmarkStore((st) => st.addWord)
  const removeWord = useBookmarkStore((st) => st.removeWord)
  const exists = useBookmarkStore((st) => st.exists)
  const bookmarkData = useBookmarkStore((st) => st.data)

  
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false)
  const { floatingStyles, refs } = useSelectionFloating(position, popupVisible)

  if (!popupVisible || !position) {
    return null
  }

  const handleBookmark = () => {
    if(isBookmarked) {
      removeWord(data[0]?.word).then(() => {
        setIsBookmarked(false);
      })
    }else{
      addWord(data[0]?.word , data).then(() => {
        setIsBookmarked(true);
      });
    }
  }

  const handlePronunciation = async () => {
    if(isPlayingAudio) {
      return;
    }

    if(data[0]?.phonetics && data[0].phonetics.length > 0) {
      const validPhonetic = data[0].phonetics.find((p: any) => p.audio && p.audio.length > 0);
      const audioUrl = validPhonetic?.audio;
      if(audioUrl){
        
        try {
          setIsPlayingAudio(true);
          const response = await chrome.runtime.sendMessage({
            action: "processAudio",
            audioUrl: audioUrl
          });


          if (response?.error || !response?.dataUrl) {
            setIsPlayingAudio(false);
            return;
          }
          const audio = new Audio(response.dataUrl);
          await audio.play();  
          audio.onended = () => {
            setIsPlayingAudio(false);
          };

        }catch (err) {
        }finally{
          setIsPlayingAudio(false);
        }

      }
    }

    return;
  } 

  return (
    <div
      data-telmee-overlay
      className="fixed inset-0 z-[2147483647] pointer-events-none pl-3"
      style={{ textShadow: "none" }}>
      <div
        ref={refs.setFloating}
        className="pointer-events-auto flex flex-col overflow-hidden rounded-xl border border-white/70 bg-white/20 backdrop-blur-md shadow-2xl shadow-black/10 ring-1 ring-black/5"
        style={{
          ...floatingStyles,
          willChange: "transform"
        }}>
        {/* 2. Moved Bookmark Button OUTSIDE the scrollable container */}
        <button
          onClick={handleBookmark}
          className="absolute top-4 right-5 z-10 flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-all ripple-effect shadow-sm"
          title={isBookmarked ? "Remove bookmark" : "Add bookmark"}
          aria-label="Bookmark">
          <svg
            className={`w-5 h-5 transition-all duration-300 ${isBookmarked ? "animate-pulse-soft" : ""}`}
            fill={isBookmarked ? "currentColor" : "none"}
            stroke="currentColor"
            viewBox="0 0 24 24"
            style={{
              transform: isBookmarked ? "scale(1.1)" : "scale(1)"
            }}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 6a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L7 20V6z"
            />
          </svg>
        </button>

        {/* 3. Dedicated scrollable content wrapper */}
        <div className="min-h-0 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-transparent p-5 sm:p-6 pr-4">
          {/* Header Section */}
          <div className="flex flex-col gap-1 mb-6 pr-8">
            {" "}
            {/* Added pr-8 to prevent text going under the fixed bookmark button */}
            <div className="flex items-baseline gap-2">
              <h3
                className="font-headline-lg text-headline-md text-on-surface font-bold"
                title="See More"
                onClick={() =>
                  window.open(
                    `https://www.google.com/search?q=define+${data[0]?.word}`,
                    "_blank"
                  )
                }
                style={{ cursor: "pointer" }}>
                {data[0]?.word}
              </h3>
              <span className="font-label-sm text-label-sm text-on-surface-variant/60 italic">
                {data[0]?.phonetic}
              </span>
            </div>
            {/* Pronunciation Button */}
            <div className="flex items-center gap-2 mt-1">
              <button
                onClick={handlePronunciation}
                className={`ripple-effect w-8 h-8 flex items-center justify-center rounded-full bg-primary-container text-white hover:opacity-90 transition-all ${
                  isPlayingAudio ? "scale-90" : ""
                }`}
                title="Listen pronunciation"
                aria-label="Play pronunciation">
                <svg
                  className={`w-5 h-5 transition-all duration-300 ${isPlayingAudio ? "animate-pulse-soft" : ""}`}
                  fill="currentColor"
                  viewBox="0 0 24 24">
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
            {(data[0].meanings || []).map((ele, index) => (
              <DefinitionSection
                key={index}
                definition={ele["definitions"][0]}
                partOfSpeech={ele["partOfSpeech"]}
              />
            ))}

            {/* Origin Section */}
            {data[0].origin && <OriginSection origin={data[0].origin} />}
          </div>

          {/* Insight Section */}
          <InsightSection insight={null} />
        </div>
      </div>
    </div>
  )
}

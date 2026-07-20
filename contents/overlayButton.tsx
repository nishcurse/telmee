import React from "react"
import cssText from "data-text:~/style.css"
import {useOverlayStore} from "@store/store"
import { useSelectionFloating } from "./hooks/useSelectionFloating"


export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}


const OverlayButton = () => {
  const { buttonVisible, position, showPopup } = useOverlayStore()
  const { floatingStyles, refs } = useSelectionFloating(position, buttonVisible, {
    offsetValue: 12,
    maxWidth: 128,
  })

  if (!buttonVisible || !position) {
    return null
  }

  return (
    <button
      data-telmee-overlay
      type="button"
      ref={refs.setFloating}
      onClick={() => {
        console.log("OverlayButton clicked, showing popup")
        showPopup()
        console.log(useOverlayStore.getState())
      }}
      className="z-[2147483647] pointer-events-auto max-w-[128px] rounded-xl border border-white/70 bg-white shadow-2xl shadow-black/10 ring-1 ring-black/5 px-4 py-3 text-left"
      style={{
        ...floatingStyles
      }}
    >
      <span
        className="block text-[10px] uppercase tracking-[0.2em] text-on-surface-variant/60"
        style={{ textShadow: "none" }}
      >
        Telmee
      </span>
      <span
        className="block text-sm font-semibold text-on-surface"
        style={{ textShadow: "none" }}
      >
        Open popup
      </span>
    </button>
  )
}

export default OverlayButton
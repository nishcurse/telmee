import React from "react"
import cssText from "data-text:~/style.css"
import {useOverlayStore} from "@store/store"


export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}


const OverlayButton = () => {
  const { buttonVisible, position, showPopup } = useOverlayStore()

  if (!buttonVisible || !position) {
    return null
  }

  return (
    <button
      data-telmee-overlay
      type="button"
      onClick={() => {
        console.log("OverlayButton clicked, showing popup")
        showPopup()
        console.log(useOverlayStore.getState())
      }}
      className="fixed z-[2147483647] pointer-events-auto w-[128px] rounded-xl border border-white/70 bg-white shadow-2xl shadow-black/10 ring-1 ring-black/5 px-4 py-3 text-left"
      style={{
        left: position.left + position.width / 2,
        top: position.top + position.height + 12,
        transform: "translateX(-50%)"
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
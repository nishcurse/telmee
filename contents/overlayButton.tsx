import React, { useEffect, useRef} from "react"
import cssText from "data-text:~/style.css"
import {Events} from "@constants/events"
import {useOverlayStore} from "@store/store"
import type {position, selectionData} from "@app-types/selection-types"
import useClickEvents from "./hooks/useOutsideClick"
import useOverlayEvents from "./hooks/useOverlayEvents"


export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}



const OverlayButton = () => {

  const { buttonVisible, position , showPopup }  =  useOverlayStore()
  useOverlayEvents(); 
  const ref = useRef<HTMLButtonElement | null>(null);
  const popupRef = useRef<HTMLDivElement | null>(null);
  // connect to the custom event fired from the selection handler in cs
  useClickEvents();

  

  return (
    buttonVisible && position ? (
      <button
        ref = {ref}
        data-telmee-overlay 
        type="button"
        onClick={showPopup}
        className="bg-slate-600 text-white rounded px-3 py-2 shadow-md fixed z-[999999]"
        style={{ left: position.left + position.width / 2
        , top: position.top + position.height + 8 }}>
        Telmee
      </button>
    ) : null
  )
}

export default OverlayButton


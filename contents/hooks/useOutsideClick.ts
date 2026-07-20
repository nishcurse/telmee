import { useEffect } from "react"
import { useOverlayStore } from "@store/store"

export default function useOutsideClick() {
    const clear = useOverlayStore((st) => st.clear)
    const buttonVisible = useOverlayStore((st) => st.buttonVisible)
    const popupVisible = useOverlayStore((st) => st.popupVisible)
    useEffect(() => {
        if (!buttonVisible && !popupVisible) return

        function handleOutsideClick(e: MouseEvent) {
            const target = e.target as HTMLElement | null

            if (target?.closest("[data-telmee-overlay]")){
                return;
            }
            if (target?.tagName === "PLASMO-CSUI" || target?.tagName === "plasmo-csui") {
                return
            }

            clear()
        }

        document.addEventListener("mousedown", handleOutsideClick, true)

        return () => {
            document.removeEventListener(
                "mousedown",
                handleOutsideClick,
                true
            )
        }
    }, [buttonVisible, clear , popupVisible])
}
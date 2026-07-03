import { useEffect } from "react"
import { useOverlayStore } from "@store/store"

export default function useOutsideClick() {
    const clear = useOverlayStore((st) => st.clear)
    const buttonVisible = useOverlayStore((st) => st.buttonVisible)

    useEffect(() => {
        if (!buttonVisible) return

        function handleOutsideClick(e: MouseEvent) {
            const target = e.target as HTMLElement | null

            if (target?.closest("[data-telmee-overlay]"))
                return

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
    }, [buttonVisible, clear])
}
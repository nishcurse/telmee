import { useEffect } from "react";
import type { position , selectionData } from "@app-types/selection-types"
import { useOverlayStore } from "@store/store" 
import { Events } from "@constants/events"

export default function useOverlayEvents() : void{
    const  showButton  = useOverlayStore((st) => st.showButton); 
    useEffect(() => {
        function updateState(event: Event){
            const e = event as CustomEvent<{position: position , data : selectionData}>
            showButton(e.detail.position , e.detail.data);
        }
        window.addEventListener(Events.OVERLAY_OPEN, updateState)
        return () => {
            window.removeEventListener(Events.OVERLAY_OPEN, updateState)
        }
    },[showButton])
}
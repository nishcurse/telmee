import { useEffect } from "react";
import type { position , selectionData , Dictonaryresp} from "@app-types/selection-types"
import { useOverlayStore , useSearchStore} from "@store/store" 
import { Events } from "@constants/events"

export default function useOverlayEvents() : void{
    const  showButton  = useOverlayStore((st) => st.showButton); 
    const setData = useSearchStore( (st) => st.setData)

    useEffect(() => {
        function updateState(event: Event){
            const e = event as CustomEvent<{position: position , data : selectionData, ApiData : Dictonaryresp}>
            showButton(e.detail.position , e.detail.data);
            setData(e.detail.ApiData);
        }
        window.addEventListener(Events.OVERLAY_OPEN, updateState)
        return () => {
            window.removeEventListener(Events.OVERLAY_OPEN, updateState)
        }
    },[showButton])
}
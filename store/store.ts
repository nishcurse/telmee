import {create} from 'zustand' 
import type {position, selectionData , overlayStore , searchData} from '@app-types/selection-types'; 


export const useOverlayStore = create<overlayStore>((set) => ({
    buttonVisible: false,
    popupVisible: false,
    position: null,
    data: null,
    showButton : (position , data) => set({buttonVisible: true, position, data , popupVisible : false}),
    hideButton : () => set({buttonVisible: false}), 
    showPopup : () => set({popupVisible: true , buttonVisible : false}),
    hidePopup : () => set({popupVisible : false}),
    clear : () => set({buttonVisible: false, popupVisible : false , position : null, data : null})
}))

export const useSearchStore = create<searchData> ((set) => ({
    data : null,
    setData : (newData) => set({data :newData})
}))
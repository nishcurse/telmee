import {create} from 'zustand' 
import type {position, selectionData , overlayStore , searchData , BookmarkStore, Dictonaryresp, BookmarkData} from '@app-types/selection-types'; 
import {BookmarkClient} from 'contents/storage/BookmarkClient'

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


export const useBookmarkStore = create<BookmarkStore>((set, get) => ({
  data: {},

  async initialize() {
    const data = await BookmarkClient.getAll()
    set({ data })
  },

  async setData(newData: BookmarkData) {
    await BookmarkClient.save(newData)
    set({ data: newData })
  },

  async addWord(word: string, dictionary: Dictonaryresp) {
    const updated = {
      ...get().data,
      [word]: dictionary
    }

    await BookmarkClient.save(updated)
    set({ data: updated })

    return true
  },

  async removeWord(word: string) {
    const updated = { ...get().data }

    delete updated[word]

    await BookmarkClient.save(updated)
    set({ data: updated })

    return true
  },

  exists(word: string) {
    return Object.hasOwn(get().data, word)
  }
}))

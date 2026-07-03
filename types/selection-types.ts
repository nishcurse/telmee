export interface position {
  top: number
  left: number
  width: number
  height: number
}

export interface selectionData {
  selectedText: string
  container: HTMLElement | null
  containerText: string
}

export interface DictionaryCardProps {
  word: string;
  pronunciation: string;
  definitions: Array<{
    partOfSpeech: string;
    definition: string;
    example: string;
  }>;
  origin: string;
  insight: string;
  onBookmark?: () => void;
}

export interface overlayStore {
    buttonVisible : boolean, 
    popupVisible : boolean, 
    position : position | null,
    data : selectionData | null, 
    showButton(position :position , data : selectionData) : void,
    hideButton() : void, 
    showPopup() : void,
    hidePopup() : void
    clear() : void
  }

export interface searchData {
  data : JSON | null, 
  setData(newData :JSON) : void 
} 
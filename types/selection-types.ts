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
  data :  Dictonaryresp | null,
  setData(newData :Dictonaryresp | null) : void 
} 


export type Dictonaryresp = {
  word: string;
  phonetic: string;
  phonetics: {
    text: string;
    audio?: string;
  }[];
  origin: string;
  meanings: {
    partOfSpeech: string;
    definitions: {
      definition: string;
      example?: string;
      synonyms: string[];
      antonyms: string[];
    }[];
  }[];
}[];

export type BookmarkData = Record<string , Dictonaryresp>;

export interface BookmarkClient {
  getAll() : Promise<BookmarkData>, 
  save(data : BookmarkData) : Promise<void>, 
  remove(word : string) : Promise<void>,
  exists(word : string) : Promise<boolean>, 
  clear() : Promise<void>
}
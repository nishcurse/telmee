// fire event when user selects text only after like the text is selected for at least 
// i need to add debouncing here to 

import type { selectionData , selectPosition } from "@app-types/selection-types";


export const config = {
  matches: ["<all_urls>"]
}



function debounce<T extends (...args: any[]) => void>(
  callback: T,
  delay: number
) {
  let timeoutId: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      callback(...args);
    }, delay);
  };
}


function handleSelection() : {data : selectionData , rect : selectPosition} | undefined {
    const selection = window.getSelection();
    if(!selection || selection.rangeCount === 0) return; 
    const text = selection.toString().trim();
    if(text.length <= 0) return; 
    
    // trying to find the closest paragraph to the selection 
    const range = selection.getRangeAt(0);
    const  rect : selectPosition  = range.getBoundingClientRect();
    let element : Node | HTMLElement = range.commonAncestorContainer; 
    if(element.nodeType === Node.TEXT_NODE){
        element = element.parentElement as HTMLElement; 
    }
    const container = (element as HTMLElement).closest("p, div, span, article, section") as HTMLElement | null; 
    
    const data : selectionData = {
        selectedText : text, 
        container : container,
        containerText : container?.innerText || ""
    }
    console.log(rect.height, rect.width, rect.top , rect.left);
    return {data , rect};
}

const selectionHandler = debounce(handleSelection, 600);`` 

document.addEventListener("mouseup", selectionHandler);

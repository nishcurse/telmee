import debounce from "./utils/debouncer";
import type { selectionData, position } from "@app-types/selection-types";
import {Events} from "@constants/events";

export const config = {
    matches: ["<all_urls>"]
};


function handleSelection(): void {
    const selection = window.getSelection();

    
    
    if (!selection || selection.rangeCount === 0){
        return;
    }
    
    const range = selection.getRangeAt(0);
    
    const element =
    range.commonAncestorContainer.nodeType === Node.TEXT_NODE
    ? range.commonAncestorContainer.parentElement
    : (range.commonAncestorContainer as HTMLElement);
    
    if(element?.closest("[data-telmee-overlay]")){
        return;
    }
    
    if(selection.isCollapsed){
        return;
    }
    const text = selection.toString().trim();

    if(!text && !/^\S+$/.test(text)){
        return;
    }
    
    // Get bounding rect of the FIRST selected word
    let rect: position = range.getBoundingClientRect();

    if (range.startContainer.nodeType === Node.TEXT_NODE) {
        const textNode = range.startContainer;
        const textContent = textNode.textContent ?? "";

        let start = range.startOffset;

        // Move to beginning of the word
        while (start > 0 && /\S/.test(textContent[start - 1])) {
            start--;
        }

        let end = start;

        // Move to end of the word
        while (end < textContent.length && /\S/.test(textContent[end])) {
            end++;
        }

        const firstWordRange = document.createRange();
        firstWordRange.setStart(textNode, start);
        firstWordRange.setEnd(textNode, end);

        rect = firstWordRange.getBoundingClientRect();
    }

    const container = (element)?.closest(
        "p, div, span, article, section"
    ) as HTMLElement | null;

    const data: selectionData = {
        selectedText: text,
        container,
        containerText: container?.innerText || ""
    };

    window.dispatchEvent(
        new CustomEvent(Events.OVERLAY_OPEN, {
            detail: {
                position: rect,
                data
            }
        })
    );
}

const selectionHandler = debounce(handleSelection, 400);

document.addEventListener("mouseup", selectionHandler);
export{}
/// <reference types="chrome" />

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "processAudio") {
        (async () => {
            try {
                const response = await fetch(message.audioUrl);
                
                if (!response.ok) {
                    throw new Error(`HTTP Error: ${response.status}`);
                }

                const arrayBuffer = await response.arrayBuffer();
                
                const uint8Array = new Uint8Array(arrayBuffer);
                let binary = '';
                const chunkSize = 8192;
                for (let i = 0; i < uint8Array.length; i += chunkSize) {
                    const chunk = uint8Array.subarray(i, i + chunkSize);
                    binary += String.fromCharCode.apply(null, Array.from(chunk));
                }
                
                const base64 = btoa(binary);
                const dataUrl = `data:audio/mp3;base64,${base64}`;

                sendResponse({ dataUrl });
                
            } catch (err: any) {
                console.error("Background fetch failed:", err);
                sendResponse({ error: err.message || "Unknown background error" });
            }
        })();

        return true; 
    }
});
    import { useCallback } from "react"
    import type { Dictonaryresp } from "@app-types/selection-types";

    const API_URl = "https://api.dictionaryapi.dev/api/v2/entries/en/"; 

    export async function useSearch(word : string) : Promise<Dictonaryresp | null>{
            const query = word.trim().toLowerCase()
            console.log("searching");
            if(!query)
            {
                return null
            }
            try {
                const response = await fetch(`${API_URl}${encodeURIComponent(query)}`);
                if(!response.ok){
                    return null;
                }
                const data = await response.json() as Dictonaryresp;
                return data;
            }catch (err) {
                // while in dev environment 
                console.log(err);
                return null;
            }
    }

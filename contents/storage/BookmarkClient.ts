// layer to interact with plasmoStore, which is just a wrapper around chrome.storage.local 
import { Storage } from "@plasmohq/storage"
import type { BookmarkData , Dictonaryresp} from "@app-types/selection-types"

const storage = new Storage({ area: "local" })

const BOOKMARK_KEY = "bookmarks"

async function getAll(): Promise<BookmarkData> {
    return (await storage.get(BOOKMARK_KEY)) as BookmarkData || {}
}

async function save(data: BookmarkData): Promise<void> {
    await storage.set(BOOKMARK_KEY, data)
}

async function addWord(word: string, data: Dictonaryresp): Promise<boolean> {
    try {
        const bookmarks = await getAll()
        bookmarks[word] = data
        await save(bookmarks)
        return true
    }catch(err){
        return false;
    }
}

async function remove(word: string): Promise<boolean> {
    try {
        const bookmarks = await getAll()
        delete bookmarks[word]
        await save(bookmarks)
        return true
    }catch(err) {
        return false;
    }
}

async function exists(word: string): Promise<boolean> {
    const bookmarks = await getAll()
    return Object.hasOwn(bookmarks, word)
}

async function clear(): Promise<void> {
    await storage.remove(BOOKMARK_KEY)
}

export const BookmarkClient = {
    getAll,
    save,
    addWord,
    remove,
    exists,
    clear,
}
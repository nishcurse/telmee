
# Telmee

Telmee is a Chrome extension that listens to highlighted text on a page, fetches dictionary data, and shows a lightweight overlay with meaning, pronunciation, origin, and bookmark actions.

[![Install from Chrome Web Store](https://img.shields.io/badge/Install-Chrome_Web_Store-4285F4?logo=googlechrome&logoColor=white)](https://chromewebstore.google.com/detail/REPLACE-WITH-YOUR-EXTENSION-ID)

> Replace the link above with your published Chrome Web Store URL once the extension is live.

## Index

- [Telmee](#telmee)
  - [Index](#index)
  - [What It Does](#what-it-does)
  - [Features](#features)
  - [Getting Started](#getting-started)
  - [Project Structure](#project-structure)
  - [Customization Guide](#customization-guide)
    - [Common customization cases](#common-customization-cases)
  - [Build and Release](#build-and-release)
  - [Maintainer Notes](#maintainer-notes)
  - [Contributing](#contributing)
  - [Documentation](#documentation)

## What It Does

- Watches text selection on pages.
- Fetches dictionary results for the selected word.
- Shows a floating action button and popup overlay.
- Plays pronunciation audio when available.
- Lets users bookmark words locally in the browser.

## Features

- Selection-based dictionary lookup
- Floating overlay button and popup card
- Pronunciation playback
- Bookmark storage with `chrome.storage.local`
- Outside-click dismissal
- Floating UI-based viewport positioning

## Getting Started

Install dependencies first:

```bash
pnpm install
```

Run the development server:

```bash
pnpm dev
```

Open the generated development build in Chrome. For this project, the local dev output is usually in `build/chrome-mv3-dev`.

If you want to build a production package:

```bash
pnpm build
```

If you want a distributable extension package:

```bash
pnpm package
```

## Project Structure

```text
.
├── Core
│   ├── background.ts             # Background service worker
│   ├── popup.tsx                 # Extension popup
│   └── style.css                 # Global styles
│
├── Content Scripts
│   └── contents/
│       ├── main.ts               # Entry point
│       ├── selection.ts          # Text selection detection
│       ├── overlays.tsx          # Injected React root
│       ├── overlayButton.tsx     # Floating selection button
│       └── pop-upCard.tsx        # Dictionary popup
│
├── Data Layer
│   ├── contents/apis/
│   │   └── useSearch.ts          # Dictionary API client
│   ├── contents/storage/         # Bookmark persistence
│   └── store/store.ts            # Zustand state management
│
├── Shared
│   ├── constants/events.ts       # Custom events
│   ├── lib/utils.ts              # Generic utilities
│   ├── types/selection-types.ts  # Shared interfaces
│   ├── contents/hooks/           # React hooks
│   ├── contents/ui/              # Reusable UI components
│   └── contents/utils/           # Content utilities
```

## Customization Guide

If you want to adapt the extension to your own API or product flow, these are the main files to change:

- `contents/apis/useSearch.ts` - replace the dictionary API request with your own backend or proxy.
- `background.ts` - adjust runtime processing such as audio handling or other background tasks.
- `contents/selection.ts` - change how selection is detected, filtered, or transformed before lookup.
- `store/store.ts` - update overlay state, bookmark behavior, or search state flow.
- `contents/storage/BookmarkClient.ts` - swap local bookmark storage for another persistence layer.
- `contents/pop-upCard.tsx` - change popup layout, actions, and displayed data.
- `contents/overlayButton.tsx` - change the selection button behavior or placement.
- `popup.tsx` - customize the extension popup UI.
- `types/selection-types.ts` - update API response or app data types when your backend shape changes.
- `constants/events.ts` - adjust event names if you add more overlay flows.

### Common customization cases

If you are connecting a different dictionary or language API, update `contents/apis/useSearch.ts` first and then align `types/selection-types.ts` with the new response shape.

If you want to persist bookmarks somewhere else, replace the implementation in `contents/storage/BookmarkClient.ts` and keep the store contract in `store/store.ts` intact.

If you want different overlay behavior, tune `contents/selection.ts`, `contents/overlayButton.tsx`, and `contents/pop-upCard.tsx` together so the selection data, anchor position, and UI stay in sync.

## Build and Release

Local build:

```bash
pnpm build
```

Package for release:

```bash
pnpm package
```

For publishing, use the Plasmo deployment flow and upload the built extension to the Chrome Web Store.

## Maintainer Notes

- The extension depends on Chrome extension permissions and content-script injection, so changes to `manifest`-related behavior should be tested in Chrome, not just in the editor.
- The overlay uses Floating UI for placement, so any major layout change should be validated in narrow and tall viewports.
- Bookmark data is stored locally, so clearing browser storage will remove saved words.
- The current API call uses a public dictionary endpoint. If you switch to your own backend, keep the timeout and failure path user-friendly.
- The browser store link in this README is intentionally a placeholder until you provide the real published extension URL.

## Contributing

1. Make the change in the relevant entry file or helper.
2. Run `pnpm dev` and test the overlay in Chrome.
3. Build with `pnpm build` before opening a release or PR.

## Documentation

For Plasmo-specific framework details, see the [official documentation](https://docs.plasmo.com/).
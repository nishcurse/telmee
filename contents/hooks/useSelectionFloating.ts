import {
  autoUpdate,
  flip,
  offset,
  size,
  shift,
  useFloating,
} from "@floating-ui/react"
import type { VirtualElement } from "@floating-ui/react"
import { useEffect, useMemo } from "react"

import type { position } from "@app-types/selection-types"

type SelectionFloatingOptions = {
  offsetValue?: number
  maxWidth?: number
}

function createVirtualReference(anchor: position): VirtualElement {
  return {
    getBoundingClientRect() {
      return {
        x: anchor.left,
        y: anchor.top,
        top: anchor.top,
        left: anchor.left,
        right: anchor.left + anchor.width,
        bottom: anchor.top + anchor.height,
        width: anchor.width,
        height: anchor.height,
      }
    }
  }
}

export function useSelectionFloating(
  anchor: position | null,
  enabled: boolean,
  options: SelectionFloatingOptions = {}
) {
  const virtualReference = useMemo(() => {
    if (!anchor) {
      return null
    }
    return createVirtualReference(anchor)
  }, [anchor])

  // 1. Remove <VirtualElement> generic and the `elements` property
  const floating = useFloating({
    open: enabled && Boolean(virtualReference),
    placement: "bottom",
    strategy: "fixed",
    middleware: [
      offset(options.offsetValue ?? 8),
      flip({ padding: 16 }),
      shift({ padding: 16 }),
      size({
        padding: 16,
        apply({ availableWidth, availableHeight, elements }) {
          const constrainedWidth = Math.min(
            options.maxWidth ?? 360,
            availableWidth
          )

          Object.assign(elements.floating.style, {
            width: `${constrainedWidth}px`,
            maxHeight: `${Math.max(0, availableHeight)}px`
          })
        }
      })
    ],
    whileElementsMounted: autoUpdate
  })

  // 2. Sync the virtual element using setPositionReference
  useEffect(() => {
    floating.refs.setPositionReference(virtualReference)
  }, [floating.refs, virtualReference])

  return floating
}
'use client'

import React, { memo } from 'react'
import { useSelectionBounds } from '~/hooks/use-selection-bounds'

interface SelectionBoxProps {
  onResizeHandlePointerDown: () => void
}

const HANDLE_WIDTH = 8

const SelectionBox = memo(({}: SelectionBoxProps) => {
  const bounds = useSelectionBounds()

  if (!bounds) {
    return null
  }

  return (
    <>
      <rect
        className="pointer-events-none fill-transparent stroke-blue-500 stroke-1"
        style={{
          transform: `translate(${bounds.x}px, ${bounds.y}px)`
        }}
        x={0}
        y={0}
        width={bounds.width}
        height={bounds.height}
      />
    </>
  )
})

SelectionBox.displayName = 'SelectionBox'

export default SelectionBox

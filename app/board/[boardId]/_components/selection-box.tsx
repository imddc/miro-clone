'use client'

import React, { memo } from 'react'
import { useSelectionBounds } from '~/hooks/use-selection-bounds'
import { useSelf, useStorage } from '~/liveblocks.config'
import { LayerType, Side, XYWH } from '~/types/canvas'

interface SelectionBoxProps {
  onResizeHandlePointerDown: (corner: Side, initialBounds: XYWH) => void
}

const HANDLE_WIDTH = 8

const SelectionBox = memo(
  ({ onResizeHandlePointerDown }: SelectionBoxProps) => {
    const soleLayerId = useSelf((me) =>
      me.presence.selection.length === 1 ? me.presence.selection[0] : null
    )

    const isShowingHandles = useStorage(
      (root) =>
        soleLayerId && root.layers.get(soleLayerId)?.type !== LayerType.Path
    )

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
        {isShowingHandles && (
          <>
            {/* top left */}
            <rect
              className="fill-white stroke-blue-500 stroke-1"
              x={0}
              y={0}
              style={{
                cursor: 'nwse-resize',
                width: `${HANDLE_WIDTH}px`,
                height: `${HANDLE_WIDTH}px`,
                transform: `translate(
                    ${bounds.x - HANDLE_WIDTH / 2}px, 
                    ${bounds.y - HANDLE_WIDTH / 2}px)`
              }}
              onPointerDown={(e) => {
                e.stopPropagation()
                // TODO: add resize handler
                onResizeHandlePointerDown(Side.Top + Side.Left, bounds)
              }}
            />

            {/* top center */}
            <rect
              className="fill-white stroke-blue-500 stroke-1"
              x={0}
              y={0}
              style={{
                cursor: 'ns-resize',
                width: `${HANDLE_WIDTH}px`,
                height: `${HANDLE_WIDTH}px`,
                transform: `translate(
                    ${bounds.x + bounds.width / 2 - HANDLE_WIDTH / 2}px, 
                    ${bounds.y - HANDLE_WIDTH / 2}px)`
              }}
              onPointerDown={(e) => {
                e.stopPropagation()
                // TODO: add resize handler
                onResizeHandlePointerDown(Side.Top, bounds)
              }}
            />

            {/* right top */}
            <rect
              className="fill-white stroke-blue-500 stroke-1"
              x={0}
              y={0}
              style={{
                cursor: 'nesw-resize',
                width: `${HANDLE_WIDTH}px`,
                height: `${HANDLE_WIDTH}px`,
                transform: `translate(
                    ${bounds.x + bounds.width - HANDLE_WIDTH / 2}px, 
                    ${bounds.y - HANDLE_WIDTH / 2}px)`
              }}
              onPointerDown={(e) => {
                e.stopPropagation()
                // TODO: add resize handler
                onResizeHandlePointerDown(Side.Top + Side.Right, bounds)
              }}
            />

            {/* center left */}
            <rect
              className="fill-white stroke-blue-500 stroke-1"
              x={0}
              y={0}
              style={{
                cursor: 'ew-resize',
                width: `${HANDLE_WIDTH}px`,
                height: `${HANDLE_WIDTH}px`,
                transform: `translate(
                    ${bounds.x - HANDLE_WIDTH / 2}px, 
                    ${bounds.y + bounds.height / 2 - HANDLE_WIDTH / 2}px)`
              }}
              onPointerDown={(e) => {
                e.stopPropagation()
                // TODO: add resize handler
                onResizeHandlePointerDown(Side.Left, bounds)
              }}
            />

            {/* center right */}
            <rect
              className="fill-white stroke-blue-500 stroke-1"
              x={0}
              y={0}
              style={{
                cursor: 'ew-resize',
                width: `${HANDLE_WIDTH}px`,
                height: `${HANDLE_WIDTH}px`,
                transform: `translate(
                    ${bounds.x + bounds.width - HANDLE_WIDTH / 2}px, 
                    ${bounds.y + bounds.height / 2 - HANDLE_WIDTH / 2}px)`
              }}
              onPointerDown={(e) => {
                e.stopPropagation()
                // TODO: add resize handler
                onResizeHandlePointerDown(Side.Right, bounds)
              }}
            />

            {/* bottom left */}
            <rect
              className="fill-white stroke-blue-500 stroke-1"
              x={0}
              y={0}
              style={{
                cursor: 'nesw-resize',
                width: `${HANDLE_WIDTH}px`,
                height: `${HANDLE_WIDTH}px`,
                transform: `translate(
                    ${bounds.x - HANDLE_WIDTH / 2}px, 
                    ${bounds.y + bounds.height - HANDLE_WIDTH / 2}px)`
              }}
              onPointerDown={(e) => {
                e.stopPropagation()
                // TODO: add resize handler
                onResizeHandlePointerDown(Side.Bottom + Side.Left, bounds)
              }}
            />

            {/* bottom center */}
            <rect
              className="fill-white stroke-blue-500 stroke-1"
              x={0}
              y={0}
              style={{
                cursor: 'ns-resize',
                width: `${HANDLE_WIDTH}px`,
                height: `${HANDLE_WIDTH}px`,
                transform: `translate(
                    ${bounds.x + bounds.width / 2 - HANDLE_WIDTH / 2}px, 
                    ${bounds.y + bounds.height - HANDLE_WIDTH / 2}px)`
              }}
              onPointerDown={(e) => {
                e.stopPropagation()
                // TODO: add resize handler
                onResizeHandlePointerDown(Side.Bottom, bounds)
              }}
            />

            {/* bottom right */}
            <rect
              className="fill-white stroke-blue-500 stroke-1"
              x={0}
              y={0}
              style={{
                cursor: 'nwse-resize',
                width: `${HANDLE_WIDTH}px`,
                height: `${HANDLE_WIDTH}px`,
                transform: `translate(
                    ${bounds.x + bounds.width - HANDLE_WIDTH / 2}px, 
                    ${bounds.y + bounds.height - HANDLE_WIDTH / 2}px)`
              }}
              onPointerDown={(e) => {
                e.stopPropagation()
                // TODO: add resize handler
                onResizeHandlePointerDown(Side.Bottom + Side.Right, bounds)
              }}
            />
          </>
        )}
      </>
    )
  }
)

SelectionBox.displayName = 'SelectionBox'

export default SelectionBox

import React, { memo } from 'react'
import { useSelectionBounds } from '~/hooks/use-selection-bounds'
import { useMutation, useSelf } from '~/liveblocks.config'
import { Camera, Color } from '~/types/canvas'
import ColorPicler from './color-picker'

interface SelectionToolsProps {
  camera: Camera
  setLastUsedColor: (color: Color) => void
}

const SelectionTools = memo(
  ({ camera, setLastUsedColor }: SelectionToolsProps) => {
    const selection = useSelf((me) => me.presence.selection)
    const setFill = useMutation(
      ({ storage }, fill: Color) => {
        const liveLayers = storage.get('layers')
        setLastUsedColor(fill)

        selection.forEach((id) => {
          liveLayers.get(id)?.set('fill', fill)
        })
      },
      [selection, setLastUsedColor]
    )

    const selectionBounds = useSelectionBounds()

    if (!selectionBounds) {
      return null
    }

    const x = selectionBounds.width / 2 + selectionBounds.x + camera.x
    const y = selectionBounds.y + camera.y

    return (
      <div
        className="absolute flex select-none rounded-xl border bg-white p-3 shadow-sm"
        style={{
          transform: `translate(calc(${x}px - 50%), calc(${y - 16}px - 100%))`
        }}
      >
        <ColorPicler onChange={setFill} />
      </div>
    )
  }
)

SelectionTools.displayName = 'SelectionTools'

export default SelectionTools

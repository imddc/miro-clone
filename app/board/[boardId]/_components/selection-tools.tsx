import { BringToFront, SendToBack, Trash2 } from 'lucide-react'
import React, { memo } from 'react'
import Hint from '~/components/hint'
import { Button } from '~/components/ui/button'
import { useDeleteLayers } from '~/hooks/use-delete-layers'
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

    const deleteLayers = useDeleteLayers()
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
        {/*  color picler */}
        <ColorPicler onChange={setFill} />

        {/* <div className="flex flex-col gap-y-0.5"> */}
        {/*   <Hint label="Bring to front"> */}
        {/*     <Button variant="board" size="icon" onClick={handleMoveToFront}> */}
        {/*       <BringToFront /> */}
        {/*     </Button> */}
        {/*   </Hint> */}
        {/*   <Hint label="Bring to back" side="bottom"> */}
        {/*     <Button variant="board" size="icon" onClick={handleMoveToBack}> */}
        {/*       <SendToBack /> */}
        {/*     </Button> */}
        {/*   </Hint> */}
        {/* </div> */}
        <div className="ml-2 flex items-center border-l pl-2">
          <Hint label="Delete">
            <Button variant="board" size="icon" onClick={deleteLayers}>
              <Trash2 />
            </Button>
          </Hint>
        </div>
      </div>
    )
  }
)

SelectionTools.displayName = 'SelectionTools'

export default SelectionTools

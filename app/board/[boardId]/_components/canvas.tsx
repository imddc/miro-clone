'use client'

import React, { useCallback, useState } from 'react'
import { pointerEvent2CanvasPoint } from '~/lib/utils'
import {
  useCanRedo,
  useCanUndo,
  useHistory,
  useMutation,
  useSelf
} from '~/liveblocks.config'
import { Camera, CanvasMode, CanvasState } from '~/types/canvas'
import CursorsPresence from './cursors-presence'
import Info from './info'
import Participants from './participants'
import Toolbar from './toolbar'

interface CanvasProps {
  boardId: string
}

const Canvas = ({ boardId }: CanvasProps) => {
  const info = useSelf((s) => s.info)
  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None
  })
  const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 })

  const history = useHistory()
  const canUndo = useCanUndo()
  const canRedo = useCanRedo()

  const onWheel = useCallback((e: React.WheelEvent) => {
    setCamera((camera) => ({
      x: camera.x - e.deltaX,
      y: camera.y - e.deltaY
    }))
  }, [])

  const onPointerMove = useMutation(
    ({ setMyPresence }, e: React.PointerEvent) => {
      e.preventDefault()
      const current = pointerEvent2CanvasPoint(e, camera)
      setMyPresence({ cursor: current })
    },
    []
  )

  return (
    <main className="relative size-full touch-none bg-neutral-100">
      <Info data={info} boardId={boardId} />
      <Participants />
      <Toolbar
        canvasState={canvasState}
        setCanvasState={setCanvasState}
        canUndo={canUndo}
        canRedo={canRedo}
        undo={history.undo}
        redo={history.redo}
      />
      <svg
        className="h-screen w-screen"
        onWheel={onWheel}
        onPointerMove={onPointerMove}
      >
        <g>
          <CursorsPresence />
        </g>
      </svg>
    </main>
  )
}

export default Canvas

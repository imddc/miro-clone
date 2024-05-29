'use client'

import React, { useState } from 'react'
import {
  useCanRedo,
  useCanUndo,
  useHistory,
  useSelf
} from '~/liveblocks.config'
import { CanvasMode, CanvasState } from '~/types/canvas'
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
  const history = useHistory()
  const canUndo = useCanUndo()
  const canRedo = useCanRedo()

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
    </main>
  )
}

export default Canvas

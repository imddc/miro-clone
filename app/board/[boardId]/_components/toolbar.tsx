import {
  Circle,
  MousePointer2,
  Pencil,
  Redo2,
  Square,
  StickyNote,
  Type,
  Undo2
} from 'lucide-react'
import React from 'react'
import { Skeleton } from '~/components/ui/skeleton'
import { CanvasMode, CanvasState, LayerType } from '~/types/canvas'
import ToolButton from './tool-button'

interface ToolbarProps {
  canvasState: CanvasState
  setCanvasState: (newState: CanvasState) => void
  undo: () => void
  redo: () => void
  canUndo: boolean
  canRedo: boolean
}

const Toolbar = ({
  canvasState,
  setCanvasState,
  undo,
  redo,
  canUndo,
  canRedo
}: ToolbarProps) => {
  return (
    <div className="absolute left-2 top-1/2 flex -translate-y-1/2 flex-col gap-y-4">
      <div className="flex flex-col items-center gap-y-1 rounded-md bg-white p-1.5 shadow-md">
        <ToolButton
          label="Select"
          Icon={MousePointer2}
          isActive={
            canvasState.mode === CanvasMode.None ||
            canvasState.mode === CanvasMode.Translating ||
            canvasState.mode === CanvasMode.SelectionNet ||
            canvasState.mode === CanvasMode.Pressing ||
            canvasState.mode === CanvasMode.Resizing
          }
          onClick={() => setCanvasState({ mode: CanvasMode.None })}
        />
        <ToolButton
          label="Text"
          Icon={Type}
          isActive={
            canvasState.mode === CanvasMode.Inserting &&
            canvasState.layerType === LayerType.Text
          }
          onClick={() =>
            setCanvasState({
              mode: CanvasMode.Inserting,
              layerType: LayerType.Text
            })
          }
        />
        <ToolButton
          label="Sticky note"
          Icon={StickyNote}
          isActive={
            canvasState.mode === CanvasMode.Inserting &&
            canvasState.layerType === LayerType.Note
          }
          onClick={() =>
            setCanvasState({
              mode: CanvasMode.Inserting,
              layerType: LayerType.Note
            })
          }
        />
        <ToolButton
          label="Rectangle"
          Icon={Square}
          isActive={
            canvasState.mode === CanvasMode.Inserting &&
            canvasState.layerType === LayerType.Rectangle
          }
          onClick={() =>
            setCanvasState({
              mode: CanvasMode.Inserting,
              layerType: LayerType.Rectangle
            })
          }
        />
        <ToolButton
          label="Ellipse"
          Icon={Circle}
          isActive={
            canvasState.mode === CanvasMode.Inserting &&
            canvasState.layerType === LayerType.Ellipse
          }
          onClick={() =>
            setCanvasState({
              mode: CanvasMode.Inserting,
              layerType: LayerType.Ellipse
            })
          }
        />
        <ToolButton
          label="Pen"
          Icon={Pencil}
          isActive={canvasState.mode === CanvasMode.Pencil}
          onClick={() =>
            setCanvasState({
              mode: CanvasMode.Pencil
            })
          }
        />
      </div>

      <div className="flex flex-col items-center rounded-md bg-white p-1.5 shadow-md">
        <ToolButton
          label="Undo (ctrl + z)"
          Icon={Undo2}
          isActive={false}
          onClick={undo}
          isDisabled={!canUndo}
        />
        <ToolButton
          label="Redo"
          Icon={Redo2}
          isActive={false}
          onClick={redo}
          isDisabled={!canRedo}
        />
      </div>
    </div>
  )
}

export const ToolbarSkeleton = () => {
  return (
    <div className="absolute left-2 top-1/2 flex h-[360px] w-[52px] -translate-y-1/2 flex-col gap-y-4 rounded-md bg-white shadow-md">
      <Skeleton className="size-full" />
    </div>
  )
}

export default Toolbar

'use client'

import { LiveObject } from '@liveblocks/client'
import { nanoid } from 'nanoid'
import React, { useCallback, useMemo, useState } from 'react'
import {
  connectionId2Color,
  pointerEvent2CanvasPoint,
  resizeBounds
} from '~/lib/utils'
import {
  useCanRedo,
  useCanUndo,
  useHistory,
  useMutation,
  useOthersMapped,
  useSelf,
  useStorage
} from '~/liveblocks.config'
import {
  Camera,
  CanvasMode,
  CanvasState,
  Color,
  LayerType,
  Point,
  Side,
  XYWH
} from '~/types/canvas'
import CursorsPresence from './cursors-presence'
import Info from './info'
import LayerPreview from './layer-preview'
import Participants from './participants'
import SelectionBox from './selection-box'
import SelectionTools from './selection-tools'
import Toolbar from './toolbar'

const MAX_LAYERS = 100

interface CanvasProps {
  boardId: string
}

const Canvas = ({ boardId }: CanvasProps) => {
  const layerIds = useStorage((s) => s.layerIds)
  const info = useSelf((s) => s.info)
  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None
  })
  const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 })
  const [lastUsedColor, setLastUsedColor] = useState<Color>({
    r: 0,
    g: 0,
    b: 0
  })

  const history = useHistory()
  const canUndo = useCanUndo()
  const canRedo = useCanRedo()

  // create
  const insertLayer = useMutation(
    (
      { storage, setMyPresence },
      layerType:
        | LayerType.Ellipse
        | LayerType.Rectangle
        | LayerType.Text
        | LayerType.Note,
      position: Point
    ) => {
      const liveLayers = storage.get('layers')
      if (liveLayers.size >= MAX_LAYERS) {
        return
      }

      const liveLayerIds = storage.get('layerIds')
      const layerId = nanoid()
      const layer = new LiveObject({
        type: layerType,
        x: position.x,
        y: position.y,
        height: 100,
        width: 100,
        fill: lastUsedColor
      })

      liveLayerIds.push(layerId)
      liveLayers.set(layerId, layer)

      setMyPresence({ selection: [layerId] }, { addToHistory: true })
      setCanvasState({ mode: CanvasMode.None })
    },
    [lastUsedColor]
  )

  // unselectLayers
  const unselectLayers = useMutation(({ self, setMyPresence }) => {
    if (self.presence.selection.length > 0) {
      setMyPresence({ selection: [] }, { addToHistory: true })
    }
  }, [])

  // translating
  const translateSelectedLayer = useMutation(
    ({ storage, self }, point: Point) => {
      if (canvasState.mode !== CanvasMode.Translating) {
        return
      }

      const offset = {
        x: point.x - canvasState.current.x,
        y: point.y - canvasState.current.y
      }

      const liveLayers = storage.get('layers')

      for (const id of self.presence.selection) {
        const layer = liveLayers.get(id)
        if (layer) {
          layer.update({
            x: layer.get('x') + offset.x,
            y: layer.get('y') + offset.y
          })
        }
      }

      setCanvasState({
        mode: CanvasMode.Translating,
        current: point
      })
    },
    [canvasState]
  )

  // resize
  const resizeSelectedLayer = useMutation(
    ({ storage, self }, point: Point) => {
      if (canvasState.mode !== CanvasMode.Resizing) {
        return
      }

      const bounds = resizeBounds(
        canvasState.initialBounds,
        canvasState.corner,
        point
      )

      const liveLayers = storage.get('layers')
      const layer = liveLayers.get(self.presence.selection[0])

      if (layer) {
        layer.update(bounds)
      }
    },
    [canvasState]
  )

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

      if (canvasState.mode === CanvasMode.Translating) {
        translateSelectedLayer(current)
      } else if (canvasState.mode === CanvasMode.Resizing) {
        resizeSelectedLayer(current)
      }

      setMyPresence({ cursor: current })
    },
    [canvasState]
  )

  const onPointerLeave = useMutation(({ setMyPresence }) => {
    setMyPresence({ cursor: null })
  }, [])

  const onPointerUp = useMutation(
    ({}, e) => {
      const point = pointerEvent2CanvasPoint(e, camera)

      if (
        canvasState.mode === CanvasMode.None ||
        canvasState.mode === CanvasMode.Pressing
      ) {
        // cancel selected
        unselectLayers()
        setCanvasState({
          mode: CanvasMode.None
        })
      } else if (canvasState.mode === CanvasMode.Inserting) {
        insertLayer(canvasState.layerType, point)
      } else {
        setCanvasState({ mode: CanvasMode.None })
      }

      history.resume()
    },
    [camera, canvasState, history, insertLayer, unselectLayers]
  )

  const onPointDown = useCallback(
    (e: React.PointerEvent) => {
      const point = pointerEvent2CanvasPoint(e, camera)

      if (canvasState.mode === CanvasMode.Inserting) {
        return
      }

      setCanvasState({ origin: point, mode: CanvasMode.Pressing })
    },
    [camera, canvasState.mode, setCanvasState]
  )

  const selection = useOthersMapped((other) => other.presence.selection)

  const onLayerPointerDown = useMutation(
    ({ self, setMyPresence }, e: React.PointerEvent, layerId: string) => {
      if (
        canvasState.mode === CanvasMode.Pencil ||
        canvasState.mode === CanvasMode.Inserting
      ) {
        return
      }

      history.pause()
      e.stopPropagation()

      const point = pointerEvent2CanvasPoint(e, camera)
      if (!self.presence.selection.includes(layerId)) {
        setMyPresence({ selection: [layerId] }, { addToHistory: true })
      }

      setCanvasState({ mode: CanvasMode.Translating, current: point })
    },
    [setCanvasState, camera, history, canvasState.mode]
  )

  const layerId2ColorSelection = useMemo(() => {
    const layerIds2ColorSelection: Record<string, string> = {}

    for (const user of selection) {
      const [connectionId, selection] = user

      for (const layerId of selection) {
        layerIds2ColorSelection[layerId] = connectionId2Color(connectionId)
      }
    }

    return layerIds2ColorSelection
  }, [selection])

  // resieze handler
  const onResizeHandlePointerDown = useCallback(
    (corner: Side, initialBounds: XYWH) => {
      history.pause()
      setCanvasState({
        mode: CanvasMode.Resizing,
        initialBounds,
        corner
      })
    },
    [history]
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
      <SelectionTools camera={camera} setLastUsedColor={setLastUsedColor} />
      <svg
        className="h-screen w-screen"
        onWheel={onWheel}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        onPointerUp={onPointerUp}
        onPointerDown={onPointDown}
      >
        <g style={{ transform: `translate(${camera.x}px, ${camera.y}px)` }}>
          {layerIds.map((layerId) => (
            <LayerPreview
              key={layerId}
              id={layerId}
              onLayerPointerDown={onLayerPointerDown}
              selectionColor={layerId2ColorSelection[layerId]}
            />
          ))}
          <SelectionBox onResizeHandlePointerDown={onResizeHandlePointerDown} />
          <CursorsPresence />
        </g>
      </svg>
    </main>
  )
}

export default Canvas

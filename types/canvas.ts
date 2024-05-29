export type Color = {
  r: number
  g: number
  b: number
}

export type Camera = {
  x: number
  y: number
}

export enum LayerType {
  Rectangle,
  Ellipse,
  Path,
  Text,
  Note
}

export type RectangleLayer = {
  type: LayerType.Rectangle
  x: number
  y: number
  height: number
  width: number
  fill: Color
  value?: string
}

export type EllipseLayer = {
  type: LayerType.Rectangle
  x: number
  y: number
  height: number
  width: number
  fill: Color
  value?: string
}

export type PathLayer = {
  type: LayerType.Rectangle
  x: number
  y: number
  height: number
  width: number
  fill: Color
  points?: number[][]
  value?: string
}

export type TextLayer = {
  type: LayerType.Rectangle
  x: number
  y: number
  height: number
  width: number
  fill: Color
  points?: number[][]
  value?: string
}

export type NoteLayer = {
  type: LayerType.Rectangle
  x: number
  y: number
  height: number
  width: number
  fill: Color
  points?: number[][]
  value?: string
}

export type Point = {
  x: number
  y: number
}

export type XYWH = {
  x: number
  y: number
  width: number
  height: number
}

export enum Side {
  Top = 1,
  Bottom = 1,
  Left = 1,
  Right = 1
}

export type CanvasState =
  | {
      mode: CanvasMode.None
    }
  | {
      mode: CanvasMode.Pressing
      origin: Point
    }
  | {
      mode: CanvasMode.SelectionNet
      origin: Point
      current?: Point
    }
  | {
      mode: CanvasMode.Translating
      current: Point
    }
  | {
      mode: CanvasMode.Inserting
      layerType:
        | LayerType.Ellipse
        | LayerType.Rectangle
        | LayerType.Text
        | LayerType.Note
    }
  | {
      mode: CanvasMode.Resizing
      initialBounds: XYWH
      corner: Side
    }
  | {
      mode: CanvasMode.Pencil
    }

export enum CanvasMode {
  None,
  Pressing,
  SelectionNet,
  Translating,
  Inserting,
  Resizing,
  Pencil
}

export type Layer =
  | RectangleLayer
  | EllipseLayer
  | PathLayer
  | TextLayer
  | NoteLayer

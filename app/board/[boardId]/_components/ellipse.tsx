import React from 'react'
import { colorToCss } from '~/lib/utils'
import { EllipseLayer } from '~/types/canvas'

interface EllipseProps {
  id: string
  layer: EllipseLayer
  onPointerDown: (e: React.PointerEvent, id: string) => void
  selectionColor?: string
}

const Ellipse = ({
  id,
  layer,
  onPointerDown,
  selectionColor
}: EllipseProps) => {
  return (
    <ellipse
      className="drop-shadow-md"
      style={{ transform: `translate(${layer.x}px, ${layer.y}px)` }}
      cx={layer.width / 2}
      cy={layer.height / 2}
      rx={layer.width / 2}
      ry={layer.height / 2}
      fill={layer.fill ? colorToCss(layer.fill) : '#000'}
      stroke={selectionColor || 'transparent'}
      onPointerDown={(e) => onPointerDown(e, id)}
    />
  )
}

export default Ellipse

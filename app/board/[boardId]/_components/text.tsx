import { Kalam } from 'next/font/google'
import React from 'react'
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable'
import { cn, colorToCss } from '~/lib/utils'
import { useMutation } from '~/liveblocks.config'
import { TextLayer } from '~/types/canvas'

const font = Kalam({
  subsets: ['latin'],
  weight: ['400']
})

interface TextProps {
  id: string
  layer: TextLayer
  onPointerDown: (e: React.PointerEvent, id: string) => void
  selectionColor?: string
}

const calculateFontSize = (width: number, height: number) => {
  const maxFontSize = 96
  const scaleFactor = 0.5
  const fontSizeBasedOnHeight = height * scaleFactor
  const fontSizeBasedOnWidth = width * scaleFactor

  return Math.min(maxFontSize, fontSizeBasedOnWidth, fontSizeBasedOnHeight)
}

const Text = ({ id, layer, onPointerDown, selectionColor }: TextProps) => {
  const { x, y, width, height, fill, value } = layer

  const updateValue = useMutation(({ storage }, newValue: string) => {
    const liveLayers = storage.get('layers')
    liveLayers.get(id)?.set('value', newValue)
  }, [])

  const handleContentChange = (e: ContentEditableEvent) => {
    updateValue(e.target.value)
  }

  return (
    <foreignObject
      x={x}
      y={y}
      width={width}
      height={height}
      onPointerDown={(e) => onPointerDown(e, id)}
      style={{
        outline: selectionColor ? `1px solid ${selectionColor}` : 'none'
      }}
    >
      <ContentEditable
        html={value || 'text'}
        style={{
          color: fill ? colorToCss(fill) : '#000',
          fontSize: calculateFontSize(width, height)
        }}
        className={cn(
          'flex-center size-full text-center outline-none drop-shadow-md',
          font.className
        )}
        onChange={handleContentChange}
      />
    </foreignObject>
  )
}

export default Text

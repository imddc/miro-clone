import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { Camera } from '~/types/canvas'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const COLORS = ['#DC2626', '#D97706', '#059669', '#7C3AED', '#DB2777']

export function connectionId2Color(connectionId: number): string {
  return COLORS[connectionId % COLORS.length]
}

export function pointerEvent2CanvasPoint(
  e: React.PointerEvent,
  camera: Camera
) {
  return {
    x: Math.round(e.clientX) - camera.x,
    y: Math.round(e.clientY) - camera.y
  }
}

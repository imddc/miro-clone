import { Star, StarOff, Stars } from 'lucide-react'
import React from 'react'
import { cn } from '~/lib/utils'

interface BoardCardFooterProps {
  isFavorite: boolean
  title: string
  authorLabel: string
  createdAtLabel: string
  onClick: any
  disabled: boolean
}

const BoardCardFooter = ({
  isFavorite,
  title,
  authorLabel,
  createdAtLabel,
  disabled,
  onClick
}: BoardCardFooterProps) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation()
    e.preventDefault()

    onClick()
  }

  return (
    <div className="relative bg-white p-3">
      <p className="max-w-[calc(100%-20px)] truncate text-[13px]">{title}</p>
      <p className="text-[11px] text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
        {authorLabel}, {createdAtLabel}
      </p>

      <button
        disabled={disabled}
        className={cn(
          'absolute right-3 top-3 text-muted-foreground opacity-0 transition hover:text-blue-600 group-hover:opacity-100',
          disabled && 'cursor-not-allowed opacity-75'
        )}
        onClick={handleClick}
      >
        <Star
          className={cn(
            'h-4 w-4',
            isFavorite ? 'fill-blue-600' : 'text-blue-600'
          )}
        />
      </button>
    </div>
  )
}

export default BoardCardFooter

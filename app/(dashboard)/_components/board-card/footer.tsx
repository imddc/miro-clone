import React from 'react'

interface BoardCardFooterProps {
  isFavourite: boolean
  title: string
  authorLabel: string
  createdAtLabel: string
  onClick: any
}

const BoardCardFooter = ({
  title,
  authorLabel,
  createdAtLabel
}: BoardCardFooterProps) => {
  return (
    <div className="relative bg-white p-3">
      <p className="max-w-[calc(100%-20px)] truncate text-[13px]">{title}</p>
      <p className="text-[11px] text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
        {authorLabel}, {createdAtLabel}
      </p>
    </div>
  )
}

export default BoardCardFooter

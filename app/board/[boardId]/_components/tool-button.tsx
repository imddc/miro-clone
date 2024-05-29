import { LucideIcon } from 'lucide-react'
import React from 'react'
import Hint from '~/components/hint'
import { Button } from '~/components/ui/button'

interface ToolButtonProps {
  label: string
  Icon: LucideIcon
  isActive?: boolean
  isDisabled?: boolean
  onClick: () => void
}

const ToolButton = ({
  label,
  Icon,
  isActive,
  isDisabled,
  onClick
}: ToolButtonProps) => {
  return (
    <Hint label={label} side="right" sideOffset={14}>
      <Button
        disabled={isDisabled}
        size="icon"
        variant={isActive ? 'boardActive' : 'board'}
        onClick={onClick}
      >
        <Icon />
      </Button>
    </Hint>
  )
}

export default ToolButton

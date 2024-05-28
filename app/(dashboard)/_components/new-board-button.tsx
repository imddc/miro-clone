import { Plus } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'
import { api } from '~/convex/_generated/api'
import { useApiMutation } from '~/hooks/use-api-mutation'
import { cn } from '~/lib/utils'

interface NewBoardButtonProps {
  orgId: string
  disabled?: boolean
}

const NewBoardButton = ({ orgId, disabled }: NewBoardButtonProps) => {
  const { pending, mutate } = useApiMutation(api.board.create)

  const onClick = () => {
    mutate({
      orgId,
      title: 'Untitled'
    })
      .then(() => {
        toast.success(`created Board!`)
      })
      .catch((err) => {
        toast.error(err)
      })
  }

  return (
    <button
      disabled={pending || disabled}
      onClick={onClick}
      className={cn(
        'flex-col-center col-span-1 aspect-[100/127] rounded-md bg-blue-600 py-6 hover:bg-blue-800',
        disabled && 'opacity-75 hover:bg-blue-600'
      )}
    >
      <div />
      <Plus className="size-12 stroke-1 text-white" />
      <p className="text-sm font-light text-white">New board</p>
    </button>
  )
}

export default NewBoardButton

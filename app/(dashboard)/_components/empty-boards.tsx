import { useOrganization } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'
import { toast } from 'sonner'
import { Button } from '~/components/ui/button'
import { api } from '~/convex/_generated/api'
import { useApiMutation } from '~/hooks/use-api-mutation'

const EmptyBoards = () => {
  const { organization } = useOrganization()
  const { mutate, pending } = useApiMutation(api.board.create)

  const onClick = () => {
    if (!organization) return

    mutate({
      orgId: organization.id,
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
    <div className="flex-col-center h-full">
      <Image src="/note.svg" height={141} width={110} alt="Empty" />
      <h2 className="mt-6 text-2xl font-semibold">Crate your first board~</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Start by creating a board for your organization
      </p>
      <div className="mt-6">
        <Button disabled={pending} size="lg" onClick={onClick}>
          Create a favourite board
        </Button>
      </div>
    </div>
  )
}

export default EmptyBoards

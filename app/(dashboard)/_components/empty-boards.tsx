import Image from 'next/image'
import React from 'react'
import { Button } from '~/components/ui/button'

const EmptyBoards = () => {
  return (
    <div className="flex-col-center h-full">
      <Image src="/note.svg" height={141} width={110} alt="Empty" />
      <h2 className="mt-6 text-2xl font-semibold">Crate your first board~</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Start by creating a board for your organization
      </p>

      <div className="mt-6">
        <Button size="lg">Create a favourite board</Button>
      </div>
    </div>
  )
}

export default EmptyBoards

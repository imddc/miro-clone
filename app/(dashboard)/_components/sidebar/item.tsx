'use client'

import { useOrganization, useOrganizationList } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'
import { cn } from '~/lib/utils'

interface ItemProps {
  id: string
  name: string
  imageUrl: string
}

const Item = ({ id, name, imageUrl }: ItemProps) => {
  const { organization } = useOrganization()
  const { setActive } = useOrganizationList()

  const isActive = id === organization?.id

  const onClick = () => {
    if (!setActive) return
    setActive({ organization: id })
  }

  return (
    <div className="relative aspect-square">
      <Image
        src={imageUrl}
        fill
        sizes="36"
        alt={name}
        className={cn(
          'cursor-pointer rounded-md opacity-75 hover:opacity-100',
          isActive && 'opacity-100'
        )}
        priority
        onClick={onClick}
      />
    </div>
  )
}

export default Item

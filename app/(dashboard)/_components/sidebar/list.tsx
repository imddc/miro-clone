'use client'

import { useOrganizationList } from '@clerk/nextjs'
import React from 'react'
import Item from './item'

const List = () => {
  const { userMemberships } = useOrganizationList({
    userMemberships: {
      infinite: true
    }
  })
  if (!userMemberships) {
    return null
  }

  return (
    <ul className="space-y-4">
      {userMemberships.data?.map((m) => (
        <Item
          key={m.id}
          id={m.organization.id}
          name={m.organization.name}
          imageUrl={m.organization.imageUrl}
        />
      ))}
    </ul>
  )
}

export default List

'use client'

import { useOrganization } from '@clerk/nextjs'
import React from 'react'
import EmoptyOrg from './_components/empty-org'

const DashboardPage = () => {
  const { organization } = useOrganization()
  return (
    <div className="h-[calc(100%-80px)] flex-1 px-6">
      {!organization ? <EmoptyOrg /> : <p>Board list</p>}
    </div>
  )
}

export default DashboardPage

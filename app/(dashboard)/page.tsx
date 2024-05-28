'use client'

import { useOrganization } from '@clerk/nextjs'
import React from 'react'
import BoardList, { type BoardListSearchParams } from './_components/board-list'
import EmoptyOrg from './_components/empty-org'

interface DashboardPageProps {
  searchParams: BoardListSearchParams
}

const DashboardPage = ({ searchParams }: DashboardPageProps) => {
  const { organization } = useOrganization()

  return (
    <div className="h-[calc(100%-80px)] flex-1 px-6">
      {JSON.stringify(searchParams)}
      {!organization ? (
        <EmoptyOrg />
      ) : (
        <BoardList orgId={organization.id} query={searchParams} />
      )}
    </div>
  )
}

export default DashboardPage

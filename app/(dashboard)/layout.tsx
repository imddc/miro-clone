import React, { PropsWithChildren } from 'react'
import Navbar from './_components/navbar'
import OrgSidebar from './_components/org-sidebar'
import DashboardSidebar from './_components/sidebar'

interface DashboardLayoutProps extends PropsWithChildren {}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <main className="h-full">
      <DashboardSidebar />
      <div className="h-full pl-[60px]">
        <div className="flex h-full gap-x-3">
          <OrgSidebar />
          <div className="h-full flex-1">
            <Navbar />
            {children}
          </div>
        </div>
      </div>
    </main>
  )
}

export default DashboardLayout

'use client'

import { OrganizationSwitcher } from '@clerk/nextjs'
import { LayoutDashboard } from 'lucide-react'
import { Poppins } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React from 'react'
import { Button } from '~/components/ui/button'
import { cn } from '~/lib/utils'

const font = Poppins({
  subsets: ['latin'],
  weight: ['600']
})

const OrgSidebar = () => {
  const searchParams = useSearchParams()
  const favorites = searchParams.get('favorites')

  return (
    <div className="hidden w-[206px] flex-col space-y-6 pl-5 pt-5 lg:flex">
      <Link href="/">
        <div className="flex items-center gap-x-2">
          <Image src="/logo.svg" alt="logo" height={60} width={60} />
          <span className={cn('text-2xl font-semibold', font.className)}>
            Board
          </span>
        </div>
      </Link>
      <OrganizationSwitcher
        hidePersonal
        appearance={{
          elements: {
            rootBox: {
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%'
            },
            organizationSwitcherTrigger: {
              padding: '6px',
              width: '100%',
              borderRadius: '8px',
              border: '1px solid #E5E7EB',
              backgroundColor: 'white'
            }
          }
        }}
      />
      <div className="w-full space-y-1">
        <Button
          variant={favorites ? 'ghost' : 'secondary'}
          asChild
          size="lg"
          className="w-full justify-start px-2 font-normal"
        >
          <Link href="/">
            <LayoutDashboard className="mr-2 size-4" />
            Team Boards
          </Link>
        </Button>

        <Button
          variant={!favorites ? 'ghost' : 'secondary'}
          asChild
          size="lg"
          className="w-full justify-start px-2 font-normal"
        >
          <Link
            href={{
              pathname: '/',
              query: { favorites: true }
            }}
          >
            <LayoutDashboard className="mr-2 size-4" />
            Favorites Boards
          </Link>
        </Button>
      </div>
    </div>
  )
}

export default OrgSidebar
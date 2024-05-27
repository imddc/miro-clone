import Image from 'next/image'
import React from 'react'

const Loading = () => {
  return (
    <div className="flex-col-center size-full">
      <Image
        src="/logo.svg"
        alt="logo"
        width={120}
        height={120}
        className="animate-pulse duration-700"
        priority
      />
    </div>
  )
}

export default Loading


import React, { Suspense } from 'react'
import ShowAlldesigns from '@/components/ShowAlldesigns/ShowAlldesigns'
import { userUrl } from '@/url'
import Navbar from '@/components/Navbar/Navbar'
import ShowDesign from '@/components/ShowAlldesigns/ShowDesign'
import { PiSpinnerGapThin } from 'react-icons/pi'

async function page({ repo }) {
  return (
    <div>
      <Navbar />
      <div className='flex'>
        <ShowAlldesigns />
        <div className='flex w-full'>
          <Suspense fallback={<div className='bg-slate-50  h-screen w-full flex translate-y-1/4 justify-center ' >
            <PiSpinnerGapThin className='w-32 h-32  animate-spin' />
          </div>}>
            <ShowDesign />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

export default page

import React, { Suspense } from 'react'
import ShowAlldesigns from '@/components/ShowAlldesigns/ShowAlldesigns'
import Navbar from '@/components/Navbar/Navbar'
import {PiSpinnerGapThin} from 'react-icons/pi'


import ShowcategoryDesign from '@/components/ShowDesignCategory/ShowcategoryDesign'


async function page({params:{category}}) {

  return (
    <div>
      <Navbar/>
      <div className='flex'>
      <ShowAlldesigns />
      <div className='flex w-full'>
      <Suspense fallback={  <div className='bg-slate-50  h-screen w-full flex translate-y-1/3 justify-center ' >
      <PiSpinnerGapThin className='w-32 h-32 animate-spin'/>
</div>}>
     <ShowcategoryDesign category={category}/>
     </Suspense>
      </div>
      </div>
    </div>
  )
}

export default page

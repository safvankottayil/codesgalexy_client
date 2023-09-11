import Navbar from '@/components/Navbar/Navbar'
import Profile from '@/components/Profile/Profile'

import ShowDesignsaved from '@/components/ShowDesignPosts/ShowDesignsaved'
import React from 'react'

function page() {
  return (
    <div className='h-screen'>
    <Navbar/>
    <div className="flex">
          <div className="w-[250px]">
    <Profile/>
    </div>
   
    <ShowDesignsaved/>
   
   
  </div>
    </div>
  )
}

export default page

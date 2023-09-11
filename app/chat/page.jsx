import React from 'react'
import Navbar from '@/components/Navbar/Navbar'
import Chathome from '@/components/Chat/Chathome'
function page() {
  return (
    <div>
      <div className='fixed z-50'>
      <Navbar/>
      </div>
   
    <Chathome/>
    </div>
  )
}

export default page

import Navbar from '@/components/Navbar/Navbar'
import CreatePagesidebar from '@/components/create/CreatePagesidebar'
import CreatePage from '@/components/create/CreatePage'
import React from 'react'

function page({params:{id,slag}}) {
  return (
    <div>
      <Navbar/>
      <div className='flex'>
        <CreatePagesidebar id={id} />
        <CreatePage Tutorial_id={id} pagename={slag}/>
      </div>
   
      </div>
   
  )
}

export default page

import CreatePage from '@/components/create/CreatePage'
import EditpageSidebar from '@/components/create/EditpageSidebar'
import React from 'react'

function page({params:{id,slag}}) {
  return (
    <div>
      <Navbar/>
      <div className='flex'>
        <EditpageSidebar id={id} />
        <CreatePage Tutorial_id={id} pagename={slag}/>
      </div>
  
      </div>
   
  )
  
}

export default page

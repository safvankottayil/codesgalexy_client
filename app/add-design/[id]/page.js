import Navbar from '@/components/Navbar/Navbar'
import SavedDesign from '@/components/add-design/SavedDeisgn'
import React from 'react'

function page({params:{id}}) {
  return (
    <div>
    <Navbar/>
    <SavedDesign id={id} />
  </div>
  )
}

export default page

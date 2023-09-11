import ShowTutorial from '@/components/Learn/ShowTutorial';
import TutorialSidebar from '@/components/Learn/TutorialSidebar'
import Navbar from '@/components/Navbar/Navbar'
import React from 'react'

function page({params:{id,slag}}) {
 
  return (
    <div>
    <Navbar />
      <div className="grid grid-cols-12">
      <TutorialSidebar id={id}  />
      <ShowTutorial id={id} name={slag} />
    </div>
    </div>
  )
}

export default page

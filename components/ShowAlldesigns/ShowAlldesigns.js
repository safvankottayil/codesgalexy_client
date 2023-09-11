import Link from 'next/link'
import React from 'react'
import './ShowAlldesigns.css'
import ShowBtn from './ShowBtn'
import ShowsidebarList from './ShowsidebarList'
import ShowFollowingBtn from './ShowFollowingBtn'
function ShowAlldesigns() {
  return (
    <div>
    <div className='w-12'>
    <ShowBtn/>
    </div>
      
    <div  className='sidebar' >
    <ul className=' sidebar flex flex-col h-screen fixed bg-emerald-100 '>
      <ShowFollowingBtn />
      <ShowsidebarList/>
      </ul>
    </div>
    </div>
  )
}

export default ShowAlldesigns

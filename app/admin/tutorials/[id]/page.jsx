import AdminNavbar from '@/components/Admin/Sidebar/AdminNavbar'
import Sidebar from '@/components/Admin/Sidebar/Sidebar'
import Showpages from '@/components/Admin/Tutorial/Showpages'
import Showtotorials from '@/components/Admin/Tutorial/Showtotorials'
import React from 'react'

function page({params:{id}}) {
  return (
    <>
    <AdminNavbar/>
    <div className='flex'>
    <Sidebar/>
      <Showpages id={id}/>
    </div>
    
    </>
  )
}

export default page

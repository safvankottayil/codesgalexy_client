import AdminNavbar from '@/components/Admin/Sidebar/AdminNavbar'
import Sidebar from '@/components/Admin/Sidebar/Sidebar'
import Showtotorials from '@/components/Admin/Tutorial/Showtotorials'
import React from 'react'

function page() {
  return (
    <>
    <AdminNavbar/>
    <div className='flex'>
    <Sidebar/>
      <Showtotorials/>
    </div>
    
    </>
  )
}

export default page

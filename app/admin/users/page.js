import AdminNavbar from '@/components/Admin/Sidebar/AdminNavbar'
import Sidebar from '@/components/Admin/Sidebar/Sidebar'
import Userpage from '@/components/Admin/Userlist/Userpage'
import React from 'react'

function Page() {
  return (
    <>
    <AdminNavbar/>
    <div className='flex'>
    <Sidebar/>
    <Userpage/>
    </div>
    
    </>
  )
}

export default Page

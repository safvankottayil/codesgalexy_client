import AdminNavbar from '@/components/Admin/Sidebar/AdminNavbar'
import Sidebar from '@/components/Admin/Sidebar/Sidebar'
import Dashboard from '@/components/Dashboard/Dashboard'
import React from 'react'

function page() {
  return (
   <>
   <AdminNavbar/>
   <div className='flex'>
   <Sidebar/>
   <Dashboard/>
   </div>
 
   </>
  )
}

export default page

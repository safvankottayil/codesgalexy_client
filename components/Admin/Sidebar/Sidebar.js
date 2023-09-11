'use client'
import React from 'react'
import {AiFillDashboard} from 'react-icons/ai'
import {FaUsers} from 'react-icons/fa'
import {FiLogOut} from 'react-icons/fi'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
function Sidebar() {
    const router=useRouter()
function logout(){
Cookies.remove('Admintoken')
   router.push('/admin/login')
}
  return (


    <div className=' sm:w-64' >
      


<aside id="default-sidebar" class="fixed top-0 left-0 z-40 w-14 h-screen border-r-[0.3px] border-slate-500  transition-transform sm:w-64 " aria-label="Sidebar">
   <div class="h-full px-3 py-4 overflow-y-auto bg-gray-800 ">
      <ul class="space-y-2 pt-14 font-medium">
         <li>
            <Link href="/admin" class="flex items-center py-2 sm:p-2 text-white rounded-lg hover:bg-gray-700  group">
                <AiFillDashboard className='h-7 w-7'/>
               <span class="ml-3 hidden sm:block ">Dashboard</span>
            </Link>
         </li>
         {/* <li>
            <a href="#" class="flex items-center p-2 text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
              
               <span class="flex-1 ml-3 whitespace-nowrap hidden sm:block ">Kanban</span>
               <span class="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">Pro</span>
            </a>
         </li> */}
         {/* <li>
            <a href="#" class="flex items-center p-2 text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
             
               <span class="flex-1 ml-3 whitespace-nowrap hidden sm:block">Inbox</span>
               <span class="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">3</span>
            </a>
         </li> */}
         <li>
            <Link href="/admin/users" class="flex items-center py-2 sm:p-2 text-white hover:bg-gray-700  group">
               <FaUsers className='w-7 h-7'/>
               <span class="flex-1 ml-3 whitespace-nowrap hidden sm:block">Users</span>
            </Link>
         </li>
         <li>
            <Link href="/admin/tutorials" class="flex items-center py-2 sm:p-2 text-white hover:bg-gray-700  group">
               <FaUsers className='w-7 h-7'/>
               <span class="flex-1 ml-3 whitespace-nowrap hidden sm:block">Tutorial</span>
            </Link>
         </li>
         {/* <li>
            <a href="#" class="flex items-center p-2 text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
              
               <span class="flex-1 ml-3 whitespace-nowrap hidden sm:block">Products</span>
            </a>
         </li> */}
         <li>
            <span onClick={logout} class="flex items-center py-2 sm:p-2 text-white hover:bg-gray-700 group">
               <FiLogOut className='h-7 w-7'/>
               <span class="flex-1 ml-3 whitespace-nowrap hidden sm:block">Logout</span>
            </span>
         </li>
     
      </ul>
   </div>
</aside>



    </div>
  )
}

export default Sidebar

'use client'
import './ShowAlldesigns.css'
import React, { useState } from 'react'
import Link from 'next/link'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import ShowsidebarList from './ShowsidebarList'

const list=['adad','dadada','adaada','dsdsdsdsd','dsdsdsds']
function ShowBtn() {
    const [show,SetShow]=useState(false)
  return (
    <>
    <ul className='menubtn h-screen fixed w-12'>
    <div onClick={()=>SetShow(!show)} className='w-10 h-10'><Bars3Icon/></div>
    </ul>
    {show? 

<ul className='w-60 flex flex-col h-screen fixed bg-slate-400 '>
    <li onClick={()=>SetShow(!show)} className=' h-10 flex w-full justify-end ' ><XMarkIcon className='w-10' /></li>
   <ShowsidebarList/>
</ul>
  :''}
    </>
  )
}

export default ShowBtn

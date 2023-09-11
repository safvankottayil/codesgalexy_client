'use client'
import '../../app/globals.css'
import React from 'react'

function Navbar() {
    console.log(8);
  return (
    <div>
       <nav className='w-full bg-slate-900'>
    <img ></img>
    <ul>
     <li className=''>Home</li>
     <li>Learn</li>
     <li>Create</li>
     <li>Design</li>
     {/* <li></li> */}
     </ul>
   </nav>
    </div>
  )
}

export default Navbar

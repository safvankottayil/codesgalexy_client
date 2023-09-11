'use client'
import { useRouter } from 'next/navigation'
import React, { useRef } from 'react'
import { BsSearch } from 'react-icons/bs'

function DesignSearch() {
    const router=useRouter()
    const search=useRef(null)
    function Search(){
       const char=search.current.value
       router.push('/designs/search='+char)
    }
  return (
    <div className='flex flex-grow items-center px-5  mb-2'>
      <input placeholder='Search' ref={search} className='pl-3 border-b-[1px] border-s-[1px] border-t-[1px] border-gray-400 h-10  w-full md:w-4/6 focus:outline-none rounded-s-md' type="text" />
      <button onClick={()=>Search()} className='h-10 border-t-[1px] border-slate-400 border-e-[1px] border-b-[1px] rounded-e-md '>
        <BsSearch className='w-8 h-8 p-1 pl-1 hover:bg-slate-300 mr-2 rounded-lg'/>
      </button>
    </div>
  )
}

export default DesignSearch

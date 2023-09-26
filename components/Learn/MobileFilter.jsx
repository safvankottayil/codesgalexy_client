'use client'
import React, { useEffect, useState } from 'react'
import { BsFilter } from 'react-icons/bs'

   import UserAxios from '@/Axios/client'
import Link from 'next/link'

 function MobileFilter() {
    const [category,setCategory]=useState([])
 useEffect(()=>{
  UserAxios.get('/tutorialcategory').then(res=>{
    if(res.data.status){
        setCategory(res.data.category)
    }
  })
 },[])
   
    const [show,setshow]=useState(false)
  return (
    <div className='md:hidden relative  '>
      <BsFilter onClick={()=>setshow(!show)} className='h-10 w-10 ml-5 mt-2 border-[1px] border-slate-400 rounded-lg '/>
    
      <div className={`flex flex-col  mx-3 absolute w-60 ${show?'h-fit':"h-0"} shadow-lg shadow-black rounded-b-lg rounded-t-md overflow-hidden duration-200 bg-white `}  >
      {category.map((data)=>{
          return <Link href={`/learn/${data.category}`}>
            <li className="h-9  pl-2 flex items-center m-[1px] rounded-md hover:bg-emerald-100 font-bold uppercase">{data.category}</li>
          </Link>
        })}
      </div>
   
    </div>
  )
}

export default MobileFilter

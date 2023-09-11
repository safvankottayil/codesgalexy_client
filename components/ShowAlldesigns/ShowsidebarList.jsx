import React from 'react'
import './ShowAlldesigns.css'
import Link from 'next/link'
import {userUrl} from '@/url'

async function getCategory(){
  const res =await fetch(userUrl+'/category',{method:'GET',next:{revalidate:10}})
    return res.json()
}

async function  ShowsidebarList() {
  const Category=await getCategory()
  return (
  
 <>

 <Link className=' hover:text-white flex items-center h-10 font-bold ' href={'/designs/all'}>
  <p className='w-full rounded-md mx-1 h-9 uppercase  pl-4 flex items-center hover:bg-slate-800 '>
    <span>All</span></p>
 </Link>
    {Category.map((item)=>{
        return(
            <>
    <Link key={item._id} className=' hover:text-white flex items-center h-10 font-bold ' href={'/designs/'+item.category}>
  <p className='w-full rounded-md mx-1 h-9 uppercase bg-emerald-100 pl-4 flex items-center hover:bg-slate-800 '>
    <span>{item.category}</span></p>
 </Link> </>
        )
    })}
  </>
  )
}

export default ShowsidebarList

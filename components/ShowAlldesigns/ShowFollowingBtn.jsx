'use client'
import React, { useState } from 'react'
import UserAxios from '@/Axios/client'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
function ShowFollowingBtn() {
    const router=useRouter()
    const token=Cookies.get('token')
   async function GetData(){
      const res=await  UserAxios.get('/followingDesigns',{headers:{Authorization:token}})
      if(res.data.status){
       router.push('/designs/'+res.data.id)
      }else{
        if(res.data.type=='block'){
            Cookies.remove('token')
            router.push('/')
        }else if(res.data.type=='err'){
               router.push('/404')
        }else if(res.data.type=='user'){
              router.push('/')
        }
    }
    }
  return (
    <>
    {token?
    <li className=' hover:text-white flex items-center mt-2 h-10 font-bold ' href={'/designs/following'}>
    <p onClick={()=>GetData()} className='w-full rounded-md mx-1 h-9 uppercase  pl-4 flex items-center hover:bg-slate-800 '>
      <span>following</span></p>
   </li>
   :''}
   </>
  )
}

export default ShowFollowingBtn

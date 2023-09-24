'use client'
import React, { useEffect } from 'react'
import AdminAxios from '@/Axios/Admin'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
function AdminNavbar() {
  const router =useRouter()
  const adminToken=Cookies.get('AdminToken')
  useEffect(()=>{
    const adminToken=Cookies.get('AdminToken')
    if(adminToken){
      AdminAxios.get('/adminAuth',{headers:{Authorization:adminToken}}).then((res)=>{
        if(res.data.status==false){
          if(res.data.type=='admin'){
            router.push('/admin/login')
          }
        }
       })
    }else{
      router.push('/admin/login')
    }

  },[])
  return (
    <div className='fixed bg-gray-800 w-full h-16 border-b-[0.3px] flex items-center border-slate-500 z-50'>
      <span className='text-3xl text-white font-bold pl-5'>CODESGALEXY</span>
    </div>
  )
}

export default AdminNavbar

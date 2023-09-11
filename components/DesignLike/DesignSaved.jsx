'use client'
import React, { useEffect, useState } from 'react'
import {FaRegBookmark} from 'react-icons/fa'
import {FaBookmark} from 'react-icons/fa'
import Cookies from 'js-cookie'
import UserAxios from '@/Axios/client'
function DesignSaved({w,h,id}) {
    const [saved,SetSaved]=useState(false)
    const [saves,Setsaves]=useState(0)
    const [update,Setupdate]=useState(0)
    const token= Cookies.get('token')
    useEffect(()=>{
        if(token){
        UserAxios.get('/isSaved?design_id='+id,{headers:{Authorization:token}}).then((res)=>{
           if(res.data.status){
            SetSaved(res.data.isSaved)
            Setsaves(res.data.saves)
           }
        })
        }
    },[update])
   async function Save(save){
   const res=await UserAxios.patch('/add-Wishlist',{save,id},{headers:{Authorization:token}})
   if(res.data.status){
    Setupdate(update+1)
   }
    }
  return (
    <>
    {token?
    <div>
      {saved?
      <span className='flex flex-col justify-center'>
        <FaBookmark onClick={()=>Save(false)} className={`${w} ${h}`}/>
        <span className='text-xs text-center'>{saves}</span>
      </span>
      :
      <span className='flex flex-col justify-center'>
         <FaRegBookmark onClick={()=>Save(true)} className={`${w} ${h}`}/>
         <span className='text-xs text-center'>{saves}</span>
      </span>
}
    </div>:''
}
    </>
  )
}

export default DesignSaved

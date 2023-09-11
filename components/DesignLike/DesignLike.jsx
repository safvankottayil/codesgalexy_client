'use client'
import React, { useEffect, useState } from 'react'
import {FcLike} from 'react-icons/fc'
import {AiFillHeart} from 'react-icons/ai'
import UserAxios from '@/Axios/client'
import Cookies from 'js-cookie'
function DesignLike({w,h,id}) {
    const [Like,Setlike]=useState(false)
    const [Likes,Setlikes]=useState(0)
    const [update,Setupdate]=useState(0)
    const token= Cookies.get('token')
    useEffect(()=>{
        if(token){
        UserAxios.get('/isliked?design_id='+id,{headers:{Authorization:token}}).then((res)=>{
           if(res.data.status){
            Setlike(res.data.isliked)
            Setlikes(res.data.likes)
           } else {
            if (res.data.type == "block") {
              Cookies.remove("token");
              router.push("/?login="+true);
            } else if (res.data.type == "err") {
              router.push("/404");
            } else if (res.data.type == "user") {
              router.push("/?login="+true);
            }
          }
        })
        }
    },[update])
   async function like(like){
   const res=await UserAxios.patch('/designlike',{like,id},{headers:{Authorization:token}})
   if(res.data.status){
    Setupdate(update+1)
   } else {
    if (res.data.type == "block") {
      Cookies.remove("token");
      router.push("/?login="+true);
    } else if (res.data.type == "err") {
      router.push("/404");
    } else if (res.data.type == "user") {
      router.push("/?login="+true);
    }
  }
    }
  return (
    <>{token?
    <div className>
      {Like?
      <span className='flex flex-col justify-center'>
      <FcLike onClick={()=>like(false)} className={`${w} ${h}`}  />
      <span className='text-xs text-center '>{Likes}</span>
      </span>
      :
      <span className='flex flex-col justify-center'>
          <AiFillHeart onClick={()=>like(true)} color='grey' className={`${w} mt-1   ${h}`} />
          <span className='text-xs text-center '>{Likes}</span>
          </span> 
          }

    
      
    </div>
    :""
}
    </>
  )
}

export default DesignLike

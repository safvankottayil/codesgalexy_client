'use client'
import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import UserAxios from '@/Axios/client'
import { useRouter } from 'next/navigation'
function UserFollow({ id }) {
  let token = Cookies.get('token')
  const [count, SetCount] = useState(0)
  const router=useRouter()
  useEffect(() => {
    UserAxios.get('/isfollow?id=' + id, { headers: { Authorization: token } }).then((res) => {
      console.log(res.data);
      if (res.data.status) {
        Setfollow(false)
      } else {
        if(res.data.isUser){
         token=null
         router.push('/profile/posts')
        }else{
          Setfollow(true)
        }
        
      }
    })
  }, [count])

  const [isFollow, Setfollow] = useState(false)
  async function UserFollow(value) {
    const res = await UserAxios.patch('/userfollow', { value, id }, { headers: { Authorization: token } })
    if (res.data.status) {
      SetCount(count + 1)
    } else {
      SetCount(count + 1)
    }
  }
  return (
    <>
      {token ?
        <>{isFollow
          ?
          <button onClick={() => UserFollow(true)} className='bg-blue-400 capitalize text-sm font-semibold text-white px-1 mt-1  ml-2 rounded-md'>follow</button>
          :
          <button onClick={() => UserFollow(false)} className='bg-blue-400 text-sm font-semibold text-white px-1 h-6 mt-1 ml-2 rounded-md capitalize '>unfollow</button>
        }</>
        : ''
      }
    </>
  )
}

export default UserFollow

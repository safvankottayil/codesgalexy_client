'use client'
import React from 'react'
import UserAxios from '@/Axios/client'
import Cookies from 'js-cookie'
import toast from '@/components/Toast/index'
import { useRouter } from 'next/navigation'
function DesignRemove({ id }) {
    const router=useRouter()
    const token = Cookies.get('token')
    async function Remove() {
      const res = await UserAxios.delete('/deleteDesign?id='+id, { headers: { Authorization: token } })
        if(res.data.status){
      toast({type:'success',message:'Succesfuly deleted'})
      router.back()
        }
    }
    return (
        <button onClick={() => Remove()} className='p-2 rounded-md bg-red-600 text-white'>Delete</button>
    )
}

export default DesignRemove

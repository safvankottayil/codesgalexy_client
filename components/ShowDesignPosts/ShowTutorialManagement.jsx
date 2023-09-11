import Link from 'next/link'
import React, { useState } from 'react'
import UserAxios from '@/Axios/client'
import { CiMenuKebab } from 'react-icons/ci'
import { useRouter } from 'next/navigation'
import toast from '@/components/Toast/index'
function ShowTutorialManagement({id,count,update}) {
  const router=useRouter()
    const [state, setstate] = useState(false)
    function Delete(){
     UserAxios.delete('/tutorial?id='+id).then(res=>{
      if(res.data.status){
        toast({type:'success',message:'Successfully finished'})
       update(count+1)
      }else{
        router.push('/404')
      }
     })
    }
  return (
    <>
       <CiMenuKebab onClick={()=>setstate(!state)} className='w-9 h-9 p-1  bg-white rounded-full absolute right-1 bg-opacity-20 top-1'/>
       {state?
        <div className='w-20 absolute bg-gray-200 p-1 top-10 rounded-md right-1  fit'>
         <Link href={`/create/${id}/home`}> <p className='hover:bg-white rounded-md px-1'>Edit</p> </Link>
        <p onClick={Delete} className='hover:bg-white rounded-md px-1' >Delete</p>
        <Link href={`/learn/tutorial/${id}/home`}> <p className='hover:bg-white rounded-md px-1'>Show</p> </Link>
      </div>:''}
       
    </>
  )
}

export default ShowTutorialManagement

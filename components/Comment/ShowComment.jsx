
import React, { useEffect, useState } from 'react'
import Comments from './Comments'
import userAxios from '@/Axios/client'
// import { useSearchParams } from 'next/navigation'
function ShowComment({Design_id,counts}) {
    const [count,SetCount]=useState(0)
    const [Comment,SetComments]=useState([])
  useEffect(()=>{
    if(Design_id){
  userAxios.get('/designComments?design_id='+Design_id,).then((res)=>{
    if(res.data.status){
    SetComments(res.data.Comments)
    }
  })
}
 },[count,counts])
     return (
        <>
        <span className='capitalize font-bold pl-14'>Comments</span>
        <div className='grid grid-cols-12  bg-white mb-8 mx-7 h-10 border-t-[1px] border-grey-700'>
            {Comment? Comment.map((item)=>{
                return(
           <Comments count={count} Update={SetCount} item={item} design_id={Design_id}/>
      )
    }):''}
        </div>
        </>
    )
}

export default ShowComment

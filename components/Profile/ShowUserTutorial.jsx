'use client'
import React, { useEffect, useState } from 'react'
import UserAxios from '@/Axios/client'
import { useRouter } from 'next/navigation'
import ShowTutorialManagement from '../ShowDesignPosts/ShowTutorialManagement'
import { MdStar } from 'react-icons/md'
function ShowUserTutorial({id}) {
    const router=useRouter()
    const [Tutorials,SetTutorials]=useState([])
 useEffect(()=>{
UserAxios.get('/usertutorials?id='+id).then(res=>{
    if(res.data.status){
      SetTutorials(res.data.Tutorials)
    }else{
        router.push('/404')
    }
})
 },[])
  return (
    <div className="grid ml-2 mr-5 md:mx-10 lg:mx-40 md:grid-cols-2 lg:grid-cols-3 pl-3 gap-5 mt-3">
      {Tutorials.map((tuto) => {
        return (
          <div className="relative shadow-md shadow-slate-700 rounded-xl">
            <img className="w-full h-60 rounded-t-md" src={tuto.image} alt="" />
            <div className="flex h-24 pr-1 py-1">
                    <div className="px-1">
                      {tuto.UserId.image?
                      <div  className="w-14 h-14 mt-1 rounded-full "  >
                        <img src={tuto.UserId.image} className="w-full h-14 rounded-full" alt="" />
                      </div>:
                      <div className="bg-black w-14 mt-1  h-14 rounded-full"></div>}
                    </div>
                    <div>
                      <div className="flex items-center justify-between">
                        <p className="font-bold truncate capitalize pt-1">
                          {tuto.title}
                        </p>
                        <p className="flex">
                        <MdStar className="text-orange-300 w-5 h-5" />
                        <MdStar className="text-orange-300 w-5 h-5" />
                        <MdStar className="text-orange-300 w-5 h-5" />
                        <MdStar className="text-orange-300 w-5 h-5" />
                        <MdStar className="text-orange-300 w-5 h-5" />
                        </p>{" "}
                      </div>
                      <p
                        style={{
                          textOverflow: "ellipsis",
                          whiteSpace: "normal",
                        }}
                        className="overflow-y-hidden capitalize text-sm  h-[60px] font-sans"
                      >
                        {tuto.description}
                      </p>
                    </div>
                  </div>
          </div>
        );
      })}
    </div>
  )
}

export default ShowUserTutorial

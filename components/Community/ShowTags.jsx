import React from 'react'
import {userUrl} from'@/url'
import './style.css'
async function GetTag(){
    const res =await fetch(`${userUrl}/tag`,{next:{revalidate:10}})
     return res.json()
   }
async function ShowTags() {
    const {tag}=await GetTag()
    const tagrow= Math.floor(tag.length/3)
   const len=[]
     for(let i=0;i<tagrow;i++){
      len[i]=''
     }
  
  return (
    <div className=" space-y-3  mt-5 pl-4 flex flex-col  ">
    <h1 className="capitalize text-xl font-semibold">tags</h1>
    {len.map((v,i)=>{
       return(<>
       <div className="flex space-x-3">
       <p className="bg-emerald-300 rounded-sm w-fit px-2 py-1">{tag[(i*3)].Tage}</p>
       <p className="bg-emerald-300 rounded-sm w-fit px-2 py-1">{tag[(i*3)+1].Tage}</p>
       <p className="bg-emerald-300 rounded-sm w-fit px-2 py-1">{tag[(i*3)+2].Tage}</p>
       </div>
       </>)
    })}

  </div>
  )
}

export default ShowTags

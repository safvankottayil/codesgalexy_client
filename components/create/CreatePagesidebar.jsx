"use client";
import React, { useRef, useState } from "react";
import UserAxios from "@/Axios/client";
import { useEffect } from "react";
import {BsSendFill} from 'react-icons/bs'
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
function CreatePagesidebar({ id }) {
  const router=useRouter()
 
  const token=Cookies.get('token')
  const [pages, SetPages] = useState([]);
  const searchRef=useRef(null)
  const searchErr=useRef(null)
  useEffect(() => {
    UserAxios.get("/pages/" + id).then((res) => {
      if (res.data.status) {
        SetPages(res.data.pages);
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
    });
  }, []);
  function AddPage(){
    const search=searchRef.current.value
    if(search==''){
      searchErr.current.textContent='this feild required'
    }else if(search.length<4){
      searchErr.current.textContent='minimun 4 charecter'
    }else{
      searchErr.current.textContent=''
      UserAxios.post('/add-page',{search,id},{headers:{Authorization:token}}).then((res)=>{
       if(!res.data.status){
        if(res.data.type=='success'){
          searchErr.current.textContent=res.data.msg
        }
       }else{
        router.push(`/create/${id}/${search}`)
       }
      })
    }
  }
  return (
    <div className="w-64">
      <div className="h-screen fixed flex flex-col pb-20 justify-between bg-emerald-200 ">
        <ul className="w-64 flex flex-col  ">
          {pages.map((page) => {
            return (
              <Link className="" href={`/create/${id}/${page.name}`}>
                <li className="capitalize pl-4 hover:bg-emerald-100 h-9  flex items-center font-bold">
                  {page.name}
                </li>
              </Link>
            );
          })}
            <li className="flex flex-col w-full">
            {/* <label htmlFor="" className='text-black'>Add page</label> */}
            <div className="flex flex-col rounded-md m-1 relative">
              <input ref={searchRef} placeholder="Add page" className="h-9 text-sm pl-2 rounded-md focus:outline-none bg-white flex" type="text" />
              <BsSendFill onClick={AddPage} className="absolute z-10 right-2 bg-white h-7 hover:bg-slate-400 p-1 top-1 hover:rounded-lg w-7" />
              <div className="w-5 h-5 bg-white absolute right-0 top-2"></div>
              <i ref={searchErr} className="text-red-600 font-medium text-xs pl-1"></i >
            </div>
          </li>
        </ul>
      
      </div>
    </div>
  );
}

export default CreatePagesidebar;

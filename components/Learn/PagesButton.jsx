"use client";
import React, { useEffect, useState } from "react";
import { BsReverseLayoutSidebarInsetReverse } from "react-icons/bs";
import UserAxios from '@/Axios/client'
import Link from "next/link";
function PagesButton({id}) {
  const [show, setshow] = useState(false);
  const [pages, setpages] = useState([]);
  useEffect(() => {
    UserAxios.get('/pages/' + id).then((res)=>{
        if(res.data.status){
            setpages(res.data.pages)
        }
    })
  }, []);
  return (
    <div className="md:hidden relativ ">
      <BsReverseLayoutSidebarInsetReverse
        onClick={() => setshow(!show)}
        className="fixed w-5 h-5 pl-1 pt-1 "
      />
      <ul
        className={`${
          show ? "w-64" : "w-0"
        } duration-300 overflow-hidden flex flex-col h-screen  z-10 fixed bg-emerald-200`}
      >
        <BsReverseLayoutSidebarInsetReverse
          onClick={() => setshow(!show)}
          className={`${show?'':'hidden'}fixed w-5 h-5 pl-1 ml-2 pt-1 m `}
        />
        {pages.map((page,i) => {
          return (
            <Link onClick={()=>setshow(!show)} className={`${i==0?'pt-5':''}`} href={`/learn/tutorial/${id}/${page.name}`}>
              <li className="capitalize pl-4 hover:bg-emerald-100 bg-emerald-200 h-9  flex items-center font-bold">
                {page.name}
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
}

export default PagesButton;

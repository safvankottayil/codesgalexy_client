'use client'
import React, { useRef } from "react";
import { BsSearch } from "react-icons/bs";
import UserAxios from "@/Axios/client";
import { useRouter } from "next/navigation";

function DocumentSearch() {
 
  const router=useRouter()
  const searchRef = useRef(null);
  function Submit(){
    const search=searchRef.current.value
    router.push(`/learn/search=${search}`)
  }
  return (
    <div className="flex justify-center  flex-grow h-12 pl-3">
      <input
        ref={searchRef}
        placeholder="Search"
        type="text"
        className="flex border-s-[1px]  border-b-[1px] border-t-[1px] border-slate-400 flex-grow h-11 pl-2 bg-slate-100 focus:outline-none rounded-s-xl"
      />
      <button
        onClick={Submit}
        className="h-11 w-12 rounded-e-xl focus:outline-none flex justify-center items-center border-e-[1px]  border-b-[1px] bg-slate-100 border-t-[1px] border-slate-400"
      >
        <BsSearch className="w-9 text-slate-400 hover:bg-emerald-200   rounded-xl p-1 h-9" />
      </button>
    </div>
  );
}

export default DocumentSearch;

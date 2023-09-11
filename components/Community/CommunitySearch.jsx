"use client";
import React, { useRef, useState } from "react";
import UserAxios from "@/Axios/client";
import Link from "next/link";
function CommunitySearch() {
  const SearchRef = useRef(null);
  const [show,setshow]=useState(false)
  const [questions, Setquestions] = useState([]);
  function communtySearch() {
    const char = SearchRef.current.value;
    UserAxios.get("/community/search?char=" + char).then((res) => {
      if (res.data.status) {
        Setquestions(res.data.questions);
      }
    });
  }
  return (
    <form
      className="flex relative flex-col items-center pb-3 md:pb-0"
      action=""
    >
      <input
      onBlur={()=>setshow(false)}
      onFocus={()=>setshow(true)}
        onChange={communtySearch}
        ref={SearchRef}
        type="text"
        className="w-5/6 md:w-96 pl-3 h-10 rounded-md "
        placeholder="Srearch"
      />
      {show?
      <div className="w-full top-11 left-1 z-10 rounded-md md:w-[700px] max-h-96 overflow-hidden  absolute bg-emerald-200">
        {questions.map((value) => {
          return (
            <div className="py-2 px-3 border-b-[1px] border-slate-500">
              <Link href={'/community/question/'+value._id}><p className="text-blue-500">{value.title}</p></Link>
              <div className="flex mr-6  items-center">
                {value.UserId.image?<img src={value.UserId.image} className="rounded-md h-5 w-5"  />:
                  <div className=" bg-black rounded-md h-5 w-5"></div>}
                  <div className="flex h-10 pl-1 overflow-hidden relative text-xs flex-col">
                    <span className="absolute top-1">{value.UserId.name}</span>
                    <span className=" font-light pt-4 ">{value.UserId.email}</span>
                  </div>
                  <div className="flex font-light text-xs pt-2 items-end whitespace-nowrap overflow-hidden "> <p className="px-1 font-semibold"> asked</p> <p className="">Jul 31, 2008 at 22:08</p></div>
                </div>
            </div>
          );
        })}
      </div>
      :''}
      {/* <button className="bg-blue-300 rounded-e-md w-8 h-10"></button> */}
    </form>
  );
}

export default CommunitySearch;

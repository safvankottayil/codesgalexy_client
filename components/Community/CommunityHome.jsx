import Link from "next/link";
import React from "react";
import {userUrl} from'@/url'
import './style.css'
import Sidebar from "@/components/Community/Sidebar";
import ShowTage from '@/components/Community/ShowTags'
import CommunitySearch from "@/components/Community/CommunitySearch";
async function GetData(){
 const res=await fetch(`${userUrl}/community`,{next:{revalidate:10}})
 return res.json()

}
async function GetTag(){
  const res =await fetch(`${userUrl}/tag`,{next:{revalidate:10}})
   return res.json()
 }
async function CommunityHome() {
  const {questions}=await GetData()
 
  return (
    <div className="pt-16 h-screen fixed w-full bg-emerald-100 ">
      <div className="grid  grid-cols-12  h-full">
        <div className="hidden sm:block col-span-2 border-e-[1px] border-slate-400 ">
          <Sidebar/>
        </div>
        {/* home */}
        <div className=" col-span-12 sm:col-span-10 md:col-span-7 flex flex-col bar overflow-y-scroll ">
          <div className="flex mt-8 px-5 sticky justify-between">
            <p className="font-semibold text-4xl">Home</p>
            <Link href={'/community/ask'}>
            <button className="bg-blue-500 px-4 rounded-md py-2 font-semibold">
              Ask Questions
            </button>
            </Link>
          </div>
          <div className="flex flex-col md:flex-row mt-10 w-full justify-between border-b-[0.1px] pb-5 border-slate-300 px-10">
            <CommunitySearch/>
            <ul className="flex capitalize  rounded-md  ">
              <li className="px-2 py-1  border-[0.1px] rounded-s-sm  border-black">
                day
              </li>
              <li className="px-2 py-1 border-[0.1px] border-black">week</li>
              <li className="px-2 py-1 border-[0.1px] rounded-e-sm border-black">
                month
              </li>
            </ul>
          </div>
          {/*  */}
          {questions.map((value)=>{
            return(

          
          <div className=" flex py-2 border-b-[0.1px]  border-slate-300 flex-col ">
            <div className=" flex">
              <div className="sm:flex pl-4 hidden   text-end sm:pl-8  sm:flex-col">
                <p className="whitespace-nowrap">15 votes</p>
                <p className="whitespace-nowrap">3 answers</p>
                <p className="whitespace-nowrap">15 saved</p>
              </div>
              <div className=" pl-4 sm:mx-1 sm:mr-4 flex flex-col  font-semibold">
                <p className="  text-justify min-w-0 max-h-10 pb-1  text-lg overflow-hidden text-blue-700 pr-8 leading-5 ">
                 <Link href={`/community/question/${value._id}`}>{value.title}</Link>
                </p>
                <div className="flex text-xs space-x-2">
                  {value.tags.map((tag)=>{
                    return( <p className="px-2 py-[3px] bg-emerald-500 rounded-sm">
                    {tag.tag_id.Tage}
                  </p>)
                  })}
                 
                </div>
                <div className="flex mr-6  items-center">
                  <div className=" bg-black rounded-md h-5 w-5"></div>
                  <div className="flex h-10 pl-1 overflow-hidden relative text-xs flex-col">
                    <span className="absolute top-1">safavn</span>
                    <span className=" font-light pt-4 ">kottayilsafvan@gmail.com</span>
                  </div>
                  <div className="flex font-light text-xs pt-2 items-end whitespace-nowrap overflow-hidden "> <p className="px-1 font-semibold"> asked</p> <p className="">Jul 31, 2008 at 22:08</p></div>
                </div>
              </div>
            </div>
          </div>
            )
          })}
          {/*  */}
        </div>
        {/* close */}
        <div className="col-span-3 hidden md:block overflow-y-scroll bar border-s-[1px] border-slate-400 ">
         <ShowTage/>         
        </div>
      </div>
    </div>
  );
}

export default CommunityHome;

"use client";
import React, { useEffect, useState } from "react";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { BsBookmark } from "react-icons/bs";
import { FaBookmark } from "react-icons/fa";
import UserAxios from '@/Axios/client'
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import toast from '@/components/Toast/index'
function VoteBtn({ VOTE,ID }) {
    const router=useRouter()
    const token=Cookies.get('token')
    useEffect(()=>{
        UserAxios.get('/community/questions/isVoted?id='+ID,{headers:{Authorization:token}}).then((res)=>{
            console.log(res.data,11);
            if(res.data.status){
                console.log(res.data.isvoted);
               setVoted(res.data.isvoted)
               setvote(res.data.count)
               Setsave(res.data.isSaved)
            }
        })
    },[])
    function VOTING(type){
        UserAxios.patch('/community/questions/isVoted',{id:ID,type},{headers:{Authorization:token}}).then(res=>{
            if(res.data.status){

            } else {
          if (res.data.type == "block") {
            Cookies.remove("token");
            router.push("/?login="+true);
          } else if (res.data.type == "err") {
            router.push("/404");
          } else if (res.data.type == "user") {
            router.push("/?login="+true);
          }
        }
        })
    }
    function SAVE(type){
        UserAxios.patch('/community/questions/isSaved',{id:ID,type},{headers:{Authorization:token}}).then((res)=>{
            if(res.data.status){
                toast({type:'success',message:'Successfully finished'})
            } else {
                if (res.data.type == "block") {
                  Cookies.remove("token");
                  router.push("/?login="+true);
                } else if (res.data.type == "err") {
                  router.push("/404");
                } else if (res.data.type == "user") {
                  router.push("/?login="+true);
                }
              }
        })
    }
  const [vote, setvote] = useState(Number(VOTE));
  const [isSaved, Setsave] = useState(false);
  const [isVoted, setVoted] = useState(false);
  return (
    <div className="flex flex-col items-center space-y-3">
      <p className="">{vote}</p>
      {isVoted ? <BiSolidLike onClick={()=>{setVoted(false),VOTING(false),setvote(vote-1)} } /> : <BiLike onClick={()=>{setVoted(true),VOTING(true),setvote(vote+1)}} />}
      {isSaved ? <FaBookmark onClick={()=>{Setsave(false),SAVE(false)}}  /> : <BsBookmark onClick={()=>{Setsave(true),SAVE(true)}} />}
    </div>
  );
}

export default VoteBtn;

"use client";
import React, { useEffect, useState } from "react";
import { BiLike, BiSolidLike } from "react-icons/bi";
import UserAxios from "@/Axios/client";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import toast from "@/components/Toast/index";
function AnswerVote({ id }) {
  useEffect(() => {
    // console.log(12121);
    UserAxios.get("/community/questions/answer/" + id, {
      headers: { Authorization: token },
    }).then((res) => {
      if (res.data.status) {
        setVoted(res.data.isSaved);
        setvote(res.data.count);
      } 
    });
  }, []);
  const router = useRouter();
  const token = Cookies.get("token");
  const [vote, setvote] = useState(0);
  const [isVoted, setVoted] = useState(true);
  function VOTING(type) {
    UserAxios.patch('/community/questions/ansVoted',{type,id},{headers:{Authorization:token}}).then((res)=>{
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
  return (
    <div className="flex  flex-col items-center pt-3">
      <p className=" text-xl pb-2  font-bold">{vote}</p>
      {isVoted ? (
        <BiSolidLike
          className="w-7 h-7"
          onClick={() => {
            setVoted(false), VOTING(false), setvote(vote - 1);
          }}
        />
      ) : (
        <BiLike
        className="w-7 h-7"
          onClick={() => {
            setVoted(true), VOTING(true), setvote(vote + 1);
          }}
        />
      )}
    </div>
  );
}

export default AnswerVote;

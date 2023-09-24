"use client";
import React, { useState } from "react";
import Cookies from "js-cookie";
import UserAxios from "@/Axios/client";
import { useEffect } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { Link } from "next13-progressbar";
import Loader from 'react-spinners/MoonLoader'
import ShowTutorialManagement from "./ShowTutorialManagement";
import { useRouter } from "next/navigation";
import { MdStar } from "react-icons/md";
function ShowUserTutorials() {
  const [count,setcount]=useState(0)
  const token = Cookies.get("token");
  const router=useRouter()
  const [Tutorials, SetTutorials] = useState([]);
  const [isLoader,setLoader]=useState(false)
  useEffect(() => {
    setLoader(true)
    UserAxios.get("/profile/tutorials", {
      headers: { Authorization: token },
    }).then((res) => {
      if (res.data.status) {
        SetTutorials(res.data.Tutorials);
        setLoader(false)
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
    });
  }, [count]);
  return (
    <>
    {isLoader?
    <div className="flex w-full flex-grow justify-center pt-40">
      <Loader/>
    </div>:
    <div style={{marginLeft:'172px'}} className="grid  mr-5 md:mx-10 lg:mx-0 md:grid-cols-2 lg:grid-cols-3 pl-3 gap-5 mt-3">
      {Tutorials.map((tuto) => {
        return (
          <div className="relative shadow-md shadow-slate-700 rounded-xl">
            <ShowTutorialManagement count={count} update={setcount} id={tuto._id} />
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
    </div>}
    </>);
}

export default ShowUserTutorials;

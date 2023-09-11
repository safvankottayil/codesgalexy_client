import React from "react";
import "./style.css";
import DocumentSearch from "./DocumentSearch";
import CreateButton from "./CreateButton";
import { userUrl } from "@/url";
import Link from "next/link";
import { MdStar, MdStarBorderPurple500 } from "react-icons/md";
const ratingStar = [1, 2, 3, 4, 5];
async function GetTutorials() {
  // try{
  const res = await fetch(userUrl + "/tutorial", { next: { revalidate: 10 } });
  return res.json();
 
}
async function ShowDocuments() {
  const { Tutorials } = await GetTutorials();
  return (
    <div className="bg-emerald-50 flex  w-full  min-h-[92vh] ">
      <div className="flex flex-col w-full pl-10 pr-3 py-4">
        <div className="flex w-full">
          <DocumentSearch />
          <div className="flex flex-grow justify-end">
            <CreateButton />
          </div>
        </div>
        <div className="grid grid-cols-3 pl-3 gap-5 mt-3">
          {Tutorials.map((tuto) => {  
            const reviews=tuto?.reviews?tuto.reviews.length==0?1:tuto.reviews.length:1
            const rate=Math.floor(tuto.rating/reviews)
            return (
            <>
                <div className=" shadow-md shadow-slate-700 rounded-xl">
                    <Link href={`/learn/tutorial/${tuto._id}/home`}>
                  <img
                    className="w-full h-60 rounded-t-md"
                    src={tuto.image}
                    alt=""
                  />
                     </Link>
                  <div className="flex h-24 pr-1 py-1">
                    <div className="px-1">
                      <Link href={`/user/${tuto.UserId._id}`}>
                      {tuto.UserId.image?
                      <div  className="w-14 h-14 mt-1 rounded-full "  >
                        <img src={tuto.UserId.image} className="w-full h-14 rounded-full" alt="" />
                      </div>:
                      <div className="bg-black w-14 mt-1  h-14 rounded-full"></div>}
                      </Link>
                    </div>
                    <div>
                      <div className="flex items-center justify-between">
                        <p className="font-bold truncate capitalize pt-1">
                          {tuto.title}
                        </p>
                        <p className="flex">
                        {ratingStar.map((rating) => {
                        if (rating <=rate) {
                          return (
                            <MdStar
                              className="text-orange-300 w-6 h-6"
                            />
                          );
                        } else {
                          return (
                            <MdStar
                              className="text-gray-400 w-6 h-6"
                            />
                          );
                        }
                      })}
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
           
           </> );
          })}
        </div>
      </div>
    </div>
  );
}

export default ShowDocuments;

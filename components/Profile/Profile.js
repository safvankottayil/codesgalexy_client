"use client";
import React, { useEffect, useRef, useState } from "react";
import { MdAccountCircle } from "react-icons/md";
import Editprofile from "../Editprofile/Editprofile";
import { Setimage } from "@/Redux/client";
import UserAxios from "../../Axios/client";
import { useDispatch, useSelector } from "react-redux";
import { LuImagePlus } from "react-icons/lu";
import Cookies from "js-cookie";
import toast from "../Toast/index";
import Link from "next/link";
import { useRouter } from "next/navigation";
function Profile() {
  const router = useRouter();
  const dispatch = useDispatch();
  const imgbtn = useRef(null);
  const { Image } = useSelector((state) => state.Client);
  const [img, setimg] = useState("");
  const [showEdit, setEditModal] = useState(false);
  const token = Cookies.get("token");
  useEffect(() => {
    if (img) {
      UserAxios.patch(
        "/updateImage",
        { image: img },
        { headers: { Authorization: token } }
      ).then((res) => {
        if (res.data.status) {
          dispatch(Setimage({ image: img }));
          toast({ type: "success", message: "Image successfully updated " });
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
    }
  }, [img]);
  function imgUpload(e) {
    const imgfile = e.target.files[0];
    console.log(imgfile);
    const reader = new FileReader();
    reader.readAsDataURL(imgfile);
    reader.addEventListener("load", () => {
      const data = reader.result;
      setimg(data);
    });
  }
  return (
    <>
      {showEdit ? <Editprofile update={setEditModal} /> : ""}
      <div className="flex flex-col   ml-9 mt-5 border-black  fixed w-[250px] justify-center ">
        <div className="flex flex-col bg-emerald-600 rounded-t-lg items-center justify-center">
          <div className="flex items-center  flex-col w-full xl:w-4/5 h-fit ">
            <div className="flex justify-center">
              {Image ? (
                <img
                  src={Image}
                  className="rounded-2xl bg-slate-300 w-32 h-32 md:w-40 md:h-40 m-3 border-4 border-emerald-500 "
                />
              ) : (
                <MdAccountCircle className=" bg-slate-300 w-32 h-32 md:w-52 md:h-52 " />
              )}
            </div>
            <div>
                <LuImagePlus
                  onClick={() => imgbtn.current.click()}
                  className="text-red-500 hover:cursor-pointer mt-2 h-5 w-5"
                />
                <input
                  type="file"
                  ref={imgbtn}
                  onChange={imgUpload}
                  className="hidden"
                />{" "}
              </div>
            <div className="flex flex-col ">
              <div className="justify-center text-white flex mb-0 pb-0">
                <p className="font-bold md:text-2xl">Safvan</p>
              </div>
              {/* <span className='text-xs font-sans md:text-lg '>Ui desiner</span><br></br> */}
              <span className="text-xs font-sans md:text-sm pl-3 text-white ">
                kottayisafvan@gmail.com
              </span>
              {/* <div className='flex md:mt-2'>
                                <div className='bg-slate-200 shadow-sm shadow-black text-xs px-1 rounded-sm mr-2'>
                                    <span className='px-1 font-semibold md:text-lg'>7 Posts</span>
                                </div>
                                <div className='bg-slate-200  shadow-sm shadow-black text-xs px-1 rounded-sm'>
                                    <span className='px-1 pb-1 md:text-lg md:px2 font-semibold'>122 Saved</span>
                                </div>

                            </div> */}
              <button
                onClick={() => setEditModal(true)}
                className="bg-blue-600 h-7 mt-3 mb-3 md:text-sm text-emerald-50 font-semibold rounded-lg ml-2  px-2 "
              >
                Edit
              </button>

            
            </div>
          </div>
        </div>
        {/* posts and saved docs */}
       
          <div className="flex justify-center ">
            <nav className="flex w-full justify-center  ">
              <div className=" items-center bg-slate-50 rounded-b-lg shadow-sm shadow-slate-400 w-full flex justify-center">
                <ul className="flex flex-col w-full   md:text-lg text-sm md:w-96 justify-between">
                  <Link
                    href={"/profile/posts"}
                    className="  py-2 pl-3 hover:border-s-4 hover:border-green-600 uppercase hover:bg-gray-100"
                  >
                    Posts
                  </Link>
                  <Link
                    href={"/profile/tutorials"}
                    className="  py-2 pl-3  hover:border-s-4 hover:border-green-600 uppercase hover:bg-gray-100"
                  >
                   
                    Documents
                  </Link>
                  <Link
                    href={"/profile/saved"}
                    className="  py-2 pl-3  hover:border-s-4 hover:border-green-600 uppercase hover:bg-gray-100"
                  >
                    Saved
                  </Link>
                </ul>
              </div>
            </nav>
          </div>
       
      </div>
    </>
  );
}

export default Profile;

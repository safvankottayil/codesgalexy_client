"use client";
import React, { useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import userAxios from "@/Axios/client";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
function CreateButton() {
  const router=useRouter()
  const token = Cookies.get("token");
  const [CreateDoc, SetDoc] = useState(false);
  const titleRef = useRef(null),
    titleErr = useRef(null);
  const categoryRef = useRef(null),
    categoryErr = useRef(null);
  const imageRef = useRef(null),
    imageErr = useRef(null);
  const DescRef = useRef(null),
    DescErr = useRef(null);
  const [Title, SetTitle] = useState("");
  const [Category, SetCategory] = useState("");
  const [image, SetImage] = useState([]);
  const [Desc, SetDesc] = useState("");
  const [preview, Setpreview] = useState(false);
  function validation(num) {
    let flag = true;
    if (num[0] == 1) {
      SetTitle(titleRef.current.value);
      if (titleRef.current.value == "") {
        flag = false;
        titleRef.current.style.borderColor = "red";
        titleErr.current.textContent = "This feild required";
      } else if (titleRef.current.value.length < 4) {
        flag = false;
        titleRef.current.style.borderColor = "red";
        titleErr.current.textContent = "Minimum 4 charecter";
      } else {
        titleRef.current.style.borderColor = "white";
        titleErr.current.textContent = "";
      }
    }
    if (num[1] == 2) {
      SetCategory(categoryRef.current.value);
      if (categoryRef.current.value == "") {
        flag = false;
        categoryRef.current.style.borderColor = "red";
        categoryErr.current.textContent = "This feild required";
      } else {
        categoryRef.current.style.borderColor = "white";
        categoryErr.current.textContent = "";
      }
    }
    if (num[2] == 3) {
      SetImage(imageRef.current.files);
      if (!imageRef.current.files[0]) {
        flag = false;
        imageRef.current.style.borderColor = "red";
        imageErr.current.textContent = "This feild required";
      } else {
        imageRef.current.style.borderColor = "white";
        imageErr.current.textContent = "";
      }
    }
    if (num[3] == 4) {
      SetDesc(DescRef.current.value);
      if (DescRef.current.value == "") {
        flag = false;
        DescRef.current.style.borderColor = "red";
        DescErr.current.textContent = "This feild required";
      } else if (DescRef.current.value.length < 16) {
        flag = false;
        DescRef.current.style.borderColor = "red";
        DescErr.current.textContent = "minimum 16 letter";
      } else {
        DescRef.current.style.borderColor = "white";
        DescErr.current.textContent = "";
      }
    }
    return flag;
  }
  function allDataValidate(e) {
    e.preventDefault();
    const check = validation([1, 2, 3, 4]);
    if (check) {
      Setpreview(true);
    }
  }
  async function Submit(e) {
    try {
      alert(1)
      e.preventDefault();
      async function Reader(){
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(image[0]);
  
          reader.addEventListener('load', () => {
            resolve(reader.result);
          });
  
          reader.addEventListener('error', (error) => {
            reject(error);
          });
        });
  }
      const img =await Reader()
      const res = await userAxios.post(
        "/add-tutorial",
        { Title, Category, Description: Desc,img},
        { headers: { Authorization: token } }
      );
      console.log(res.data);
      if (res.data.status) {
        alert(2)
        router.push(`/create/${res.data.id}/${res.data.pagename}`)
      }
    } catch (err) {
      alert(err.message);
    }
  }
  
  return (
    <>
      <button
        onClick={() => {
          SetDoc(true);
        }}
        className="capitalize font-bold p-2 rounded-md bg-emerald-700 h-11"
      >
        add tutorial
      </button>
      {CreateDoc ? (
        <>
          <div className="flex justify-center fixed bg-opacity-50 z-10 top-0 left-0 w-screen h-screen bg-black">
            <div className="w-96 h-fit bg-white rounded-lg translate-y-1/4 flex flex-col">
              {preview ? (
                <>
                  <div className="rounded-md border-2  m-1 border-slate-500">
                    <div className="flex justify-center">
                      <img
                        src={image[0] ? URL.createObjectURL(image[0]) : ""}
                        alt=""
                        className="h-52 w-[95%] mt-2 rounded-t-md "
                      />
                    </div>
                    <div>
                      <p className="pl-3 font-bold capitalize font-sans">
                        {Title}
                      </p>
                      <p className="whitespace-normal px-3  font-normal h-24 truncate">
                        {Desc}
                      </p>
                    </div>
                  </div>
                  <div className="flex mx-3 my-2 justify-between">
                    <button
                      onClick={() => Setpreview(false)}
                      className="text-white bg-blue-500 px-2 py-1 rounded-md"
                    >
                      Back
                    </button>
                    <form onSubmit={Submit}>
                      <button className="text-white bg-blue-500 px-2 py-1 rounded-md">
                        Next
                      </button>
                    </form>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex justify-end">
                    <AiOutlineClose
                      onClick={() => SetDoc(false)}
                      className="m-1 w-6 h-5"
                    />
                  </div>
                  <div className="mb-4 p-0">
                    <p className="font-bold pl-3 mt-0 text-lg">
                      Create Totorial
                    </p>
                  </div>
                  <form onSubmit={allDataValidate}>
                    <div className="flex flex-col mb-1 items-center">
                      <div className="w-full">
                        <span className="pl-9 font-semibold">Title</span>
                      </div>
                      <input
                        ref={titleRef}
                        value={Title}
                        onChange={() => validation([1])}
                        placeholder="Enter totorial title "
                        className="bg-slate-200 border-b-2 h-10 w-80 pl-2 focus:outline-none rounded-sm"
                        type="text"
                      />
                      <div className="h-4 w-full ">
                        <span
                          ref={titleErr}
                          className="pl-8 text-red-600"
                        ></span>
                      </div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-full">
                        <span className="pl-9 font-semibold">Category</span>
                      </div>
                      <input
                        ref={categoryRef}
                        value={Category}
                        onChange={() => validation([0, 2])}
                        placeholder="eg:-Html,Css..."
                        className="bg-slate-200 border-2 h-10 w-80 pl-2 focus:outline-none rounded-sm"
                        type="text"
                      />
                      <div className="h-4 w-full ">
                        <span
                          ref={categoryErr}
                          className="pl-8 text-red-600"
                        ></span>
                      </div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-full">
                        <span className="pl-9 font-semibold">Image</span>
                      </div>
                      <input
                        ref={imageRef}
                        onChange={() => validation([0, 0, 3])}
                        placeholder=""
                        className="bg-slate-200 border-2 hidden h-10 w-80 pl-2 focus:outline-none rounded-sm"
                        type="file"
                      />
                      <input
                        value={image[0] ? image[0].name : ""}
                        onClick={() => imageRef.current.click()}
                        type="text"
                        className="bg-slate-200 border-2  h-10 w-80 pl-2 focus:outline-none rounded-sm"
                      />
                      <div className="h-4 w-full ">
                        <span
                          ref={imageErr}
                          className="pl-8 text-red-600"
                        ></span>
                      </div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-full">
                        <span className="pl-9 font-semibold">Description</span>
                      </div>
                      <textarea
                        ref={DescRef}
                        onChange={() => validation([0, 0, 0, 4])}
                        className="bg-slate-200 border-2 focus:outline-none w-80 "
                        name=""
                        id=""
                        rows="5"
                      >
                        {Desc}
                      </textarea>
                      <div className="h-4 mb-3 w-full ">
                        <span
                          ref={DescErr}
                          className="pl-8 text-red-600"
                        ></span>
                      </div>
                    </div>
                    <div className="flex justify-end mx-7 mb-3 items-center">
                      <button className="bg-blue-400 rounded-md px-2 ">
                        Next
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
}

export default CreateButton;

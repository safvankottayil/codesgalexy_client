"use client";
import "./style.css";
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { AiOutlineLink } from "react-icons/ai";
import { BsCode } from "react-icons/bs";
import { Suggution } from "../Suggestion";
import { XMarkIcon } from "@heroicons/react/24/outline";
import UserAxios from '@/Axios/client'
import Cookies from "js-cookie";
import toast from "../Toast/index";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { LoginShow } from "@/Redux/client";


function AskQuastions() {
  const dispatch=useDispatch()
  const router=useRouter()
  const token=Cookies.get('token')
  const Questiontext = useRef(null),
    titleRef = useRef(null),
    titleErr = useRef(null),
    bodyErr = useRef(null),
    tagErr = useRef(null);
  const tagevalue = useRef(null);
  const [tage, setTages] = useState("");
  const [tages, SetTagecollection] = useState([]);
  const [suggetion, SetSuggetions] = useState([]);

  const [bodytext, setbodytext] = useState("");
  const [show, setshow] = useState("");
  const [title, settitle] = useState("");
  console.log(suggetion, "sug");
  console.log(tages);
  function validation(num) {
    let flag=true
    if (num[0] == 1) {
      if (titleRef.current.value == "") {
        flag=false
        titleRef.current.style.borderColor = "red";
        titleErr.current.textContent = "this field required";
      } else if (titleRef.current.value.length < 25) {
        flag=false
        titleRef.current.style.borderColor = "red";
        titleErr.current.textContent = "Enter minimum 25 charecters ";
      } else {
        titleRef.current.style.borderColor = "grey";
        titleErr.current.textContent = "";
      }
    }
    if (num[1] == 2) {
      if (Questiontext.current.value == "") {
        flag=false
        Questiontext.current.style.outlineColor = "red";
        bodyErr.current.textContent = "this field required";
      } else if (Questiontext.current.value.length < 100) {
        flag=false
        Questiontext.current.style.outlineColor = "red";
        bodyErr.current.textContent = "Enter minimum 100 charecters ";
      } else {
        Questiontext.current.style.outlineColor = "green";
        bodyErr.current.textContent = "";
      }
    }
    if(num[2]==3){
      if(tages.length<3){
        flag=false
        tagErr.current.textContent='add minimum 3 tags'
      }else{
        tagErr.current.textContent=''
      }
    }
    return flag
  }
  function addCodeline() {
    Questiontext.current.value = Questiontext.current.value + "-`your code`-";
    setbodytext(Questiontext.current.value);
  }
  function addCodeArea() {
    Questiontext.current.value = Questiontext.current.value + "---your code---";
    setbodytext(Questiontext.current.value);
  }
  function addLink() {
    Questiontext.current.value =
      Questiontext.current.value + `='[text](https://whatsapp.com)'=`;
    setbodytext(Questiontext.current.value);
  }
  const Tagefuntion = (e) => {
    setTages(e.target.value);
    let Tage = tagevalue.current.value;
    Tage = Tage.toLowerCase();
    const space = /\s+/;
    let istage = false;
    if (space.test(Tage[0])) {
      Tage = "";
      setTages("");
    }
    if (Tage != "") {
      Suggution(Tage, SetSuggetions);
    } else {
      SetSuggetions([]);
    }
    for (let i = 0; i < Tage.length; i++) {
      let char = Tage[i];
      if (space.test(char)) {
        istage = true;
      }
    }
    if (istage) {
      SetTagecollection([...tages, Tage]);
      setTages("");
      SetSuggetions([]);
    }
  };
  function  formSubmit(){
    const check=validation([1,2,3])
    if(check){
       UserAxios.post('/community/ask',{title,show,tages},{headers:{Authorization:token}}).then((res)=>{
         if(res.data.status){
            router.push('/community')
          toast({type:'succuss',message:'Qestion Added'})
         } else {
          if (res.data.type == "block") {
            Cookies.remove("token");
            dispatch(LoginShow(true))
          } else if (res.data.type == "err") {
            router.push("/404");
          } else if (res.data.type == "user") {
            router.push("/?login="+true);
          }
        }
       })
    }
  }
  useEffect(() => {
    const regexcode = /-`([\s\S]*?)`-/g;
    const regexcodeArea = /---([\s\S]*?)---/g;
    const regexLink = /='([\s\S]*?)'=/g;
    const text = Questiontext.current.value;
    const codeline = [];
    const codeArea = [];
    const codelink = [];
    let match;
    let x = text;
    while ((match = regexcodeArea.exec(text)) !== null) {
      codeArea.push(match[1]);
    }
    while ((match = regexLink.exec(text)) !== null) {
      const regex = /\[(.*?)\]\((.*?)\)/;
      const text = match[1].match(regex);
      codelink.push({ text: text[1], link: text[2] });
    }
    while ((match = regexcode.exec(text)) !== null) {
      codeline.push(match[1]);
    }
    console.log(codelink, "11111111");
    let count = 0;
    x = x.replace(regexLink, (text) => {
      count++;
      return `<a style="color:blue;padding:0px 3px;" href="${
        codelink[count - 1].link
      }"><u>${codelink[count - 1].text}</u></a>`;
    });
    count = 0;
    x = x.replace(regexcode, (text) => {
      count++;
      return `<code style="background-color:white; border-radius: 0.25rem; padding:0px 6px">${
        codeline[count - 1]
      }</code>`;
    });
    count = 0;
    x = x.replace(regexcodeArea, (text) => {
      count++;
      return `<pre class="bar" style="background-color:white;width:100%; border-radius: 0.25rem; padding:10px 10px;margin:10px 0px; overflow-x: scroll; scrollbar-width: thin; ::-webkit-scrollbar {
          width: 10px;
        } scrollbar-color: #888 #f1f1f1;"><code  >'${
          codeArea[count - 1]
        }'</code></pre>`;
    });

    setshow(x);
  }, [bodytext]);

  return (
    <div className="flex justify-center bg-emerald-200">
      <div className="w-5/ ">
        <div>
          <h1 className="pl-5 pb-16 pt-10 text-2xl font-bold">
            Ask a public question
          </h1>
        </div>
        <div className="pl-4">
          <div className="sm:w-4/6 bg-sky-100 border-[1px] p-4 rounded-md border-emerald-600">
            <h1 className="text-lg font-semibold pb-2 text-slate-600">
              Writing a good question
            </h1>
            <p className="text-base text-slate-600">
              You’re ready to ask a programming-related question and this form
              will help guide you through the process. Looking to ask a
              non-programming question?
            </p>
            <p className="font-semibold text-sm text-slate-600">steps</p>
            <div className="pl-4 felx flex-col text-sm text-slate-700">
              <li>Summarize your problem in a one-line title</li>
              <li>Describe your problem in more detail</li>
              <li>Describe what you tried and what you expected to happen.</li>
              <li>
                Add “tags” which help surface your question to members of the
                community.
              </li>
            </div>
          </div>
        </div>
        {/* form starting  */}

        <div className="pl-4 pt-5">
          {/* title */}
          <div className="w-4/6 bg-emerald-100 rounded-md p-4  border-[1px] border-emerald-600">
            <h1 className="font-semibold">Title</h1>
            <p className="text-sm text-slate-600 pb-1">
              Be specificand imagine you’re asking a question to another person.
            </p>
            <small className="text-red-500 w-full flex justify-end px-2 ">
              <i ref={titleErr}></i>
            </small>
            <input
              ref={titleRef}
              onChange={() => {
                validation([1]), settitle(titleRef.current.value);
              }}
              value={title}
              placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
              type="text"
              className="w-full pl-3 text-sm h-9 rounded-md focus:outline-none border-[1px] border-slate-400 bg-white"
            />
          </div>
          {/* body */}
          <div className="w-4/6 mt-5 relative bg-emerald-100 rounded-md p-4  border-[1px] border-emerald-600">
            <h1 className="font-semibold">
              What are the details of your problem?
            </h1>
            <p className="text-sm text-slate-600 pb-2">
              Introduce the problem and expand on what you put in the title.
              Minimum 20 characters.
            </p>
            <div className="relative">
              <div className="w-4/5 z-10 bg-white bar top-[2px] left-[4px] flex space-x-2 space-y-1  rounded-s-sm absolute h-12">
                <BsCode onClick={addCodeline} className="w-6 h-6 mt-1" />{" "}
                <BsCode
                  onClick={addCodeArea}
                  className="w-6 bg-black text-white rounded-md  h-6  "
                />
                <AiOutlineLink onClick={addLink} className="w-6  h-6" />
              </div>

              <pre>
                <textarea
                  onChange={() => {
                    setbodytext(Questiontext.current.value), validation([0, 2]);
                  }}
                  value={bodytext}
                  ref={Questiontext}
                  name=""
                  className="w-full pl-3 pt-14  text-sm  rounded-md focus:outline-2 focus:outline-double focus:outline-emerald-500 border-[1px] border-slate-400 bg-white"
                  id=""
                  rows="12"
                ></textarea>
              </pre>
              <small className="text-red-500 w-full flex justify-end px-2 ">
                <i ref={bodyErr}></i>
              </small>
              <pre
                className=" text-sm whitespace-normal"
                dangerouslySetInnerHTML={{ __html: show }}
              ></pre>
            </div>
          </div>
          <div className="w-4/6 bg-emerald-100 rounded-md p-4 mt-4 relative  border-[1px] border-emerald-600">
            <h1 className="font-semibold">Tags</h1>
            <p className="text-sm text-slate-600 pb-1">
              Add up to 5 tags to describe what your question is about. Start
              typing to see suggestions.
            </p>
            <div className="relative">
              <div className="bg-white relative w-380px rounded-md overflow-x-hidden h-10 px-2 flex items-center">
                {tages.map((value) => {
                  return (
                    <span
                      key={value}
                      className="bg-emerald-200 pl-2 rounded-md flex mr-1 "
                    >
                      <span>{value} </span>
                      <XMarkIcon
                        onClick={() => {
                          SetTagecollection(
                            tages.filter((data) => {
                              return data != value;
                            })
                          );
                        }}
                        className="pt-1 w-5 h-5"
                      />
                    </span>
                  );
                })}
                <input
                  ref={tagevalue}
                  onChange={(e)=>{Tagefuntion(e),validation([0,0,3])}}
                  value={tage}
                  className="bg-transparent focus:outline-none"
                />
              </div>
              <small className="text-red-500 w-full flex justify-end px-2 ">
                <i ref={tagErr}></i>
              </small>
              <div className="absolute w-80 max-h-20 bg-emerald-300 rounded-b-lg border-b-2 overflow-hidden flex   top-10">
                {suggetion.map((data) => {
                  if (!tages.includes(data.Tage)) {
                    return (
                      <p
                        key={data._id}
                        onClick={() => {
                          setTages(""),
                            SetTagecollection([...tages, data.Tage]),
                            SetSuggetions([]);
                        }}
                        className="bg-sky-400 px-2  h-6 rounded-sm m-1 "
                      >
                        {data.Tage}
                      </p>
                    );
                  }
                })}
              </div>
            </div>
          </div>
          <div className="pt-3">
            <button
              onClick={formSubmit}
              className="flex px-5 mb-5 py-2 bg-emerald-600 rounded-sm text-white capitalize"
            >
              submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AskQuastions;

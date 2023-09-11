"use client";
import Cookies from "js-cookie";
import UserAxios from'@/Axios/client'
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineLink } from "react-icons/ai";
import { BsCode } from "react-icons/bs";
import ToastMessage from "../Toast/index";

function AddAnswer({id}) {
  const token = Cookies.get("token");
  const Questiontext = useRef(null);
  const [show, setshow] = useState("");
  const bodyErr = useRef(null);
  const [bodytext, setbodytext] = useState("");
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
  function formSubmit(){
       if (Questiontext.current.value.length <50) {
            Questiontext.current.style.outlineColor = "red";
            bodyErr.current.textContent = "Enter minimum 50 charecters ";
          } else {
            Questiontext.current.style.outlineColor = "green";
            bodyErr.current.textContent = "";
UserAxios.post('/community/add-answer',{show,id},{headers:{Authorization:token}}).then((res)=>{
if(res.data.status){
    ToastMessage({type:'success',message:'Added answer'})
    Questiontext.current.value=''
    setshow('')
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
    
  }
  return (
    <div>
      <div className="relative sm:pr-9 ">
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
              setbodytext(Questiontext.current.value);
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
      <div className="mb-5 mt-2">
        <button onClick={formSubmit} className="bg-emerald-600 text-white px-5 py-2 rounded-md ">Add answer</button>
      </div>
    </div>
  );
}

export default AddAnswer;

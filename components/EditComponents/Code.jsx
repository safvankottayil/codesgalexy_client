import React, { useEffect, useRef, useState } from "react";
import "./style.css";
import { Editor } from "@monaco-editor/react";
import Editors from "../Editor/Editor";
import { CiMenuKebab } from "react-icons/ci";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete, MdOutlineSwapVert } from "react-icons/md";

function Code({ Delete, index,data,Update }) {
  const Data = useRef(null);
  const [text,SetText]=useState('')
  const [language, Setlanguage] = useState("html");
  const [height,Setheight] = useState(200);
  const [ShowEditer, SetShowEditer] = useState(false);
  useEffect(()=>{
  if(data[index]){
    SetText(data[index].data.text)
    Setlanguage(data[index].language)
    Setheight(data[index].height)
  }  
  },[])

  if (!data[index]) {
    Update([...data, { data: { text: text },height:height,type:'code',language:language}]);
  }
  function heightINC(e){
    // alert(1)
   Setheight(e.target.value)
   Update(data.map((value,i)=>{
    if(i==index){
       value.data.text=text
       value.language=language
       value.height=height
       console.log(value);
       return value
    }else{
        return value
    }
}))

  }
  function onChangeHandle(){
    SetText(Data.current.getValue())
    Update(data.map((value,i)=>{
        if(i==index){
           value.data.text=text
           value.language=language
           value.height=height
           console.log(value);
           return value
        }else{
            return value
        }
    }))
  }
  
  return (
    <div>
      <div className="flex flex-grow relative">
      <div className="mx-4 flex flex-grow mb-2">
        <div className="editor flex flex-col flex-grow  bg-gray-950 px-2 mt-2 pt-2 pb-5 rounded-2xl mx-2">
          <div className=" flex justify-end">
            <input className="bg-gray-800 border-0 focus:outline-none rounded-md h-9 mr-1 w-20 pl-2 mt-1 text-white " type="number" value={height} onChange={heightINC} />
            <select
              onChange={(e)=>{ Setlanguage(e.target.value),onChangeHandle}}
              value={language}
              className="w-36 my-1 h-9 capitalize focus:outline-none font-semibold rounded-md text-white bg-gray-800 pl-2"
            >
              <option value="javascript">javascript</option>
              <option value="css">css</option>
              <option  value="html">
                html
              </option>
              <option value="python">python</option>
            </select>
          </div>
          <Editor
            language={language}
            theme="vs-dark"
            height={`${height}px`}
            width={"100%"}
            value={text}
            onMount={(editer,m)=>{
                Data.current=editer
            }}
            onChange={onChangeHandle}
          />
        </div>
        </div>
        <div>
          <CiMenuKebab
            onClick={() => SetShowEditer(!ShowEditer)}
            fill="black"
            className="w-7 mt-2 h-7"
          />
        </div>
        {ShowEditer ? (
          <span className="flex flex-col px-1 absolute -right-7 bg-gray-400 rounded-md top-9  items-center">
            <MdDelete
              onClick={() => {
                Delete(index), SetShowEditer(false);
              }}
              className="w-6 h-6 m-1"
            />
            <MdOutlineSwapVert
              onClick={() => {
                swap(index + 1);
              }}
              className="w-6 h-6 m-1"
            />
          </span>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Code;

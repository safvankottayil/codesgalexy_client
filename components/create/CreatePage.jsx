"use client";
import './style.css'
import React, { useEffect, useState } from "react";
import Title from "../EditComponents/Title";
import List from "../EditComponents/List";
import Paragraphs from "../EditComponents/Paragraphs";
import UserAxios from "@/Axios/client";
import Code from "../EditComponents/Code";
import { MdOutlineSwapVert } from "react-icons/md";
import Cookies from 'js-cookie';
import { SaveTutorial } from "@/Services/client";
import toast from "../Toast/index";
import Table from "../EditComponents/Table";
import { AiOutlinePlus } from "react-icons/ai";

function CreatrPage({ Tutorial_id, pagename }) {
  const [swap, Setswap] = useState("");
  const [startSwap, SetStartswap] = useState("");
  const [Delete, setDelete] = useState("");
  const [data, SetData] = useState([]);
  const [show, SetShow] = useState([]);
  const [row, setrow] = useState(3);

  typeof Delete == "number" ? deleteElement() : " ";
  function deleteElement() {
    if (typeof Delete == "number") {
      SetData(
        data.map((value, i) => {
          if (i == Delete) {
            return { type: "" };
          } else {
            return value;
          }
        })
      );
      SetShow(
        show.map((value, i) => {
          if (i == Delete) {
            return { value: "" };
          } else {
            return value;
          }
        })
      );
      setDelete("");
    }
  }
  typeof startSwap == "number" ? ElementSwap() : "";
  function ElementSwap() {
    let arr1 = data;
    let arr2 = show;
    let temp1 = arr1[swap - 1];
    let temp2 = arr2[swap - 1];
    arr1[swap - 1] = arr1[startSwap - 1];
    arr1[startSwap - 1] = temp1;
    arr2[swap - 1] = arr2[startSwap - 1];
    arr2[startSwap - 1] = temp2;
    SetData(arr1);
    SetShow(arr2);
    SetStartswap("");
    Setswap('')
  }

  useEffect(() => {
    UserAxios.get(`/page/${Tutorial_id}/${pagename}`).then((res) => {
      if (res.data.status) {
         const TableData=res.data.Table
       
        SetData(res.data.page.Data.map((value) => value));
        const promises = res.data.page.Data.map((data, i) => {
          if (data.type == "title") {
            return new Promise((resolve, reject) => {
              resolve(Addtext(i, res.data.page.Data));
            });
          } else if (data.type == "para") {
            return new Promise((resolve, reject) => {
              resolve(AddParagraph(i, res.data.page.Data));
            });
          } else if (data.type == "list") {
            return new Promise((resolve, reject) => {
              resolve(AddList(i, res.data.page.Data));
            });
          } else if (data.type == "code") {
            return new Promise((resolve, reject) => {
              resolve(AddCode(i, res.data.page.Data));
            });
          }else if(data.type=='table'){
            for(let j=0;j<TableData.length;j++){
              if(TableData[j].i==i){
                return new Promise((resolve,reject)=>{
                  resolve(AddTable(i,res.data.page.Data,res.data.page.Data[i].row,TableData[j].data))
                })
              }
             
            }
            }
            
        });
        Promise.all(promises).then((res) => {
          SetShow(res);
        });
      }else{
        if(res.data.type=='block'){
            Cookies.remove('token')
            router.push('/')
        }else if(res.data.type=='err'){
               router.push('/404')
        }else if(res.data.type=='user'){
              router.push('/')
        }
    }
    });
  }, []);
console.log(show,'show');
  function Addtext(index, value) {
    return {
      value: (
        <Title
          key={index}
          data={value ? value : data}
          Delete={setDelete}
          Update={SetData}
          index={index}
          swap={Setswap}
        />
      ),
    };
  }
  function AddTable(index, value,row,TableData) {
    return {
      value: (
        <Table
          TableData={TableData}
          key={index}
          data={value ? value : data}
          Delete={setDelete}
          Update={SetData}
          index={index}
          swap={Setswap}
          row={row}
        />
      ),
    };
  }
  console.log(data,'---------======----------=========-');
  function AddCode(index, value) {
    return {
      value: (
        <Code
          key={index}
          data={value ? value : data}
          Delete={setDelete}
          Update={SetData}
          index={index}
          swap={Setswap}
        />
      ),
    };
  }
  console.log(data);
  function AddList(index, value) {
    return {
      value: (
        <List
          key={index}
          data={value ? value : data}
          Update={SetData}
          Delete={setDelete}
          index={index}
          swap={Setswap}
        />
      ),
    };
  }
  function AddParagraph(index, value) {
    return {
      value: (
        <Paragraphs
          key={index}
          data={value ? value : data}
          Delete={setDelete}
          Update={SetData}
          index={index}
          swap={Setswap}
        />
      ),
    };
  }
// console.log(data,'----------===============------------------');
  // save and submit
  async function SaveTutorials() {
    const arr = data.filter((value) => {
      if(!value.type==""){
        return value
      }
    })
    const res = await SaveTutorial(Tutorial_id, pagename, arr);
    alert(res.status);
    if (res.status) {
      toast({ type: "success", message: "Saved tutorials" });
    }
  }
// console.log(show,'=============================================');
  return (
    <div className="grid grid-cols-10 w-full ">
      <div className="col-span-8 show  pl-[36px] flex flex-col bg-white">
        <div className="flex show z-10 flex-col ">
        {show.map((value) => {
          return value.value;
        })}
        </div>
      </div>
      {/* Edit  buttons */}
      <div className="col-span-2  bg-white  relative">
        
        <div className="flex flex-col">
       <div className="border-l-2  border-slate-300 border-b-2 ">
       {swap? <> <p className="uppercase pl-4 pt-2  font-bold ">swap</p>
          <div className="flex items-center  py-1 border-t-[1px] border-gray-400">
            <p className="uppercase font-bold pl-2 ml-5">from</p>
            <div className="p-2 shadow-inner shadow-black ml-5 font-semibold w-10 h-10 flex justify-center rounded-2xl">
              {swap}
            </div>
            <MdOutlineSwapVert className=" ml-1 h-6 w-6" />
            {/* <div className="p-2 shadow-inner shadow-black ml-2 font-semibold w-10 h-10 flex justify-center rounded-2xl">
              {startSwap}
            </div> */}
          </div>
          {/*  */}
          <div className="flex items-center pb-2 ">
            <p className="uppercase  font-bold pl-2 ml-5 w-14">to</p>
            <div className="grid grid-cols-3">
              {data.map((v, i) => (
                <div
                  onClick={() => SetStartswap(i + 1)}
                  className="p-2 shadow-inner shadow-black ml-5 font-semibold w-10 h-10 mt-1 flex justify-center rounded-2xl"
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
          </>  :''}
        </div>
       
        <div className="flex flex-col flex-grow">
          {/* <div className="flex flex-col flex-grow fixed"> */}
          <li
            className="p-3 flex list-none  border-s-2 border-b-2 border-slate-300 justify-between   "
            onClick={() => {
              SetShow([...show, Addtext(show.length)]);
            }}
          >
          <span>Title</span> 
          <AiOutlinePlus
             onClick={() => {
              SetShow([...show, Addtext(show.length)]);
            }}
              className="w-6 h-6 flex hover:bg-slate-400 rounded-md"
            />
          </li>

          <li
            className="p-3 list-none border-b-2  border-s-2 border-slate-300 flex justify-between"
           
          >
          <span>Paragraph</span>  
          <AiOutlinePlus
             onClick={() => SetShow([...show, AddParagraph(show.length)])}
              className="w-6 h-6 flex hover:bg-slate-400 rounded-md"
            />
          </li>
          {/* Add List  */}
          <li
           
            className="p-3 list-none border-b-2  border-s-2 border-slate-300 flex justify-between "
          >
           <span>List</span> 
           <AiOutlinePlus
             onClick={() => SetShow([...show, AddList(show.length)])}
              className="w-6 h-6  hover:bg-slate-400 rounded-md"
            />
          </li>
          <li
            
            className="p-3 list-none border-b-2  border-s-2 border-slate-300 flex justify-between "
          >
            <span>Code</span>
            <AiOutlinePlus
             onClick={() => SetShow([...show, AddCode(show.length)])}
              className="w-6 h-6  hover:bg-slate-400 rounded-md"
            />
          </li>
          <li
            //
            className="p-2 border-b-2 border-slate-300  border-s-2 items-center flex justify-between list-none"
          >
            <span>Table</span>
            <input
              type="number"
              value={row}
              onChange={(e) => setrow(e.target.value)}
              className="w-12 pl-4 ml-2 h-7 bg-slate-300 rounded-md focus:outline-none border-0"
            />
            <AiOutlinePlus
              onClick={() => SetShow([...show, AddTable(show.length,'',row)])}
              className="w-6 h-6 hover:bg-slate-400 rounded-md"
            />
          </li>
          {/*  save */}
          <li onClick={SaveTutorials}
            className="capitalize p-1 list-none flex justify-center py-2 mt-2 text-white font-serif  bg-emerald-600 rounded-sm"
          >
           save
          </li>
          {/* pblish */}
          <li className="capitalize p-1 list-none flex justify-center py-2 my-2 text-white font-serif bg-sky-700 rounded-sm">
          submit
          </li>
          
        </div>

        
        </div>
      </div>
     </div>
  );
}

export default CreatrPage;

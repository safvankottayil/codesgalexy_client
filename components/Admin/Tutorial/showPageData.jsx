import React, { useState } from "react";
import { BsChevronDoubleDown } from "react-icons/bs";
import { Editor } from "@monaco-editor/react";
import AdminAxios from '@/Axios/Admin'
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
function showPageData({ name, data, index, table,Update,count }) {
  const [show, setShow] = useState(false);
  const router=useRouter()
  function Verify(id,type){
    const token=Cookies.get("Admintoken")
    AdminAxios.patch('/pageverify',{id,type},{headers:{Authorization:token}}).then((res)=>{
        if(res.data.status){
       Update(count+1)
        }else{
            if(res.data.type=='admin'){
              router.push('/admin/login')

            }else{
              router.push('/404')
            }
        }
    })
  }
  return (

    <>
      <tr className="text-white border-b-[0.01rem] border-slate-600 ">
        <td className='className="text-left pl-5'>{index + 1}</td>
        <td className='className="text-left pl-5 capitalize'>{name}</td>
        <td className='className="text-left pl-5 capitalize'>{data.name}</td>
        <td className="text-left pl-5">
          {data.isVerify ? (
            <div className="flex items-center w-full h-14">
              <p className="w-3 h-3 pl-3 rounded-full bg-green-400 "></p>
              <p className="text-slate-300 pl-2 text-sm capitalize ">
                verifyed
              </p>
            </div>
          ) : (
            <div className="flex items-center w-full h-14">
              <p className="w-3 h-3 pl-3 rounded-full bg-red-600"></p>
              <p className="text-slate-300 pl-2 text-sm capitalize ">
                Not verifyed
              </p>
            </div>
          )}
        </td>
        <td className="">
          {data.isVerify ? (
            <button
              onClick={() => Verify(data._id, false)}
              className="ml-5 mt-3  bg-red-400 h-10 w-24  rounded-md font-semibold"
            >
              BANN
            </button>
          ) : (
            <button
              onClick={() => Verify(data._id, true)}
              className="ml-5 mt-3  bg-green-600 h-10 w-24  rounded-md font-semibold"
            >
              VERIFY
            </button>
          )}
        </td>
        <td className='className="text-left pl-5 capitalize ml-4'>
          <BsChevronDoubleDown onClick={() => setShow(!show)} className={show?'rotate-180':''} />
        </td>
      </tr>
      {show ? (
        <tr>
          <td
            colSpan={6}
            className='className="text-white border-b-[0.01rem] border-slate-600'
          >
            {data.Data.map((value, i) => {
              if (value.type == "title") {
                return (
                  <tr className="text-white border-b-[0.01rem]  border-slate-600">
                    <td className="pl-3 py-4 capitalize">{value.data.text}</td>
                  </tr>
                );
              } else if (value.type == "para") {
                return (
                  <tr className="text-white border-b-[0.01rem] pl-3 border-slate-600">
                    <td className="pl-3 py-4 capitalize">{value.data.P}</td>
                  </tr>
                );
              } else if (value.type == "list") {
                return (
                  <tr className="text-white border-b-[0.01rem] pl-3 border-slate-600">
                    <td className="pl-3 py-4 capitalize">{value.data.text}</td>
                  </tr>
                );
              } else if (value.type == "code") {
                return (
                  <tr className="text-white border-b-[0.01rem] pl-3 border-slate-600">
                    <td className=" capitalize">
                      <Editor
                        height={value.height + "px"}
                        value={value.data.text}
                        language={value.language}
                        options={{ readOnly: true }}
                        theme="vs-dark"
                        width={"100%"}
                      />
                    </td>
                  </tr>
                );
              } else if (value.type == "table") {
                const data = table[index]
                const Data=data[i].data
                return (
                  <tr className="text-white border-b-[0.01rem] pl-3 border-slate-600">
                    <td className="pl-3 py-4 capitalize flex flex-grow pr-2">
                      <table className="w-full border-[1px] border-double border-red-300">
                        {Data.map((data, row) => {
                          return (
                            <tr >
                              {data.map((v) =><td className="capitalize border-[1px] pl-2  border-slate-400">{v}</td> )}
                            </tr>
                          );
                        })}
                      </table>
                    </td>
                  </tr>
                );
              }
            })}
          </td>
        </tr>
      ) : (
        ""
      )}
    </>
  );
}

export default showPageData;

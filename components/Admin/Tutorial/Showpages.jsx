"use client";
import React, { useEffect, useState } from "react";
import AdminAxios from "@/Axios/Admin";
import { BsChevronDoubleDown } from "react-icons/bs";
import ShowpageData from '@/components/Admin/Tutorial/showPageData'
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
function Showpages({ id }) {
  const router=useRouter()
  const token=Cookies.get('Admintoken')
  const [count, setcount] = useState(0);
  const [page, setpage] = useState([]);
  const [name, setname] = useState("");
  const [table, settable] = useState([]);
  useEffect(() => {
    AdminAxios.get("/tutorialpage?id=" + id,{headers:{Authorization:token}}).then((res) => {
      if (res.data.status) {
        setpage(res.data.page);
        setname(res.data.name);
        settable(res.data.Table);
      }else{
        if(res.data.type=='admin'){
          router.push('/admin/login')
        }
      }
    });
  }, [count]);

  return (
    <>
      <div className="bg-gray-800 flex flex-col w-full  h-screen pt-16 pl-9">
        <h1 className="text-white font-bold text-3xl pl-5 py-4">Tutorials</h1>
        <div className="w-full pt-5">
          <table className="w-full table-auto bg-gray-800  overflow-y-auto ">
            <tr className="bg-slate-600 h-10  text-slate-400 text-sm font-normal ">
              <th className="text-left pl-5 w-14">NO</th>
              <th className="text-left pl-5">TUTORIAL</th>
              <th className="text-left pl-5 w-80">PAGE NAME</th>
              <th className="text-left pl-5">STATUS</th>
              <th className="text-left pl-5">VERIFY</th>
              <th className="text-left pl-5">VIEW</th>
            </tr>
            {page.map((data, index) => {
              return (
               <ShowpageData Update={setcount} count={count} data={data} name={name} index={index} table={table} />
              );
            })}
          </table>
        </div>
      </div>
    </>
  );
}

export default Showpages;

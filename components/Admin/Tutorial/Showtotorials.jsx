'use client'
import React, { useEffect, useState } from "react";
import AdminAxios from '@/Axios/Admin'
import { useRouter } from "next/navigation";
import { Link } from "next13-progressbar";
import Cookies from "js-cookie";
import Loader from 'react-spinners/MoonLoader'
function Showtotorials() {
  const [isLoder,setLoder]=useState(false)
  const token=Cookies.get('Admintoken')
    const router=useRouter()
    const [tutorials,SetTutorials]=useState([])
    const [count,Setcount]=useState(0)
    useEffect(()=>{
      setLoder(true)
    AdminAxios.get('/tutorials',{headers:{Authorization:token}}).then((res)=>{
      if(res.data.status){
        SetTutorials(res.data.Tutorials)
        setLoder(false)
      }else{
       if(res.data.type=='admin'){
        router.push('/admin/login')
       }
      }
    }).catch((err)=>{
        console.log(err);
    })
    },[count])
    async function Verify(id,type){
        const res=await  AdminAxios.patch('/tutorialVerify',{id,type},{headers:{Authorization:token}})
        if(res.data.status){    
       Setcount(count+1)
        }else{
          
        router.push('/404')
        }
      }
  return (
    <>
      <div className="bg-gray-800 flex flex-col w-full  h-screen pt-16 pl-9">
        <h1 className="text-white font-bold text-3xl pl-5 py-4">Tutorials</h1>
        <div className="w-full pt-5">
          <table className="w-full table-auto overflow-y-auto ">
            <tr className="bg-slate-600 h-10  text-slate-400 text-sm font-normal ">
              <th className="text-left pl-5 w-14">NO</th>
              <th className="text-left pl-5 w-80">USER</th>
              <th className="text-left pl-5">TUTORIAL</th>
              <th className="text-left pl-5">VERIFY</th>
              <th className="text-left pl-5">VERIFY ALL PAGES</th>
              <th className="text-left pl-5">VIEW PAGES</th>
            </tr>
            {tutorials[0]?<>
            {tutorials.map((data, index) => {
              
                        return (
                            <>
                                <tr key={data._id} className=' h-16 text-white border-b-[0.01rem] border-slate-600 '>
                                    <td className='text-left pl-5 '>
                                        {index + 1}
                                    </td>
                                    
                                    <td className='text-left pl-5'>
                                        <div className='flex'>
                                            {data.UserId.image ?
                                                <img className='bg-black rounded-full h-14 w-14' src={data.UserId.image} alt="" />
                                                :
                                                <div className='bg-black rounded-full h-14 w-14' ></div>
                                            }
                                            <div className='flex flex-col pl-2 pt-1'>
                                                <span>{data.UserId.name}</span>
                                                <span className='text-sm text-slate-400' >{data.UserId.email}</span>
                                            </div>
                                        </div>
                                    </td>
                                  
                                    <td className='text-left pl-5'>
                                        <div className='flex items-center w-full h-14' >
                                            <p className="capitalize">{data.title}</p>
                                        </div>
                                    </td>
                                    <td className='text-left pl-5'>
                                        {data.isVerify ?
                                            <div className='flex items-center w-full h-14' >
                                                <p className='w-3 h-3 pl-3 rounded-full bg-green-400 '></p>
                                                <p className='text-slate-300 pl-2 text-sm capitalize '>verifyed</p>
                                            </div>
                                            :
                                            <div className='flex items-center w-full h-14' >
                                                <p className='w-3 h-3 pl-3 rounded-full bg-red-600'></p>
                                                <p className='text-slate-300 pl-2 text-sm capitalize '>Not verifyed</p>
                                            </div>
                                        }
                                    </td>
                                    <td className="">
                                            {data.isVerify?
                                            <button onClick={()=>Verify(data._id,false)} className='ml-5 mt-3  bg-red-400 h-10 w-24  rounded-md font-semibold'>BANN</button>    
                                            :
                                            <button onClick={()=>Verify(data._id,true)} className='ml-5 mt-3  bg-green-600 h-10 w-24  rounded-md font-semibold'>VERIFY</button>
                                            }
                                    </td>
                                    <td>
                                            <Link href={`/admin/tutorials/${data._id}`} className=' ml-3 px-4 py-2  bg-blue-500 h-10 w-24  rounded-md font-semibold'>VIEW</Link>    
                                    </td>
                                </tr>
                            </>
                        )
                    })} </>:isLoder? 
                   <tr> <td colSpan={6}> <div className="flex flex-grow pt-40 justify-center"><Loader color="white"/></div></td></tr>
                    :''}
          </table>
        </div>
      </div>
    </>
  );
}

export default Showtotorials;

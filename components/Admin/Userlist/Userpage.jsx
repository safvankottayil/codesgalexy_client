'use client'
import React, { useEffect, useRef, useState } from 'react'
import AdminAxios from '@/Axios/Admin'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'

function Userpage() {
    const router=useRouter()
    const [users, SetUsers] = useState([])
    const [count, SetCount] = useState(0)
    const search=useRef(null)
    const token=Cookies.get('Admintoken')
    useEffect(() => {
        AdminAxios.get('/users',{headers:{Authorization:token}}).then((res) => {
            console.log(res.data);
            if (res.data.status) {
                SetUsers(res.data.Users)

            }else{
                if(res.data.type=='admin'){
                    router.push('/admin/login')
                }
            }
        })
    }, [count])
    async function BlockAndUnblck(value, id) {
        try {
            const res = await AdminAxios.patch('/users', { value, id },{headers:{Authorization:token}})
            if (res.data.status) {
                SetCount(count + 1)
            }
        } catch (err) {
        }
    }
    async function Search(){
        try{
        const value=search.current.value
        const res=await AdminAxios.get('/searchUsers?char='+value,{headers:{Authorization:token}})
        console.log(res.data);
        SetUsers(res.data.Users)
        }catch(err){

        }
    }
    return (
        <div className='bg-gray-800 flex flex-col w-full  h-screen pt-16 pl-9'>
            <div className='pl-5 pt-8'>
                <span className='text-white text-2xl font-bold'>All users</span>
            </div>
            <div className='flex pt-3'>
                <input onChange={()=>Search()} ref={search} placeholder='Search for users' className='w-80 text-sm text-white pl-3 rounded-lg ml-3 bg-slate-600 h-10' />
            </div>
            <div className='w-full pt-5' >
                <table className='w-full table-auto '>
                    <tr className='bg-slate-600 h-10  text-slate-400 text-sm font-normal '>
                        <th className='text-left pl-5 w-14'>
                            NO
                        </th>
                        <th className='text-left pl-5 w-80'>
                            NAME
                        </th>
                        <th className='text-left pl-5'>
                            STATUS
                        </th>
                        <th className='text-left pl-5'>
                            VERIFY
                        </th>
                        <th className='text-left pl-5'>

                        </th>
                    </tr>
                    {users.map((user, index) => {
                        return (
                            <>
                                <tr key={user._id} className=' h-16 text-white border-b-[0.01rem] border-slate-600 '>
                                    <td className='text-left pl-5 '>
                                        {index + 1}
                                    </td>
                                    <td className='text-left pl-5'>
                                        <div className='flex'>
                                            {user.image ?
                                                <img className='bg-black rounded-full h-14 w-14' src={user.image} alt="" />
                                                :
                                                <div className='bg-black rounded-full h-14 w-14' ></div>
                                            }
                                            <div className='flex flex-col pl-2 pt-1'>
                                                <span>{user.name}</span>
                                                <span className='text-sm text-slate-400' >{user.email}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='text-left pl-5'>
                                        {user.isBanned ?
                                            <div className='flex items-center w-full h-14' >
                                                <p className='w-3 h-3 pl-3 rounded-full bg-red-600'></p>
                                                <p className='text-slate-300 pl-2 text-sm'>Banned</p>
                                            </div>
                                            :
                                            <div className='flex items-center w-full h-14' >
                                                <p className='w-3 h-3 pl-3 rounded-full bg-green-400'></p>
                                                <p className='text-slate-300 pl-2 text-sm'>Active</p>
                                            </div>
                                        }
                                    </td>
                                    <td className='text-left pl-5'>
                                        <div className='flex items-center w-full h-14' >
                                            {user.isverify ?
                                                <p className='text-slate-300  text-sm'>VERIFYED</p>
                                                :
                                                <p className='text-slate-300  text-sm'>NOT VERIFYED</p>
                                            }
                                        </div>
                                    </td>
                                    <td>
                                        {user.isBanned ?
                                            <button onClick={() => BlockAndUnblck(false, user._id)} className='bg-green-400 h-10 w-24  rounded-md font-semibold'>UNBLOCK</button>
                                            :
                                            <button onClick={() => BlockAndUnblck(true, user._id)} className='bg-red-600 h-10 w-24 rounded-md font-semibold'>BLOCK</button>
                                        }
                                    </td>
                                </tr>
                            </>
                        )
                    })}

                </table>
            </div>


        </div>
    )
}

export default Userpage

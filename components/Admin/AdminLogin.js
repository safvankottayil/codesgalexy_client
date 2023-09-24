'use client'
import React, { useRef, useState } from 'react'
import { FaRegHandPointRight } from 'react-icons/fa'
import adminAxios from '@/Axios/Admin'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'

import Link from 'next/link'
function AdminLogin() {
    const router=useRouter()
    const Admintoken=Cookies.get('Admintoken')
    
    const email = useRef(null)
    const password2 = useRef(null)
    const emailErr = useRef(null)
    const password2Err = useRef(null)
    
 
    function validation(num) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let flag = true
        if (num[0] == 1) {
            if (email.current.value == '') {
                flag = false
                emailErr.current.textContent = 'This field is required'
            } else if (!emailRegex.test(email.current.value)) {
                flag = false
                emailErr.current.textContent = 'Enter email format'
            } else {
                emailErr.current.textContent = ''
            }
        }
        if (num[1] == 2) {
            if (password2.current.value == "") {
                flag = false
                password2Err.current.textContent = 'This field is required'
            }else if(password2.current.value.length < 8){
                flag = false
                password2Err.current.textContent = 'minimum 8 letters'
            } else {
                password2Err.current.textContent = ''
            }
        }
        return flag
    }
    const [type, Settype] = useState('password')
    function Submit() {
        const check = validation([1, 2])
        if (check) {
            recivevalue()
                async function recivevalue(){
                const res=await adminAxios.post('/login', { password: password2.current.value, email: email.current.value })
                console.log(res.data);
                if (res.data.status) {
                  Cookies.set('Admintoken',res.data.token,{expires:2})
                    router.push('/admin')
                }else{
                    if(res.data.type=='email'){
                        emailErr.current.textContent=res.data.msg
                    }else if(res.data.type=='password'){
                        password2Err.current.textContent=res.data.msg
                    }
                }
        }
        }
    }
    return (
        <>
          <div className=''>
            
          </div>
            <div className='h-screen bg-white w-full'>
           
                <div className='w-full justify-start pl-10 items-center fixed flex  bg-blue-400 h-16'>
                    <span className='text-xl font-bold text-gray-900'>CODESGALEXY</span>
                </div>
                <div className='w-full  min-h-screen flex justify-center items-center'>
                    <div className='w-96 h-fit py-4 flex flex-col rounded-lg items-center border-2 border-black '>
                        <p className='font-bold my-4'>Admin Login</p>
                        <div className=' w-4/5 my-1 flex items-center '><FaRegHandPointRight className='float-left' /> <span className='text-xs ml-2'>Your password must be at least 8 characters </span></div>
                        {/* <div className=' w-4/5 my-1 flex items-center '><FaRegHandPointRight className='float-left' /> <span className='text-xs ml-2'>Create A Strong Password </span></div> */}
                        <div className='w-4/5'>
                            <input onChange={() => validation([1, 0])} placeholder='Email' ref={email} type='email' className='rounded-lg mt-2 text-sm h-10 pl-2 focus:outline-none bg-slate-100 w-full' />

                        </div>
                        <div className='w-4/5 flex'><i ref={emailErr} className={`text-red-600 text-xs errFont `}></i></div>
                        <div className='w-4/5 flex'>
                            <input onChange={() => validation([0, 2])} placeholder='password' ref={password2} type={type} className='text-sm mt-2 rounded-lg h-10 pl-2 focus:outline-none bg-slate-100 w-full' />
                        </div>
                        <div className='w-4/5 h-2 flex '><i ref={password2Err} className={`text-red-600 text-xs errFont  mt-1`}></i></div>

                        <div className='w-4/5 flex items-center pt-3'>
                            <input onClick={(e) => e.target.checked ? Settype('text') : Settype('password')} className='ml-2  w-4 h-4 ' type='checkbox' /><span className='ml-2 text-sm'>Show password</span>
                        </div>
                       
                        <div className='w-4/5 flex'>
                            <button onClick={Submit} className='bg-blue-400 mb-6 h-10 w-full rounded-lg mt-2'>Submit</button>
                        </div>
                    </div>


                </div>


            </div>
        </>
    )
}

export default AdminLogin

'use client'
import React, { useRef, useState } from 'react'
import toast from '../Toast/index'
import UserAxios from '../../Axios/client'
function Loginforgotarea() {
    const email=useRef(null),Erremail=useRef(null)
    const [emailErr,SetemailErr]=useState(0)
    function validater(){
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let flag = true
        
            if (email.current.value == '') {
                flag = false
                SetemailErr(1)
                Erremail.current.textContent = 'This field is required'
            } else if (!emailRegex.test(email.current.value)) {
                flag = false
                SetemailErr(1)
                Erremail.current.textContent = 'Enter email format'
            }
            else {
                SetemailErr(2)
                Erremail.current.textContent = ''
            }
        return flag
    }
    function submit(){
        const check=validater()
        if(check){
         UserAxios.post('/forgotpassword',{email:email.current.value}).then((res)=>{
            if(!res.data.status){
                if(res.data.type=='email'){
                    Erremail.current.textContent = res.data.msg
                }
            }else{
                toast({type:'info',message:'We sent emailt o your account.'})
            }
         })
        }
    }
    return (
        <>
            <div className='flex flex-col items-center'>
                <span className='text-xs' >Enter your email and we'll  send you  a link to get</span><span className='text-xs mb-2'>back into your account.</span> 
            </div>
            <div className='flex justify-center w-full ' >
                <input ref={email} onChange={(e) => { validater() }} className={`rounded-lg h-10 focus:outline-none bg-slate-100 w-4/5  ps-4 ${emailErr == 1 ? 'border-b-2 border-rose-500 ' : emailErr == 0 ? ' border-b-2 border-black ' : 'border-b-2 border-green-500 '}`} type='email' placeholder='Email' />

            </div>
            <i ref={Erremail} className={`text-red-600 text-sm errFont ms-9 mt-1`}></i>
            <div className='flex  justify-center w-full ' >
                <button onClick={submit} className='w-4/5 h-10 bg-green-600 rounded-lg text-white font-semibold mb-10' >Send</button>
            </div>
        </>
    )
}

export default Loginforgotarea

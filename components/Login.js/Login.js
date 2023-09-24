'use client'
import React, { useState, useRef, useCallback } from 'react'
// import {GrClose} from 'react-icons/fa'
import UserAxios from '../../Axios/client'
import { XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import Loader from 'react-spinners/MoonLoader'
import { UserLogin, SetUserId, Setimage ,LoginShow,SignUpShow} from '../../Redux/client'
import GoogleLogin from '../Googlelogin/GoogleLogin'
import toast from '../Toast/index'
import Loginforgotarea from '../LoginforgotArea/Loginforgotarea'
import Cookies from 'js-cookie'
function Login(props) {
    const Toast = useCallback((type, message) => {
        toast({ type, message })
    }, [])    
    const [email, setEmail] = useState('')
    const [password, setpassword] = useState('')
    const Erremail = useRef(null), Errpassword = useRef(null)
    const [emailErr, setEmailerr] = useState(0)
    const [PasswordErr, setpasswordErr] = useState(0)
    const [isloader,setLoder]=useState(false)
    const dispatch = useDispatch();
    const [Forgot,SetForgot]=useState(false)
    const { fun, value,Signup } = props

    const submitForm = (e) => {
        e.preventDefault()
        setLoder(true)
        const flag = Validater([1, 2])
        if (flag) {
            UserAxios.post('/login', { email, password }).then((res) => {
                if (res.data.type == 'email') {
                    setEmailerr(1)
                    Erremail.current.textContent = 'Email alredy exist'
                    setLoder(false)
                } else if (res.data.type == 'password') {
                    setpasswordErr(1)
                    Errpassword.current.textContent = 'Password not match'
                    setLoder(false)
                }
                else if (res.data.status) {
                    Cookies.set('token',res.data.token,{expires: 2})
                    dispatch(Setimage({ image: res.data.image }))
                    dispatch(SetUserId({ UserId: res.data.id }))
                    Toast('success', 'Login successfully fished')
                    setLoder(false)
                    dispatch(LoginShow(false))
                   
                }
            })
        }else{
            setLoder(false)
        }
    }
    const Validater = (num) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let flag = true
        if (num[0] == 1) {
            if (email == '') {
                flag = false
                setEmailerr(1)
                Erremail.current.textContent = 'This field is required'
            } else if (!emailRegex.test(email)) {
                flag = false
                setEmailerr(1)
                Erremail.current.textContent = 'Enter email format'
            }
            else {
                setEmailerr(2)
                Erremail.current.textContent = ''
            }
        }
        if (num[1] == 2) {
            if (password == '') {
                flag = false
                setpasswordErr(1)
                Errpassword.current.textContent = 'This field is required'
            } else if (password.length < 8) {
                flag = false
                setpasswordErr(1)
                Errpassword.current.textContent = 'minimum 8 letters'
            } else {
                setpasswordErr(2)
                Errpassword.current.textContent = ''
            }
        }
        return flag
    }
 
    return (
        <div className='flex justify-center h-screen w-screen fixed bg-opacity-40 z-10 bg-black'>
            <div className='w-96 rounded-lg z-20  bg-white h-fit translate-y-2/4 duration-0 flex-col '>
                <div className='flex justify-end'><XMarkIcon onClick={() =>  dispatch(LoginShow(false))} opacity={0.3} className='w-7 h-7' /></div>
                <div>
                    <h6 className='mb-8 text-center text-2xl mt-7 font-extrabold text-slate-950 '>{Forgot?'Forgot Password':'Login'}</h6>
                </div>
                <div>
                    {Forgot?<Loginforgotarea/>:
                    <form onSubmit={submitForm} className=''>
                        
                        <div className='flex justify-center w-full  ' >
                            <input onChange={(e) => { Validater([1, 0]), setEmail(e.target.value) }} className={`rounded-lg h-10 focus:outline-none bg-slate-100 w-4/5  ps-4 ${emailErr == 1 ? 'border-b-2 border-rose-500 ' : emailErr == 0 ? ' border-b-2 border-black ' : 'border-b-2 border-green-500 '}`} type='email' placeholder='Email' de />

                        </div>
                        <i ref={Erremail} className={`text-red-600 text-sm errFont ms-9 mt-1`}></i>
                        <div className='flex justify-center w-full ' >
                            <input onChange={(e) => { Validater([0, 2]), setpassword(e.target.value) }} className={`rounded-lg h-10 focus:outline-none bg-slate-100 w-4/5  ps-4 ${PasswordErr == 1 ? 'border-b-2 border-rose-500 ' : PasswordErr == 0 ? ' border-b-2 border-black ' : 'border-b-2 border-green-500 '}`} type='password' placeholder='Password' />

                        </div>
                        <i ref={Errpassword} className={`text-red-600 text-sm errFont ms-9 mt-1`}></i>
                        <div className='flex justify-center  w-full'>
                            <div className='flex justify-end w-4/5 mb-4 text-blue-700 '>
                                <Link className='text-end text-xs hover:underline' onClick={()=>{SetForgot(true)}} href={''}>Forgot password?</Link>
                            </div>

                        </div>

                        <div className='flex justify-center w-full ' >
                          <GoogleLogin fun={fun}/>
                        </div>
                       
                        <div className='flex justify-center mt-4'>
                            <button className='shadow-sm shadow-black flex justify-center items-center bg-emerald-600 text-white text-lg  w-4/5 h-10 rounded-lg'>{isloader?<Loader size={25} />:'Submit'}</button>
                        </div>
                        <div className='flex w-full justify-center pt-4 mb-8'>
                            <span className='text-sm'> Don’t have an account yet?<span onClick={()=>{ dispatch(LoginShow(false)),dispatch(SignUpShow(false))}} className='text-blue-700 hover:underline text-sm font-bold'> Sign up</span></span>

                        </div>


                    </form>
                    }
                </div>
            </div>
        </div>
    )
}

export default Login

import React from 'react'
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import UserAxios from '../../Axios/client'
import jwt_decode from "jwt-decode";
import { SetUserId,UserLogin,Setimage, LoginShow } from '@/Redux/client';
import toast from '../Toast/index'
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
function GoogleLogins({fun,Signup}) {
    const dispatch=useDispatch()
    function Googlelogin(data){
  
        if(Signup){
        //     console.log(data);
        // UserAxios.post('/googleSignup',{email:data.email,name:data.given_name}).then((res)=>{
        //     console.log(res.data);
        // })
        }else{
        UserAxios.post('/googlelogin',{email:data.email}).then((res)=>{
            if(res.data.status){
                Cookies.set('token',res.data.token,{expires:2 })
                dispatch(Setimage({ image: res.data.image }))
                dispatch(UserLogin({ token: res.data.token }))
                dispatch(SetUserId({ UserId: res.data.id }))
                toast({type:'success',message:'Login successfully fished'})
                dispatch(LoginShow(false))
            }else{
                toast({type:'warning',message:'This user not registered'})
            }
        }
         )}
    }
  return (
    <div>
        <GoogleOAuthProvider clientId="632294220760-b338m0ugn5sucubtblvsiuadg67dvdo1.apps.googleusercontent.com">
            <GoogleLogin width='100%'
                onSuccess={res => {
                    console.log(res);
                    const decoded = jwt_decode(res.credential);
                    Googlelogin(decoded)
                }}
                onError={() => {
                    console.log('Login Failed');
                }}
            />
        </GoogleOAuthProvider>

    </div>
  )
}

export default GoogleLogins

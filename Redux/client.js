import { createSlice } from "@reduxjs/toolkit";
import { Html } from "next/document";
import Cookies from "js-cookie";
const ClientAuth=createSlice({
    name:'Client',
    initialState:{
        Image:'',
        html:'',
        css:'',
        js:'',
        Design_id:'',
        signup:false,
        login:false,

    },
    reducers:{
        SetUserId(state,action){
            state.UserId=action.payload.UserId
        },
        UserLogin(state,action){
            state.Token=action.payload.token
        },
        Setimage(state,action){
            state.Image=action.payload.image
        },
        UserLogout(state){
            state.Token=''
        },
        SetDesignView(state,action){
            state.html=action.payload.html
            state.css=action.payload.css
            state.js=action.payload.js
            state.Design_id=action.payload.id
        },
        LoginShow(state,action){
            state.login=action.payload
        },
        SignUpShow(state,action){
            state.signup=action.payload
        }
    }
})
export const {UserLogin,UserLogout,Setimage,SetUserId,SetDesignView,LoginShow,SignUpShow}=ClientAuth.actions
export const ClentReduser=ClientAuth.reducer

import { NextResponse } from 'next/server'
import {userUrl} from '@/url'


export async function middleware(req) {
   
    const { pathname } = req.nextUrl
  
    if(pathname=='/profile'){
        return NextResponse.redirect('http://localhost:3000/profile/posts')
    }
    console.log(pathname);
try{
const data= req.cookies._parsed.get('token')
console.log(data);
if(data){
    console.log(data);
const response=await fetch(userUrl+'/Auth',{method:'GET',headers:{
    Authorization:data.value
}})
const res=await response.json()
if(res.status){
}else{  
    return NextResponse.redirect('https://codesgalaxy.cloud?login='+true)
}
}else{
    return NextResponse.redirect('https://codesgalaxy.cloud?login='+true)
}
}catch(err){
    console.log(err,12);
} 
}

export const config = {
    matcher: ['/add-design', '/profile','/profile/posts','/profile/posts/:path*','/chat']
  }
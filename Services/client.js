import Cookies from "js-cookie";
import UserAxios from '@/Axios/client'
const token=Cookies.get('token')

export async function SaveTutorial (Totorial_id,page_id,data){
   const res=await  UserAxios.post('/savetutorial',{Totorial_id,page_id,data},{headers:{Authorization:token}})
   console.log(res);
   return res.data
}

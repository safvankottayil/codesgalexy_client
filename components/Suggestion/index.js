import UserAxios from '../../Axios/client'

export const Suggution=(value,update)=>{
        UserAxios.get('/suggution?char='+value).then((res)=>{
            update(res.data.Tages)
        })
    }
export const DesignCategorySuggution=(value,update)=>{
     UserAxios.get('/categorySuggution?char='+value).then((res)=>{
        update(res.data.Category)
     })
}


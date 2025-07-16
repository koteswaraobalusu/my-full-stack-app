import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const authApi=createApi({
    reducerPath:'authApi',
    baseQuery:fetchBaseQuery({baseUrl:'http://localhost:8000/api/',credentials:'include'}),
    endpoints:(builder)=>({
        login:builder.mutation({
            query:(credentials)=>({
                url:'login/',
                method:'POST',
                body:credentials,
            }),
        }),
        register:builder.mutation({
            query:(credentials)=>({
                url:'register/',
                method:'POST',
                body:credentials,
            }),
        }),
        refresh:builder.mutation({
            query:()=>({
                url:'refresh/',
                method:'POST',
                credentials:'include',
                
            }),
        }),
    }),
})


export const {useLoginMutation,useRegisterMutation,useRefreshMutation}=authApi;
export default authApi
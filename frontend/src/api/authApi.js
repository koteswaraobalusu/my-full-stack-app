import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const authApi=createApi({
    reducerPath:'authApi',
    baseQuery:fetchBaseQuery({
        baseUrl:'http://localhost:8000/api/',
        credentials:'include',
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('access_token');
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
      return headers;
    }
    }),
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
            }),
        }),
        status:builder.query({
            query:()=>({
                url:'status/',
                method:'GET',
            }),
        }),
        home:builder.query({
            query:()=>({
                url:'me/'
            }),
        }),
        logout:builder.mutation({
            query:()=>({
                url:'logout/',
                method:'POST',
            }),
        }),
        users_suggest:builder.query({
            query:()=>({
                url:'user-suggestions/',
            }),
        }),
        profile:builder.query({
            query:()=>({
                url:'profile/',
            })
        })
    }),
})


export const {useLoginMutation,useRegisterMutation,useRefreshMutation,useStatusQuery,useHomeQuery,useLogoutMutation,useUsers_suggestQuery,useProfileQuery}=authApi;
export default authApi
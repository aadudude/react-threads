import {api} from "./api";
import type {LoginProps, RegisterProps} from "./types.ts";
import type {User} from "../types.ts";


export const userApi = api.injectEndpoints({
endpoints:(build)=>({
    register: build.mutation<User,RegisterProps>({
        query:({email,password,name})=>({
            url:'/api/register',
            method:'POST',
            body: {email,password,name}
        })
    }),
    login: build.mutation<{token :string} ,LoginProps>({
        query:({email,password})=>({
            url:'/api/login',
            method: 'POST',
            body:{email,password}
        })
    }),
    current:build.query<User,void>({
        query:()=>({url:'/api/current'})
    })
})
})

export const {useRegisterMutation,useLoginMutation,useCurrentQuery} = userApi
import {api} from "./api";
import type {LoginProps, RegisterProps, UpdateUserRequestProps} from "./types.ts";
import type {User} from "../types.ts";


export const userApi = api.injectEndpoints({
endpoints:(build)=>({
    register: build.mutation<User,RegisterProps>({
        query:({email,password,name})=>({
            url:'/register',
            method:'POST',
            body: {email,password,name}
        })
    }),
    login: build.mutation<{token :string} ,LoginProps>({
        query:({email,password})=>({
            url:'/login',
            method: 'POST',
            body:{email,password}
        })
    }),
    current:build.query<User,void>({
        query:()=>({url:'/current'})
    }),
    getUserById: build.query<User,{id:string}>({
        query:({id})=>({
            url:`/users/${id}`,
        })
    }),
    updateUser: build.mutation<void,{id: string, data:UpdateUserRequestProps}>({
        query:({id,data})=>{
            const formData = new FormData()
            if (data.email) formData.append('email',data.email)
            if (data.name) formData.append('name',data.name)
            if (data.dateOfBirth) formData.append('dateOfBirth',data.dateOfBirth)
            if (data.bio) formData.append('bio',data.bio)
            if (data.location) formData.append('location',data.location)
            if (data.avatar) formData.append('avatar',data.avatar)

            return {
            url:`/users/${id}`,
            method:'PUT',
            body:formData
            }
        }
    })
})
})

export const {useRegisterMutation,useLoginMutation,useCurrentQuery} = userApi
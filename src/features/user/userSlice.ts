//todo

import type {User} from "../../app/types.ts";
import {createSlice} from "@reduxjs/toolkit";
import {userApi} from "../../app/services/userApi.ts";

interface InitialState {
    user: User | null
    isAuthenticated: boolean
    users: User[] | null
    current: User | null
    token?: string
}

const initialState:InitialState = {
    user: null,
    isAuthenticated:false,
    users:null,
    current: null,
}


//logout и resetUser

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        logout:()=>initialState,
        resetUser:(state)=> {
            state.user = null
        }
    },
    extraReducers:(builder)=>{
        builder
            .addMatcher(
            userApi.endpoints.login.matchFulfilled,
            (state,action)=>{
                state.token = action.payload.token
                state.isAuthenticated = true
                localStorage.setItem('token',action.payload.token)
            }
        )
            .addMatcher(
                userApi.endpoints.current.matchFulfilled,
                (state,action)=>{
                    state.isAuthenticated = true
                    state.current = action.payload
                }
            )
    }
})

export const {logout,resetUser} = userSlice.actions
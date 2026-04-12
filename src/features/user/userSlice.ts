//todo

import type {User} from "../../app/types.ts";
import {createSlice} from "@reduxjs/toolkit";

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
    current: null
}


//logout и resetUser

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        logout:()=>initialState,
        resetUser:(state)=> {
            state.user = null
        }
    }
})

export const {logout,resetUser} = userSlice.actions
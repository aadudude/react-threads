import {api} from "./api";
import {build} from "vite";


export const userApi = api.injectEndpoints({
endpoints:(build)=>({
    login: build.mutation<{token:string}>
})
})
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {BASE_URL} from "../../constants.ts";

//TODO: FetchBaseQuery с получением токена, класть в хедер
    const baseQuery = fetchBaseQuery({
        baseUrl:`${BASE_URL}/api`
    })

export const api = createApi({
    reducerPath:'splitApi',
    baseQuery,
    endpoints:()=>({})

})
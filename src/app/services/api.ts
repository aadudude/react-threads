import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { BASE_URL } from "../../constants.ts"
import type { RootState } from "../store.ts"

const baseQuery = fetchBaseQuery({
  baseUrl: `${BASE_URL}/api`,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).user.token || localStorage.getItem("token")
    if (token) {
      headers.set("authorization", `Bearer ${token}`)
    }
    return headers
  },
})

export const api = createApi({
  reducerPath: "splitApi",
  baseQuery,
  tagTypes:["Posts","Post","Comments","User"],
  endpoints: () => ({}),
})
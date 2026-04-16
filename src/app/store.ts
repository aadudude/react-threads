import { configureStore } from "@reduxjs/toolkit"
import { api } from "./services/api.ts"
import { userSlice } from "../features/user/userSlice.ts"
import { useDispatch, useSelector } from "react-redux"

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [userSlice.name]: userSlice.reducer,
  },
  middleware: (gDM) => gDM().concat(api.middleware),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export const useAppSelector = useSelector.withTypes<RootState>()
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
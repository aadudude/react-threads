import {configureStore} from "@reduxjs/toolkit";
import {api} from "./services/api.ts";

export const store = configureStore({
    reducer:{
        [api.reducerPath]: api.reducer
    },
    middleware: (gDM)=>gDM().concat(api.middleware)
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {BrowserRouter, Route, Routes} from "react-router";
import {Auth} from "./pages/auth";
import {store} from "./app/store.ts";
import {Provider} from "react-redux";
import {AuthGuard} from "./features/user/AuthGuard.tsx";
import {Dashboard} from "./pages/dashboard";
import {ThemeProvider} from "next-themes";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <ThemeProvider  attribute="class" defaultTheme="light">
      <Provider store={store}>
      <BrowserRouter>
          <Routes>
              <Route path='/' element={<App/>}/>
              <Route path='/auth' element={<Auth/>} />
              <Route element={<AuthGuard/>} >
                  <Route path='/dashboard' element={<Dashboard/>} />
              </Route>
          </Routes>
      </BrowserRouter>
      </Provider>
      </ThemeProvider>
  </StrictMode>,
)

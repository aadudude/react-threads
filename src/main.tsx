import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import { BrowserRouter, Route, Routes } from "react-router"
import { Auth } from "./pages/auth"
import { store } from "./app/store.ts"
import { Provider } from "react-redux"
import { AuthGuard } from "./features/user/AuthGuard.tsx"
import { ThemeProvider } from "next-themes"
import { PostDetails } from "./components/postDetails"
import { Layout } from "./components/layout"
import { Posts } from "./pages/posts"
import { Followers } from "./pages/followers"
import { Index } from "./pages/following"
import { UserInfo } from "./pages/userInfo"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider attribute="class" defaultTheme="light">
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path='/auth' element={<Auth/>}/>
            <Route element={<AuthGuard/>}>
              <Route element={<Layout/>} >
                <Route path='/' element={<Posts/>}/>
                <Route path='/:postId' element={<PostDetails/>}/>
              </Route>
              <Route element={<Layout showUserCard={false}/>}>
                <Route path='/users/:userId' element={<UserInfo/>}/>
                <Route path='/followers' element={<Followers/>}/>
                <Route path='/following' element={<Index/>}/>
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  </StrictMode>,
)

import { logout } from "../../features/user/userSlice.ts"
import { useNavigate } from "react-router"
import { useAppDispatch } from "../../app/store.ts"
import { Posts } from "../posts/index.tsx"
import { CreatePost } from "../../components/createPost/index.tsx"
import { Button } from "@heroui/react"

export const Dashboard = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    navigate("/")
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <Button onClick={handleLogout}>Logout</Button>
      <CreatePost/>
      <Posts/>
    </div>
  )
}
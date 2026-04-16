import { useAppDispatch, useAppSelector } from "../../app/store.ts"
import { Outlet, useNavigate } from "react-router"
import { logout, selectUser } from "../../features/user/userSlice.ts"
import { Button, Spinner } from "@heroui/react"
import { NavBar } from "../navBar"
import { UserCard } from "../userCard"

type LayoutProps = {
    showUserCard?: boolean
}

export const Layout = ({ showUserCard = true }: LayoutProps) => {
  const user = useAppSelector(selectUser)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    navigate("/")
  }
  const handleUserProfile =() => {
    navigate(`/users/${user?.id}`)
  }

  const gridCols = showUserCard ? "lg:grid-cols-4" : "lg:grid-cols-3"

  if (!user) return <div className="flex items-center gap-4">
    <Spinner/>
  </div>

  return (
    <div className='flex flex-col bg-gray-100 px-4 md:px-6 lg:px-60 gap-8 '>
      <header className='flex justify-between mx-40 mt-6 '>
        <h1>Network Social</h1>
        <div>
          <Button onClick={handleLogout}>Logout</Button>
        </div>
      </header>

      <div className={`flex flex-col md:flex-row lg:grid gap-8 ${gridCols}`}>
        <NavBar/>
        <main className='col-span-2 '>
          <Outlet/>
        </main>
        {showUserCard &&
                    <aside>
                      <UserCard buttonText='В профиль' email={user?.email} name={user?.name}
                        avatarUrl={user?.avatarUrl} onClick={handleUserProfile}/>
                    </aside>
        }
      </div>
    </div>
  )
}
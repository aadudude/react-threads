import { useAppDispatch, useAppSelector } from "../../app/store.ts"
import { Outlet, useNavigate } from "react-router"
import { logout, selectUser } from "../../features/user/userSlice.ts"
import { Button, Card } from "@heroui/react"
import { NavBar } from "../navBar"

export const Layout = () => {
  const userId = useAppSelector(selectUser)?.id
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    navigate("/")
  }
  const handleUserProfile =() => {
    navigate(`/users/${userId}`)
  }

  return (
    <div className='flex flex-col bg-gray-100 px-4 md:px-6 lg:px-60 gap-8 '>
      <header className='flex justify-between mx-40 mt-6 '>
        <h1>Network Social</h1>
        <div>
          <Button onClick={handleLogout}>Logout</Button>
        </div>
      </header>

      <div className="flex flex-col md:flex-row lg:grid lg:grid-cols-4 gap-8 ">
        <NavBar/>
        <main className='col-span-2 '>
          <Outlet/>
        </main>
        <aside>
          <div className='flex flex-col items-center col-span-1'>
            <div className='w-[96%] h-[96%]'>
              <Card className=" min-h-80 overflow-hidden rounded-3xl ">
                <img
                  alt="NEO Home Robot"
                  aria-hidden="true"
                  className="absolute inset-0 h-full w-full object-cover"
                  src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/neo2.jpeg"
                />
                <Card.Footer className="z-10 mt-auto flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-black">wfewefwfewe</div>
                    <div className="text-xs text-black/60">wfewef@sdfsdf.com</div>
                  </div>
                  <Button className="bg-white text-black" size="sm" variant="tertiary" onClick={handleUserProfile}>
                                    В профиль
                  </Button>
                </Card.Footer>
              </Card>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
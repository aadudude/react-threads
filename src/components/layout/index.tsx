import { useAppDispatch } from "../../app/store.ts"
import { useNavigate } from "react-router"
import { logout } from "../../features/user/userSlice.ts"
import { Button, Card } from "@heroui/react"
import { CreatePost } from "../createPost"
import { Posts } from "../../pages/posts"

export const Layout = () => {

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    navigate("/")
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
        <nav className='col-span-1 flex flex-col bg-amber-300 items-end '>
          <ul className='flex flex-col gap-6'>
            <li>Посты</li>
            <li>Подписки</li>
            <li>Подписчики</li>
          </ul>
        </nav>
        <main className='col-span-2 flex flex-col gap-6 '>
          <section>
            <CreatePost/>
          </section>
          <section>
            {/*//надо каждый пост в отдельную секцию внутрь компонента вставить, тут layout*/}
            <Posts/>
          </section>
        </main>
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
                <Button className="bg-white text-black" size="sm" variant="tertiary">
                                    В профиль
                </Button>
              </Card.Footer>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
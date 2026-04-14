import { Login } from "../../features/user/login.tsx"
import { Register } from "../../features/user/register.tsx"
import { Tabs } from "@heroui/react"
import { useState } from "react"

export type SelectedProps = "login" | "register"

export const Auth = () => {

  const [selected, setSelected] = useState<SelectedProps>("login")

  return (
    <div className='flex justify-center items-center h-screen
       w-full' >
      <div className='w-full max-w-md min-h-87.5
       md:min-h-112.5'>
        <Tabs
          className=""
          selectedKey={selected}
          onSelectionChange={(key) => setSelected(key as SelectedProps)}
        >
          <Tabs.ListContainer>
            <Tabs.List aria-label="Options">
              <Tabs.Tab id="login">
                            Вход
                <Tabs.Indicator/>
              </Tabs.Tab>
              <Tabs.Tab id="register">
                            Регистрация
                <Tabs.Indicator/>
              </Tabs.Tab>
            </Tabs.List>
          </Tabs.ListContainer>
          <Tabs.Panel className="pt-4" id="login">
            <Login setSelected={setSelected} />
          </Tabs.Panel>
          <Tabs.Panel className="pt-4" id="register">
            <Register setSelected={setSelected} />
          </Tabs.Panel>
        </Tabs>
      </div>
    </div>
  )
}
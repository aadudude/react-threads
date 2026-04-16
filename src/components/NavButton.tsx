import { Button } from "@heroui/react"
import { useNavigate } from "react-router"

type NavButtonProps = {
    children: React.ReactNode
    icon: React.ReactNode
    href: string
}

export const NavButton = ({ children, icon, href }: NavButtonProps) => {
  const navigate = useNavigate()
  return (
    <div>
      <Button onClick={() => navigate(href)} variant="secondary">
        {icon}
        {children}
      </Button>
    </div>
  )
}
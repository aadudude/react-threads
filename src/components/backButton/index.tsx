import { Button } from "@heroui/react"
import { ChevronLeft } from "@gravity-ui/icons"
import { useNavigate } from "react-router"

type BackButtonProps = {
    goMain?: boolean
}

export const BackButton = ({ goMain = true }: BackButtonProps) => {
  const navigate = useNavigate()

  const handleBack = () => {
    if (goMain) {
      navigate("/")
    } else {
      navigate(-1)
    }
  }
  return (
    <Button isIconOnly variant="tertiary" onClick={handleBack}>
      <ChevronLeft/>
    </Button>
  )
}
import { useParams } from "react-router"
import { BackButton } from "../../components/backButton"

export const User =() => {
  const { userId } = useParams()
  if (!userId){
    throw new Error("userId is Required!")
  }
  return (
    <div className='flex flex-col gap-5'>
      <BackButton/>
      <div>User: {userId}</div>
    </div>
  )
}
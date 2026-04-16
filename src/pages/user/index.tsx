import { useParams } from "react-router"

export const User =() => {
  const { userId } = useParams()
  if (!userId){
    throw new Error("userId is Required!")
  }
  return (
    <div>User: {userId}</div>
  )
}
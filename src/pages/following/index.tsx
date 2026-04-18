import { BackButton } from "../../components/backButton"
import { useCurrentQuery } from "../../app/services/userApi.ts"

export const Index =() => {
  const { data } = useCurrentQuery()
    
  return (
    <div className='flex flex-col gap-5'>
      <BackButton/>
      {data.following.length === 0?
        <div>Подписок нет</div>
        :
        <div>Followers</div>
      }
    </div>
  )
}
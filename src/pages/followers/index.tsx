import { BackButton } from "../../components/backButton"
import { useCurrentQuery } from "../../app/services/userApi.ts"

export const Followers = () => {
  const { data } = useCurrentQuery()

  return (
    <div className='flex flex-col gap-5'>
      <BackButton/>
      {data.followers.length === 0?
        <div>Подписчиков нет</div>
        :
        <div>Followers</div>
      }

    </div>
  )
}
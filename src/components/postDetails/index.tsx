import { useParams } from "react-router"
import { useGetPostQuery } from "../../app/services/postsApi.ts"
import { PostCard } from "../postCard"
import { Button, Label, Spinner, TextArea } from "@heroui/react"

export const PostDetails =() => {
  const params = useParams()
  const { data,isLoading } = useGetPostQuery({ id: params.postId })
  if (isLoading) return <div className="flex items-center gap-4">
    <Spinner />
  </div>
  return (
    <div className='flex flex-col gap-12' >
      {data && <PostCard key={data.id} postId={data.id} avatarUrl={data.author.avatarUrl}
        authorName={data.author.name}
        createdAt={new Date(data.createdAt).toLocaleDateString("ru-RU")}
        content={data.content} likes={[]} comments={[]} isDetails={true} />
      }

      <div className='flex flex-col gap-6'>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <TextArea
              aria-label="Short feedback"
              id="textarea-rows-3"
              placeholder="Напишите свой комментарий"
              rows={3}
            />
          </div>
        </div>
        <Button>Ответить</Button>
      </div>
    </div>
  )
}
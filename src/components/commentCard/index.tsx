import { Card, ErrorMessage } from "@heroui/react"
import { TrashBin, Ellipsis } from "@gravity-ui/icons"
import { useLazyGetPostQuery } from "../../app/services/postsApi.ts"
import { isErrorWithMessage, isFetchBaseQueryError } from "../../services/helpers.ts"
import { useState } from "react"
import { useDeleteCommentMutation } from "../../app/services/commentsApi.ts"

type CommentCardProps = {
  authorName: string
  avatarUrl: string
  postId: string
  commentId: string
  content: string
}

export const CommentCard = ({ authorName, avatarUrl, postId, commentId, content }: CommentCardProps) => {
  const [deleteComment,{ isLoading }] =useDeleteCommentMutation()
  const [getPost] = useLazyGetPostQuery()
  const [fetchError, setFetchError] = useState("")

  const handleDelete =async () => {
    try{
      setFetchError("")
      await deleteComment({ commentId, postId }).unwrap()
      await getPost({ id: postId }).unwrap()
    }catch(err){
      if (isFetchBaseQueryError(err)) {
        const errMsg = "error" in err ? err.error : (err.data as {
          error?: string
        })?.error || "Что-то пошло не так"
        setFetchError(errMsg)
      } else if (isErrorWithMessage(err)) {
        setFetchError(err.message)
      }
    }
  }

  return (
    <div>
      <Card className="flex  w-full gap-4">
        <Card.Header className='flex flex-row justify-between'>
          <div className='flex flex-row gap-1.5 items-center'>
            <div>
              <img
                alt="Indie Hackers community"
                className="pointer-events-none aspect-square w-10 rounded-2xl object-cover select-none"
                loading="lazy"
                src={`http://localhost:3000${avatarUrl}`}
              />
            </div>
            <div>
              <Card.Title>{authorName}</Card.Title>
            </div>
          </div>
          <div className='cursor-pointer hover:opacity-70' onClick={handleDelete}>
            {isLoading?<Ellipsis/>:<TrashBin/>}
          </div>
        </Card.Header>
        <Card.Content>
          <p>{content}</p>
          <ErrorMessage>{!!fetchError && <>{fetchError}</>}</ErrorMessage>
        </Card.Content>
      </Card>
    </div>
  )
}
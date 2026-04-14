import { Card } from "@heroui/react"
import { Heart,HeartFill,Comment ,CommentDot, TrashBin,Ellipsis } from "@gravity-ui/icons"
import { useDeletePostMutation, useLazyGetPostsQuery } from "../../app/services/postsApi.ts"
import { isErrorWithMessage, isFetchBaseQueryError } from "../../services/helpers.ts"
import { useState } from "react"
import type { Like } from "../../app/types.ts"
import { Link } from "react-router"

type PostCardProps = {
  authorName:string
  avatarUrl:string
  createdAt:string
  likes:Like[]
  comments:Comment[]
  postId:string
  content:string,
  isDetails: boolean
}

export const PostCard =({ authorName,avatarUrl,createdAt,likes,comments,postId,content,isDetails=false }:PostCardProps) => {
  const [deletePost,{ isLoading }] =useDeletePostMutation()
  const [triggerGetPosts] = useLazyGetPostsQuery()
  const [error, setError] = useState("")

  const handleDelete =async () => {
    try{
      await deletePost({ id: postId }).unwrap()
      await triggerGetPosts()
    }catch(err){
      if (isFetchBaseQueryError(err)) {
        const errMsg = "error" in err ? err.error : (err.data as {
          error?: string
        })?.error || "Что-то пошло не так"
        setError(errMsg)
      } else if (isErrorWithMessage(err)) {
        setError(err.message)
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
              <Card.Description>{createdAt}</Card.Description>
            </div>
          </div>
          <div className='cursor-pointer hover:opacity-70' onClick={handleDelete}>
            {isLoading?<Ellipsis/>:<TrashBin/>}
          </div>
        </Card.Header>
        <Card.Content>
          <p>{content}</p>
        </Card.Content>
        <Card.Footer className="flex gap-2">
          <div className='cursor-pointer hover:opacity-70'>
            <Heart/>
          </div>
          {isDetails?
            <Comment/>:<Link to={`/dashboard/${postId}`} className='cursor-pointer hover:opacity-70' >
              <Comment/>
            </Link>}
        </Card.Footer>
      </Card>
    </div>
  )
}
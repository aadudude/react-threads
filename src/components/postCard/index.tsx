import { Card, ErrorMessage } from "@heroui/react"
import { Heart, Comment, TrashBin, Ellipsis } from "@gravity-ui/icons"
import { useDeletePostMutation } from "../../app/services/postsApi.ts"
import { isErrorWithMessage, isFetchBaseQueryError } from "../../services/helpers.ts"
import { useState } from "react"
import { Link, useNavigate } from "react-router"
import type { PostCardProps } from "./types.ts"
import { useLikePostMutation, useUnlikePostMutation } from "../../app/services/likesApi.ts"
import { useAppSelector } from "../../app/store.ts"
import { selectUser } from "../../features/user/userSlice.ts"



export const PostCard = ({
  authorName,
  avatarUrl,
  createdAt,
  likes,
  comments,
  postId,
  content,
  isDetails = false,
}: PostCardProps) => {
  const navigate = useNavigate()
  const userId  = useAppSelector(selectUser)?.id
  const [deletePost, { isLoading }] = useDeletePostMutation()
  const [likePost] = useLikePostMutation()
  const [unlikePost] = useUnlikePostMutation()

  const [fetchError, setFetchError] = useState("")

  const likesCount = likes.length
  const commentsCount = comments.length

  const likeId = likes.find(like => like.userId === userId)?.id

  const handleDelete = async () => {
    try {
      setFetchError("")
      await deletePost({ id: postId }).unwrap()
      if (isDetails) {
        navigate("/")
      }
    } catch (err) {
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

  const handleToggleLike = async () => {
    try {
      setFetchError("")
      if(likeId) {
        await unlikePost({ postId,likeId }).unwrap()
      }else{
        await likePost({ postId }).unwrap()
      }
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
              <Card.Description>{createdAt}</Card.Description>
            </div>
          </div>
          <div className='cursor-pointer hover:opacity-70' onClick={handleDelete}>
            {isLoading ? <Ellipsis/> : <TrashBin/>}
          </div>
        </Card.Header>
        <Card.Content>
          <p>{content}</p>
          <ErrorMessage>{!!fetchError && <>{fetchError}</>}</ErrorMessage>
        </Card.Content>
        <Card.Footer className="flex gap-2">
          <div className='flex justify-center items-center gap-1 cursor-pointer hover:opacity-70' onClick={handleToggleLike}>
            <Heart/> {likesCount}
          </div>
          {isDetails ?
            <div className='flex justify-center items-center gap-1 cursor-default'>
              <Comment/> {commentsCount}
            </div>
            : <Link to={`/${postId}`}
              className='flex justify-center items-center gap-1 cursor-pointer hover:opacity-70'>
              <Comment/> {commentsCount}
            </Link>}
        </Card.Footer>
      </Card>
    </div>
  )
}
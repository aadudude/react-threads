import { useParams } from "react-router"
import { useGetPostQuery } from "../../app/services/postsApi.ts"
import { PostCard } from "../postCard"
import { Button, ErrorMessage, FieldError, Form, Spinner, TextArea, TextField } from "@heroui/react"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { useCreateCommentMutation } from "../../app/services/commentsApi.ts"
import { isErrorWithMessage, isFetchBaseQueryError } from "../../services/helpers.ts"
import { CommentCard } from "../commentCard"
import type { Post } from "../../app/types.ts"
import type { CommentFormData, PostDetailsParams } from "./types.ts"

export const PostDetails = () => {
  const [createComment, { isLoading: IsCommentSending }] = useCreateCommentMutation()

  const { postId } = useParams<PostDetailsParams>()
  if (!postId) {
    throw new Error("postId is required")
  }
  const { data, isLoading: IsPostLoading } = useGetPostQuery({ id: postId })
  const post: Post | undefined = data


  const { register, handleSubmit, formState: { errors }, reset } = useForm<CommentFormData>({
    mode: "onTouched",
    reValidateMode: "onBlur",
  })
  const [fetchError, setFetchError] = useState("")

  const onSubmit = async (data: CommentFormData) => {
    try {
      setFetchError("")
      await createComment({ content: data.comment, postId: postId }).unwrap()
      reset()
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

  if (IsPostLoading) return <div className="flex items-center gap-4">
    <Spinner/>
  </div>
  return (
    <div className='flex flex-col gap-12'>
      {post && <PostCard key={post.id} postId={post.id} avatarUrl={post.author.avatarUrl}
        authorName={post.author.name}
        createdAt={new Date(post.createdAt).toLocaleDateString("ru-RU")}
        content={post.content} likes={post.likes} comments={post.comments} isDetails={true}/>
      }

      <div className='flex flex-col gap-6'>
        <div className="flex flex-col gap-4">

          <Form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-2">
              <TextField
                aria-labelledby="textarea-controlled-comment"
                aria-label="Short comment"
                isInvalid={!!errors.comment}
              >
                <TextArea
                  {...register("comment", {
                    required: "Напишите комментарий",
                    minLength: {
                      value: 5,
                      message: "Минимальная длина сообщения - 5 символов.",
                    },
                  })}
                  id="textarea-rows-3"
                  placeholder="Напишите свой комментарий"
                  rows={3}/>
                {errors.comment && (
                  <FieldError>{errors.comment.message}</FieldError>
                )}
              </TextField>
              <ErrorMessage>{!!fetchError && <>{fetchError}</>}</ErrorMessage>
              <Button type='submit' isDisabled={IsCommentSending}>Ответить</Button>
            </div>
          </Form>
        </div>
      </div>
      {post?.comments && post.comments.map(comment => <CommentCard authorName={comment.user?.name || ""}
        avatarUrl={comment.user?.avatarUrl || ""}
        postId={comment.postId} commentId={comment.id}
        content={comment.content}/>)}
    </div>
  )
}
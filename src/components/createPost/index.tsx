import { Button, Description, ErrorMessage, FieldError, Form, Label, TextArea, TextField } from "@heroui/react"
import { useState } from "react"
import { LogoTelegram } from "@gravity-ui/icons"
import { useCreatePostMutation, useLazyGetPostsQuery } from "../../app/services/postsApi.ts"
import { isErrorWithMessage, isFetchBaseQueryError } from "../../services/helpers.ts"
import { useForm } from "react-hook-form"

type PostForm = {
    content: string
}

export const CreatePost = () => {
  const [createPost, { isLoading }] = useCreatePostMutation()
  const [triggerGetPosts] = useLazyGetPostsQuery()

  const { register, handleSubmit, formState: { errors, isValid },watch } = useForm<PostForm>({
    mode: "onTouched",
    reValidateMode: "onBlur",
  })
  const contentValue = watch("content") || ""

  const [fetchError, setFetchError] = useState("")

  const onSubmit = async () => {
    try {
      await createPost({ content: contentValue }).unwrap()
      await triggerGetPosts()
      setFetchError("")
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
  return (
    <div className='flex flex-col gap-6'>
      <Form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">

        <TextField isRequired isInvalid={!!errors.content} name="bio">
          <Label>Bio</Label>
          <TextArea {...register("content", {
            required: "Напишите что-то",
            minLength: {
              value: 5,
              message: "Пост не может быть меньше 5 символов",
            },
          })}
          className="h-32"
          aria-describedby="textarea-controlled-description"
          aria-label="Announcement"
          placeholder="О чем думаете?"/>
          {errors.content && (
            <FieldError>{errors.content.message}</FieldError>
          )}
        </TextField>

        <Description id="textarea-controlled-description">
                        Символов: {contentValue.length} / 280
        </Description>
        <ErrorMessage>{!!fetchError && <>{fetchError}</>}</ErrorMessage>
        <Button type='submit' isDisabled={ !isValid || isLoading}>
                    Добавить пост
          <LogoTelegram/>
        </Button>
      </Form>
    </div>
  )
}
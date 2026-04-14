import { Button, Description, TextArea } from "@heroui/react"
import { useState } from "react"
import { LogoTelegram } from "@gravity-ui/icons"
import { useCreatePostMutation, useLazyGetPostsQuery } from "../../app/services/postsApi.ts"
import { isErrorWithMessage, isFetchBaseQueryError } from "../../services/helpers.ts"

export const CreatePost = () => {
  const [createPost, { isLoading }] = useCreatePostMutation()
  const [triggerGetPosts] = useLazyGetPostsQuery()

  const [value, setValue] = useState("")
  const [error, setError] = useState("")

  const handleCreatePost = async () => {
    try{
      await createPost({ content: value }).unwrap()
      setValue("")
      await triggerGetPosts()
    }catch (err){
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
    <div className='flex flex-col gap-6'>
      <div className="flex flex-col gap-2">
        <TextArea
          required
          className="h-32"
          aria-describedby="textarea-controlled-description"
          aria-label="Announcement"
          placeholder="О чем думаете?"
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
        <Description id="textarea-controlled-description">
                    Символов: {value.length} / 280
        </Description>
      </div>
      {error && <p>error</p> }
      <Button onClick={handleCreatePost} isDisabled={isLoading}>
                Добавить пост
        <LogoTelegram/>
      </Button>
    </div>
  )
}
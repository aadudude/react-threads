import { Button, Description, TextArea } from "@heroui/react"
import { useState } from "react"
import { LogoTelegram } from "@gravity-ui/icons"

export const CreatePost =() => {
  const [value,setValue] = useState("")
  return (
    <div className='flex flex-col gap-6'>
      <div className="flex flex-col gap-2">
        <TextArea
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
      <Button>
        Добавить пост
        <LogoTelegram />
      </Button>
    </div>
  )
}
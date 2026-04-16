import { Button, Card } from "@heroui/react"
import type { UserCardProps } from "./types.ts"

export const UserCard =({ email="customEmail",name,avatarUrl,buttonText, onClick }:UserCardProps) => {
  return (
    <div className='flex flex-col items-center col-span-1'>
      <Card className=" min-h-80 overflow-hidden rounded-3xl ">
        <img
          alt="NEO Home Robot"
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
          src={`http://localhost:3000${avatarUrl}`}
        />
        <Card.Footer className="z-10 mt-auto flex items-center justify-between">
          <div>
            <div className="text-sm font-medium text-black">{name}</div>
            <div className="text-xs text-black/60">{email}</div>
          </div>
          <Button className="bg-white text-black" size="sm" variant="tertiary" onClick={onClick}>
            {buttonText}
          </Button>
        </Card.Footer>
      </Card>
    </div>
  )
}
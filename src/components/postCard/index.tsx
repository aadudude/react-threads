import { Card } from "@heroui/react"
import { Heart,HeartFill,Comment, TrashBin } from "@gravity-ui/icons"

export const PostCard =() => {
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
                src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/demo1.jpg"
              />
            </div>
            <div>
              <Card.Title>Mike</Card.Title>
              <Card.Description>11.02.2024</Card.Description>
            </div>
          </div>
          <div><TrashBin/></div>
        </Card.Header>
        <Card.Content>
          <p>Привет, это мой первый пост!</p>
        </Card.Content>
        <Card.Footer className="flex gap-2">
          <Heart/>
          <Comment/>
        </Card.Footer>
      </Card>
    </div>
  )
}
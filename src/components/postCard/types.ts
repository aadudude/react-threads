import type { Like, CommentEntity } from "../../app/types.ts"

export type PostCardProps = {
    authorName: string
    avatarUrl: string
    createdAt: string
    likes: Like[]
    comments: CommentEntity[]
    postId: string
    content: string
    isDetails: boolean
}
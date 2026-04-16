export type User = {
    id: string
    email: string
    name: string
    avatarUrl: string
    dateOfBirth: string | null
    createdAt: string
    updatedAt: string
    bio: string | null
    location: string | null
    password?: string
}

export type Like = {
    id: string
    userId: string
    postId: string
}

export type CommentEntity = {
    id: string
    content: string
    userId: string
    postId: string
    user?: User
}

export type Post = {
    id: string
    content: string
    author: User
    authorId: string
    likes: Like[]
    comments: CommentEntity[]
    likedByUser: boolean
    createdAt: string
}

export type Follows = {
    id: string
    follower: User
    followerId: string
    following: User
    followingId: string
}

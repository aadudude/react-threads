export type User = {
    id: string
    email: string
    name?: string
    avatarUrl?: string | null
    dateOfBirth?: string | null
    createdAt: string
    updatedAt?: string
    bio?: string | null
    location?: string | null
}

export type Follows = {
    id: string
    follower: User
    followerId: string
    following: User
    followingId: string
}

export type Post = {
    id: string
    content: string
    author: User
    authorId: string
    likes: Like[]
    comments: Comment[]
    likedByUser: boolean
    createdAt: string
}

export type Like = {
    id: string
    user: User
    userId: string
    post: Post
    postId: string
}

export type Comment = {
    id: string
    content: string
    user: User
    userId: string
    post: Post
    postId: string
}

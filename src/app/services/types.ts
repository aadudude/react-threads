export interface RegisterProps {
    email: string
    password: string
    name: string
}

export interface LoginProps {
    email: string
    password: string
}

export interface UpdateUserProps {
    userData: FormData,
    id: string
}

export interface PostProps {
    id: string
    content: string
    authorId: string
    createdAt: string
}

export interface CommentRequestProps {
    content: string
    postId: string
}

export interface CommentProps {
    id: string
    content: string
    userId: string
    postId: string
}

export interface UpdateUserRequestProps{
    email?:string
    name?: string
    dateOfBirth?: string
    bio?: string
    location?: string
    avatar?: File
}
export type RegisterProps = {
    email: string
    password: string
    name: string
}

export type LoginProps = {
    email: string
    password: string
}

export type UpdateUserRequestProps = {
    email?: string
    name?: string
    dateOfBirth?: string
    bio?: string
    location?: string
    avatar?: File
}

export type UpdateUserProps = {
    userData: FormData
    id: string
}

export type CommentRequestProps = {
    content: string
    postId: string
}
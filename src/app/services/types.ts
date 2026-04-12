export interface RegisterProps{
    email:string
    password:string
    name: string
}
export interface LoginProps{
   email: string
   password: string
}

export interface UpdateUserProps {
   userData: FormData,
    id: string
}
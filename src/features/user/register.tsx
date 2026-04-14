import { useRegisterUserMutation } from "../../app/services/userApi.ts"
import { Button, Description, ErrorMessage, FieldError, Form, Input, Label, TextField } from "@heroui/react"
import { Link } from "react-router"
import { Check } from "@gravity-ui/icons"
import { useForm } from "react-hook-form"
import { type Dispatch, type SetStateAction, useState } from "react"
import type { SelectedProps } from "../../pages/auth"
import { isErrorWithMessage, isFetchBaseQueryError } from "../../services/helpers.ts"

type RegisterForm = {
    email:string
    password:string
    name:string
}

export const Register = ({ setSelected }:{setSelected:Dispatch<SetStateAction<SelectedProps>>}) => {
  const [registerUser, { isLoading }] = useRegisterUserMutation()

  const [fetchError,setFetchError] = useState("")
  const [registerSuccess, setRegisterSuccess] = useState("")

  const { register:registerField, handleSubmit, formState:{ errors } } = useForm<RegisterForm>({
    mode: "onSubmit",
    reValidateMode: "onBlur",
  })
  const onSubmit = async (data: RegisterForm) => {
    try{
      await registerUser({ email:data.email, password:data.password, name: data.name }).unwrap()
      setRegisterSuccess("Успешная регистрация")
    } catch (err){
      if (isFetchBaseQueryError(err)) {
        const errMsg = "error" in err ? err.error : (err.data as {
          error?: string
        })?.error || "Что-то пошло не так"
        setFetchError(errMsg)
      } else if (isErrorWithMessage(err)) {
        setFetchError(err.message)
      }
    }
  }

  return (
    <div>
      <Form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <TextField
          type="text"
          isInvalid={!!errors.name}
        >
          <Label>Имя</Label>
          <Input
            {...registerField("name",{
              required:"Имя обязательно",
              minLength:{
                value: 3,
                message: "Имя минимум 3 символа",
              },
            })}
            type='text'
            placeholder="john@example.com" />
          <FieldError >
            { errors.name && <p>{errors.name.message}</p>}
          </FieldError>
        </TextField>

        <TextField
          type="email"
          isInvalid={!!errors.email}
        >
          <Label>Email</Label>
          <Input
            {...registerField("email",{
              required:"Email обязателен",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Некорректный email адрес",
              },
            })}
            type='email'
            placeholder="john@example.com" />
          <FieldError >
            { errors.email && <p>{errors.email.message}</p>}
          </FieldError>
        </TextField>

        <TextField
          type="password"
          isInvalid={!!errors.password}
        >
          <Label>Пароль</Label>
          <Input
            {...registerField("password",{
              required:"Пароль обязателен",
              minLength:{
                value: 6,
                message: "Пароль минимум 6 символов",
              },
            })}
            type='password'
            placeholder="Enter your password" />
          <FieldError >
            { errors.password && <p>{errors.password.message}</p>}
          </FieldError>
        </TextField>
        <div className='flex gap-1.5 justify-center'>
          <span>Есть аккаунт?</span>
          <Link className="underline" onClick={() => setSelected("login")} to={""}>
                        Войти
          </Link>
        </div>
        <ErrorMessage>{!!fetchError && <>{fetchError}</>}</ErrorMessage>
        <Description className="text-success">
          {!!registerSuccess && <>Регистрация прошла
          успешно</>}
        </Description>
        <div className="flex">
          <Button fullWidth type="submit" isDisabled={isLoading || !!registerSuccess}>
            <Check />
                        Регистрация
          </Button>
        </div>
      </Form>
    </div>
  )
}
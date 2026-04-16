import { useLoginUserMutation } from "../../app/services/userApi.ts"
import { type Dispatch, type SetStateAction, useState } from "react"
import { Link, useNavigate } from "react-router"
import { Check } from "@gravity-ui/icons"
import { isErrorWithMessage, isFetchBaseQueryError } from "../../services/helpers.ts"
import { Form, Button, FieldError, Input, Label, TextField, ErrorMessage } from "@heroui/react"
import { useForm } from "react-hook-form"
import type { SelectedProps } from "../../pages/auth"

type LoginForm = {
  email: string
  password: string
}

export const Login = ({ setSelected }:{setSelected:Dispatch<SetStateAction<SelectedProps>>}) => {
  const [loginUser, { isLoading }] = useLoginUserMutation()
  const navigate = useNavigate()

  const [fetchError,setFetchError] = useState("")

  const { register, handleSubmit,formState:{  errors } } = useForm<LoginForm>({
    mode: "onSubmit",
    reValidateMode: "onBlur",
  })

  const onSubmit = async (data:LoginForm) => {
    try {
      await loginUser({ email: data.email, password: data.password }).unwrap()
      navigate("/")
    } catch (err) {
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
    <div >
      <Form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)} >
        <TextField
          isInvalid={!!errors.email}
        >
          <Label>Email</Label>
          <Input
            {...register("email",{
              required: "Email обязателен",
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
          isInvalid={!!errors.password}
        >
          <Label>Пароль</Label>
          <Input
            {...register("password",{
              required:"Пароль обязателен",
              minLength:{
                value:6,
                message:"Пароль минимум 6 символов",
              },
            })}
            type='password'
            placeholder="Введите пароль" />
          <FieldError >
            { errors.password && <p>{errors.password.message}</p>}
          </FieldError>
        </TextField>
        <div className='flex gap-1.5 justify-center'>
          <span>Нет аккаунта?</span>
          <Link className="underline" onClick={() => setSelected("register")} to={""}>
          Зарегистрируйтесь
          </Link>
        </div>
        <ErrorMessage>{!!fetchError && <>{fetchError}</>}</ErrorMessage>
        <div className="flex">
          <Button fullWidth type="submit" isDisabled={!!isLoading}>
            <Check />
            Войти
          </Button>
        </div>
      </Form>
    </div>
  )
}
import type{ DateValue } from "@internationalized/date"
import { parseDate } from "@internationalized/date"
import { useForm, Controller, type ControllerRenderProps } from "react-hook-form"
import {
  Button,
  DateField,
  DatePicker,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
  Calendar,
  TextArea, ErrorMessage,
} from "@heroui/react"
import { Check, TrashBin } from "@gravity-ui/icons"
import { useRef } from "react"
import { useUpdateUserMutation } from "../../app/services/userApi.ts"

type EditFormProps = {
    id: string
    name?: string
    email?: string
    dateOfBirth?: string
    bio?: string
    location?: string
}
type EditFormData = {
    email?: string|null
    name?: string|null
    file?: File|null
    dateOfBirth?: DateValue | null
    bio?: string|null
    location?: string|null
}

export const EditForm = ({ id, name,email, dateOfBirth, bio, location }: EditFormProps) => {
  const [updateUser,{ isLoading }] = useUpdateUserMutation()

  const { register, handleSubmit, setError, formState: { errors },control,watch,reset } = useForm<EditFormData>(
    {
      defaultValues:{
        name,
        email,
        dateOfBirth:dateOfBirth ? parseDate(dateOfBirth.substring(0,10)) : null,
        bio,
        location,
      },
      mode: "onSubmit",
      reValidateMode: "onBlur",
    },
  )

  const onSubmit = async (data:EditFormData) => {
    await updateUser({ id,data:{
      name: data.name || name,
      email:data.email||email,
      avatar:data.file||undefined,
      dateOfBirth: data.dateOfBirth?`${data.dateOfBirth.toString()}T00:00:00Z`:undefined,
      bio: data.bio || bio,
      location:data.location || location,
    } }).unwrap()

  }

  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleFileInputPress = () => {
    fileInputRef.current?.click()
  }

  const handleResetFile =() => {
    reset({ file: undefined })
  }
  const handleFileChange =(e:React.ChangeEvent<HTMLInputElement>,field: ControllerRenderProps<EditFormData, "file">) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile && !selectedFile.type.startsWith("image/")){
      setError("file",{ type:"validate" ,message:"Можно загрузить только изображения" })
      return
    }
    field.onChange(selectedFile)
  }

  const file = watch("file")

  return (
    <Form
      className="flex w-96 flex-col gap-4"
      render={(props) => <form {...props} data-custom="foo"/>}
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextField
        name="email"
        isInvalid={!!errors.email}
      >
        <Label>Email</Label>
        <Input
          {...register("email", {
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Некорректный email адрес",
            },
          })}
          placeholder="john@example.com"/>
        <FieldError >
          { errors.email && <p>{errors.email.message}</p>}
        </FieldError>
      </TextField>

      <TextField
        name="name"
        type="name"
        isInvalid={!!errors.name}
      >
        <Label>Имя</Label>
        <Input
          {...register("name", {
            minLength: {
              value: 3,
              message: "Имя минимум 3 символа",
            },
          })}
          placeholder="Enter your password"/>
        <FieldError >
          { errors.name && <p>{errors.name.message}</p>}
        </FieldError>
      </TextField>
      <Controller
        name='file'
        control={control}
        rules={{
          validate: (file) => {
            if (!file) return true
            if (!file.type.startsWith("image/")){
              return "Можно загрузить только изображения"
            }
            return true
          },
        }}
        render={({ field }) => (
          <input
            type='file'
            ref={fileInputRef}
            hidden
            onChange={e => handleFileChange(e,field)}
          />
        )}
      />
      {errors.file?<Button variant="danger" onClick={handleResetFile}><TrashBin /> Сбросить</Button>:
        <Button onClick={handleFileInputPress}>{file?.name || "Выберите файл"}</Button>
      }
      <ErrorMessage>{!!errors.file && <>Разрешены JPEG, PNG, BMP</>}</ErrorMessage>

      <Controller
        name='dateOfBirth'
        control={control}
        render={({ field }) => (
          <DatePicker className="w-64" name="date"
            value={field.value}
            onChange={field.onChange}
          >
            <Label>Дата рождения</Label>
            <DateField.Group fullWidth>
              <DateField.Input>{(segment) => <DateField.Segment segment={segment}/>}</DateField.Input>
              <DateField.Suffix>
                <DatePicker.Trigger>
                  <DatePicker.TriggerIndicator/>
                </DatePicker.Trigger>
              </DateField.Suffix>
            </DateField.Group>
            <DatePicker.Popover>
              <Calendar aria-label="Event date">
                <Calendar.Header>
                  <Calendar.YearPickerTrigger>
                    <Calendar.YearPickerTriggerHeading/>
                    <Calendar.YearPickerTriggerIndicator/>
                  </Calendar.YearPickerTrigger>
                  <Calendar.NavButton slot="previous"/>
                  <Calendar.NavButton slot="next"/>
                </Calendar.Header>
                <Calendar.Grid>
                  <Calendar.GridHeader>
                    {(day) => <Calendar.HeaderCell>{day}</Calendar.HeaderCell>}
                  </Calendar.GridHeader>
                  <Calendar.GridBody>{(date) => <Calendar.Cell date={date}/>}</Calendar.GridBody>
                </Calendar.Grid>
                <Calendar.YearPickerGrid>
                  <Calendar.YearPickerGridBody>
                    {({ year }) => <Calendar.YearPickerCell year={year}/>}
                  </Calendar.YearPickerGridBody>
                </Calendar.YearPickerGrid>
              </Calendar>
            </DatePicker.Popover>
          </DatePicker>
        )}
      />

      <TextField
        name="bio"
      >
        <Label>Bio</Label>
        <TextArea
          {...register("bio")}
          placeholder="Tell us about yourself..."/>
        <FieldError/>
      </TextField>
      <TextField
        name="location"
        type="text"
        isInvalid={!!errors.location}
      >
        <Label>Местоположение</Label>
        <Input
          {...register("location",{
            minLength:{
              value: 3,
              message:"Города менее 3 букв не принимаются",
            },
          })}
          placeholder="город"/>
        <FieldError >
          { errors.location && <p>{errors.location.message}</p>}
        </FieldError>
      </TextField>

      <div className="flex gap-2">
        <Button fullWidth type="submit" isDisabled={isLoading}>
          <Check/>
                    Обновить профиль
        </Button>

      </div>
    </Form>
  )
}
import { useForm } from "react-hook-form"
import {
  Button,
  DateField,
  DatePicker,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
  Calendar,
  TextArea,
} from "@heroui/react"
import {  Check } from "@gravity-ui/icons"

type EditFormProps = {
    id: string
    name: string
    dateOfBirth:string
    bio:string
    location:string
}
type EditFormData = EditFormProps & { avatar: File }

export const EditForm =({ id,name,dateBirth,bio,location }:EditFormProps) => {

  const { register, handleSubmit,formState:{ errors } } = useForm<EditFormData>(
    {
      mode: "onSubmit",
      reValidateMode: "onBlur",
    },
  )
  return (
    <Form
      className="flex w-96 flex-col gap-4"
      render={(props) => <form {...props} data-custom="foo" />}

    >
      <TextField
        isRequired
        name="email"
        type="email"
        validate={(value) => {
          if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
            return "Please enter a valid email address"
          }
          return null
        }}
      >
        <Label>Email</Label>
        <Input placeholder="john@example.com" />
        <FieldError />
      </TextField>

      <TextField
        isRequired
        minLength={8}
        name="name"
        type="name"
      >
        <Label>Имя</Label>
        <Input placeholder="Enter your password" />
        <FieldError />
      </TextField>
      <Button>Выберите файл</Button>
      <DatePicker className="w-64" name="date">
        <Label>Дата рождения</Label>
        <DateField.Group fullWidth>
          <DateField.Input>{(segment) => <DateField.Segment segment={segment} />}</DateField.Input>
          <DateField.Suffix>
            <DatePicker.Trigger>
              <DatePicker.TriggerIndicator />
            </DatePicker.Trigger>
          </DateField.Suffix>
        </DateField.Group>
        <DatePicker.Popover>
          <Calendar aria-label="Event date">
            <Calendar.Header>
              <Calendar.YearPickerTrigger>
                <Calendar.YearPickerTriggerHeading />
                <Calendar.YearPickerTriggerIndicator />
              </Calendar.YearPickerTrigger>
              <Calendar.NavButton slot="previous" />
              <Calendar.NavButton slot="next" />
            </Calendar.Header>
            <Calendar.Grid>
              <Calendar.GridHeader>
                {(day) => <Calendar.HeaderCell>{day}</Calendar.HeaderCell>}
              </Calendar.GridHeader>
              <Calendar.GridBody>{(date) => <Calendar.Cell date={date} />}</Calendar.GridBody>
            </Calendar.Grid>
            <Calendar.YearPickerGrid>
              <Calendar.YearPickerGridBody>
                {({ year }) => <Calendar.YearPickerCell year={year} />}
              </Calendar.YearPickerGridBody>
            </Calendar.YearPickerGrid>
          </Calendar>
        </DatePicker.Popover>
      </DatePicker>
      <TextField
        isRequired
        name="bio"
        validate={(value) => {
          if (value.length < 10) {
            return "Bio must be at least 10 characters"
          }

          return null
        }}
      >
        <Label>Bio</Label>
        <TextArea placeholder="Tell us about yourself..." />
        <Description>Minimum 10 characters</Description>
        <FieldError />
      </TextField>
      <TextField
        isRequired
        name="email"
        type="email"
        validate={(value) => {
          if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
            return "Please enter a valid email address"
          }
          return null
        }}
      >
        <Label>Местоположение</Label>
        <Input placeholder="john@example.com" />
        <FieldError />
      </TextField>

      <div className="flex gap-2">
        <Button fullWidth type="submit">
          <Check />
                  Обновить профиль
        </Button>

      </div>
    </Form>
  )
}
import { useParams } from "react-router"
import { BackButton } from "../../components/backButton"
import { Modal, Spinner, Surface } from "@heroui/react"
import { UserCard } from "../../components/userCard"
import { useGetUserByIdQuery } from "../../app/services/userApi.ts"
import { useState } from "react"
import { EditForm } from "../../components/editForm"

export const UserInfo =() => {
  const { userId } = useParams()
  if (!userId){
    throw new Error("userId is Required!")
  }
  const [isOpen, setIsOpen] = useState(false)
  const { data, isLoading }= useGetUserByIdQuery({ id:userId })

  const handleOpenModal =() => {
    setIsOpen(true)
  }

  if (isLoading || !data) return <div className="flex items-center gap-4">
    <Spinner/>
  </div>

  return (
    <div className='flex flex-col gap-5'>
      <BackButton/>
      <div className='flex flex-col md:flex-row lg:flex-row gap-2.5' >
        <UserCard email={data.email} name={data.name} avatarUrl={data.avatarUrl} buttonText='Редактировать' onClick={handleOpenModal} />
        <Surface
          className="flex min-w-[320px] flex-col gap-3 rounded-3xl border p-6"
          variant="transparent"
        >
          <p className="text-sm text-muted">
            Почта: {data.email}
          </p>
          <p className="text-sm text-muted">
            Местоположение: {data.location || "N/A"}
          </p>
          <p className="text-sm text-muted">
            Дата рождения: {new Date(data.dateOfBirth||"0").toLocaleDateString("ru-RU")}
          </p>
          <p className="text-sm text-muted">
            Обо мне: {data.dateOfBirth||"N/A"}
          </p>
          <div className='flex gap-2.5' >
            <p className="text-sm text-muted">
            Подписчики {data.followers.length}
            </p>
            <p className="text-sm text-muted">
            Подписки {data.following.length}
            </p>
          </div>
        </Surface>
      </div>
      <Modal.Backdrop isOpen={isOpen} onOpenChange={setIsOpen}>
        <Modal.Container>
          <Modal.Dialog>
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Heading>Изменение профиля</Modal.Heading>
            </Modal.Header>
            <Modal.Body>
              <EditForm id={data.id} name={data.name} dateOfBirth={data.dateOfBirth||""} bio={data.bio||""} location={data.location||""}/>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
      <div>User: {userId}</div>
    </div>
  )
}
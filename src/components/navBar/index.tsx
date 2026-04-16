import { NavButton } from "../NavButton.tsx"
import { PersonMagnifier, Persons, SquareBars } from "@gravity-ui/icons"

export const NavBar = () => {
  return (
    <nav className='col-span-1 flex flex-col items-end '>
      <ul className='flex flex-col gap-6'>
        <li className='ml-auto'><NavButton href='/' icon={<SquareBars/>}>Посты</NavButton></li>
        <li className='ml-auto'><NavButton href='/following' icon={<Persons/>}>Подписки</NavButton></li>
        <li className='ml-auto'><NavButton href='/followers' icon={<PersonMagnifier/>}>Подписчики</NavButton>
        </li>
      </ul>
    </nav>
  )
}
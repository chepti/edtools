import Link from 'next/link'

const NavItems = () => {
  return (
    <ul className="md:flex-between flex w-full flex-col items-start gap-5 md:flex-row">
      {/* Placeholder for navigation items */}
      <li className="text-primary-500">
        <Link href="/">בית</Link>
      </li>
      <li className="text-primary-500">
        <Link href="/tools">כלי הכלים</Link>
      </li>
      {/* Add more links as needed */}
    </ul>
  )
}

export default NavItems 
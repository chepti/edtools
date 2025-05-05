import React from 'react'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import Image from 'next/image'
import NavItems from './NavItems'


const MobileNav = () => {
  return (
    <nav className="md:hidden">
      <Sheet>
        <SheetTrigger className="align-middle">
          <Image 
            src="/assets/icons/menu.svg" // Assuming you have a menu icon
            alt="menu"
            width={24}
            height={24}
            className="cursor-pointer"
          />
        </SheetTrigger>
        <SheetContent className="flex flex-col gap-6 bg-white md:hidden">
          {/* Placeholder for mobile logo/title */}
           <Image
            src="/logo-holmin.png"
            width={38}
            height={38}
            alt="Holmin Tikshuv logo"
          />
          <span className="font-semibold text-lg">כלים AI</span> 
          <hr className="border border-gray-50" />
          <NavItems />
        </SheetContent>
      </Sheet>
    </nav>
  )
}

export default MobileNav 
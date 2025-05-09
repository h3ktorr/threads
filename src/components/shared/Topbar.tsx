import { OrganizationSwitcher, SignedIn, SignOutButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Image from "next/image";
import Link from "next/link";

export default function Topbar(){
 return (
  <nav className="topbar bg-gray-950">
   <Link href='/' className="flex items-center gap-4">
    <Image src='/assets/logo.svg' alt="logo" width={28} height={28} />
    <p className="text-heading3-bold text-white max-sm:hidden head-4-text">Threads</p>
   </Link>

   <div className="flex items-center gap-1">
    <div className="block md:hidden">
     <SignedIn>
      <SignOutButton>
       <div className="flex cursor-pointer">
        <Image src='/assets/logout.svg' alt="logout" width={24} height={24}/>
       </div>
      </SignOutButton>
     </SignedIn>
    </div>

    <OrganizationSwitcher 
     appearance={{
      baseTheme: dark,
      elements: {
       organizationSwitcherTrigger: 'py-2 px-4'
     }}} />
   </div>
  </nav>
 )
}
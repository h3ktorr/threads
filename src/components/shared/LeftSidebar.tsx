"use client"

import { sidebarLinks } from "@/constants";
import { SignedIn, SignOutButton, useAuth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LeftSidebar(){
 const pathname = usePathname();
 const { userId } = useAuth();

 return (
  <section className="custom-scrollbar leftsidebar bg-gray-950">
   <div className="flex w-full flex-col text-sm gap-6 px-6">
    {sidebarLinks.map(link=> {
     const isActive = (pathname.includes(link.route) && link.route.length > 1) || pathname === link.route;

     if(link.route === '/profile') link.route =  `${link.route}/user_2w1mPO9isH6h817ceKmEhZAaxIM`;

     console.log(userId);
     

     return (
     <Link href={link.route} key={link.label} className={`leftsidebar_link ${isActive && 'bg-purple-400'} head-5-text`}>
      <Image src={link.imgURL} alt={link.label} width={20} height={20} />
      <p className=" text-white max-lg:hidden">{link.label}</p>
     </Link>
    )}
   )}
   </div>

   <div className="mt-10 px-6">
    <SignedIn>
      <SignOutButton redirectUrl="/sign-in">
       <div className="flex cursor-pointer gap-4 p-4">
        <Image src='/assets/logout.svg' alt="logout" width={24} height={24}/>
        <p className="text-white max-lg:hidden">Logout</p>
       </div>
      </SignOutButton>
     </SignedIn>
   </div>
  </section>
 )
}
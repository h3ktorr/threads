import ProfileHeader from "@/components/shared/ProfileHeader";
import ThreadsTab from "@/components/shared/ThreadsTab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { profileTabs } from "@/constants";
import { fetchUser } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs/server"
import { table } from "console";
import Image from "next/image";
import { redirect } from "next/navigation"

interface PageProps {
  params: Promise<{ id: string }>;
}

const Page = async ({ params }: PageProps) => {
 const { id } = await params;
 if (!id) return null

 const user = await currentUser();

 if(!user) return null;

 const userInfo = await fetchUser(id);

 if(!userInfo?.onboarded) redirect('/onboarding')

 return (
  <section className="">
   <ProfileHeader
    accountId={userInfo.id}
    authUserId={user.id}
    name={userInfo.name}
    username={userInfo.username}
    imgUrl={userInfo.image}
    bio={userInfo.bio}
   />

   <div className="mt-9 ">
    <Tabs defaultValue="threads" className="w-full">
     <TabsList className="tab w-full">
      {profileTabs.map(tab => (
       <TabsTrigger key={tab.label} value={tab.value} className="tab">
        <Image 
         src={tab.icon}
         alt={tab.label}
         width={24}
         height={24}
         className="object-contain"
        />
       <p className="max-sm:hidden">{tab.label}</p>
       {tab.label === 'Threads' && (
        <p className="ml-1 rounded-sm bg-gray-500 px-2 py-1 !text-tiny-medium text-white">{userInfo?.threads?.length}</p>
       )}
       </TabsTrigger>
      ))}
     </TabsList>
     {profileTabs.map(tab => (
      <TabsContent key={`content-${tab.label}`} value={tab.value} className="w-full text-white">
        <ThreadsTab 
          currentUserId={user.id}
          accountId={userInfo.id}
          accountType='User'
        />
      </TabsContent>
     ))}
    </Tabs>
   </div>
  </section>
 )
}

export default Page;
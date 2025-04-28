import Image from "next/image";
import { currentUser } from "@clerk/nextjs/server";
import { communityTabs } from "@/constants";
import ProfileHeader from "@/components/shared/ProfileHeader";
import ThreadsTab from "@/components/shared/ThreadsTab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchCommunityDetails } from "@/lib/actions/community.action";
import UserCard from "@/components/cards/UserCard";


interface PageProps {
  params: Promise<{ id: string }>;
}

const Page = async ({ params }: PageProps) => {
 const { id } = await params;
 if (!id) return null

 const user = await currentUser();
 if(!user) return null;

 const communityDetails = await fetchCommunityDetails(id)

 return (
  <section className="">
   <ProfileHeader
    accountId={communityDetails.id}
    authUserId={user.id}
    name={communityDetails.name}
    username={communityDetails.username}
    imgUrl={communityDetails.image}
    bio={communityDetails.bio}
    type="Community"
   />

   <div className="mt-9 ">
    <Tabs defaultValue="threads" className="w-full">
     <TabsList className="tab w-full">
      {communityTabs.map(tab => (
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
        <p className="ml-1 rounded-sm bg-gray-500 px-2 py-1 !text-tiny-medium text-white">{communityDetails?.threads?.length}</p>
       )}
       </TabsTrigger>
      ))}
     </TabsList>
     
      <TabsContent value='threads' className="w-full text-white">
        <ThreadsTab 
          currentUserId={user.id}
          accountId={communityDetails.id}
          accountType='Community'
        />
      </TabsContent>
      <TabsContent value='members' className="w-full text-white">
        <section className="mt-9 flex flex-col gap-10">
         {communityDetails?.members.map((member: any) => (
          <UserCard
           key={member.id}
           id={member.id}
           name={member.name}
           username={member.username}
           imgUrl={member.imgUrl}
           personType="User"
          />
         ))}
        </section>
      </TabsContent>
      <TabsContent value='requests' className="w-full text-white">
        <ThreadsTab 
          currentUserId={user.id}
          accountId={communityDetails.id}
          accountType='Community'
        />
      </TabsContent>
    </Tabs>
   </div>
  </section>
 )
}

export default Page;
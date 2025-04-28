import AccountProfile from "@/components/forms/AccountProfile";
import { fetchUser } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";


export default async function Page() {
 const user = await currentUser();
 if(!user) return null;

 const userInfo = fetchUser(user.id)
 if(userInfo?.onboarded) redirect('/')

 const userData = {
  id: user?.id,
  objectId: userInfo?._id,
  username: userInfo?.username || user?.username,
  name: userInfo?.name || user?.firstName || '',
  bio: userInfo?.bio || '',
  image: userInfo?.image || user?.imageUrl
 }

 return (
  <main className="mx-auto flex max-w-3xl flex-col justify-start px-10 py-20">
   <h1 className="head-text head-3-text">Onboarding</h1>
   <p className="mt-3 text-base-regular head-6-text">Complete your profile now to use threads</p>

   <section className="mt-9 bg-gray-950 p-10">
    <AccountProfile 
     user={userData} 
     btnTitle='Continue' 
    />
   </section>
  </main>
 )
}

//work on all fonts
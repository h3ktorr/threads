import { fetchUser, getActivity } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs/server"
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation"

const Page = async () => {
  const user = await currentUser();
  if(!user) return null;

  const userInfo = await fetchUser(user.id);
  if(!userInfo?.onboarded) redirect('/onboarding')

  //get activities
  const activity = await getActivity(userInfo._id);

  return (
    <section>
     <h1 className="head-text mb-10 text-white">Activity</h1>

     <section className="mt-19 flex flex-col gap-5">
      {activity.length > 0 ? (
        <>
          {activity.map((newActivity) => (
            <Link key={newActivity._id} href={`/thread/${newActivity.parentId}`}>
              <article className="activity-card">
                <Image 
                  src={newActivity.author.image}
                  alt="Profile Picture"
                  width={20}
                  height={20}
                  className="rounded-full object-cover"
                />
                <p className="!text-small-regular text-white">
                  <span className="mr-1 text-purple-300">
                    {newActivity.author.name}
                  </span>{" "}
                  replied to your thread
                </p>
              </article>
            </Link>
          ))}
        </>
      ):(
        <p className="text-gray-300">No new activity</p>
      )}
     </section>
    </section>
  )
}

export default Page
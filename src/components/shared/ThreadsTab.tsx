import { fetchUserPosts } from "@/lib/actions/user.action";
import { redirect } from "next/navigation";
import ThreadCard from "../cards/ThreadCard";
import { fetchCommunities, fetchCommunityPosts } from "@/lib/actions/community.action";

interface Props{
 currentUserId: string;
 accountId: string;
 accountType: string;
}

const ThreadsTab = async({currentUserId, accountId, accountType}: Props) => {
 let result: any;

 if(accountType === 'Community'){
  result = await fetchCommunityPosts(accountId)
 } else {
  result = await fetchUserPosts(accountId)
 }

 if(!result) redirect('/')

 return (
  <section className="mt-9 flex flex-col gap-10">
   {result.threads.map((thread: any) => (
    <ThreadCard 
     key={thread._id}
     id={thread._id}
     currentUserId={currentUserId}
     parentId={thread.parentId}
     content={thread.text}
     author={
      accountType === 'User' ?
       {name: result.name, image: result.image, id: result.id} : 
       {name: thread.author.name, image: thread.author.image, id: thread.author.id}
     } //todo
     community={thread.community} //todo
     createdAt={thread.createdAt}
     comments={thread.children}
    />
   ))}
  </section>
 )
}

export default ThreadsTab
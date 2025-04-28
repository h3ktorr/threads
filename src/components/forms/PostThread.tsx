"use client"

import { useForm } from "react-hook-form";
import * as z from 'zod'
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
  } from "../ui/form";
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { usePathname, useRouter } from "next/navigation";
// import { updateUser } from "@/lib/actions/user.action";
import { ThreadValidation } from "@/lib/validations/thread";
import { createThread } from "@/lib/actions/thread.action";
import { useOrganization } from "@clerk/nextjs";


interface AccountProps{
 user: {
  id: string,
  objectId: string,
  username: string,
  name: string,
  bio: string,
  image: string,
 },
 btnTitle: string
}



export default function PostThread({userId}: {userId: string}){
 const pathname = usePathname();
 const router = useRouter();
 const { organization } = useOrganization();
 
 const form = useForm({
  resolver: zodResolver(ThreadValidation),
  defaultValues: {
  thread: '',
  accountId: userId
 }
 })

 const onSubmit = async(values: z.infer<typeof ThreadValidation>) => {
  console.log('org: ', organization)
  await createThread({
    text: values.thread,
    author: userId,
    communityId: organization ? organization.id : null,
    path: pathname
  })

  router.push('/');
 }

 return (
  <Form {...form}>
   <form 
    onSubmit={form.handleSubmit(onSubmit)} className="mt-10 flex flex-col justify-start gap-10"
   >
    <FormField
     control={form.control}
     name="thread"
     render={({ field }) => (
      <FormItem className="flex flex-col w-full gap-3 ">
       <FormLabel className="text-base-semibold text-white head-5-text">
        Content
      </FormLabel>
      <FormControl className="no-focus border corder-dark-4 bg-gray-900 text-white">
       <Textarea
        rows={15}
        {...field}
       />
      </FormControl>
      <FormMessage />
     </FormItem>
    )}
    />

    <Button type="submit" className="bg-purple-400">Post Thread</Button>
   </form>
  </Form>
 )
}
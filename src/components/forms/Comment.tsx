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
import { Input } from "../ui/input";
import { usePathname, useRouter } from "next/navigation";
import { CommentValidation } from "@/lib/validations/thread";
import Image from "next/image";
import { addCommentToThread } from "@/lib/actions/thread.action";
// import { createThread } from "@/lib/actions/thread.action";

interface Props{
 threadId: string;
 currentUserImg: string;
 currentUserId: string;
}

const Comment = ({ threadId, currentUserImg, currentUserId}: Props) => {
 const pathname = usePathname();
  const router = useRouter();
  
  const form = useForm({
   resolver: zodResolver(CommentValidation),
   defaultValues: {
   thread: '',
  }
  })
 
  const onSubmit = async(values: z.infer<typeof CommentValidation>) => {
   await addCommentToThread(
     threadId, 
     values.thread, 
     JSON.parse(currentUserId), 
     pathname
   )
 
   form.reset();
  }

 return (
  <Form {...form}>
     <form 
      onSubmit={form.handleSubmit(onSubmit)} className="comment-form"
     >
      <FormField
       control={form.control}
       name="thread"
       render={({ field }) => (
        <FormItem className="flex w-full items-center gap-3 ">
         <FormLabel>
          <Image 
           src={currentUserImg} 
           alt="Profile Image"
           width={48}
           height={48}
           className="rounded-full object-cover"
          />
        </FormLabel>
        <FormControl className="border-none bg-transparent">
         <Input
          type="text"
          placeholder="Comment..."
          className="no-focus text-white outline-none"
          {...field}
         />
        </FormControl>
       </FormItem>
      )}
      />
  
      <Button type="submit" className=" comment-form_btn bg-purple-400">Reply</Button>
     </form>
    </Form>
 )
}

export default Comment;
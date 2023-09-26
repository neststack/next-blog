'use client';

import { toast } from "react-hot-toast";
import axios from "axios";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import { SafePost, SafeUser } from "@/app/types";

import Heading from "@/app/components/Heading";
import Container from "@/app/components/Container";
import PostCard from "@/app/components/posts/PostCard";

interface MyPostsClientProps {
  posts: SafePost[],
  currentUser?: SafeUser | null,
}

const MyPostsClient: React.FC<MyPostsClientProps> = ({
  posts,
  currentUser
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState('');

  const onDelete = useCallback((id: string) => {
    setDeletingId(id);

    axios.delete(`/api/posts/${id}`)
    .then(() => {
      toast.success('Post deleted');
      router.refresh();
    })
    .catch((error) => {
      toast.error(error?.response?.data?.error)
    })
    .finally(() => {
      setDeletingId('');
    })
  }, [router]);


  return ( 
    <Container>
      <Heading
        title="Blog Posts"
        subtitle="List of your blog posts"
      />
      <div 
        className="
          mt-10
          flex
          flex-col 
          gap-8
        "
      >
        {posts.map((post: any) => (
          <PostCard
            key={post.id}
            data={post}
            actionId={post.id}
            onActionPrimary={onDelete}
            onActionSecondary={onDelete}
            actionLabelPrimary="Edit post"
            actionLabelSecondary="Delete post"
            disabled={deletingId === post.id}
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
   );
}
 
export default MyPostsClient;
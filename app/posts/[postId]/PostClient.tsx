'use client';

import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { Range } from "react-date-range";
import { useRouter } from "next/navigation";
import { differenceInDays, eachDayOfInterval } from 'date-fns';

import useLoginModal from "@/app/hooks/useLoginModal";
import { SafePost, SafeUser } from "@/app/types";

import Container from "@/app/components/Container";
import PostHead from "@/app/components/posts/PostHead";
import PostInfo from "@/app/components/posts/PostInfo";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection'
};

interface PostClientProps {
  post: SafePost & {
    user: SafeUser;
  };
}

const PostClient: React.FC<PostClientProps> = ({
  post,
}) => {
  const loginModal = useLoginModal();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  return ( 
    <Container>
      <div 
        className="
          max-w-screen-lg 
          mx-auto
        "
      >
        <div className="flex flex-col gap-6">
          <PostHead
            title={post.title}
            content={post.content}
          />
          <hr />
          <PostInfo
            user={post.user}
            createdAt={post.createdAt}
            updatedAt={post.updatedAt}
          />
        </div>
      </div>
    </Container>
   );
}
 
export default PostClient;

'use client';

import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
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

  // const onCreateReservation = useCallback(() => {
  //     if (!currentUser) {
  //       return loginModal.onOpen();
  //     }
  //     setIsLoading(true);

  //     axios.post('/api/reservations', {
  //       totalPrice,
  //       startDate: dateRange.startDate,
  //       endDate: dateRange.endDate,
  //       postId: post?.id
  //     })
  //     .then(() => {
  //       toast.success('Listing reserved!');
  //       setDateRange(initialDateRange);
  //       router.push('/trips');
  //     })
  //     .catch(() => {
  //       toast.error('Something went wrong.');
  //     })
  //     .finally(() => {
  //       setIsLoading(false);
  //     })
  // },
  // [
  //   totalPrice, 
  //   dateRange, 
  //   post?.id,
  //   router,
  //   currentUser,
  //   loginModal
  // ]);

  // useEffect(() => {
  //   if (dateRange.startDate && dateRange.endDate) {
  //     const dayCount = differenceInDays(
  //       dateRange.endDate, 
  //       dateRange.startDate
  //     );
      
  //     if (dayCount && post.price) {
  //       setTotalPrice(dayCount * post.price);
  //     } else {
  //       setTotalPrice(post.price);
  //     }
  //   }
  // }, [dateRange, post.price]);

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

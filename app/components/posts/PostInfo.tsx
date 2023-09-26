'use client';

import { SafeUser } from '@/app/types';

import { format } from 'date-fns';
import { useMemo } from 'react';

interface PostInfoProps {
  user: SafeUser;
  createdAt: string;
  updatedAt: string;
}

const PostInfo: React.FC<PostInfoProps> = ({
  user,
  createdAt,
  updatedAt,
}) => {
  const modified = useMemo(() => {
    if (!createdAt && !updatedAt) {
      return null;
    }

    const date = new Date(updatedAt ?? createdAt);

    return `${format(date, 'PP')}`;
  }, [createdAt, updatedAt]);

  return (
    <div className='flex md:flex-row justify-between flex-col gap-2'>
      <div className='text-lg'>
          <div>Created by {user?.name}</div>
      </div>
      {modified && (
        <div
          className='
            text-lg 
            font-light 
            text-neutral-500
          '
        >
          Last updated at {modified}
        </div>
      )}
      <hr />
    </div>
  );
};

export default PostInfo;

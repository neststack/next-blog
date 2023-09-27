'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { format } from 'date-fns';

import { SafePost, SafeUser } from '@/app/types';

import Button from '../Button';

interface PostCardProps {
  data: SafePost;
  onActionPrimary?: (id: string) => void;
  onActionSecondary?: (id: string) => void;
  disabled?: boolean;
  actionLabelPrimary?: string;
  actionLabelSecondary?: string;
  actionId?: string;
  currentUser?: SafeUser | null;
}

const PostCard: React.FC<PostCardProps> = ({
  data,
  onActionPrimary,
  onActionSecondary,
  disabled,
  actionLabelPrimary,
  actionLabelSecondary,
  actionId = '',
  currentUser,
}) => {
  const router = useRouter();

  const title = data?.title ?? '';
  const content = data?.content ?? '';
  const author = data?.author ?? '';

  const modified = useMemo(() => {
    if (!data?.createdAt && !data?.updatedAt) {
      return null;
    }

    const date = new Date(data?.updatedAt ?? data?.createdAt);

    return `${format(date, 'PP')}`;
  }, [data.createdAt, data.updatedAt]);

  const primaryAction = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) {
        return;
      }

      onActionPrimary?.(actionId);
    },
    [disabled, onActionPrimary, actionId]
  );

  const secondaryAction = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) {
        return;
      }

      onActionSecondary?.(actionId);
    },
    [disabled, onActionSecondary, actionId]
  );

  return (
    <div
      onClick={() => router.push(`/posts/${data.id}`)}
      className='p-4 rounded-xl border-gray-200 border shadow-md hover:shadow-lg col-span-1 cursor-pointer group'
    >
      <div className='flex flex-col gap-2 w-full'>
        <div className='font-semibold text-lg capitalize'>{title}</div>
        <div className='font-light text-ellipsis w-full overflow-hidden whitespace-nowrap text-neutral-500'>
          {content}
        </div>
        <hr />
        <div className='flex flex-col md:flex-row justify-between gap-1'>
          <div className='font-light text-neutral-500 text-sm'>Author: {author}</div>
          <div className='font-light text-neutral-500 text-sm'>
            Last updated at {modified}
          </div>
        </div>
        <div className='flex gap-4'>
          {/* {onActionPrimary && actionLabelPrimary && (
            <Button
              disabled={disabled}
              small
              label={actionLabelPrimary}
              onClick={primaryAction}
            />
          )} */}
          {onActionSecondary && actionLabelSecondary && (
            <Button
              disabled={disabled}
              small
              label={actionLabelSecondary}
              onClick={secondaryAction}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PostCard;

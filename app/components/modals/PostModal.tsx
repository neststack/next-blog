'use client';

import axios from 'axios';
import { toast } from 'react-hot-toast';
import { 
  FieldValues, 
  SubmitHandler, 
  useForm
} from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from "react";

import usePostModal from '@/app/hooks/usePostModal';

import Modal from "./Modal";
import Input from '../inputs/Input';
import Heading from '../Heading';

const PostModal = () => {
  const router = useRouter();
  const postModal = usePostModal();

  const [isLoading, setIsLoading] = useState(false);

  const { 
    register, 
    handleSubmit,
    setValue,
    formState: {
      errors,
    },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      title: '',
      content: '',
    }
  });

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true
    })
  }

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios.post('/api/posts', data)
    .then(() => {
      toast.success('Blog post created!');
      router.refresh();
      reset();
      postModal.onClose();
    })
    .catch(() => {
      toast.error('Something went wrong.');
    })
    .finally(() => {
      setIsLoading(false);
    })
  }

  const actionLabel = useMemo(() => {
    return 'Create'
  }, []);

  const secondaryActionLabel = useMemo(() => {
    return 'Cancel'
  }, []);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Create you Blog Post"
        subtitle="Enter a title and content"
      />
      <Input
        id="title"
        label="Title"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="content"
        label="Content"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={postModal.isOpen}
      title="Create a blog post!"
      actionLabel={actionLabel}
      onSubmit={handleSubmit(onSubmit)}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={postModal.onClose}
      onClose={postModal.onClose}
      body={bodyContent}
    />
  );
}

export default PostModal;

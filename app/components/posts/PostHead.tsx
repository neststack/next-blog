'use client';

import Heading from "../Heading";

interface PostHeadProps {
  title: string;
  content: string;
}

const PostHead: React.FC<PostHeadProps> = ({
  title,
  content,
}) => {
  return ( 
    <>
      <Heading
        title={title}
        subtitle={content}
      />
    </>
   );
}
 
export default PostHead;
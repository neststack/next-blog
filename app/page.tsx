import Container from "@/app/components/Container";
import PostCard from "@/app/components/posts/PostCard";
import EmptyState from "@/app/components/EmptyState";

import getPosts, { 
  IPostsParams
} from "@/app/actions/getPosts";
import getCurrentUser from "@/app/actions/getCurrentUser";
import ClientOnly from "./components/ClientOnly";

interface HomeProps {
  searchParams: IPostsParams
};

const Home = async ({ searchParams }: HomeProps) => {
  const posts = await getPosts(searchParams);
  const currentUser = await getCurrentUser();

  if (posts.length === 0) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <Container>
        <div 
          className="
            flex
            flex-col
            gap-8
          "
        >
          {posts.map((post: any) => (
            <PostCard
              currentUser={currentUser}
              key={post.id}
              data={post}
            />
          ))}
        </div>
      </Container>
    </ClientOnly>
  )
}

export default Home;

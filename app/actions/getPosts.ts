import prisma from "@/app/libs/prismadb";

export interface IPostsParams {
  userId?: string;
}

export default async function getPosts(
  params: IPostsParams
) {
  try {
    const {
      userId,
    } = params;

    let query: any = {};

    if (userId) {
      query.userId = userId;
    }

    const posts = await prisma.post.findMany({
      where: query,
      orderBy: {
        createdAt: 'desc'
      }
    });

    const safePosts = posts.map((post) => ({
      ...post,
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt.toISOString(),
    }));

    return safePosts;
  } catch (error: any) {
    throw new Error(error);
  }
}

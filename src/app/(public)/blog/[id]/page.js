import { getSinglePost } from "@/actions/post.action";
import PostContent from "@/app/Components/PostContent";
import { notFound } from "next/navigation";
export async function generateStaticParams() {
  const allPost = await fetch(`${process.env.NEXT_APP_SERVER}/post/get/static`);
  const data = await allPost.json();
  return data?.posts?.map((post) => ({
    id: post._id.toString()
  }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const { post } = await getSinglePost({ postId: id });
  return {
    title: post.title,
    description: post.content,
    openGraph: {
      title: post.title,
      description: post.content,
      images: [post.imageUrl]
    }
  };
}

export default async function PostDetails({ params }) {
  const { id } = await params;
  const postData = await getSinglePost({ postId: id });
  const post = postData?.post;
  console.log(post.comments);
  if (!post) {
    notFound();
  }
  return <PostContent post={post} />;
}

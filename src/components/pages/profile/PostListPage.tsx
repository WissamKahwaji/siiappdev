import { useRef, useLayoutEffect } from "react";
import { useGetUserPostsQuery } from "../../../apis/posts/queries";
import { useParams } from "react-router-dom";
import { PostModel } from "../../../apis/posts/type";
import Post from "../post/Post";
import LoadingComponent from "../../const/LoadingComponent";

const PostListPage = () => {
  const { postId, userId, type } = useParams<{
    postId: string;
    userId: string;
    type: string;
  }>();
  const {
    data: postsInfo,
    isLoading: isLoadingPosts,
    isError: isErrorPosts,
  } = useGetUserPostsQuery(type, userId ?? "");
  const currentUserId = localStorage.getItem("userId");

  // Ref for the post to scroll to
  const scrollToRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    // Scroll to the selected post when posts are loaded and postId is available
    if (postId && scrollToRef.current && postsInfo) {
      scrollToRef.current.scrollIntoView();
    }
  }, [postId, postsInfo]);

  if (isLoadingPosts) {
    return (
      <div className="text-center h-screen flex flex-col justify-center items-center">
        <LoadingComponent />
      </div>
    );
  }

  if (isErrorPosts) {
    return <p>Error loading posts.</p>;
  }

  return (
    <div className="container mx-auto pt-10 px-4 sm:px-6 lg:px-8 flex flex-col items-center w-full">
      {postsInfo &&
        postsInfo.map((post: PostModel, index) => (
          <div key={index} ref={postId === post._id ? scrollToRef : null}>
            <Post post={post} currentUserId={currentUserId ?? ""} />
          </div>
        ))}
    </div>
  );
};

export default PostListPage;

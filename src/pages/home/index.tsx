import Post from "../../components/pages/post/Post";
import { useGetAllPostsQuery } from "../../apis/posts/queries";
import { SyncLoader } from "react-spinners";

const Home = () => {
  const {
    data: postsInfo,
    isLoading: isLoadingPosts,
    isError: isErrorPosts,
  } = useGetAllPostsQuery();
  const currentUserId = localStorage.getItem("userId");
  if (isLoadingPosts) {
    return (
      <div className="text-center flex flex-col justify-center items-center h-screen">
        <SyncLoader size={20} />
      </div>
    );
  } else if (isErrorPosts) {
    return <div> Error !!!</div>;
  }
  return (
    <div className="container pt-10 flex flex-col items-center w-full">
      {postsInfo && postsInfo?.length > 0 ? (
        postsInfo?.map((post, index) => (
          <Post key={index} post={post} currentUserId={currentUserId ?? ""} />
        ))
      ) : (
        <div> There is No posts yet !!!</div>
      )}
    </div>
  );
};

export default Home;

import { useInView } from "react-intersection-observer";
import Fallback from "../fallback";
import Loader from "../loader";
import PostItem from "./post-item";
import { useEffect } from "react";
import { useInfinitePostsData } from "@/hooks/queries/use-infinite-posts-data";

export default function PostFeed() {
  const { data, error, isPending, fetchNextPage, isFetchingNextPage } =
    useInfinitePostsData();
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      // 데이터 추가
      fetchNextPage();
    }
  }, [inView]);

  if (error)
    <div>
      <Fallback />;
    </div>;

  if (isPending)
    return (
      <div>
        <Loader />
      </div>
    );
  return (
    <div className="flex flex-col gap-10">
      {data?.pages.map((page) =>
        page.map((postId) => <PostItem key={postId} postId={postId} />),
      )}
      {isFetchingNextPage && <Loader />}
      <div ref={ref}></div>
    </div>
  );
}

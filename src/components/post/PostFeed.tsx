import Fallback from "@/components/Fallback";
import Loader from "@/components/Loader";
import PostItem from "@/components/post/PostItem";
import { useInfinitePostsData } from "@/hooks/queries/useInfinitePostsData";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

function PostFeed({ authorId }: { authorId?: string }) {
  // 3. useInfinite 훅을 사용한 별도의 유틸 함수를 호출, 필요한 기능 사용
  const { data, error, isPending, fetchNextPage, isFetchNextPageError } =
    useInfinitePostsData(authorId);

  // 2. react-intersection-observer 에서 위치를 감지해서 이벤트 핸들러 실행
  const { ref, inView } = useInView();

  // 4. inView, 즉 빈 div 태그가 보일 때 호출할 useEffect 사용
  useEffect(() => {
    if (inView) {
      // inView 가 True -> 데이터 추가
      fetchNextPage();
    }
  }, [inView]);

  if (error) return <Fallback />;
  if (isPending) return <Loader />;

  return (
    <div className="flex flex-col gap-10">
      {data.pages.map((page) =>
        page.map((postId) => (
          <PostItem key={postId} postId={postId} type="FEED" />
        )),
      )}
      {isFetchNextPageError && <Loader />}
      {/* 무한스크롤 구현 1. 빈 div 태그 생성 */}
      <div ref={ref}></div>
    </div>
  );
}

export default PostFeed;

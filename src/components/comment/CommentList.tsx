import CommentItem from "@/components/comment/CommentItem";
import Fallback from "@/components/Fallback";
import Loader from "@/components/Loader";
import { useCommentsData } from "@/hooks/queries/useCommentsData";

export default function CommentList({ postId }: { postId: number }) {
  const {
    data: comments,
    error: fetchCommentError,
    isPending: isFetchCommentPending,
  } = useCommentsData(postId);

  if (fetchCommentError) return <Fallback />;
  if (isFetchCommentPending) return <Loader />;

  return (
    <div className="flex flex-col gap-5">
      {comments.map((comment) => (
        <CommentItem key={comment.id} {...comment} />
      ))}
    </div>
  );
}

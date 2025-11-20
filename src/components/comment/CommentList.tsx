import Fallback from "@/components/Fallback";
import CommentItem from "@/components/comment/CommentItem";
import Loader from "@/components/Loader";
import { useCommentsData } from "@/hooks/queries/useCommentsData";
import type { Comment, NestedComment } from "@/types/types";

// 부모 댓글을 중심으로 댓글을 중첩된 구조로 변환
function toNestedComments(comments: Comment[]): NestedComment[] {
  const result: NestedComment[] = [];

  comments.forEach((comment) => {
    if (!comment.root_comment_id) {
      result.push({ ...comment, children: [] });
    } else {
      const rootCommentIndex = result.findIndex((item) => item.id === comment.root_comment_id);
      const parentComment = comments.find((item) => item.id === comment.parent_comment_id);

      if (rootCommentIndex === -1) return;
      if (!parentComment) return;

      result[rootCommentIndex].children.push({
        ...comment,
        children: [],
        parentComment,
      });
    }
  });

  return result;
}

export default function CommentList({ postId }: { postId: number }) {
  const {
    data: comments,
    error: fetchCommentError,
    isPending: isFetchCommentPending,
  } = useCommentsData(postId);

  const nestedComments = toNestedComments(comments ?? []);

  if (fetchCommentError) return <Fallback />;
  if (isFetchCommentPending) return <Loader />;

  return (
    <div className="flex flex-col gap-5">
      {nestedComments.map((comment) => (
        <CommentItem key={comment.id} {...comment} />
      ))}
    </div>
  );
}

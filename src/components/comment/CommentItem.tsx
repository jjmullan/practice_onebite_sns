import { Link } from "react-router";
import defaultAvatar from "@/assets/default-avatar.jpg";
import type { NestedComment } from "@/types/types";
import { formatTimeAgo } from "@/lib/time";
import { useSession } from "@/store/session";
import { Activity, useState } from "react";
import CommentEditor from "@/components/comment/CommentEditor";
import { useDeleteComment } from "@/hooks/mutations/comment/useDeleteComment";
import { toast } from "sonner";
import { useAlertModalStore } from "@/store/alertModal";

export default function CommentItem(props: NestedComment) {
  const session = useSession();
  const isMine = session?.user.id === props.author_id;

  const [isEditing, setIsEditing] = useState(false);
  const toggleIsEditing = () => {
    setIsEditing(!isEditing);
  };

  const { mutate: deleteComment, isPending: isDeleteCommentPending } = useDeleteComment({
    onError: (error) => {
      toast.error("댓글 삭제가 실패했습니다.", { position: "top-center" });
    },
  });
  const openAlertModal = useAlertModalStore((store) => store.actions.open);
  const closeModal = useAlertModalStore((store) => store.actions.close);
  const handleDeleteClick = () => {
    openAlertModal({
      title: "댓글 삭제",
      description: "삭제된 댓글은 되돌릴 수 없습니다. 정말 삭제하시겠습니까?",
      onPositive: () => {
        deleteComment(props.id);
      },
      onNegative: () => {
        closeModal();
      },
    });
  };

  // 대댓글 기능
  const [isReply, setIsReply] = useState(false);
  const toggleIsReply = () => {
    setIsReply(!isReply);
  };
  const isRootComment = props.parentComment === undefined;

  return (
    <div className={`flex flex-col gap-8 ${isRootComment ? "border-b" : "ml-6"} pb-5`}>
      <div className="flex items-start gap-4">
        <Link to={"#"}>
          <div className="flex h-full flex-col">
            <img
              className="h-10 w-10 rounded-full object-cover"
              src={props.author.avatar_url || defaultAvatar}
            />
          </div>
        </Link>
        <div className="flex w-full flex-col gap-2">
          <div className="font-bold">{props.author.nickname}</div>
          {isEditing ? (
            <CommentEditor
              type="EDIT"
              commentId={props.id}
              initialContent={props.content}
              onClose={toggleIsEditing}
            />
          ) : (
            <div>{props.content}</div>
          )}
          <div className="text-muted-foreground flex justify-between text-sm">
            <div className="flex items-center gap-2">
              <div className="cursor-pointer hover:underline" onClick={toggleIsReply}>
                댓글
              </div>
              <div className="bg-border h-[13px] w-[2px]"></div>
              <div>{formatTimeAgo(props.created_at)}</div>
            </div>
            {/* 수정, 삭제 버튼 */}
            <div className="flex items-center gap-2">
              <Activity mode={isMine ? "visible" : "hidden"}>
                <div className="cursor-pointer hover:underline" onClick={toggleIsEditing}>
                  수정
                </div>
                <div className="bg-border h-[13px] w-[2px]"></div>
                <div className="cursor-pointer hover:underline" onClick={handleDeleteClick}>
                  삭제
                </div>
              </Activity>
            </div>
          </div>
        </div>
      </div>
      {isReply && (
        <CommentEditor
          type="REPLY"
          postId={props.post_id}
          parentCommentId={props.id}
          onClose={toggleIsReply}
        />
      )}
      {props.children.map((comment) => (
        <CommentItem key={comment.id} {...comment} />
      ))}
    </div>
  );
}

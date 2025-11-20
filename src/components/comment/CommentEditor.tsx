import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Activity, useEffect, useState } from "react";
import { useCreateComment } from "@/hooks/mutations/comment/useCreateComment";
import { toast } from "sonner";
import { useUpdateComment } from "@/hooks/mutations/comment/useUpdateComment";

type CreateMode = {
  type: "CREATE";
  postId: number;
};

type EditMode = {
  type: "EDIT";
  commentId: number;
  initialContent: string;
  onClose(): void;
};

type ReplyMode = {
  type: "REPLY";
  postId: number;
  parentCommentId: number;
  rootCommentId: number;
  onClose(): void;
};

type Props = CreateMode | EditMode | ReplyMode;

export default function CommentEditor(props: Props) {
  // 비동기 데이터 전송
  const { mutate: createComment, isPending: isCreateCommentPending } = useCreateComment({
    onSuccess: () => {
      setContent("");
      if (props.type === "REPLY") props.onClose();
    },
    onError: (error) => {
      toast.error("댓글 작성이 실패했습니다.", {
        position: "top-center",
      });
    },
  });
  const { mutate: updateComment, isPending: isUpdateCommentPending } = useUpdateComment({
    onSuccess: () => {
      (props as EditMode).onClose();
    },
    onError: (error) => {
      toast.error("댓글 수정이 실패했습니다.", {
        position: "top-center",
      });
    },
  });

  const [content, setContent] = useState("");
  const handleSubmitClick = () => {
    if (content.trim() === "") return;

    // 서버에 비동기로 데이터 요청
    if (props.type === "CREATE") {
      createComment({
        postId: props.postId,
        content,
      });
    } else if (props.type === "EDIT") {
      updateComment({
        id: props.commentId,
        content,
      });
    } else if (props.type === "REPLY") {
      createComment({
        postId: props.postId,
        content,
        parentCommentId: props.parentCommentId,
        rootCommentId: props.rootCommentId,
      });
    }
  };

  useEffect(() => {
    if (props.type === "EDIT") {
      setContent(props.initialContent);
    }
  }, []);

  const isPending = isCreateCommentPending || isUpdateCommentPending;

  return (
    <div className="flex flex-col gap-2">
      <Textarea value={content} onChange={(e) => setContent(e.target.value)} disabled={isPending} />
      <div className="flex justify-end gap-2">
        <Activity mode={props.type === "EDIT" || props.type === "REPLY" ? "visible" : "hidden"}>
          <Button
            variant={"outline"}
            onClick={() => (props as EditMode).onClose()}
            disabled={isPending}
          >
            취소
          </Button>
        </Activity>
        <Button onClick={handleSubmitClick} disabled={isPending}>
          작성
        </Button>
      </div>
    </div>
  );
}

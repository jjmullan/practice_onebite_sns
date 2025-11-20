import useTogglePostLike from "@/hooks/mutations/post/useTogglePostLike";
import { useSession } from "@/store/session";
import { HeartIcon } from "lucide-react";
import { toast } from "sonner";

function LikePostButton({
  id,
  likeCount,
  isLiked,
}: {
  id: number;
  likeCount: number;
  isLiked: boolean;
}) {
  const session = useSession();
  const { mutate: togglePostLike } = useTogglePostLike({
    onError: (error) => {
      toast.error("좋아요 요청에 실패했습니다", {
        position: "top-center",
      });
    },
  });
  const handleLikeClick = () => {
    togglePostLike({
      postId: id,
      userId: session!.user.id,
    });
  };

  return (
    <div
      className="hover:bg-muted flex cursor-pointer items-center gap-2 rounded-xl border p-2 px-4 text-sm"
      onClick={handleLikeClick}
    >
      <HeartIcon
        className={`h-4 w-4 ${isLiked && "fill-foreground border-foreground"}`}
      />
      <span>{likeCount}</span>
    </div>
  );
}

export default LikePostButton;

import { Button } from "@/components/ui/button";
import { useDeletePost } from "@/hooks/mutations/post/useDeletePost";
import { useOpenAlertModal } from "@/store/alertModal";
import { toast } from "sonner";

function DeletePostButton({ id }: { id: number }) {
  const { mutate: deletePost, isPending: isDeletePostPending } = useDeletePost({
    onError: (error) => {
      toast.error("포스트 삭제에 실패했습니다.", {
        position: "top-center",
      });
    },
  });
  const openAlertModal = useOpenAlertModal();
  const handleDeleteClick = () => {
    openAlertModal({
      title: "포스트 삭제",
      description: "삭제된 포스트는 되돌릴 수 없습니다. 정말 삭제하시겠습니까?",
      onPositive: () => {
        deletePost(id);
      },
      onNegative: () => {},
    });
  };

  return (
    <Button
      className="cursor-pointer"
      variant={"ghost"}
      onClick={handleDeleteClick}
      disabled={isDeletePostPending}
    >
      삭제
    </Button>
  );
}

export default DeletePostButton;

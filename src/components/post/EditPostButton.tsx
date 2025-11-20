import { Button } from "@/components/ui/button";
import { useOpenEditPostModal } from "@/store/postEditorModal";
import type { PostEntity } from "@/types/types";

function EditPostButton(props: PostEntity) {
  const openEditPostModal = useOpenEditPostModal();
  const handleButtonClick = () => {
    openEditPostModal({
      postId: props.id,
      content: props.content,
      imageUrls: props.image_urls,
    });
  };

  return (
    <Button
      className="cursor-pointer"
      variant={"ghost"}
      onClick={handleButtonClick}
    >
      수정
    </Button>
  );
}

export default EditPostButton;

import { Button } from "@/components/ui/button";
import { useOpenProfileEditorModal } from "@/store/profileEditorModal";

function EditProfileButton() {
  const openProfileEditorModal = useOpenProfileEditorModal();

  return (
    <Button
      variant={"secondary"}
      className="cursor-pointer"
      onClick={openProfileEditorModal}
    >
      프로필 수정
    </Button>
  );
}

export default EditProfileButton;

import Fallback from "@/components/Fallback";
import Loader from "@/components/Loader";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useProfileData } from "@/hooks/queries/useProfileData";
import { useSession } from "@/store/session";
import React, { Activity, useEffect, useRef, useState } from "react";
import defaultAvatar from "@/assets/default-avatar.jpg";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useProfileEditorModal } from "@/store/profileEditorModal";
import { useUpdateProfile } from "@/hooks/mutations/profile/useUpdateProfile";
import { toast } from "sonner";

type Image = {
  file: File;
  previewUrl: string;
};

function ProfileEditorModal() {
  // 사용자 정보
  const session = useSession();
  const {
    data: profile,
    error: fetchProfileError,
    isPending: isFetchProfilePending,
  } = useProfileData(session?.user.id);

  // 모달 전역 상태 관리
  const store = useProfileEditorModal();
  const {
    isOpen,
    actions: { close },
  } = store;

  // 비동기 데이터 전송
  const { mutate: updateProfile, isPending: isUpdateProfilePending } =
    useUpdateProfile({
      onSuccess: () => {
        close();
      },
      onError: (error) => {
        toast.error("프로필 수정에 실패했습니다.", {
          position: "top-center",
        });
      },
    });
  const handleUpdateClick = () => {
    if (nickname.trim() === "") return;

    updateProfile({
      userId: session!.user.id,
      nickname,
      bio,
      avatarImageFile: avatarImage?.file,
    });
  };

  // 아바타 이미지 상태 관리
  const [avatarImage, setAvatarImage] = useState<Image | null>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleSelectImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const file = e.target.files[0];

    // 새로운 이미지가 선택될 때, 기존 이미지의 URL 을 삭제 (스토리지 메모리 누수 방지)
    if (avatarImage) {
      URL.revokeObjectURL(avatarImage.previewUrl);
    }

    // 상태로 저장
    setAvatarImage({ file, previewUrl: URL.createObjectURL(file) });
  };

  useEffect(() => {
    if (!isOpen) {
      if (avatarImage) URL.revokeObjectURL(avatarImage.previewUrl);
    }
  }, [isOpen]);

  useEffect(() => {
    // 모달이 열려있고, 프로필 데이터가 있는 경우
    if (isOpen && profile) {
      setNickname(profile.nickname);
      setBio(profile.bio);
      setAvatarImage(null);
    }
  }, [isOpen, profile]);

  // 닉네임 상태 관리
  const [nickname, setNickname] = useState("");
  // 소개 문구 관리
  const [bio, setBio] = useState("");

  // 예외 처리
  if (fetchProfileError) return <Fallback />;
  if (isFetchProfilePending) return <Loader />;

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="flex flex-col gap-5">
        <DialogTitle>프로필 수정하기</DialogTitle>
        <Activity
          mode={
            !fetchProfileError && !isFetchProfilePending ? "visible" : "hidden"
          }
        >
          {/* 프로필 이미지 */}
          <div className="flex flex-col gap-2">
            <div className="text-muted-foreground">프로필 이미지</div>
            <input
              type="file"
              accept="image/*"
              hidden
              ref={fileInputRef}
              onChange={handleSelectImage}
              disabled={isUpdateProfilePending}
            />
            <img
              src={
                avatarImage?.previewUrl || profile.avatar_url || defaultAvatar
              }
              className="h-20 w-20 cursor-pointer rounded-full object-cover"
              onClick={() => {
                if (fileInputRef.current) fileInputRef.current.click();
              }}
            />
          </div>

          {/* 닉네임 */}
          <div className="flex flex-col gap-2">
            <div className="text-muted-foreground">닉네임</div>
            <Input
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              disabled={isUpdateProfilePending}
            />
          </div>

          {/* 바이오 */}
          <div className="flex flex-col gap-2">
            <div className="text-muted-foreground">소개</div>
            <Input value={bio} onChange={(e) => setBio(e.target.value)} />
          </div>
          <Button
            className="cursor-pointer"
            onClick={handleUpdateClick}
            disabled={isUpdateProfilePending}
          >
            수정하기
          </Button>
        </Activity>
      </DialogContent>
    </Dialog>
  );
}

export default ProfileEditorModal;

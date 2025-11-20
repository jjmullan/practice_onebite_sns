import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useCreatePost } from "@/hooks/mutations/post/useCreatePost";
import { useUpdatePost } from "@/hooks/mutations/post/useUpdatePost";
import { useOpenAlertModal } from "@/store/alertModal";
import { usePostEditorModal } from "@/store/postEditorModal";
import { useSession } from "@/store/session";
import { ImageIcon, XIcon } from "lucide-react";
import React, { Activity, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

type Image = {
  file: File;
  previewUrl: string;
};

function PostEditorModal() {
  // 본문 관리
  const [content, setContent] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // 이미지 미리보기 관리
  const [images, setImages] = useState<Image[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleSelectImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      files.forEach((file) => {
        setImages((prev) => [
          ...prev,
          { file, previewUrl: URL.createObjectURL(file) }, // 브라우저 메모리에 보관, 해당 파일에 접근이 가능한 주소를 반환
        ]);
      });
    }

    e.target.value = "";
  };

  const handleDeleteImage = (image: Image) => {
    setImages((prevImages) =>
      prevImages.filter((item) => item.previewUrl !== image.previewUrl),
    );

    URL.revokeObjectURL(image.previewUrl);
  };

  // 모달 관리
  const postEditorModal = usePostEditorModal();
  const openAlertModal = useOpenAlertModal();
  const handleCloseModal = () => {
    // 사용자가 컨텐츠를 입력 중인지 검증
    if (content !== "" || images.length !== 0) {
      openAlertModal({
        title: "게시글 작성이 마무리되지 않았습니다.",
        description: "이 화면에서 나가면 작성 중이던 내용이 사라집니다.",
        onPositive: () => {
          postEditorModal.actions.close();
        },
      });

      return;
    }

    postEditorModal.actions.close();
  };

  // 게시물 생성 관리
  const session = useSession();
  const { mutate: createPost, isPending: isCreatePostPending } = useCreatePost({
    onSuccess: () => {
      postEditorModal.actions.close();
    },
    onError: () => {
      toast.error("포스트 생성에 실패했습니다.", {
        position: "top-center",
      });
    },
  });

  const { mutate: updatePost, isPending: isUpdatePostPending } = useUpdatePost({
    onSuccess: () => {
      postEditorModal.actions.close();
    },
    onError: (error) => {
      toast.error("포스트 수정이 실패했습니다.", {
        position: "top-center",
      });
    },
  });

  const handleSavePostClick = () => {
    if (content.trim() === "") return;
    if (!postEditorModal.isOpen) return;
    if (postEditorModal.type === "CREATE") {
      createPost({
        content,
        images: images.map((image) => image.file),
        userId: session!.user.id,
      });
    } else {
      if (content === postEditorModal.content) return;

      updatePost({
        id: postEditorModal.postId,
        content: content,
      });
    }
  };

  // 모달 길이 자동 변경
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [content]);

  // 모달 오픈 시 로직
  useEffect(() => {
    if (!postEditorModal.isOpen) {
      // 이미지로 인한 누수를 방지하기 위해, 보관 중인 URL 데이터 삭제
      images.forEach((image) => {
        URL.revokeObjectURL(image.previewUrl);
      });
      return;
    }
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
    if (postEditorModal.type === "CREATE") {
      setContent("");
      setImages([]);
    } else {
      setContent(postEditorModal.content);
      setImages([]);
    }
  }, [postEditorModal.isOpen]);

  const isPending = isCreatePostPending || isUpdatePostPending;

  return (
    <Dialog open={postEditorModal.isOpen} onOpenChange={handleCloseModal}>
      <DialogContent className="max-h-[90vh]">
        <DialogTitle>포스트 작성</DialogTitle>
        <textarea
          className="max-h-125 min-h-25 focus:outline-none"
          placeholder="무슨 일이 있었나요?"
          ref={textareaRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={isPending}
        />
        <input
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          ref={fileInputRef}
          onChange={handleSelectImages}
        />
        <Activity
          mode={
            postEditorModal.isOpen && postEditorModal.type === "EDIT"
              ? "visible"
              : "hidden"
          }
        >
          <Carousel>
            <CarouselContent>
              {postEditorModal.imageUrls?.map((url: string) => (
                <CarouselItem key={url} className="basis-2/5">
                  <div className="relative">
                    <img
                      src={url}
                      className="h-full w-full rounded-sm object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </Activity>
        <Activity mode={images.length > 0 ? "visible" : "hidden"}>
          <Carousel>
            <CarouselContent>
              {images.map((image, index) => (
                <CarouselItem key={image.previewUrl} className="basis-2/5">
                  <div className="relative">
                    <img
                      src={image.previewUrl}
                      alt={`미리보기 ${index}번`}
                      className="h-full w-full rounded-sm object-cover"
                    />
                    <div
                      className="absolute top-0 right-0 m-1 cursor-pointer rounded-full bg-black/30 p-1"
                      onClick={() => handleDeleteImage(image)}
                    >
                      <XIcon className="h-4 w-4 text-white" />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </Activity>
        <Activity
          mode={
            postEditorModal.isOpen && postEditorModal.type === "CREATE"
              ? "visible"
              : "hidden"
          }
        >
          <Button
            variant={"outline"}
            className="cursor-pointer"
            disabled={isCreatePostPending}
            onClick={() => {
              fileInputRef.current?.click();
            }}
          >
            <ImageIcon />
            이미지 추가
          </Button>
        </Activity>
        <Button
          className="cursor-pointer"
          onClick={handleSavePostClick}
          disabled={isPending}
        >
          저장
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export default PostEditorModal;

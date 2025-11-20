import AlertModal from "@/components/modal/AlertModal";
import PostEditorModal from "@/components/modal/PostEditorModal";
import ProfileEditorModal from "@/components/modal/ProfileEditorModal";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";

function ModalProvider({ children }: { children: ReactNode }) {
  return (
    <>
      {createPortal(
        <>
          <PostEditorModal />
          <AlertModal />
          <ProfileEditorModal />
        </>,
        document.getElementById("modal-root") as HTMLElement,
      )}
      {children}
    </>
  );
}

export default ModalProvider;

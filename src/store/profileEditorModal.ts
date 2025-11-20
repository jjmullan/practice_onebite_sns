import { create } from "zustand";
import { combine, devtools } from "zustand/middleware";

type State = {
  isOpen: boolean;
};

const initialState = {
  isOpen: false,
} as State;

export const useProfileEditorModalStore = create(
  devtools(
    combine(initialState, (set) => ({
      actions: {
        open: () => {
          set({ isOpen: true });
        },
        close: () => {
          set({ isOpen: false });
        },
      },
    })),
    { name: "profileEditorModalStore" },
  ),
);

export const useOpenProfileEditorModal = () => {
  const open = useProfileEditorModalStore((store) => store.actions.open);
  return open;
};

export const useProfileEditorModal = () => {
  const store = useProfileEditorModalStore();
  return store;
};

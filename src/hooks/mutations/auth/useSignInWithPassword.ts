import { signInWithPassword } from "@/api/auth";
import type { MutationCallback } from "@/types/types";
import { useMutation } from "@tanstack/react-query";

export function useSignInWithPassword(callbacks?: MutationCallback) {
  return useMutation({
    mutationFn: signInWithPassword,
    onMutate: () => {
      if (callbacks?.onMutate) callbacks.onMutate();
    },
    onError: (error) => {
      // 공통 비즈니스 로직 처리
      console.error(error);

      // 특정 컴포넌트 로직 처리
      if (callbacks?.onError) callbacks.onError(error);
    },
    onSettled: () => {
      if (callbacks?.onSettled) callbacks.onSettled();
    },
  });
}

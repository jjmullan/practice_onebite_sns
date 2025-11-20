import { signUp } from "@/api/auth";
import type { MutationCallback } from "@/types/types";
import { useMutation } from "@tanstack/react-query";

export function useSignUp(callbacks: MutationCallback) {
  return useMutation({
    mutationFn: signUp,
    onError: (error) => {
      if (callbacks.onError) callbacks.onError(error);
    },
  });
}

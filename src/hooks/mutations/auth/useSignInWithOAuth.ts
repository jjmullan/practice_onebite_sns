import { signInWithOAuth } from "@/api/auth";
import type { MutationCallback } from "@/types/types";
import { useMutation } from "@tanstack/react-query";

export function useSignInWithOAuth(callbacks: MutationCallback) {
  return useMutation({
    mutationFn: signInWithOAuth,
    onError: (error) => {
      if (callbacks.onError) callbacks.onError(error);
    },
  });
}

import { createComment } from "@/api/comment";
import type { MutationCallback } from "@/types/types";
import { useMutation } from "@tanstack/react-query";

export function useCreateComment(callbacks: MutationCallback) {
  return useMutation({
    mutationFn: createComment,
    onSuccess: () => {
      if (callbacks.onSuccess) callbacks.onSuccess();
    },
    onError: (error) => {
      if (callbacks.onError) callbacks.onError(error);
    },
  });
}

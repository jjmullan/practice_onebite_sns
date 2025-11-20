import { deleteComment } from "@/api/comment";
import type { MutationCallback } from "@/types/types";
import { useMutation } from "@tanstack/react-query";

export function useDeleteComment(callbacks: MutationCallback) {
  return useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      if (callbacks.onSuccess) callbacks.onSuccess();
    },
    onError: (error) => {
      if (callbacks.onError) callbacks.onError(error);
    },
  });
}

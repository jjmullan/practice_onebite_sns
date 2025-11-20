import { updateComment } from "@/api/comment";
import type { MutationCallback } from "@/types/types";
import { useMutation } from "@tanstack/react-query";

export function useUpdateComment(callbacks: MutationCallback) {
  return useMutation({
    mutationFn: updateComment,
    onSuccess: () => {
      if (callbacks.onSuccess) callbacks.onSuccess();
    },
    onError: (error) => {
      if (callbacks.onError) callbacks.onError(error);
    },
  });
}

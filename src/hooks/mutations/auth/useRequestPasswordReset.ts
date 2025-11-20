import { requestPasswordResetEmail } from "@/api/auth";
import type { MutationCallback } from "@/types/types";
import { useMutation } from "@tanstack/react-query";

export function useRequestPasswordReset(callbacks: MutationCallback) {
  return useMutation({
    mutationFn: requestPasswordResetEmail,
    onSuccess: () => {
      if (callbacks?.onSuccess) callbacks.onSuccess();
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}

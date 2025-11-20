import { updatedPassword } from "@/api/auth";
import type { MutationCallback } from "@/types/types";
import { useMutation } from "@tanstack/react-query";

export function useUpdatePassword(callbacks: MutationCallback) {
  return useMutation({
    mutationFn: updatedPassword,
    onSuccess: () => {
      if (callbacks.onSuccess) callbacks.onSuccess();
    },
    onError: (error) => {
      if (callbacks.onError) callbacks.onError(error);
    },
  });
}

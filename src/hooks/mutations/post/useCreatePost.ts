import { createPostWithImages } from "@/api/post";
import { QUERY_KEYS } from "@/lib/constants";
import type { MutationCallback } from "@/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreatePost(callbacks: MutationCallback) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPostWithImages,
    onSuccess: () => {
      if (callbacks.onSuccess) callbacks.onSuccess();

      // 방법 1. 캐시를 아예 초기화해서 피드를 1페이지부터 다시 불러오기
      queryClient.resetQueries({
        queryKey: QUERY_KEYS.post.list,
      });
      // 방법 2. 캐시 데이터의 완성된 포스트만 추가
      // 방법 3. 낙관적 업데이트(onMutate)
    },
    onError: (error) => {
      if (callbacks.onError) callbacks.onError(error);
    },
  });
}

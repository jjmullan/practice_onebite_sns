import { deleteImagesInPath } from "@/api/image";
import { deletePost } from "@/api/post";
import { QUERY_KEYS } from "@/lib/constants";
import type { MutationCallback } from "@/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeletePost(callbacks: MutationCallback) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePost,
    onSuccess: async (deletedPost) => {
      if (callbacks.onSuccess) callbacks.onSuccess();

      if (deletedPost.image_urls && deletedPost.image_urls.length > 0) {
        await deleteImagesInPath(`${deletedPost.author_id}/${deletedPost.id}`);
      }

      // 하나의 캐싱된 데이터만 삭제하면, 기존에 5개까지 개별 아이템을 불러오는 무한스크롤 로직에 버그가 발생할 수 있음
      // 아예 모든 데이터를 가져오도록 캐시를 리셋하도록 로직을 구현
      queryClient.resetQueries({
        queryKey: QUERY_KEYS.post.list,
      });
    },
    onError: (error) => {
      if (callbacks.onError) callbacks.onError(error);
    },
  });
}

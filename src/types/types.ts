import type { Database } from "@/database.types";

/* Database 의 Post 타입을 정제해서 사용 */
export type Post = PostEntity & { author: ProfileEntity; isLiked: boolean };
export type PostEntity = Database["public"]["Tables"]["post"]["Row"];
export type ProfileEntity = Database["public"]["Tables"]["profile"]["Row"];
export type LikeEntity = Database["public"]["Tables"]["like"]["Row"];

export type MutationCallback = {
  onSuccess?(): void;
  onMutate?(): void;
  onError?(error: Error): void;
  onSettled?(): void;
};

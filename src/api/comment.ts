import supabase from "@/lib/supabase";

/**
 * 특정 게시물에 대한 댓글을 추가하는 기능
 * @param postId 댓글이 작성될 게시물의 ID
 * @param content 댓글의 상세 내용
 * @returns
 */
export async function createComment({
  postId,
  content,
}: {
  postId: number;
  content: string;
}) {
  const { data, error } = await supabase
    .from("comment")
    .insert({
      post_id: postId,
      content: content,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

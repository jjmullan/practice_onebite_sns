import supabase from "@/lib/supabase";

/**
 * 특정 게시물에 대한 댓글을 조회하는 기능
 * @param postId 댓글을 조회할 게시물의 ID
 * @returns data : 댓글 정보
 */
export async function fetchComments(postId: number) {
  const { data, error } = await supabase
    .from("comment")
    .select("*, author: profile!author_id (*)")
    .eq("post_id", postId)
    .order("created_at", { ascending: true });

  if (error) throw error;
  return data;
}

/**
 * 특정 게시물에 대한 댓글을 추가하는 기능
 * @param postId 댓글이 작성될 게시물의 ID
 * @param content 댓글의 상세 내용
 * @returns data
 */
export async function createComment({ postId, content }: { postId: number; content: string }) {
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

/**
 * 특정 댓글의 내용을 수정하는 기능
 * @param id 댓글 id
 * @param content 댓글 내용
 * @returns 수정된 댓글 정보
 */
export async function updateComment({ id, content }: { id: number; content: string }) {
  const { data, error } = await supabase
    .from("comment")
    .update({
      content,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * 특정 댓글을 삭제하는 기능
 * @param id 댓글 ID
 * @returns 삭제된 댓글 정보
 */
export async function deleteComment(id: number) {
  const { data, error } = await supabase.from("comment").delete().eq("id", id).select().single();

  if (error) throw error;
  return data;
}

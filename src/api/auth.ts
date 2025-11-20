import supabase from "@/lib/supabase";
import type { Provider } from "@supabase/supabase-js";

/**
 * email 주소를 입력해서 회원가입
 * @param { email, password }
 * @returns { data }
 */
export async function signUp({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    console.error(error.message);
    throw error;
  }

  return data;
}

/**
 * email 주소를 입력해서 로그인
 * @param { email, password }
 * @returns { data }
 */
export async function signInWithPassword({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error(error.message);
    throw error;
  }

  return data;
}

/**
 * OAuth 를 사용해서 로그인
 * @param provider
 * @returns { data }
 */
export async function signInWithOAuth(provider: Provider) {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: provider,
  });

  if (error) {
    console.error(error.message);
    throw error;
  }

  return data;
}

/**
 * 비밀번호 재설정 요청
 * @param email
 * @returns { data }
 */
export async function requestPasswordResetEmail(email: string) {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${import.meta.env.VITE_PUBLIC_URL}/reset-password`,
  });

  if (error) throw error;
  return data;
}

export async function updatedPassword(password: string) {
  const { data, error } = await supabase.auth.updateUser({
    password,
  });

  if (error) throw error;
  return data;
}

/**
 * 로그인된 사용자를 로그아웃하는 기능
 */
export async function singOut() {
  const { error } = await supabase.auth.signOut();

  // 에러가 발생하면, 로컬 스토리지에 보관된 엑세스 토큰을 삭제
  if (error) {
    await supabase.auth.signOut({
      scope: "local",
    });
  }
}

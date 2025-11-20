import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSignInWithPassword } from "@/hooks/mutations/auth/useSignInWithPassword";
import { useState } from "react";
import { Link } from "react-router";
import githubMark from "@/assets/github-mark.svg";
import { useSignInWithOAuth } from "@/hooks/mutations/auth/useSignInWithOAuth";
import { toast } from "sonner";
import { generateErrorMessage } from "@/lib/error";

function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate: signInWithPassword, isPending: isSignInWithPasswordPending } =
    useSignInWithPassword({
      onError: (error) => {
        const message = generateErrorMessage(error);
        toast.error(message, {
          position: "top-center",
        });

        setPassword("");
      },
    });

  const { mutate: signInWithOAuth, isPending: isSignInWithOAuthPending } =
    useSignInWithOAuth({
      onError: (error) => {
        const message = generateErrorMessage(error);
        toast.error(message, {
          position: "top-center",
        });
      },
    });

  const handleSignInWithPasswordClick = () => {
    if (email.trim() === "") return;
    if (password.trim() === "") return;

    signInWithPassword({
      email,
      password,
    });
  };

  const handleSignInWithGitHubClick = () => {
    signInWithOAuth("github");
  };

  // 이메일 로그인, OAuth 로그인 중 하나라도 Pending 일 경우 True 로 전환
  const isPending = isSignInWithPasswordPending || isSignInWithOAuthPending;

  return (
    <div className="flex flex-col gap-y-8">
      <div className="text-xl font-bold">로그인</div>
      <div className="flex flex-col gap-y-2">
        <Input
          className="py-6"
          type="email"
          placeholder="example@abc.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isPending}
        />
        <Input
          className="py-6"
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isPending}
        />
      </div>
      <div className="flex flex-col gap-y-2">
        <Button
          className="w-full"
          onClick={handleSignInWithPasswordClick}
          disabled={isPending}
        >
          로그인
        </Button>
        <Button
          className="w-full"
          variant={"outline"}
          onClick={handleSignInWithGitHubClick}
          disabled={isPending}
        >
          <img src={githubMark} className="h-4 w-4" />
          GitHub 계정으로 로그인
        </Button>
      </div>
      <div className="flex flex-col items-center gap-y-2">
        <Link
          to={"/sign-up"}
          className="text-muted-foreground hover:underline disabled:cursor-not-allowed"
        >
          이미 계정이 없으시다면? 회원가입
        </Link>
        <Link
          to={"/forget-password"}
          className="text-muted-foreground hover:underline disabled:cursor-not-allowed"
        >
          비밀번호를 잊으셨나요?
        </Link>
      </div>
    </div>
  );
}

export default SignInPage;

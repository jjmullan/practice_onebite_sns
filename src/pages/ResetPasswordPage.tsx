import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUpdatePassword } from "@/hooks/mutations/auth/useUpdatePassword";
import { generateErrorMessage } from "@/lib/error";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

function ResetPasswordPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const { mutate: updatePassword, isPending: isUpdatedPasswordPending } =
    useUpdatePassword({
      onSuccess: () => {
        toast.info("비밀번호가 변경되었습니다.", {
          position: "top-center",
        });
        navigate("/");
      },
      onError: (error) => {
        const message = generateErrorMessage(error);
        toast.error(message, {
          position: "top-center",
        });

        setPassword("");
      },
    });

  const handleUpdatePasswordClick = () => {
    if (password.trim() === "") return;

    updatePassword(password);
  };

  return (
    <div className="flex flex-col gap-y-6">
      <div className="flex flex-col gap-y-1">
        <div className="text-xl font-bold">비밀번호 재설정하기</div>
        <div className="text-muted-foreground">
          새로운 비밀번호를 입력하세요.
        </div>
      </div>
      <Input
        className="py-6"
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={isUpdatedPasswordPending}
      />
      <Button
        className="w-full"
        onClick={handleUpdatePasswordClick}
        disabled={isUpdatedPasswordPending}
      >
        비밀번호 변경하기
      </Button>
    </div>
  );
}

export default ResetPasswordPage;

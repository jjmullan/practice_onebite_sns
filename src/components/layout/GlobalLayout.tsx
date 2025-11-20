import { Link, Outlet } from "react-router";
import { SunIcon } from "lucide-react";
import logo from "@/assets/logo.png";
import ProfileButton from "@/components/layout/header/ProfileButton";

function GlobalLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* 헤더 */}
      <header className="h-15 border-b">
        <div className="m-auto flex h-full w-full max-w-175 justify-between px-4">
          {/* 로고 아이콘 */}
          <Link to={"/"} className="flex items-center gap-x-2">
            <img
              src={logo}
              alt="한입 로그의 로고, 메시지 말풍선을 형상화한 모양"
              className="h-5"
            />
            <div className="font-bold">한입 로그</div>
          </Link>
          {/* 테마, 프로필 버튼 */}
          <div className="flex items-center gap-x-5">
            <div className="hover:bg-muted cursor-pointer rounded-full p-2">
              <SunIcon />
            </div>
            <ProfileButton />
          </div>
        </div>
      </header>
      {/* 메인 */}
      <main className="m-auto w-full max-w-175 flex-1 border-x px-4 py-6">
        <Outlet />
      </main>
      {/* 푸터 */}
      <footer className="text-muted-foreground border-t py-10 text-center">
        @jjmullan24
      </footer>
    </div>
  );
}

export default GlobalLayout;

import GlobalLayout from "@/components/layout/GlobalLayout";
import GuestOnlyLayout from "@/components/layout/GuestOnlyLayout";
import MemberOnlyLayout from "@/components/layout/MemberOnlyLayout";
import ForgetPasswordPage from "@/pages/ForgetPasswordPage";
import IndexPage from "@/pages/IndexPage";
import PostDetailPage from "@/pages/PostDetailPage";
import ProfileDetailPage from "@/pages/ProfileDetailPage";
import ResetPasswordPage from "@/pages/ResetPasswordPage";
import SignInPage from "@/pages/SignInPage";
import SignUpPage from "@/pages/SignUpPage";
import { Navigate, Route, Routes } from "react-router";

function RootRoute() {
  return (
    <Routes>
      <Route Component={GlobalLayout}>
        {/* 세션 데이터가 없다면 인덱스 페이지로 리다이렉션 */}
        <Route Component={MemberOnlyLayout}>
          <Route path="/" Component={IndexPage} />
          <Route path="/post/:postId" Component={PostDetailPage} />
          <Route path="/profile/:userId" Component={ProfileDetailPage} />
          <Route path="/reset-password" Component={ResetPasswordPage} />
        </Route>

        {/* 로그인 관련 */}
        {/* 세션 데이터가 있다면 인덱스 페이지로 리다이렉션 */}
        <Route Component={GuestOnlyLayout}>
          <Route path="/sign-in" Component={SignInPage} />
          <Route path="/sign-up" Component={SignUpPage} />
          <Route path="/forget-password" Component={ForgetPasswordPage} />
        </Route>

        {/* 위 페이지 외 모든 페이지는 인덱스 페이지(/)로 리다이렉트 */}
        <Route path="*" element={<Navigate to={"/"} />} />
      </Route>
    </Routes>
  );
}

export default RootRoute;

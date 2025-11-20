import { useSession } from "@/store/session";
import { Navigate, Outlet } from "react-router";

function MemberOnlyLayout() {
  const session = useSession();

  if (!session) return <Navigate to={"/sign-in"} replace={true} />;
  return <Outlet />;
}

export default MemberOnlyLayout;

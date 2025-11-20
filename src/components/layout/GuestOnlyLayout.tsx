import { useSession } from "@/store/session";
import { Navigate, Outlet } from "react-router";

function GuestOnlyLayout() {
  const session = useSession();
  if (session) return <Navigate to={"/"} replace={true} />;

  return <Outlet />;
}

export default GuestOnlyLayout;

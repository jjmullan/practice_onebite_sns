import PostFeed from "@/components/post/PostFeed";
import ProfileInfo from "@/components/profile/ProfileInfo";
import { useEffect } from "react";
import { Navigate, useParams } from "react-router";

function ProfileDetailPage() {
  const params = useParams();
  const userId = params.userId;

  if (!userId) return <Navigate to={"/"} replace />;

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  return (
    <div className="flex flex-col gap-y-10">
      <ProfileInfo userId={userId} />
      <div className="border-b"></div>
      <PostFeed authorId={userId} />
    </div>
  );
}

export default ProfileDetailPage;

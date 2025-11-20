import Fallback from "@/components/Fallback";
import Loader from "@/components/Loader";
import { useProfileData } from "@/hooks/queries/useProfileData";
import defaultAvatar from "@/assets/default-avatar.jpg";
import { useSession } from "@/store/session";
import { Activity } from "react";
import EditProfileButton from "@/components/profile/EditProfileButton";

function ProfileInfo({ userId }: { userId: string }) {
  const {
    data: profile,
    error: fetchProfileError,
    isPending: isFetchingProfilePending,
  } = useProfileData(userId);

  const session = useSession();
  const isMine = session?.user.id === userId;

  if (fetchProfileError) return <Fallback />;
  if (isFetchingProfilePending) return <Loader />;

  return (
    <div className="flex flex-col items-center justify-center gap-y-5">
      <img
        src={profile.avatar_url || defaultAvatar}
        className="h-30 w-30 rounded-full object-cover"
      />
      <div className="flex flex-col items-center gap-2">
        <div className="text-xl font-bold">{profile.nickname}</div>
        <div className="text-muted-foreground">{profile.bio}</div>
      </div>
      <Activity mode={isMine ? "visible" : "hidden"}>
        <EditProfileButton />
      </Activity>
    </div>
  );
}

export default ProfileInfo;

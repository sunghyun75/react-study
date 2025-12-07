import GlobalLoader from "@/components/global-loader";
import { useProfileData } from "@/hooks/queries/use-profile-data";
import supabase from "@/lib/supabase";
import { useIsSessionLoaded, useSession, useSetSession } from "@/store/session";
import { useEffect, type ReactNode } from "react";

export default function SessionProvider({ children }: { children: ReactNode }) {
  const session = useSession();
  const setSession = useSetSession();
  const isSessionLoaded = useIsSessionLoaded();

  /** 유저의 세션 데이터가 null값이 아니면 (값이 있으면) user.id도 null값이 아니기 때문에 useProfileData의 queryFn 실행 */
  const { data: profile, isLoading: isProfileLoading } = useProfileData(
    session?.user.id,
  );

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
    });
  }, []);

  // 유저의 세션 로딩이 끝나지 않았을 때 로딩.
  if (!isSessionLoaded) return <GlobalLoader />;
  // 유저의 프로필이 조회 중일 때 로딩.
  if (isProfileLoading) return <GlobalLoader />;

  return children;
}

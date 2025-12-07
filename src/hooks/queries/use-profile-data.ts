import { createProfile, fetchProfile } from "@/api/profile";
import { QUERY_KEYS } from "@/lib/constants";
import { useSession } from "@/store/session";
import type { PostgrestError } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";

/** 쿼리 키 팩토리를 이용한 useQuery
 * 프로필을 불러오는 함수
 */

export function useProfileData(userId?: string) {
  const session = useSession();
  const isMine = userId === session?.user.id;

  return useQuery({
    queryKey: QUERY_KEYS.profile.byId(userId!),
    queryFn: async () => {
      try {
        const profile = await fetchProfile(userId!);
        return profile;
      } catch (error) {
        if (isMine && (error as PostgrestError).code === "PGRST116") {
          // PostgrestError타입의 에러코드가 PGRST116이라면 createProfile 호출, isMine 조건문으로 나의 프로필을 조회할 때만 함수 호출.

          return await createProfile(userId!);
        }
        throw error;
      }
    },

    enabled: !!userId,
  });
}

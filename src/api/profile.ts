import supabase from "@/lib/supabase";
import { getRandomNickname } from "@/lib/utils";

/** 특정 유저 프로필을 불러오는 비동기 함수
 * 데이터를 불러올 뿐, 데이터를 수정하는 함수는 아니기에 mutation이 아닌 query사용
 */
export async function fetchProfile(userId: string) {
  const { data, error } = await supabase
    .from("profile")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) throw error;
  return data;
}

/** 프로필이 없을 때 새로운 프로필을 만들어 주는 비동기 함수 */
export async function createProfile(userId: string) {
  const { data, error } = await supabase
    .from("profile")
    .insert({
      id: userId,
      nickname: getRandomNickname(),
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

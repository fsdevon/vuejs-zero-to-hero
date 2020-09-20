//import { fetchUserRepositories } from "@/api/repositories";
import { ref, onMounted, watch, Ref } from "vue";

export default function useUserRepositories(user: Ref<string>) {
  const repositories = ref([]);
  const getUserRepositories = async () => {
    //repositories.value = await fetchUserRepositories(user.value);
  };

  onMounted(getUserRepositories);
  watch(user, getUserRepositories);

  return {
    repositories,
    getUserRepositories
  };
}

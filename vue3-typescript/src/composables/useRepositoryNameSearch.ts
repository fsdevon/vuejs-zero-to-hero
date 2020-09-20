import { ref, computed, Ref } from "vue";

export default function useRepositoryNameSearch(repositories: Ref<any[]>) {
  const searchQuery = ref("");
  const repositoriesMatchingSearchQuery = computed(() => {
    return repositories.value.filter((repository) => {
      return repository.name.includes(searchQuery.value);
    });
  });

  return {
    searchQuery,
    repositoriesMatchingSearchQuery
  };
}

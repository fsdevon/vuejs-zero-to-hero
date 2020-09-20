<template>
  <div>Display users list</div>
  <div>{{user}}</div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, toRefs, watch } from "vue";
import useUserRepositories from "@/composables/useUserRepositories";
import useRepositoryNameSearch from "@/composables/useRepositoryNameSearch";

interface User {
  user: string;
}
export default defineComponent({
  props: {
    user: {
      type: String,
      required: true
    }
  },
  setup(props: User) {
    const { user } = toRefs(props);

    const { repositories, getUserRepositories } = useUserRepositories(user);

    const {
      searchQuery,
      repositoriesMatchingSearchQuery
    } = useRepositoryNameSearch(repositories);

    return {
      // Since we don’t really care about the unfiltered repositories
      // we can expose the filtered results under the `repositories` name
      repositories: repositoriesMatchingSearchQuery,
      getUserRepositories,
      searchQuery
    };
  }
});
</script>
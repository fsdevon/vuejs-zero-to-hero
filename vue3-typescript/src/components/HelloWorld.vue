<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <!-- <h1 class="text">{{ name }}</h1> -->
    <div>
      <span>{{count}}</span>
      <button @click="count++">Increment count</button>
    </div>
  </div>
</template>

<script lang="ts">
import {
  ref,
  toRefs,
  defineComponent,
  onMounted,
  reactive,
  computed,
  watchEffect,
  watch
} from "vue";

interface Abc {
  msg: string;
}

export default defineComponent({
  name: "HelloWorld",
  props: {
    msg: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      color: "red"
    };
  },

  // created() {
  //   console.log(this.msg);
  // }

  setup(props: Abc) {
    // const { msg } = toRefs(props);
    // //const year = ref(2020);
    // msg.value = "fsdevon";
    // console.log("amks", msg.value);
    //const result = year.value.split("");

    // mounted
    // onMounted(() => {
    //   console.log("Component is mounted!");
    // });

    const count = ref(0);
    const state = reactive({
      count
    });

    console.log(state.count);
    state.count = 1;
    console.log(count.value);

    const book = reactive({
      author: "Vue Team",
      year: "2020",
      title: "Vue 3 Guide",
      description: "You are reading this book right now ;)",
      price: "free"
    });

    const { author } = toRefs(book);
    console.log(author.value);
    author.value = "amsk";
    console.log(author.value);

    const plusOne = computed({
      get: () => count.value + 1,
      set: val => {
        count.value = val - 1;
      }
    });

    plusOne.value = 1;
    console.log(plusOne.value); // 2

    //watchEffect(() => console.log(count.value));

    // watchEffect(onInvalidate => {
    //   console.log(count.value);
    //   onInvalidate(() => {
    //     // id has changed or watcher is stopped.
    //     // invalidate previously pending async operation
    //     console.log("stop watch effect");
    //   });
    // });

    watchEffect(
      () => {
        //count.value += 1;
        console.log(count.value);
      },
      {
        flush: "pre"
      }
    );

    watch(
      () => state.count,
      (count, prevCount) => {
        console.log(count, prevCount);
      }
    );

    // setInterval(() => {
    //   count.value++;
    //   // -> logs 1
    // }, 1000);
    return {
      //msg,
      count
    };
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" vars="{ color }">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.text {
  color: var(--color);
}
</style>

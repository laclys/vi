<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <h1>{{ count }}</h1>
  <h1>{{ double }}</h1>
  <ul>
    <li v-for="number in numbers" :key="number">
      <h1>{{ number }}</h1>
    </li>
  </ul>
  <h1>{{ person.name }}</h1>
  <button @click="increase">👆+1</button>
  <button @click="updateGreeting">👆update title</button>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  computed,
  reactive,
  toRefs,
  onMounted,
  onUpdated,
  onRenderTriggered,
  watch,
} from "vue";

interface DataProps {
  count: number;
  double: number;
  increase: () => void;
  numbers: number[];
  person: { name?: string };
}

export default defineComponent({
  name: "App",
  setup() {
    // const count = ref(0)
    // const double = computed(() => {
    //   return count.value * 2
    // })
    // const increase = () => {
    //   count.value++
    // }

    onMounted(() => {
      console.log("mounted");
    });

    onUpdated(() => {
      console.log("updated");
    });

    onRenderTriggered((event) => {
      // 调试用
      console.log("event", event);
    });

    const data: DataProps = reactive({
      count: 0,
      increase: () => {
        data.count++;
      },
      double: computed(() => data.count * 2),
      numbers: [0, 1, 2],
      person: {},
    });
    const greetings = ref("");
    const updateGreeting = () => {
      greetings.value += "Hello!";
    };

    // watch([greetings, data], (newValue, oldValue) => {
    watch([greetings, () => data.count], (newValue, oldValue) => {
      document.title = "update" + greetings.value + data.count;
    });

    data.numbers[0] = 5;
    data.person.name = "Lac";
    const refData = toRefs(data); // 把普通值转成响应值
    return {
      ...refData, // 是一个ref类型数据
      greetings,
      updateGreeting,
    };
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

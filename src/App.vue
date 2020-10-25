<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <h1>{{ count }}</h1>
  <h1>{{ double }}</h1>
  <h1>X: {{ x }} Y: {{ y }}</h1>
  <h1 v-if="loading">Loading!...</h1>
  <img v-if="loaded" :src="result.message" />
  <button @click="increase">👆+1</button>
  <button @click="updateGreeting">👆update title</button>
  <button @click="openModal">Open Modal</button><br/>
  <modal :isOpen="modalIsOpen" @close-modal="onModalClose"> My Modal !!!!</modal>
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
  onUnmounted,
} from "vue";
import useMousePosition from "./hooks/useMousePosition";
import useURLLoader from "./hooks/useURLLoader";
import Modal from './components/Modal.vue'

interface DataProps {
  count: number;
  double: number;
  increase: () => void;
  numbers: number[];
  person: { name?: string };
}

interface DogResult {
  message: string;
  status: string;
}

export default defineComponent({
  name: "App",
    components: {
    Modal
  },
  setup() {
    // const count = ref(0)
    // const double = computed(() => {
    //   return count.value * 2
    // })
    // const increase = () => {
    //   count.value++
    // }

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

    const { x, y } = useMousePosition();

    const { result, loading, loaded } = useURLLoader<DogResult>(
      "https://dog.ceo/api/breeds/image/random"
    );

    // watch([greetings, data], (newValue, oldValue) => {
    watch([greetings, () => data.count], (newValue, oldValue) => {
      document.title = "update" + greetings.value + data.count;
    });

    data.numbers[0] = 5;
    data.person.name = "Lac";
    const refData = toRefs(data); // 把普通值转成响应值

    const modalIsOpen = ref(false)
    const openModal = () => {
      modalIsOpen.value = true
    }
    const onModalClose = () => {
      modalIsOpen.value = false
    }


    return {
      ...refData, // 是一个ref类型数据
      greetings,
      updateGreeting,
      x,
      y,
      result,
      loading,
      loaded,
      modalIsOpen,
      openModal,
      onModalClose
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

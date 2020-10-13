import { ref, reactive, onMounted, onUnmounted, toRefs } from 'vue'

function useMousePosition() {
  // const x = ref(0)
  // const y = ref(0)

  const data = reactive({
    x: 0,
    y: 0
  })

  const updateMouse = (e: MouseEvent) => {
    // x. = e.pageX
    // y.value = e.pageY
    data.x = e.pageX
    data.y = e.pageY
  }

  onMounted(() => {
    console.log('mounted')
    document.addEventListener('click', updateMouse)
  })

  onUnmounted(() => {
    document.removeEventListener('click', updateMouse)
  })

  const refData = toRefs(data);

  return { x: refData.x, y: refData.y }
}


export default useMousePosition
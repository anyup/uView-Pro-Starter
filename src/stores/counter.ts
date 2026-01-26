import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  function increment() {
    count.value++
  }

  function decrement() {
    if (count.value > 0) {
      count.value--
    }
  }

  function reset() {
    count.value = 0
  }

  function setCount(n: number) {
    count.value = n
  }

  return { count, increment, decrement, reset, setCount }
})

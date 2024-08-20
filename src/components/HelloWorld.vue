<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ref } from 'vue';

interface Props {
  msg?: string
}

const def = withDefaults(defineProps<Props>(), {
  msg: 'Hello World'
})

const num = ref(0)
const message = ref('Hello ')

const clicked = () => {
  num.value++
  console.log(num.value)
  console.log(def.msg);

}

</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h3>
      You’ve successfully created a project with
      <a href="https://vitejs.dev/" target="_blank" rel="noopener">Vite</a> +
      <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue 3</a>. What's next?
    </h3>
    <Button @click="clicked">
      test
    </Button>
    {{ num }}
    {{ message }}
    <Input 
    v-model="message"
    class="h-20"
     />
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {

  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>

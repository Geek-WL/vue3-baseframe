<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <el-button size="small" type="primary">home page</el-button>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>

<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <el-button size="small" type="primary">home page</el-button>
  </div>
</template>

<script>
// @ is an alias to /src
import { onMounted } from 'vue'
import HelloWorld from '@/components/HelloWorld.vue'
import http from '@/http'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  setup() {
    onMounted(() => {
      http.get({
        url: '/data',
        params: {
          num: 10
        },
        isShowLoading: true
        // method: 'GET'
      })
    })
  }
}
</script>

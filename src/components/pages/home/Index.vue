<template>
  <div class="home">
      <h1>Welcome</h1>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'home',
  data () {
    return {
      
    }
  },
  computed: {
    ...mapState(['userInfo'])
  }
}
</script>

<style>

</style>
<template>
  <div id="vue-two">
    <NameList/>
  </div>
</template>

<script>
import NameList from './components/NameList.vue'

export default {
  name: 'vue-two',
  components: {
    NameList
  }
}
</script>

<style>
#app5 {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

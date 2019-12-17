<template>
    <div class="mainContainer">



    </div>
</template>

<script>
export default {
  name: 'Content',
  props: {
    msg: String
  }

}
</script>

<style scoped>

.mainContainer{
  min-height: 800px;
  background: white;
    border-radius: 5px;
  width: 900px;
  position: relative;
}


.logo {
    height: 60px;
    position: absolute;
    top: 0;
    right: 25px;
}
</style>

<template>
    <div class="navbar">
        <h2 class="header-title">Header (VueJs)</h2>
    </div>
</template>

<script>
export default {
  name: 'navBar',
  props: {
    msg: String
  }
}
</script>

<style scoped>
.header-title {
    width: 100%;
    text-align: left;
    margin-left: 50px;
}

.navbar {
    font-family: Arial, Helvetica, sans-serif;
    position: fixed;
    top: 0;
    left: 0;
    background-color: white;
    color: black;
    font-size: 14px;
    font-weight: bold;
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    overflow: hidden;
}

.navbar ul {
    display: flex;
    align-items: center;
    list-style-type: none;
    height: 100%;
}

.navbar li:hover {
    background-color: #d1e8e2;
}

.navbar li {
    padding-top: 14px;
    padding-bottom: -14px;
    padding-left: 10px;
    padding-right: 10px;
    height: 100%;
}

.navbar li:hover {
    color: black;
}

.navbar a {
    height: 100%;
    text-decoration: none;
    color: white;
}

.logo {
    height: 60px;
    position: absolute;
    top: 0;
    right: 25px;
}
</style>

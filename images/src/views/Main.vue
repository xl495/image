<template>
 <div class="main-wrap">
  <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect"
    text-color="#565656" active-text-color="#000"  >
    <el-menu-item><img height="50" width="70" @click="" src="http://voidcraft.s.3322.net:269/getImage/3448a956f9da40b39f0d78dbbf321b54"></el-menu-item>
    <el-menu-item index="1">图床管理</el-menu-item>
  </el-menu>
  <router-view></router-view>
 </div>

</template>
<script>
  export default {
    name:'Main',
    data() {
      return {
        activeIndex: '1',
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
    }
  }
</script>
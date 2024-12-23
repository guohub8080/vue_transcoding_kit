<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs

import router from "@/router";
import zhCN from "ant-design-vue/es/locale/zh_CN";
import {computed, onMounted, onUpdated, ref, getCurrentInstance, watch} from "vue";
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
dayjs.locale('zh-cn');


</script>

<template>
  <a-config-provider :locale="zhCN">
    <router-view/>
  </a-config-provider>
</template>

<style lang="less">
#app {
  //font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  // margin-top: 5px;
}


</style>

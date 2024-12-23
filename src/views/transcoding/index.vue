<script setup lang="ts">
import {computed, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import router from "@/router";

const route_prefix = "/transcoding"
const current_page = computed(() => {
  const route = useRoute()
  switch (route.path) {
    case route_prefix + "/base64":
      return "/base64"
    case route_prefix + "/rsa":
      return "/rsa"
    case route_prefix + "/psw":
      return "/psw"
    case route_prefix + "/about":
      return "/about"
  }

})
const is_selected = (select_location: string) => {
  if (select_location === current_page.value) {
    return "is_selected"
  }
}

</script>

<template>

  <div class="nav">
    <div @click="router.replace(route_prefix+'/base64')" :class="is_selected('/base64')"> Base64</div>
    <div @click="router.replace(route_prefix+'/rsa')" :class="is_selected('/rsa')"> RSA</div>
    <div @click="router.replace(route_prefix+'/psw' )" :class="is_selected('/psw')"> Random</div>
    <div @click="router.replace(route_prefix+'/about' )" :class="is_selected('/about')"> About</div>
  </div>
  <router-view></router-view>
</template>

<style scoped lang="less">
.nav {
  background-color: rgb(39, 39, 39);
  display: flex;
  margin-bottom: 2rem;
  justify-content: center;
  gap: 0.5rem;
  overflow-x: hidden;
  overflow-y: hidden;

  .is_selected {
    // border-collapse: collapse;
    // border-bottom: 10px #b9b9b9 solid;
    background-color: rgb(205, 205, 205);
    transition: all ease-out 0.2s;
    width: 12rem;
    font-weight: 700;
    color: #2c3e50;
  }

  div {
    margin-top: 0.6rem;
    margin-bottom: 0.6rem;
    border-radius: 0.2rem;
    cursor: pointer;
    background-color: rgb(70, 70, 70);
    width: 7rem;
    color: antiquewhite;
    transition: all ease-in 0.2s;

    &:active {
      // filter: brightness(5);
      background-color: #1634cb;
      color: antiquewhite;
      transition: all ease-in-out 0.2s;
    }

    &:hover {
      filter: brightness(1.2);
      transition: all ease-in 0.2s;
    }
  }
}
</style>

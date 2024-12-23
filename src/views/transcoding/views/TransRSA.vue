<script setup lang="ts">
import {computed, ref, watchEffect} from "vue";
import {storeToRefs} from "pinia";
import useTranscodingStore from "../store";
// import Base64History from "../components/Base64History.vue"
import guo_crypt from "@/views/transcoding/logic/guo_crypt";
import {onKeyUp} from "@vueuse/core";
import {KeyOutlined, LockOutlined, FileAddOutlined} from '@ant-design/icons-vue';
import GenRSA from "../components/GenRSA.vue"
import RSAEncrypt from "../components/RSAEncrypt.vue"
import RSADecrypt from "../components/RSADecrypt.vue"

const {shift, space, enter, ctrl, alt_enter, command_enter, ctrl_enter} = useMagicKeys()

const transcodingStore = useTranscodingStore();
const {base64_input, base64_history_reverse} = storeToRefs(transcodingStore);
const {base64_history, do_b64} = transcodingStore
const base_64_input_length = computed(() => base64_input.value.trim().length)
import {useMagicKeys} from '@vueuse/core'


const activeKey = ref("1")
</script>

<template>
<!--  <div style="width: 50rem;height: 100%;overflow-wrap: break-word">-->
<!--  </div>-->

  <h1 @click="$router.go(0)">RSA加解密</h1>
  <a-tabs centered v-model:activeKey="activeKey">
    <!--    功能1：生成密钥对-->
    <a-tab-pane key="1">
      <template #tab>
        <span class="tab_span">
          <file-add-outlined/>
          生成RSA密钥
        </span>
      </template>
      <GenRSA></GenRSA>
    </a-tab-pane>
    <!--    功能2：加密-->
    <a-tab-pane key="2">
      <template #tab>
        <span class="tab_span">
          <lock-outlined/>
          使用公钥加密
        </span>
      </template>
      <RSAEncrypt></RSAEncrypt>
    </a-tab-pane>
    <!--    功能3：解密-->
    <a-tab-pane key="3">
      <template #tab>
        <span class="tab_span">
          <key-outlined/>
          使用私钥解密
        </span>
      </template>
      <RSADecrypt></RSADecrypt>
    </a-tab-pane>
  </a-tabs>

  <div style="height: 15rem"></div>
</template>

<style scoped lang="less">
@font-face {
  font-family: "consola"; /* Project id 2878519 */
  src: url('../font/consola-1.ttf') format('truetype');
}

@font-face {
  font-family: "jetbrains"; /* Project id 2878519 */
  src: url('../font/JetBrainsMono-Regular-2.ttf') format('truetype');
}

h1 {
  font-size: 1.5rem;
  font-weight: 600;
  cursor: pointer;
  user-select: none;
}


.tab_span {
  width: 10rem;
  display: inline-block;
  vertical-align: bottom;
  //background-color: #4f3030;
}
</style>

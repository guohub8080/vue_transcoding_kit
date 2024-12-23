<script setup lang="ts">
import {computed, ref, watchEffect} from "vue";
import {storeToRefs} from "pinia";
import useTranscodingStore from "../store";
import Base64History from "../components/Base64History.vue"
import {onKeyUp} from "@vueuse/core";

const {shift, space, enter, ctrl, alt_enter, command_enter, ctrl_enter} = useMagicKeys()

const transcodingStore = useTranscodingStore();
const {base64_input, base64_history_reverse} = storeToRefs(transcodingStore);
const {base64_history, do_b64, revert_b64_history} = transcodingStore
const base_64_input_length = computed(() => base64_input.value.trim().length)
import {useMagicKeys} from '@vueuse/core'

const hidden = computed(() => {
  if (base64_history.length == 0) {
    return 0
  } else {
    return 1
  }
})
watchEffect(() => {
  if (command_enter.value || ctrl_enter.value) {
    do_b64()
  }
  if (alt_enter.value) {
    do_b64(false)
  }
})

</script>

<template>
  <h1 @click="$router.go(0)">Base64加解密</h1>
  <div class="config">
    <div class="history_mode">
      <span>新记录在下</span>
      <a-switch size="small" v-model:checked="base64_history_reverse"></a-switch>
      <span>新纪录在上</span>
    </div>
    <div class="input_length" @click="revert_b64_history()">
      <span>输入长度  <b>{{ base_64_input_length }}</b></span>
    </div>
  </div>

  <a-textarea class="input_frame" placeholder="请输入将要加密的文本或准备解密的Base64文本"
              v-model:value="base64_input"></a-textarea>
  <!--  <a-textarea class="encode_frame" v-model:value="base64_page.encoded_text"></a-textarea>-->
  <div class="under_input">
    <div>
      <a @click="do_b64()">▶ 普通文本→Base64编码 (encode)</a>
    </div>
    <div>
      <a @click="do_b64(false)">▶ Base64编码→原文本 (decode)</a>
    </div>

  </div>

  <div class="history">
    <div v-for="(each_history , index) in base64_history" key="index">
      <Base64History :history="each_history" :index="index"></Base64History>
    </div>
  </div>
<!--  <div style="height: 15rem"></div>-->
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

.under_input {
  margin: 0 auto;
  margin-top: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 35rem;

  & > div > span {
    display: inline-block;
    width: 8rem;
    background-color: #f5f5f5;
    border-radius: 0.2rem;
    padding-top: 0.2rem;
    padding-bottom: 0.2rem;
    color: #304455;
  }
}

.input_frame {
  //border-radius: 0.5rem;
  resize: none;
  width: 45rem;
  height: 6rem;
  padding: 0.5rem;
  //font-weight: 700;
  font-size: 1rem;
  color: #2c3e50;
  font-family: consola, "Helvetica Neue",
  Helvetica, Arial, "PingFang SC", "Hiragino Sans GB",
  "Heiti SC", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
}

.history {
  margin: auto;
  //height: 50rem;
  width: 50rem;
  //margin-bottom: 15rem;
  //background-color: #412b2b;
  overflow: auto;
  scroll-behavior: smooth;
  //overflow-y: auto;
  overflow-x: hidden;

}


div.config {
  display: flex;
  width: 45rem;
  margin: 0 auto;
  //background-color: rgba(94, 70, 70, 0.3);
  justify-content: space-between;
  align-items: center;
  height: 2rem;

  .history_mode {
    opacity: v-bind(hidden);
    //opacity: 1;

    span {
      margin-right: 0.3rem;
      color: #838383;
      font-weight: 700;

      &:last-child {
        margin-left: 0.3rem;
      }
    }
  }


  .input_length {
    cursor: pointer;
    user-select: none;

    span {
      //margin-left: 15rem;
    }
  }

}
</style>

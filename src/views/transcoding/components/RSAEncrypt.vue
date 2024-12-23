<script setup lang="ts">
import {ref} from "vue";
import useTranscodingStore from "@/views/transcoding/store";
import {storeToRefs} from "pinia";
import {RightCircleFilled} from '@ant-design/icons-vue';

const transcodingStore = useTranscodingStore();
const {rsa_crypto_config} = storeToRefs(transcodingStore);
const {copy_encrypt_result, rsa_encrypt_by_public_key} = transcodingStore

const public_key_placeholder = `请输入公钥...
提示：加密信息使用的公钥应是信息接受者的公钥，不是你的公钥。`
</script>

<template>
  <div class="window">
<!--    {{ rsa_crypto_config }}-->
    <!--    第一行：需要加密的文字-->
    <div class="plain_text">
      <a-textarea class="plain_text_input " v-model:value="rsa_crypto_config.plain_text"
                  placeholder="请输入要加密的明文">
      </a-textarea>

    </div>
    <!--    第二行：公钥-->
    <div class="public_key">
      <a-textarea class="public_key_input" v-model:value="rsa_crypto_config.public_key"
                  :placeholder="public_key_placeholder">
      </a-textarea>

    </div>
    <div class="config">
      <span>公钥是Base64编码</span>
      <a-switch v-model:checked="rsa_crypto_config.is_public_key_b64"></a-switch>
      <a-button type="primary" style="width: 6rem;margin-left: 10rem"
                @click="rsa_encrypt_by_public_key()">
        <template #icon>
          <right-circle-filled/>
        </template>
        加密
      </a-button>
    </div>
    <!--    第三行：加密结果-->
    <div class="result" @click="copy_encrypt_result()">
      <p>加密结果</p>
      {{ rsa_crypto_config.encrypt_result.length > 1 ? rsa_crypto_config.encrypt_result : "......" }}
    </div>
    <!--    页面尾部：tip-->

  </div>
</template>

<style scoped lang="less">
.window {
  //width: 50rem;
  margin: 0 auto;
  //background-color: #b74747;
  .plain_text, .public_key {
    width: 40rem;
    margin: 0 auto;

    .plain_text_input {
      resize: none;
      height: 6rem;
    }
  }

  .public_key {
    //background-color: #bdf8ff;
    margin-top: 2rem;
    border: #01579B 5px solid;

    .public_key_input {
      resize: none;
      height: 6rem;
    }
  }

  .config {
    margin-top: 0.5rem;

    span {
      margin-right: 0.5rem;
    }
  }

  .result {
    width: 40rem;
    margin: 0 auto;
    margin-top: 1rem;
    word-break: break-word;
    white-space: pre-line;
    border-radius: 0.5rem;
    padding: 1rem;
    background-color: #CFD8DC;
    transition: all 0.2s;

    &:active {
      filter: opacity(0.5);
    }

    p {
      font-size: 1rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
    }
  }
}
</style>

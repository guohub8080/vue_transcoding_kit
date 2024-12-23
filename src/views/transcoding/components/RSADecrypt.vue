<script setup lang="ts">
import {ref} from "vue";
import useTranscodingStore from "@/views/transcoding/store";
import {storeToRefs} from "pinia";
import {RightCircleFilled} from '@ant-design/icons-vue';

const transcodingStore = useTranscodingStore();
const {rsa_crypto_config} = storeToRefs(transcodingStore);
const {copy_decrypt_result, decrypt_by_private_key} = transcodingStore

const private_key_placeholder = `请输入私钥...
提示：私钥必须注意保管，不可泄露。本页面不保存私钥。`
</script>

<template>
  <div class="window">
    <!--    {{ rsa_crypto_config }}-->
    <!--    第一行：需要解密的文字-->
    <div class="encrypted_text">
      <a-textarea class="plain_text_input " v-model:value="rsa_crypto_config.encrypted_text"
                  placeholder="请输入要解密的密文">
      </a-textarea>

    </div>
    <!--    第二行：私钥-->
    <div class="private_key">
      <a-textarea class="public_key_input" v-model:value="rsa_crypto_config.private_key"
                  :placeholder="private_key_placeholder">
      </a-textarea>

    </div>
    <div class="config">
      <span>私钥是Base64编码</span>
      <a-switch v-model:checked="rsa_crypto_config.is_private_key_b64"></a-switch>
      <a-button type="primary" style="width: 6rem;margin-left: 10rem"
                @click="decrypt_by_private_key()">
        <template #icon>
          <right-circle-filled/>
        </template>
        解密
      </a-button>
    </div>
    <!--    第三行：加密结果-->
    <div class="result" @click="copy_decrypt_result()">
      <p>解密结果</p>
      {{ rsa_crypto_config.decrypt_text.length >= 1 ? rsa_crypto_config.decrypt_text : "......" }}
    </div>
    <!--    页面尾部：tip-->

  </div>
</template>

<style scoped lang="less">
.window {
  //width: 50rem;
  margin: 0 auto;
  //background-color: #b74747;
  .encrypted_text, .private_key {
    width: 40rem;
    margin: 0 auto;

    .plain_text_input {
      resize: none;
      height: 6rem;
    }
  }

  .private_key {
    //background-color: #bdf8ff;
    margin-top: 2rem;
    border: #BF360C 5px solid;

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

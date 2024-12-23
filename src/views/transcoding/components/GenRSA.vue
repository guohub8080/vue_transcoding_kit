<script setup lang="ts">
import {ref} from "vue";
import useTranscodingStore from "@/views/transcoding/store";
import {storeToRefs} from "pinia";
import {RightCircleFilled} from '@ant-design/icons-vue';

const transcodingStore = useTranscodingStore();
const {gen_rsa_config} = storeToRefs(transcodingStore);
const {gen_rsa_keys, copy_rsa_key} = transcodingStore
</script>

<template>
  <div class="window">
    <!--    第一行：配置-->
    <div class="config">
      <span>
              生成位数
      </span>

      <a-radio-group v-model:value="gen_rsa_config.key_length" button-style="solid"
                     :disabled="gen_rsa_config.disable_button">
        <a-radio-button :value="512">512</a-radio-button>
        <a-radio-button :value="1024">1024</a-radio-button>
        <a-radio-button :value="2048">2048</a-radio-button>
        <a-radio-button :value="4096">4096</a-radio-button>
      </a-radio-group>

      <span class="second_config">以Base64编码</span>
      <a-switch :disabled="gen_rsa_config.disable_button" v-model:checked="gen_rsa_config.b64_encode"/>
      <span class="as_gap"></span>
      <a-button type="primary" style="width: 6rem" @click="gen_rsa_keys()" :loading="gen_rsa_config.loading">
        <template #icon>
          <right-circle-filled/>
        </template>
        生成
      </a-button>
    </div>
    <!--    第二行：公钥和私钥-->
    <div class="keys">

      <div class="public_key" @click="copy_rsa_key()">
        <p>公钥</p>
        <div v-if="gen_rsa_config.public_key.length===0">公开传输，用于加密</div>
        {{
          gen_rsa_config.b64_encode ? gen_rsa_config.public_key_b64 : gen_rsa_config.public_key
        }}
      </div>
      <div class="private_key" @click="copy_rsa_key(false)">
        <p>私钥</p>
        <div v-if="gen_rsa_config.public_key.length===0">绝对保密，用于解密</div>
        {{
          gen_rsa_config.b64_encode ? gen_rsa_config.private_key_b64 : gen_rsa_config.private_key
        }}
      </div>
    </div>

    <!--    页面尾部：tip-->
    <div class="foot_tip">
      * 密钥通过调用函数于本地运算生成。<br>
      * 密钥在页面刷新后消失，请及时保存。 <br>
      * 密钥生成速度取决于当前设备算力。<br>

    </div>
  </div>
</template>

<style scoped lang="less">
.window {
  //width: 50rem;
  margin: 0 auto;
  //background-color: #b74747;

  .config {
    //display: flex;
    & > span {
      margin-right: 0.2rem;
      //background-color: #6b3d3d;
      //第二个config（以Base64编码）的按钮span设置
      &.second_config {
        margin-left: 3rem;
      }

      //在生成按钮前有一个看不见的gap
      &.as_gap {
        width: 5rem;
        display: inline-block;
      }
    }
  }

  .keys {
    margin-top: 1rem;
    transition: all 0.2s;
    display: flex;
    justify-content: center;
    font-family: consola, "Helvetica Neue", Helvetica, Arial,
    "PingFang SC", "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei",
    "WenQuanYi Micro Hei", sans-serif;
    font-size: 1rem;
    white-space: pre-line;
    color: white;
    cursor: pointer;
    //font-weight: 600;
    p {
      font-size: 1.3rem;
      font-weight: 700;
      margin-bottom: 0.2rem;
    }

    //公钥（左边）
    .public_key {
      color: #ececec;
      padding: 0.8rem;
      word-break: break-word;
      background-color: #01579B;
      width: 17rem;
      border-radius: 0.5rem 0 0 0.5rem;
      transition: all 0.2s;

      &:active {
        filter: opacity(0.5);
      }
    }

    //私钥（右边）
    .private_key {
      color: #304455;
      padding: 0.8rem;
      word-break: break-word;
      width: 40rem;
      background-color: #B0BEC5;
      border-radius: 0 0.5rem 0.5rem 0;
      transition: all 0.2s;

      &:active {
        filter: opacity(0.5);
      }
    }
  }

  .foot_tip {
    margin-top: 2rem;
    border-top: #9d9d9d 1px dashed;
    color: #838383;
    padding-top: 1.5rem;
    font-size: 0.9rem;
  }
}
</style>

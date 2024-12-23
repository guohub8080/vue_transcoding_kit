<script setup lang="ts">
import useTranscodingStore from "../store";

const transcodingStore = useTranscodingStore();
const {base64_history, delete_b64_history, copy_input, copy_output} = transcodingStore
const props = defineProps<{
  history: {
    origin_text: String,
    origin_length: Number,
    trans_text: String,
    trans_length: Number,
    method: String
  }
  index: Number

}>();

const key_method = (is_encode = true) => {
  if (props.history.method === "encode") {
    if (is_encode) {
      return "encode"
    }
    return "decode"
  }
  if (is_encode) {
    return "decode"
  }
  return "encode"
}

</script>

<template>
  <div class="single_history">
    <table>
      <tbody>
      <tr class="first_line">
        <td class="tag">
          <span> {{ props.index + 1 }} </span>
          <span :class="key_method()">{{ props.history.method.toString().toUpperCase() }}</span>
        </td>
        <td>
          <a @click="copy_input(props.index)">复制输入</a>
          <a @click="copy_output(props.index)">复制输出</a>
          <a @click="delete_b64_history(props.index)">删除记录</a>
        </td>
      </tr>
      <tr class="content">
        <td>From ({{ props.history.origin_length }})</td>
        <td class="key_up" :class="key_method()"
            @click="copy_input(props.index)"
        >{{ props.history.origin_text }}
        </td>
      </tr>
      <tr class="content">
        <td>To ({{ props.history.trans_length }})</td>
        <td class="key_down" :class="key_method(false)"
            @click="copy_output(props.index)"
        >{{ props.history.trans_text }}
        </td>
      </tr>
      </tbody>
    </table>

  </div>
</template>

<style scoped lang="less">
//这个页面的CSS写的极其混乱，基本不具有可重改性
@font-face {
  font-family: "consola"; /* Project id 2878519 */
  src: url('../font/consola-1.ttf') format('truetype');
}

@font-face {
  font-family: "jetbrains"; /* Project id 2878519 */
  src: url('../font/JetBrainsMono-Regular-2.ttf') format('truetype');
}

table {
  width: 45rem;
  table-layout: fixed;
  margin: 0 auto;
  margin-top: 1rem;
  margin-bottom: 1rem;
  border-top: #304455 1px dashed;

  tr {
    padding: 0;
    margin: 0;

    &.content {
      td:last-child {
        font-family: consola, "Helvetica Neue", Helvetica, Arial,
        "PingFang SC", "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei",
        "WenQuanYi Micro Hei", sans-serif;
        //font-weight: 700;
      }

      //padding-top: 0.2rem;
    }
  }

  td {
    //border: #304455 0.5px solid;
    margin: 0;
    padding: 0;
  }

  tr.first_line td {
    z-index: -1;
  }

  tr:not(.first_line) td {
    z-index: 100;
  }

  //控制第一行第一列
  tr.first_line td:first-child {
    width: 9rem;
    height: 1.5rem;

    &.tag span {
      margin-top: 1rem;
      //margin-bottom: 0.5rem;

      &:nth-child(1) {

        width: 2rem;
        display: inline-block;
        border-radius: 0.3rem 0 0 0.3rem;
        border: #304455 1px solid;
        border-right: 0;
        //background-color: #c41e1e;
        background-color: #fff;
      }

      &:nth-child(2) {
        //width: 100%;
        width: 6rem;
        border-radius: 0 0.3rem 0.3rem 0;
        border: #304455 1px solid;
        border-left: 0;
        display: inline-block;
        //background-color: #c41e1e;
      }
    }
  }

  //控制第一行第二列
  tr.first_line td:last-child {
    margin-bottom: 0;
    //padding-bottom: 0;
    //align-items: start;
    vertical-align: bottom;
    padding-bottom: 0.2rem;


    a {
      z-index: 0;
      margin-left: 2rem;
      margin-right: 2rem;
      //background-color: #e7e7e7;
      //text-decoration: underline;
      text-underline: #304455;
      padding: 0.4rem;
      padding-left: 2rem;
      padding-right: 2rem;
      border-radius: 0.5rem 0.5rem 0 0;
      font-weight: 700;
      color: #0277BD;

      &:last-child {
        color: #c41e1e;
      }
    }

  }

  tr:not(.first_line) td {
    //background-color: #623131;
    //控制From和to
    &:nth-child(1) {
      border: 0;
      text-align: right;
      //padd-right: 0.2rem;
      padding-right: 0.6rem;
    }
  }

  td.key_up, td.key_down {
    //background-color: #b96666;
    font-size: 0.95rem;
    padding: 0.5rem;
    line-height: 1.2rem;
    cursor: pointer;
    //white-space: pre-wrap;
    line-break: loose;
    //word-wrap:normal;
    text-wrap: normal;
    overflow-wrap: break-word;
    white-space: pre-line;
    //height: content-box;
  }

  td.key_up {
    border-radius: 0.5rem 0.5rem 0 0;
  }

  td.key_down {
    border-radius: 0 0 0.5rem 0.5rem;
  }

}

.encode {
  background-color: #CFD8DC;
  //font-weight: 700;
}

.decode {
  background-color: #0277BD;
  color: white;
  //font-weight: 700;
}

.single_history {
  width: 50rem;
  margin: 0 auto;


}

.display {
  padding-left: 2.5rem;
}

</style>

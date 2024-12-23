<script setup lang="ts"></script>

<template>
  <!--  </div>--><h1 @click="$router.go(0)">关于本网页</h1>
  <div class="window">
    <p>作者：方块郭   <span style="width: 2rem;display: inline-block"></span> 邮箱：guo2018 # 88.com （请将#替换成@）</p>
    <p>本网页为探索前后端互相加解密发送信息的额外产物，换言之，算是学习成果的展示。 关于Base64编码、RSA加解密等已有大量的现成网页小工具，本网页的功能并不齐全——其意义并不在于重复造轮子，而在于记录自己的学习进步。</p>
    <p>第一段代码是TypeScript，用于前端使用，技术栈为Vue3 + Vite + TypeScript，经测试没有问题。使用Pinia作为状态管理库同样顺利运行。</p>
    <p>第二段代码是Python，用于后端使用，技术栈为Python3.10 + Django4，经测试没有问题。</p>
    <iframe src="/vue_transcoding_kit/crypto.html"></iframe>
  </div>


</template>

<style scoped lang="less">
@font-face {
  font-family: "consola"; /* Project id 2878519 */
  src: url('../font/consola-1.ttf') format('truetype');
}
iframe{
  width: 45rem;
  border: none;
  height:310rem;
  margin: 0 auto;
  border-radius: 1rem;
  //background-color: #006179;
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
  margin-bottom: 2rem;
}

.window {
  width: 45rem;
  //background-color: #b04646;
  margin: 0 auto;

  p {
    font-size: 1rem;
    color: #304455;
    text-align: justify;
    line-height: 1.7rem;
    padding-left: 1rem;
    padding-right: 1rem;
  }
  code{
    text-align: start;
    //text-align: left;
  }
}


</style>

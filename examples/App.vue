<script setup lang="ts">

import {ref} from 'vue';
import ElectronicSign from './packages/index';

const Sign = ref();

function clearCan() {
  Sign.value.clear();
}

function down() {
  Sign.value.download();
}

function onsubmit() {
  console.log('获取签名', Sign.value.getSignByFormData());
}
</script>

<template>
  <electronic-sign
      width="500"
      height="300"
      radius="10px"
      padding="10px"
      border="1px solid #000"
      backgroundCanvas="black"
      backgroundPadding="#fff"
      color="gold"
      :lineWidth="3"
      ref="Sign"
  />
  <button @click="clearCan()">清空</button>
  <button @click="down()">下载图片</button>
  <button @click="onsubmit()">提交</button>
</template>

<style scoped>

</style>

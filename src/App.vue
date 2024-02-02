<template>
  <ElectronicSign ref="Sign" weight="3"/>
  <button @click="getSing">获取签名</button>
</template>

<script setup>

import ElectronicSign from "@/package/ElectronicSign.vue";

import { ref } from "vue";
const Sign = ref()
function getSing() {
  console.log('获取签名', Sign.value.getSignByFormData())
}
</script>

<style>
</style>

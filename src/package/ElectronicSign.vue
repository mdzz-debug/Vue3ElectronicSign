<style>
#canvas {
  border: 1px solid #000;
  border-radius: v-bind("props.radius");
  overflow: hidden;
  width: v-bind("props.width");
  height: v-bind("props.height");
}

#signCanvas {
  width: 100%;
  height: 100%;
}
</style>

<template>
  <!-- canvas -->
  <div id="canvas">
    <canvas id="signCanvas" :width="props.width" :height="props.height"></canvas>
  </div>
</template>

<script setup>
import {defineProps, onMounted, defineExpose} from "vue";
// 父组件传递的参数
const props = defineProps({
  width: {
    type: String,
    default: '300px'
  },
  height: {
    type: String,
    default: '200px'
  },
  radius: {
    type: String,
    default: '0px'
  },
  weight: {
    type: String,
    default: '3'
  },
  color: {
    type: String,
    default: '#000'
  }
});

// 签名画布
let signCanvas = null;
// 签名画笔
let signContext = null;
// 签名是否开始
let isSign = false;
// 签名开始坐标
let signStart = {x: 0, y: 0};
// 签名结束坐标
let signEnd = {x: 0, y: 0};

// 初始化
onMounted(() => {
  signCanvas = document.getElementById('signCanvas');
  signContext = signCanvas.getContext('2d');
  signCanvas.addEventListener('mousedown', signStartEvent);
  signCanvas.addEventListener('mousemove', signMoveEvent);
  signCanvas.addEventListener('mouseup', signEndEvent);
  signCanvas.addEventListener('touchstart', signStartEvent);
  signCanvas.addEventListener('touchmove', signMoveEvent);
  signCanvas.addEventListener('touchend', signEndEvent);
});

// 签名开始
function signStartEvent(e) {
  isSign = true;
  signStart = {
    x: e.clientX || e.touches[0].clientX,
    y: e.clientY || e.touches[0].clientY
  };
}

// 签名移动，加粗
function signMoveEvent(e) {
  if (isSign) {
    signEnd = {
      x: e.clientX || e.touches[0].clientX,
      y: e.clientY || e.touches[0].clientY
    };
    signContext.beginPath();
    signContext.moveTo(signStart.x, signStart.y);
    signContext.lineTo(signEnd.x, signEnd.y);
    signContext.lineWidth = props.weight;
    signContext.lineCap = 'round';
    signContext.lineJoin = 'round';
    signContext.strokeStyle = props.color;
    signContext.stroke();
    signStart = signEnd;
  }
}

// 签名结束
function signEndEvent() {
  isSign = false;
}

// 清空签名
// eslint-disable-next-line no-unused-vars
function clearSign() {
  signContext.clearRect(0, 0, signCanvas.width, signCanvas.height);
}

// 获取签名base64
// eslint-disable-next-line no-unused-vars
function getSignByBase64() {
  return signCanvas.toDataURL('image/png');
}

function base64ToBlob(base64Data) {
  const dataArr = base64Data.split(',');
  const imageType = dataArr[0].match(/:(.*?);/)[1];
  const textData = window.atob(dataArr[1]);
  const arrayBuffer = new ArrayBuffer(textData.length);
  const uint8Array = new Uint8Array(arrayBuffer);
  for (let i = 0; i < textData.length; i++) {
    uint8Array[i] = textData.charCodeAt(i);
  }
  return [new Blob([arrayBuffer], {type: imageType}), imageType.slice(6)];
}

// eslint-disable-next-line no-unused-vars
function getSignByFormData() {
  const base64Data = getSignByBase64();
  const [imageBlob, imageType] = base64ToBlob(base64Data);
  const formData = new FormData();
  formData.append('file', imageBlob, `${Date.now()}.${imageType}`);
  return formData;
}

// 下载签名
// eslint-disable-next-line no-unused-vars
function downloadSign() {
  const a = document.createElement('a');
  a.href = signCanvas.toDataURL('image/png');
  a.download = new Date().getTime() + '.png';
  a.click();
}

defineExpose({getSignByBase64, getSignByFormData, clearSign, downloadSign})

</script>
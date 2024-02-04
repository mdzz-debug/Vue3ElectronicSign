<style>
#canvas {
  border: v-bind("props.border");
  border-radius: v-bind("props.radius");
  width: v-bind("props.width");
  height: v-bind("props.height");
  padding: v-bind("props.padding");
  background: v-bind("props.backgroundPadding");
}

#signCanvas {
  background: v-bind("props.backgroundCanvas");
  border-radius: v-bind("props.radius");
  vertical-align: bottom;
}
</style>

<template>
  <!-- canvas -->
  <div id="canvas">
    <canvas id="signCanvas" ref="signCanvas" :width="props.width" :height="props.height"/>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted, onUnmounted, defineExpose} from 'vue';

// 约束父组件传递的参数类型
const props = defineProps({
  width: {
    type: String||Number,
    default: '300'
  },
  height: {
    type: String||Number,
    default: '200'
  },
  radius: {
    type: String,
    default: '0px'
  },
  padding: {
    type: String,
    default: '0px'
  },
  border: {
    type: String,
    default: '1px solid #000'
  },
  backgroundCanvas: {
    type: String,
    default: '#fff'
  },
  backgroundPadding: {
    type: String,
    default: '#fff'
  },
  lineWidth: {
    type: Number,
    default: 3
  },
  color: {
    type: String,
    default: '#000'
  }
});

const signCanvas = ref(null);
let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;
let painting = false;

onMounted(() => {
  canvas = (signCanvas.value as unknown) as HTMLCanvasElement;
  ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

  canvas.addEventListener('mousedown', startPosition);
  canvas.addEventListener('mouseup', finishedPosition);
  canvas.addEventListener('mousemove', draw);
});

onUnmounted(() => {
  canvas.removeEventListener('mousedown', startPosition);
  canvas.removeEventListener('mouseup', finishedPosition);
  canvas.removeEventListener('mousemove', draw);
});

function startPosition(e: MouseEvent) {
  painting = true;
  draw(e);
}

function finishedPosition() {
  painting = false;
  ctx.beginPath();
}

function draw(e: MouseEvent) {
  if (!painting) return;
  ctx.lineWidth = props.lineWidth;
  ctx.lineCap = 'round';
  ctx.strokeStyle = props.color || '#000';

  ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
}

// 清空画布
function clear() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// 获取签名base64
function getSignByBase64() {
  return canvas.toDataURL('image/png');
}

// base64转blob
function base64ToBlob(base64Data: string) {
  const byteString = atob(base64Data.split(',')[1]);
  const mimeString = base64Data.split(',')[0].split(':')[1].split(';')[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], {type: mimeString});
}

// 获取签名FormData
function getSignByFormData($name = 'file') {
  const base64 = getSignByBase64();
  const blob = base64ToBlob(base64);
  const formData = new FormData();
  formData.append($name, blob);
  return formData;
}

// 下载签名
function download() {
  const a = document.createElement('a');
  a.href = canvas.toDataURL('image/png');
  a.download = new Date().getTime() + '.png';
  a.click();
}

// 暴露给父组件的方法
defineExpose({clear, getSignByBase64, getSignByFormData, download});
</script>


<script lang="ts">
export default {
  name: 'electronic-sign',
}
</script>
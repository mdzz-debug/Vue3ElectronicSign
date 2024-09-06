<style scoped>
#signCanvas {
    border-radius: var(--canvas--radius);
    border: var(--cavnas--border);
}
</style>

<template>
  <canvas
    id="signCanvas"
    ref="signCanvas"
    :width="props.width + 'px'"
    :height="props.height + 'px'"
    :style="cssVariables"
  />
</template>

<script setup lang="ts">
import {ref, onMounted, onUnmounted, defineExpose, withDefaults, defineProps, computed} from 'vue';

const props = withDefaults(defineProps<{
  width?: number; // 画板宽度
  height?: number; // 画板高度
  border?: string; // 画板边框
  radius?: number; // 画板圆角
  color?: string; // 画笔颜色
  lineWidth?: number; // 笔画粗细
  background?: string; // 画板背景
  placeholder?: string; // 占位文字
  placeholderColor?: string; // 占位文字颜色
  placeholderFont?: string; // 占位文字字体大小
  autoClean?: boolean; // 是否自动清空画布
}>(),
    {
        width: 300,
        height: 200,
        radius: 2,
        background: '#fff',
        lineWidth: 3,
        color: '#000',
        border: '1px solid #aaa',
        placeholderFont: '24px Arial',
        placeholderColor: '#aaa',
        placeholder: '签名区',
        autoClean: false
    }
)

const cssVariables = computed(() => ({
  '--canvas--radius': props.radius + 'px',
  '--cavnas--border': props.border
}))

const signCanvas = ref(null);
let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;
let painting = false;
const drawTimes = ref(0)

onMounted(() => {
  canvas = (signCanvas.value as unknown) as HTMLCanvasElement;
  ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

  canvas.addEventListener('mousedown', startPosition);
  canvas.addEventListener('mouseup', finishedPosition);
  canvas.addEventListener('mousemove', draw);
  canvas.addEventListener('mouseleave', finishedPosition);
  initCanvas()
});

onUnmounted(() => {
  canvas.removeEventListener('mousedown', startPosition);
  canvas.removeEventListener('mouseup', finishedPosition);
  canvas.removeEventListener('mousemove', draw);
});

function startPosition(e: MouseEvent) {
  painting = true;
  if (props.autoClean) {
    initFillStyle()
  } else {
    if (drawTimes.value === 0) {
      initFillStyle()
      drawTimes.value++
    }
  }
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

// 添加背景
function initFillStyle() {
  ctx.fillStyle = props.background;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// 初始化文字区域
function initFillText() {
  ctx.font = props.placeholderFont;
  ctx.fillStyle = props.placeholderColor;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(props.placeholder, canvas.width / 2, canvas.height / 2);
}

// 初始化
function initCanvas() {
  initFillStyle()
  initFillText()
}


// 清空画布
function clean() {
  drawTimes.value = 0
  initCanvas()
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
defineExpose({clean, getSignByBase64, getSignByFormData, download});
</script>


<script lang="ts">
export default {
  name: 'electronic-sign',
}
</script>
# ElectronicSign

### 支持

- vue3 ✅
- vue2 ❌

### 组件介绍

- ElectronicSign 电子签名

  ```vue
  <ElectronicSign
    :width="500"
    :height="300"
    :radius="10"
    border="1px solid #000"
    background="#000"
    color="gold"
    lineWidth="3"
    ref="Sign"
  />

  <script setup>
  import { ref } from "vue";
  const Sign = ref();
  // Sign.value.getSignByFormData() 获取签名图片到FormData
  // Sign.value.getSignByBase64() 获取Base64签名图片
  // Sign.value.clean() 清除签名
  // Sign.value.download() 获取签名图片
  </script>
  ```

### 效果图

![img.png](https://lh-notes.oss-cn-beijing.aliyuncs.com/image.gif)

### Props

| Props            | 说明             | 类型    | 默认值         |
| ---------------- | ---------------- | ------- | -------------- |
| width            | 画板宽度         | number  | 300            |
| height           | 画板高度         | number  | 200            |
| border           | 画板边框         | sting   | 1px solid #aaa |
| radius           | 画板圆角         | number  | 2              |
| color            | 画笔颜色         | string  | '#000'         |
| lineWidth        | 笔画粗细         | number  | 3              |
| background       | 画板背景         | string  | '#fff'         |
| placeholder      | 占位文字         | string  | 签名区         |
| placeholderColor | 占位文字颜色     | string  | '#aaa'         |
| placeholderFont  | 占位文字字体大小 | string  | '24px Arial'   |
| autoClean        | 是否自动清空画布 | boolean | false          |

### 方法

| 方法              | 描述                    |
| ----------------- | ----------------------- |
| getSignByFormData | 获取签名图片到 FormData |
| getSignByBase64   | 获取 Base64 签名图片    |
| clean             | 清除签名                |
| download          | 下载签名图片            |

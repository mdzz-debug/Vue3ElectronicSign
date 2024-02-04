# ElectronicSign

### 版本

- 1.0.0

### 组件介绍

1. ElectronicSign 电子签名
   ```vue
   <!--   width 宽度-->
   <!--   height 高度-->
   <!--   radius 圆角-->
   <!--   padding 内边距-->
   <!--   border 边框-->
   <!--   backgroundCanvas 画布背景-->
   <!--   backgroundPadding 画布内边距背景-->
   <!--   color 画笔颜色-->
   <!--   lineWidth 画笔宽度-->
   <electronic-sign
      width="500"
      height="300"
      radius="10px"
      padding="10px"
      border="1px solid #000"
      backgroundCanvas="black"
      backgroundPadding="#fff"
      color="gold"
      lineWidth="3"
      ref="Sign"
   />
   
   <script setup>
        import { ref } from "vue";
        const Sign = ref()
       // Sign.value.getSignByFormData() 获取签名图片到FormData
       // Sign.value.getSignByBase64() 获取Base64签名图片
       // Sign.value.clearSign() 清除签名
       // Sign.value.downloadSign() 获取签名图片
   </script>
   ```
   
![img.png](img.png)
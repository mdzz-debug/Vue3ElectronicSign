# ElectronicSign

### 版本

- 1.0.0

### 组件介绍

1. ElectronicSign 电子签名
   ```vue
   <!-- 电子签名组件 -->
   
   <ElectronicSign
       ref="Sign"
       radius="5"
       width="300px"
       height="200px"
       color="#000"
       weight="3"
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
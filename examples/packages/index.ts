// index.ts
import type { App } from 'vue'
import ElectronicSign from "./electronic_sign/electronic-sign.vue";

// 使用install方法，在app.use挂载
ElectronicSign.install = (app: App) => {
  app.component(ElectronicSign.__name as string, ElectronicSign) //注册组件
}

export {
  ElectronicSign
}
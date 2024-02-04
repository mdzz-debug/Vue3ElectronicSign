//package/index.js
import Electronic_sign from "./electronic_sign/electronic_sign.vue";
const coms = [Electronic_sign]; // 将来如果有其它组件,都可以写到这个数组里

// 批量组件注册
const install = function (Vue: any) {
  coms.forEach((com) => {
    Vue.component(com.name, com);
  });
};

export default install;
import { App } from "vue";
import ElectronicSign from "./electronic-sign/electronic-sign.vue";

export {ElectronicSign};

export default {
    install(app: App) {
        app.component("ElectronicSign", ElectronicSign);
        // 如果还有更多的组件需要注册，可以在这里继续添加
        //  app.component("Vv3Test1", Vv3Test1);
        //  app.component("Vv3Test2", Vv3Test2);
    }
}

declare module "vue" {
    export interface GlobalComponents {
        ElectronicSign: typeof ElectronicSign
    }
}
import ElectronicSign from "@/package/ElectronicSign.vue";

const coms = [ElectronicSign];
export default {
    install(Vue) {
        coms.forEach((com) => {
            Vue.component(com.name, com)
        })
    }
}
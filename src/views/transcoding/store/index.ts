import {defineStore} from 'pinia'
import {computed, ComputedRef, reactive, Ref, ref} from 'vue';
import {useRoute} from "vue-router";
import {message} from "ant-design-vue";
import {useLocalStorage} from "@vueuse/core";
// import {useClipboard} from '@vueuse/core'
import vue_clipboard3 from "vue-clipboard3"
// useStore 可以是 useUser、useCart 之类的任何东西
import {days_gap} from "@/views/date_calc/utils/gzt-local-time";
import {Base64} from "js-base64";
import {limit_str} from "@/views/transcoding/logic";
import guo_crypt from "@/views/transcoding/logic/guo_crypt";
import PromiseWorker from "promise-worker";
// import Worker from "worker-loader!./gen_rsa_keysworker"
import gen_worker from "./gen_rsa_keys_worker.js?worker";

const limit_length = 15
const {toClipboard} = vue_clipboard3()
// 第一个参数是应用程序中 store 的唯一 id
export default defineStore('transcoding', () => {
    // 页面填入的数据

    const base64_input = ref("")
    // Base64页面是逆序还是顺序
    const base64_history_reverse = ref(true)
    // 载入Base64历史的数据
    const base64_history = ref<any[]>([])


    // 复制输入
    const copy_input = (history_index: number) => {
        if (base64_history.value) {
            const target_string = base64_history.value[history_index].origin_text
            toClipboard(target_string)
            message.success(`成功复制输入值\n"${limit_str(target_string, limit_length)}"`)
        }
    }

    // 复制输出
    const copy_output = (history_index: number) => {
        if (base64_history.value) {
            const target_string = base64_history.value[history_index].trans_text
            toClipboard(target_string)
            message.success(`成功复制输出值\n"${limit_str(target_string, limit_length)}"`)
        }
    }

    // 执行Base64的函数
    const do_b64 = (encode = true) => {
        if (!Boolean(base64_input.value)) {
            return
        }
        let result_obj = {
            origin_text: base64_input.value.trim(),
            origin_length: base64_input.value.trim().length,
            trans_text: "",
            trans_length: 0,
            method: ""
        }
        if (encode) {
            const result = Base64.encode(base64_input.value.trim())
            result_obj.method = "encode"
            result_obj.trans_text = result
            result_obj.trans_length = result.length
            toClipboard(result)
            message.success(`已自动复制到剪贴板\n"${limit_str(result, limit_length)}"`)
            if (base64_history_reverse.value) {
                base64_history.value.unshift(result_obj)
            } else {
                base64_history.value.push(result_obj)
            }
        } else {
            try {
                const result = Base64.decode(base64_input.value.trim())
                // @ts-ignore
                if (!Boolean(result)) throw new Error("解码错误")

                // console.log(typeof result)
                result_obj.method = "decode"
                result_obj.trans_text = result.toString()
                result_obj.trans_length = result.length
                toClipboard(result)
                // Clipboard.writeText(result)
                message.success(`已自动复制到剪贴板\n"${limit_str(result.toString(), limit_length)}"`)
                if (base64_history_reverse.value) {
                    base64_history.value.unshift(result_obj)
                } else {
                    base64_history.value.push(result_obj)
                }
            } catch (e) {
                // console.log(e)
                message.error("输入的字符可能不是由Base64编码，请重新输入")
                return;
            }

        }
        base64_input.value = ""
    }

    // 反转base64历史记录（最新的在下）
    const revert_b64_history = () => {
        base64_history.value.reverse()
    }
    // 清除Base64的历史
    const delete_b64_history = (delete_index: number) => {
        base64_history.value.splice(delete_index, 1)
    }

    // 生成RSA密钥的配置文件
    const gen_rsa_config = ref({
        key_length: 2048,
        b64_encode: true,
        private_key: "",
        private_key_b64: "",
        public_key: "",
        public_key_b64: "",
        loading: false,
        disable_button: false
    })

    // 生成RSA的函数
    const gen_rsa_keys = async () => {
        const tip_words = "生成中"
        const tip_words2 = `
        生成中...
        计算量较大，可能时间较长
        
        `
        gen_rsa_config.value.disable_button = true
        const gen_judge = Boolean(gen_rsa_config.value.key_length <= 1024)
        gen_rsa_config.value.loading = true
        gen_rsa_config.value.public_key = gen_judge ? tip_words : tip_words2
        gen_rsa_config.value.public_key_b64 = gen_judge ? tip_words : tip_words2
        gen_rsa_config.value.private_key = gen_judge ? tip_words : tip_words2
        gen_rsa_config.value.private_key_b64 = gen_judge ? tip_words : tip_words2

        const do_gen_rsa_worker = () => {
            let worker1 = new gen_worker()
            worker1.postMessage({key_length: gen_rsa_config.value.key_length})

            worker1.onmessage = (e) => {
                // console.log("收到信息", e)
                gen_rsa_config.value.public_key = e.data.public_key
                gen_rsa_config.value.public_key_b64 = e.data.public_key_b64
                gen_rsa_config.value.private_key = e.data.private_key
                gen_rsa_config.value.private_key_b64 = e.data.private_key_b64
                worker1.terminate()
                gen_rsa_config.value.loading = false
                gen_rsa_config.value.disable_button = false
                message.success("生成密钥对成功")
                // worker1.terminate()
            }
        }
        await do_gen_rsa_worker()
    }

    const copy_rsa_key = (is_public_key = true) => {
        if (gen_rsa_config.value.public_key.length < 100) {
            return
        }
        if (is_public_key) {
            if (gen_rsa_config.value.b64_encode) {
                toClipboard(gen_rsa_config.value.public_key_b64)
            } else {
                toClipboard(gen_rsa_config.value.public_key)
            }
            message.success("已复制公钥，可以分享")
        } else {
            if (gen_rsa_config.value.b64_encode) {
                toClipboard(gen_rsa_config.value.private_key_b64)
            } else {
                toClipboard(gen_rsa_config.value.private_key)
            }
            message.success("已复制私钥，请注意保存")
        }
    }

    const rsa_crypto_config = ref({
        plain_text: "",
        public_key: "",
        is_public_key_b64: true,
        encrypt_result: "",
        encrypted_text: "",
        private_key: "",
        is_private_key_b64: true,
        decrypt_text: ""
    })

    const rsa_encrypt_by_public_key = () => {
        if (rsa_crypto_config.value.plain_text.trim().length === 0) {
            message.warn("请输入要加密的文本")
            return;
        }
        if (rsa_crypto_config.value.public_key.trim().length === 0) {
            message.warn("请输入公钥")
            return;
        }
        let encrypt_result
        // 如果公钥是以Base64加密的，就直接调用这个函数，否则先把公钥加密成Base64再调用
        try {
            if (rsa_crypto_config.value.is_public_key_b64) {
                encrypt_result = guo_crypt.encrypt_string_by_b64_public_key(
                    rsa_crypto_config.value.plain_text, rsa_crypto_config.value.public_key)
            } else {
                encrypt_result = guo_crypt.encrypt_string_by_b64_public_key(
                    rsa_crypto_config.value.plain_text, Base64.encode(rsa_crypto_config.value.public_key))
            }
            if (!Boolean(encrypt_result)) {
                message.error("无法使用公钥加密，请检查公钥")
                return
            }
            rsa_crypto_config.value.encrypt_result = encrypt_result as string
            toClipboard(encrypt_result as string)
            message.success("自动复制加密结果")
        } catch (e) {
            message.error("加密失败，请检查输入")
            // console.log(e)
        }
    }

    const decrypt_by_private_key = () => {
        if (rsa_crypto_config.value.encrypted_text.trim().length === 0) {
            message.warn("请输入已被加密的文本")
            return;
        }
        if (rsa_crypto_config.value.private_key.trim().length === 0) {
            message.warn("请输入私钥")
            return;
        }
        try {
            let decrypt_result
            if (rsa_crypto_config.value.is_private_key_b64) {
                decrypt_result = guo_crypt.decrypt_string_by_b64_private_key(
                    rsa_crypto_config.value.encrypted_text, rsa_crypto_config.value.private_key)
            } else {
                decrypt_result = guo_crypt.decrypt_string_by_b64_private_key(
                    rsa_crypto_config.value.encrypted_text, Base64.encode(rsa_crypto_config.value.private_key))
            }
            if (!Boolean(decrypt_result)) {
                message.error("无法使用私钥解密，请检查私钥或密文")
                rsa_crypto_config.value.decrypt_text = ""
                return
            }
            rsa_crypto_config.value.decrypt_text = decrypt_result as string
            toClipboard(decrypt_result as string)
            message.success("自动复制解密原文")
        } catch (e) {
            message.error("解密出错，请检查输入")
        }
    }

    const copy_encrypt_result = () => {
        if (rsa_crypto_config.value.encrypt_result.trim().length === 0) {
            message.warn("加密结果为空，无法复制")
            return
        }
        toClipboard(rsa_crypto_config.value.encrypt_result.trim())
        message.success("已复制加密结果")
    }

    const copy_decrypt_result = () => {
        if (rsa_crypto_config.value.decrypt_text.trim().length === 0) {
            message.warn("解密结果为空，无法复制")
            return
        }
        toClipboard(rsa_crypto_config.value.decrypt_text.trim())
        message.success("已复制解密原文")
    }

    return {
        base64_input, base64_history, gen_rsa_config, base64_history_reverse, rsa_encrypt_by_public_key,
        do_b64, delete_b64_history, revert_b64_history, gen_rsa_keys, copy_rsa_key, rsa_crypto_config,
        copy_encrypt_result, decrypt_by_private_key, copy_decrypt_result,
        copy_input, copy_output
    }
})
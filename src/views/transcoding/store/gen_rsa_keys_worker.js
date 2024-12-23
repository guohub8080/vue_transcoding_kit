import guo_crypt from "@/views/transcoding/logic/guo_crypt";
import {Base64} from "js-base64";

self.onmessage = function (e) { //监听主线程发过来的消息
    // console.log('我是worker接收到的数据：', e.data);
    var keys_raw_str = guo_crypt.gen_keys(e.data.key_length)
    var private_key = keys_raw_str.private_key
    var private_key_b64 = Base64.encode(keys_raw_str.private_key)
    var public_key = keys_raw_str.public_key
    var public_key_b64 = Base64.encode(keys_raw_str.public_key)
    // console.log("要发送了")
    self.postMessage({private_key_b64, private_key, public_key_b64, public_key}); // 将信息发送到主线程上
    // console.log("发送了")
}

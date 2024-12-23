<script setup lang="ts">
import {computed, ref, watchEffect} from "vue";
import {random_select_from_string, random_arr_select} from "@/views/transcoding/logic/guo_random";
import vue_clipboard3 from "vue-clipboard3"
import {message} from "ant-design-vue";
import {limit_str} from "@/views/transcoding/logic";
import {nanoid} from "nanoid"
import { v4 as uuidv4 } from 'uuid';


const {toClipboard} = vue_clipboard3()
const characters = {
    cap: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    low: "abcdefghijklmnopqrstuvwxyz",
    num: "0123456789",
    special: "~!@#$%^&*()_+-=<>?/[];:."
}
const gen_uuid=(is_caption=false)=>{
    let uuid = uuidv4()
    // define a function that converts a string to hex
    if(is_caption){
        uuid=uuid.toUpperCase()
    }
    random_config.value.history.unshift(uuid)
}

const gen_nanoid=(is_caption=false)=>{
    let uuid = nanoid()
    // define a function that converts a string to hex
    if(is_caption){
        uuid=uuid.toUpperCase()
    }
    random_config.value.history.unshift(uuid)
}
const gen_psw = (is_contain_low: boolean, is_contain_cap: boolean,
                 is_contain_num: boolean, is_contain_special: boolean) => {
    let cha_section = ""
    const previous_length = random_config.value.history.length
    const do_psw = (cha_string: string, length: number) => {
        let str = ""
        for (let i = 0; i < length; i++) {
            str += random_select_from_string(cha_string)
        }
        return str
    }
    const cap_and_low = is_contain_cap && is_contain_low
    // 纯大写字母
    if (is_contain_cap && !is_contain_low && !is_contain_num && !is_contain_special) {
        cha_section = characters.cap
        random_config.value.history.unshift(do_psw(cha_section, random_config.value.psw_length))
        // 纯小写字母
    } else if (!is_contain_cap && is_contain_low && !is_contain_num && !is_contain_special) {
        cha_section = characters.low
        random_config.value.history.unshift(do_psw(cha_section, random_config.value.psw_length))
        // 大小写字母
    } else if (cap_and_low && !is_contain_num && !is_contain_special) {
        cha_section = characters.cap + characters.low
        random_config.value.history.unshift(do_psw(cha_section, random_config.value.psw_length))
        // 纯数字
    } else if (!is_contain_cap && !is_contain_low && is_contain_num && !is_contain_special) {
        cha_section = characters.num
        random_config.value.history.unshift(do_psw(cha_section, random_config.value.psw_length))
    } else if (cap_and_low) {
// 大小写+纯数字
        const first_cha = random_select_from_string(characters.cap + characters.low)
        if (is_contain_num && !is_contain_special) {
            cha_section = characters.low + characters.cap + characters.num
            const psw = first_cha + do_psw(cha_section, random_config.value.psw_length - 1)
            random_config.value.history.unshift(psw)
            // 大小写+纯数字+特殊字符
        } else if (is_contain_num && is_contain_special) {
            cha_section = characters.low + characters.cap + characters.num + characters.special
            const psw = first_cha + do_psw(cha_section, random_config.value.psw_length - 1)
            random_config.value.history.unshift(psw)
            // random_config.value.history.unshift(do_psw(cha_section, random_config.value.psw_length - 1))
            // 大小写+特殊字符
        } else if (!is_contain_num && is_contain_special) {
            cha_section = characters.low + characters.cap + characters.special
            const psw = first_cha + do_psw(cha_section, random_config.value.psw_length - 1)
            random_config.value.history.unshift(psw)
            // random_config.value.history.unshift(do_psw(cha_section, random_config.value.psw_length - 1))
        }
    }
    if (!Boolean(previous_length === random_config.value.history.length)) {
        // console.log(random_config.value.history)
        toClipboard(random_config.value.history[0])
        message.success("已自动复制到剪切板")
    }
}

const random_gen_psw = () => {
    const previous_history_length = random_config.value.history.length
    while (previous_history_length === random_config.value.history.length) {
        let random_pool = []
        for (let i = 1; i <= 4; i++) {
            random_pool.push(random_arr_select([true, false]))
        }
        // console.log(random_pool)
        while (random_pool.findIndex(target => target === true) === -1) {
            // console.log("找到")
            random_pool = []
            for (let i = 1; i <= 4; i++) {
                random_pool.push(random_arr_select([true, false]))
            }
            // console.log("已替换")
        }
        // console.log("春蚕", random_pool)
        gen_psw(random_pool[0], random_pool[1], random_pool[2], random_pool[3])
    }


}

const random_config = ref<{
    is_all_selected: boolean,
    psw_length: number,
    history: string[]
}>(
    {
        is_all_selected: false,
        psw_length: 32,
        history: []
    })

const copy_2_clipboard = (index: number) => {
    const clipboard_content = random_config.value.history[index]
    toClipboard(clipboard_content)
    message.success(`已复制 "${limit_str(clipboard_content, 40)}"`)
}
</script>

<template>


    <h1 @click="$router.go(0)">随机字符生成</h1>

    <div class="length">
        <a-input-number min="10" max="100" addon-before="生成位数" style="width: 9rem"
                        v-model:value="random_config.psw_length"></a-input-number>
        <span>
        <a-slider :min="10" :max="100"
                  v-model:value="random_config.psw_length"/>
    </span>

    </div>

    <div class="gen">
        <a-button class="normal_button" @click="gen_psw(false,true,false,false)">全大写字母</a-button>
        <a-button class="normal_button" @click="gen_psw(true,false,false,false)">全小写字母</a-button>
        <a-button class="normal_button" @click="gen_psw(false,false,true,false)">全数字</a-button>
        <a-button class="normal_button" @click="gen_psw(true,true,false,false)">大小写字母</a-button>
        <a-button class="normal_button" @click="gen_psw(true,true,true,true)">大小写字母 + 数字 + 特殊字符</a-button>
        <a-button class="normal_button" @click="gen_psw(true,true,false,true)">大小写字母 + 特殊字符</a-button>
        <a-button class="normal_button" @click="gen_psw(true,true,true,false)">大小写字母 + 数字</a-button>
        <a-button type="primary" class="normal_button" @click="random_gen_psw()">全随机生成</a-button>
        <a-divider style="margin-top:0.4rem;margin-bottom: 0.4rem" />
        <a-button class="normal_button" @click="gen_uuid(true)">随机UUID 大写</a-button>
        <a-button class="normal_button" @click="gen_uuid()">随机UUID 小写</a-button>
        <a-button class="normal_button" @click="gen_nanoid(true)">随机nanoid 大写</a-button>
        <a-button class="normal_button" @click="gen_nanoid()">随机nanoid 小写</a-button>


    </div>

    <div class="history">
        <div v-for="(item,index) in random_config.history" class="item" @click="copy_2_clipboard(index)">
            {{ item }}
        </div>
    </div>
    <div style="height: 15rem"></div>
</template>

<style scoped lang="less">
@font-face {
  font-family: "consola"; /* Project id 2878519 */
  src: url('../font/consola-1.ttf') format('truetype');
}

@font-face {
  font-family: "jetbrains"; /* Project id 2878519 */
  src: url('../font/JetBrainsMono-Regular-2.ttf') format('truetype');
}

h1 {
  font-size: 1.5rem;
  font-weight: 600;
  cursor: pointer;
  user-select: none;
}

.length {
  margin-top: 1rem;

  span {
    width: 20rem;
    display: inline-block;
    margin-left: 1rem
  }
}

.gen {
  display: flex;
  width: 32rem;
  flex-wrap: wrap;
  margin: 0 auto;
  gap: 0.5rem;
  margin-top: 0.5rem;
  //align-items: center;
  justify-content: center;

  .normal_button {
    width: 14.8rem;
  }
}

.config {
  width: 45rem;
  margin: 0 auto;
}

.history {
  margin: 0 auto;

  .item {
    margin: 0 auto;
    margin-top: 1rem;
    margin-bottom: 1rem;
    border-radius: 0.5rem;
    cursor: pointer;
    padding: 0.6rem;
    padding-left: 1rem;
    padding-right: 1rem;
    font-family: consola, "Helvetica Neue",
    Helvetica, Arial, "PingFang SC", "Hiragino Sans GB",
    "Heiti SC", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
    width: 40rem;
    background-color: #CFD8DC;
    transition: all 0.2s;
    word-break: break-word;
    white-space: pre-line;

    &:active {
      filter: opacity(0.5);
    }
  }
}


</style>

// 获取[m，n)区间内的随机整数：
import exp from "constants";

export const random_c_o = (m: number, n: number, is_digital = false) => {
    const aNumber = (n - m) * Math.random() + m
    if (is_digital) {
        return aNumber
    }
    return Math.floor(aNumber)
}

// 获取[m，n]区间内的随机整数：
export const random_c_c = (m: number, n: number, is_digital = false) => {
    const aNumber = (n + 1 - m) * Math.random() + m
    if (is_digital) {
        return aNumber
    }
    return Math.floor(aNumber)
}

// 获取对于区间(m,n)的随机整数:
export const random_o_o = (m: number, n: number, is_digital = false) => {
    const aNumber = (n - 1 - m) * Math.random() + (m + 1)
    if (is_digital) {
        return aNumber
    }
    return Math.floor(aNumber)
}

// 获取对于区间(m，n]的随机整数:
export const random_o_c = (m: number, n: number, is_digital = false) => {
    const aNumber = (n - m) * Math.random() + (m + 1)
    if (is_digital) {
        return aNumber
    }
    return Math.floor(aNumber)
}

// 从列表里随机选取数值
export const random_arr_select = (arr: any[], select_num = 1) => {
    // 如果是一项，就随机挑选一个输出
    if (select_num === 1) {
        return arr[Math.floor(Math.random() * arr.length)];
    }
    // 如果是多项：
    let shuffled = arr.slice(0), i = arr.length, min = i - select_num, temp, index;
    while (i-- > min) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(min);
}

// 生成随机作品名的函数
export const gen_score_id = () => {
    const id_prefix = random_arr_select(["A", "B", "C", "D", "E", "F", "G", "H",
        "K", "L", "M", "N", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"], 4)
    const num1 = random_c_c(100, 999)
    const num2 = random_c_c(100, 999)
    return `${id_prefix.join("")}-${num1}-${num2}`
}

// 概率输出
export const probability_decide = (probability: number) => {
    return Math.random() <= probability;
}

// 随机数组（洗牌）
export const shuffle_arr = (arr: any[]) => {
    let i = arr.length
    while (--i) {
        let j = Math.floor(Math.random() * i)
        ;[arr[j], arr[i]] = [arr[i], arr[j]]
    }
    return arr
}

// 从随机字符串中输出一个
export const random_select_from_string = (str: string) => {
    if (str.length === 0) {
        return str
    }
    const random_str_index = random_c_o(0, str.length)
    return str.substring(random_str_index, random_str_index + 1)
}


// 带有权重的输出
export const weight_decide = (arr_with_weight: { weight: number, option: any }[]) => {
    const new_arr = arr_with_weight.sort((x, y) => x.weight - y.weight)
    let total_weight = 0
    new_arr.map(x => total_weight += x.weight)
    const really_weight = total_weight
    const random_position = random_c_c(0, total_weight)
    let choice_index = new_arr.length - 1
    while (total_weight >= random_position) {
        total_weight -= new_arr[choice_index]?.weight
        choice_index -= 1
    }
    choice_index += 1
    console.log([new_arr, {really_weight}, {random_position}, new_arr[choice_index]])
    return new_arr[choice_index].option
}
// export {random_o_c, random_c_o, random_c_c, random_o_o, random_arr_select, gen_score_id}
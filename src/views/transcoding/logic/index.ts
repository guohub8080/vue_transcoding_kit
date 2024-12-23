export const limit_str = (str: string, limit_length: number, extra_symbol = "...") => {
    if (str.length <= limit_length) {
        return str
    }
    let txt = str.trim()
    // console.log(limit_length)
    const txt1 = txt.substring(0, limit_length)
    // console.log(txt1)
    return txt1 + extra_symbol
}
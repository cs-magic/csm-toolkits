import { HSL } from "color-convert/conversions"

import { COLOR_N } from "@/app/sections/color-palette"

export const value2hex = (value: number) => {
  let curValue = value
  const b = curValue % COLOR_N
  curValue = Math.floor(curValue / COLOR_N)
  const g = curValue % COLOR_N
  curValue = Math.floor(curValue / COLOR_N)
  const r = curValue
  const rgb = singleValue2hex(r) + singleValue2hex(g) + singleValue2hex(b)
  console.log("-- value2hex: ", { value, r, g, b, rgb })
  return "#" + rgb
}

export const hex2value = (hex: string) => {
  const m = hex.toLowerCase().match(/[0-9A-Fa-f]+/)
  if (m && m.length) {
    let s = m[0]!
    console.log({ s })
    if (s.length === 3) s = s[0] + s[0] + s[1] + s[1] + s[2] + s[2]
    if (s.length === 6) {
      const ans =
        singleHex2value(s.slice(0, 2)) * COLOR_N * COLOR_N +
        singleHex2value(s.slice(2, 4)) * COLOR_N +
        singleHex2value(s.slice(4))
      console.log("-- hex2value: ", { s, ans })
      return ans
    }
  }
  return undefined
}
export const singleValue2hex = (value: number) =>
  value.toString(16).padStart(2, "0")
export const singleHex2value = (hex: string) => {
  const value = parseInt(hex, 16)
  console.log(JSON.stringify({ hex, value }))
  return value
}
export const inverseColorChannel = (v: number): number =>
  (v + COLOR_N / 2) % COLOR_N
export const hsl2str = (v: HSL): string => `${v[0]} ${v[1]}% ${v[2]}%`
export const str2hsl = (v: string): HSL | undefined => {
  try {
    const values = v.split(/\s+/)
    let parsed = values.map(parseFloat)
    console.log(JSON.stringify({ v, values, parsed }))
    if (parsed.length === 3) return parsed as HSL
  } finally {
  }
  return undefined
}

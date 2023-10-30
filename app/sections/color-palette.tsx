"use client"

import { useRef } from "react"
import { CopyIcon } from "lucide-react"

import { Input } from "@/components/ui/input"
import { useColor } from "@/app/hooks/use-app-store"

export const COLOR_N = 256

export const LabelLine = ({
  title,
  value,
}: {
  title: string
  value: string
}) => {
  const { setColor } = useColor()
  const hexRef = useRef(value)

  return (
    <div className={"flex flex-col gap-2"}>
      <div>{title}</div>
      <div className={"border-b flex justify-between items-center gap-2"}>
        <Input
          defaultValue={value}
          onChange={(event) => {
            const hex = event.currentTarget.value
            const value = hex2value(hex)
            if (value !== undefined) setColor(value)
          }}
          className={
            "border-none focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent"
          }
        />
        <CopyIcon />
      </div>
    </div>
  )
}

const singleValue2hex = (value: number) => value.toString(16).padStart(2, "0")
const singleHex2value = (hex: string) => {
  const value = parseInt(hex, 16)
  console.log({ hex, value })
  return value
}

const value2hex = (value: number) => {
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

const hex2value = (hex: string) => {
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

export const HexLine = ({ hex }: { hex: string }) => {
  return <LabelLine title={"HEX"} value={hex} />
}

export const ColorPalette = () => {
  const { color } = useColor()
  const hex = value2hex(color)

  const N = COLOR_N ** 3 + COLOR_N ** 2 + COLOR_N
  const colorFG = (color + (N >> 1)) % N
  const hexFG = value2hex(colorFG)
  console.log({ N, color, hex, colorFG, hexFG })

  return (
    <div
      id={"color-palette"}
      className={"w-screen h-screen flex justify-center items-center"}
      style={{
        backgroundColor: hex,
        color: hexFG,
      }}
    >
      <div className={"max-w-2xl"}>
        <HexLine hex={hex} />
      </div>
    </div>
  )
}

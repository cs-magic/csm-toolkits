import { ReactNode, useState } from "react"
import { loadWebpackHook } from "next/dist/server/config-utils"
import { CopyIcon } from "lucide-react"
import { set } from "yaml/dist/schema/yaml-1.1/set"

import { Input } from "@/components/ui/input"

export const LabelLine = ({
  title,
  value,
}: {
  title: string
  value: string
}) => {
  return (
    <div className={"flex flex-col gap-2"}>
      <div>{title}</div>
      <div className={"border-b flex justify-between items-center gap-2"}>
        <Input
          value={value}
          onChange={(event) => {
            console.log({ event })
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

const getHex = (value: number) => {
  const b = value % 255
  value = Math.floor(value / 255)
  const g = value % 255
  value = Math.floor(value / 255)
  const r = value
  const rgb =
    r.toString(16).padStart(2, "0") +
    g.toString(16).padStart(2, "0") +
    b.toString(16).padStart(2, "0")
  console.log({ r, g, b, rgb })
  return "#" + rgb
}

export const HexLine = ({ hex }: { hex: string }) => {
  return <LabelLine title={"HEX"} value={hex} />
}

export const ColorPalette = () => {
  const [colorBG, setColorBG] = useState(1e6)
  const N = 256 ** 3
  const colorFG = (colorBG + (N >> 1)) % N
  const hexBG = getHex(colorBG)
  const hexFG = getHex(colorFG)
  console.log({ colorBG, colorFG, hexBG, hexFG })

  return (
    <div
      id={"color-palette"}
      className={"w-screen h-screen flex justify-center items-center"}
      style={{
        backgroundColor: hexBG,
        color: hexFG,
      }}
    >
      <div className={"max-w-2xl"}>
        <HexLine hex={hexBG} />
      </div>
    </div>
  )
}

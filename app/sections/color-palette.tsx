"use client"

import { ChangeEvent, useEffect, useRef, useState } from "react"
import { hex, hsl, rgb } from "color-convert"
import { HSL } from "color-convert/conversions"
import { CopyIcon } from "lucide-react"
import { toast } from "sonner"

import { hsl2str, inverseColorChannel, str2hsl } from "@/lib/color"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useColor, useColorMode } from "@/app/hooks/use-app-store"

export const COLOR_N = 256

export const LabelLine = ({
  title,
  value,
  onChange,
  focusing,
}: {
  title: string
  value: string
  onChange: (v: ChangeEvent<HTMLInputElement>) => void
  focusing: boolean
}) => {
  const ref = useRef<HTMLInputElement>(null)
  console.log({ title, value })
  useEffect(() => {
    if (!focusing) ref.current!.value = value
  }, [value])

  return (
    <div className={"flex flex-col"}>
      <div>{title}</div>
      <div className={"border-b flex justify-between items-center gap-2"}>
        <Input
          ref={ref}
          defaultValue={value}
          onChange={onChange}
          className={
            "border-none focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent"
          }
        />
        <CopyIcon
          onClick={async () => {
            await navigator.clipboard.writeText(ref.current!.value)
            toast.success("copied !")
          }}
        />
      </div>
    </div>
  )
}

export const HexLine = () => {
  const { setColor, color } = useColor()
  const { colorMode, setColorMode } = useColorMode()

  return (
    <LabelLine
      title={"HEX"}
      value={rgb.hex(color)}
      onChange={(event) => {
        setColorMode("hex")

        const hexValue = event.currentTarget.value
        const rgbValue = hex.rgb(hexValue)
        setColor(rgbValue)
      }}
      focusing={colorMode === "hex"}
    />
  )
}

export const HslLine = () => {
  const { color, setColor } = useColor()
  const { colorMode, setColorMode } = useColorMode()

  return (
    <LabelLine
      title={"HSL"}
      value={hsl2str(rgb.hsl(color))}
      onChange={(event) => {
        setColorMode("hsl")

        const hexValue = event.currentTarget.value
        const hslValue = str2hsl(hexValue)
        if (hslValue) setColor(hsl.rgb(hslValue))
      }}
      focusing={colorMode === "hsl"}
    />
  )
}

export const ColorPalette = () => {
  const { color } = useColor()
  const bgHex = rgb.hex(color)

  return (
    <div
      id={"color-palette"}
      className={"w-screen h-screen flex justify-center items-center"}
      style={{
        backgroundColor: `#${bgHex}`,
      }}
    >
      <div className={"flex flex-col gap-4 bg-white text-black p-8 rounded"}>
        <Label className={"font-bold"}>Color Conversion</Label>

        <HexLine />

        <HslLine />
      </div>
    </div>
  )
}

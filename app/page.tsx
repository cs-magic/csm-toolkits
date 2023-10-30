"use client"

import { useEffect, useState } from "react"

import { ColorPalette } from "@/app/sections/color-palette"

export default function IndexPage() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  return !mounted ? "loading..." : <ColorPalette />
}

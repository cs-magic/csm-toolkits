import { RGB } from "color-convert/conversions"

import { createBearStore } from "@/lib/create-bear-store"

export const useColor = createBearStore<RGB>()("color", [0, 0, 0], true)
export const useColorMode = createBearStore<
  "rgb" | "hex" | "hsl" | undefined
>()("colorMode", undefined, false)

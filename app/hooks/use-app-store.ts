import { createBearStore } from "@/lib/create-bear-store"

export const useColor = createBearStore<number>()("color", 0, true)

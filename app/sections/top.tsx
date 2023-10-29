import { Fragment, useState } from "react"
import { clsx } from "clsx"

import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Assets } from "@/components/assets"

export const TopSection = () => {
  const step = 0
  const [checked, setChecked] = useState(true)

  return (
    <section
      id={"top"}
      className={"w-full flex flex-col items-center relative p-4 gap-2"}
    >
      <div className={"flex items-center gap-4"}>
        {["Summary", "Outlines", "Sliders"].map((item, index) => (
          <Fragment key={index}>
            <Assets.right className={"first:hidden"} />

            <div
              className={clsx(
                step === index ? "text-black font-medium" : "text-gray-500"
              )}
              key={item}
            >
              {item}
            </div>
          </Fragment>
        ))}
      </div>

      <div className={"py-1 text-black font-medium"}>
        To get started, give use some high-level intro about your project.
      </div>

      <Separator orientation={"horizontal"} />

      <div
        className={"absolute top-4 right-4 flex flex-col items-center gap-2"}
      >
        <div className={"flex gap-2 items-center text-xs"}>
          GPT 3.5{" "}
          <Switch
            checked={checked}
            onCheckedChange={setChecked}
            className={"h-4"}
          />
          GPT 4
          <Popover>
            <PopoverTrigger>
              <Assets.question />
            </PopoverTrigger>
            <PopoverContent>Which GPT ?</PopoverContent>
          </Popover>
        </div>

        <div className={"flex"}>
          <Button size={"sm"} className={"h-auto py-1 px-4 rounded-3xl"}>
            {"Generated outline ->"}
          </Button>
        </div>
      </div>
    </section>
  )
}

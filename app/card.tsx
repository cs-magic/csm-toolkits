import { HTMLAttributes, PropsWithChildren } from "react"
import { clsx } from "clsx"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Assets } from "@/components/assets"

export const CardOuter = ({
  title,
  required,
  children,
  className,
  ...props
}: {
  title: string
  required?: boolean
} & HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={clsx("flex flex-col gap-1", className)} {...props}>
      <div className={"flex"}>
        <div className={"text-black font-medium"}>{title}</div>

        <div className={"text-gray-500"}>
          {required ? "(Required)" : "(Optional)"}
        </div>
      </div>

      {children}
    </div>
  )
}

export const CardInner = ({
  title,
  children,
  className,
  ...props
}: { title: string } & HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={
        "grow bg-gray-100 p-4 rounded relative text-sm flex flex-col gap-2"
      }
    >
      <div className={"flex items-center gap-2"}>
        {title}
        <Popover>
          <PopoverTrigger>
            <Assets.question />
          </PopoverTrigger>
          <PopoverContent>How ?</PopoverContent>
        </Popover>
      </div>
      <div className={clsx("grow", className)} {...props}>
        {children}
      </div>
    </div>
  )
}

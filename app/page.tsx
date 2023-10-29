"use client"

import { Fragment, useCallback, useState } from "react"
import { clsx } from "clsx"
import { ChevronDown } from "lucide-react"
import { useDropzone } from "react-dropzone"

import { siteConfig } from "@/config/site"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Assets } from "@/components/assets"
import { CardInner, CardOuter } from "@/app/card"

export default function IndexPage() {
  const step = 0
  const [checked, setChecked] = useState(true)
  const [files, setFiles] = useState<File[]>([])

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Do something with the files
    console.log({ acceptedFiles })
    setFiles([...files, ...acceptedFiles])
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <section className={"w-full flex flex-col"}>
      <section
        id={"header"}
        className={"bg-black flex justify-between px-12 py-2"}
      >
        <Assets.brand />

        <div className={"text-white flex items-center gap-8"}>
          <div className={"text-white/80"}>26 Credits</div>
          <Assets.ring />
          <div>Dashboard</div>

          <DropdownMenu>
            <DropdownMenuTrigger className={"flex items-center gap-1"}>
              <Avatar className={"w-5 h-5"}>
                <AvatarFallback>P</AvatarFallback>
              </Avatar>
              <div>polumage</div>
              <ChevronDown className={"w-5 h-5"} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>Home</DropdownMenuContent>
          </DropdownMenu>
        </div>
      </section>

      {/* 因为这里有个 absolute 的布局，所以最好独立*/}
      <section
        id={"main"}
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

      <section
        id={"content"}
        className={"flex justify-center gap-4 py-12 h-[480px]"}
      >
        <CardOuter title={"Project Summary"} required className={"h-full"}>
          <CardInner title={"Project Topic"}>
            <Textarea
              placeholder={
                "e.g. How to make healthy & yummy salad. Talk about multi aspects, from ingredients selection to secrete sauce making, perfect recipes, etc."
              }
              className={"h-40 relative"}
            ></Textarea>
            <div
              className={
                "absolute left-6 bottom-6 z-50 text-muted-foreground text-xs"
              }
            >
              (60 characters)
            </div>
          </CardInner>

          <div className={"flex  justify-between"}>
            <CardInner title={"Your Audience"}>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value={"a"}>a</SelectItem>
                    <SelectItem value={"b"}>b</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </CardInner>

            <CardInner title={"Language"}>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value={"c"}>a</SelectItem>
                    <SelectItem value={"d"}>b</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </CardInner>
          </div>
        </CardOuter>

        <CardOuter
          title={"Supplementary Materials"}
          required={false}
          className={"h-full w-[320px]"}
        >
          <CardInner title={"Upload Files"} className={"flex flex-col gap-2"}>
            <div className={"flex items-center gap-2 border border-dashed p-2"}>
              <Assets.video />
              <Input
                className={
                  "bg-transparent border-none h-auto p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                }
                placeholder={"Paste YouTube link here"}
              />
            </div>

            <div
              className={"w-full border border-dashed p-2 h-20"}
              {...getRootProps()}
            >
              <div className={"flex items-center gap-2"}>
                <Assets.create />
                Drop files here or{" "}
                <Label
                  htmlFor={"files"}
                  className={
                    "bg-gray-600 py-1 px-2 text-white/90 h-auto rounded-sm text-xs"
                  }
                >
                  Browse files
                </Label>
              </div>
              <input id={"files"} {...getInputProps()} />
            </div>

            <Separator orientation={"horizontal"} className={"my-4"} />
            {files.map((s, index) => (
              // <FileUploader
              //   className={
              //     "bg-white text-black text-xs justify-between py-1 h-auto"
              //   }
              //   handleChange={(file: File) => {
              //     console.log({ file })
              //   }}
              //   name="file"
              // />
              <Button
                className={
                  "bg-white text-black text-xs justify-between py-1 h-auto"
                }
                key={index}
                onClick={() => {
                  setFiles([
                    ...files.slice(0, index),
                    ...files.slice(index + 1),
                  ])
                }}
              >
                <div className={"flex gap-2"}>
                  <Assets.file />

                  <span>{s.name}</span>
                </div>

                <Assets.del />
              </Button>
            ))}
          </CardInner>
        </CardOuter>
      </section>
    </section>
  )
}

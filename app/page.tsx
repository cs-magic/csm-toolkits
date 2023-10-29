"use client"

import { Fragment, useState } from "react"
import { clsx } from "clsx"

import { siteConfig } from "@/config/site"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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

  return (
    <section className={"w-full flex flex-col"}>
      <section id={"header"} className={"bg-black flex justify-between px-12"}>
        <div>{siteConfig.name}</div>

        <div>26 Credits</div>
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
            GPT 4 <Assets.question />
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

            <div className={"w-full border border-dashed p-2 h-20"}>
              <div className={"flex items-center gap-2"}>
                <Assets.create />
                Drop files here or{" "}
                <Button
                  size={"sm"}
                  className={"bg-gray-600 py-1 h-auto rounded-sm text-xs"}
                >
                  <Label>
                    Brose files
                    <Input
                      className={"hidden"}
                      type={"file"}
                      onChange={(event) => {
                        const newFiles = event.currentTarget.files
                        console.log({ newFiles })
                        if (!newFiles) return
                        setFiles([...files, ...newFiles])
                      }}
                    />
                  </Label>
                </Button>
              </div>
            </div>

            <Separator orientation={"horizontal"} className={"my-4"} />
            {files.map((s, index) => (
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

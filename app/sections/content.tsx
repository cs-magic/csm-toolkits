import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Assets } from "@/components/assets"
import { CardInner, CardOuter } from "@/app/card"

export const ContentSection = () => {
  const [files, setFiles] = useState<File[]>([])

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Do something with the files
    console.log({ acceptedFiles })
    setFiles([...files, ...acceptedFiles])
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
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
                setFiles([...files.slice(0, index), ...files.slice(index + 1)])
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
  )
}

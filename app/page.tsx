"use client"

import { ContentSection } from "@/app/sections/content"
import { NavSection } from "@/app/sections/nav"
import { TopSection } from "@/app/sections/top"

export default function IndexPage() {
  return (
    <section className={"w-full flex flex-col"}>
      <NavSection />

      <TopSection />

      <ContentSection />
    </section>
  )
}

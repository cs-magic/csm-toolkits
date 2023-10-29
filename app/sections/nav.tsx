import { ChevronDown } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Assets } from "@/components/assets"

export const NavSection = () => (
  <section id={"header"} className={"bg-black flex justify-between px-12 py-2"}>
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
)

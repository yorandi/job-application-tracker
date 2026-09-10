"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "@/app/(dashboard)/actions";
import { LogOut } from "lucide-react";

import {
  LayoutDashboard,
  BriefcaseBusiness,
  ChartNoAxesColumnIncreasing,
  Columns3,
} from "lucide-react";

const navigation = [
  {
    name: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    name: "Applications",
    href: "/applications",
    icon: BriefcaseBusiness,
  },
  {
    name: "Pipeline",
    href: "/pipeline",
    icon: Columns3,
  },
  {
    name: "Analytics",
    href: "/analytics",
    icon: ChartNoAxesColumnIncreasing,
  },
];

type SidebarProps = {
  user: {
    name: string;
    email: string;
  };
};

export default function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 z-20 flex w-full shrink-0 flex-col border-b border-zinc-800 bg-zinc-950/95 p-4 text-zinc-100 backdrop-blur lg:h-dvh lg:w-64 lg:border-r lg:border-b-0 lg:p-6">
      <div className="flex shrink-0 items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white">JobTrack</h1>

          <p className="mt-1 text-xs text-zinc-500">Application Tracker</p>
        </div>
        <form action={logout} className="lg:hidden">
          <button
            type="submit"
            className="flex min-h-11 items-center gap-2 rounded-lg border border-zinc-800 px-3 text-sm text-zinc-300 transition hover:bg-zinc-800"
          >
            <LogOut size={16} aria-hidden="true" />
            Sign out
          </button>
        </form>
      </div>

      <nav
        aria-label="Main navigation"
        className="mt-4 grid min-h-0 grid-cols-4 gap-1 lg:mt-10 lg:flex lg:flex-1 lg:flex-col lg:gap-2 lg:overflow-y-auto lg:pb-5"
      >
        {navigation.map((item) => {
          const Icon = item.icon;

          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={`flex min-h-11 flex-col items-center justify-center gap-1 rounded-lg px-1 py-2 text-[11px] transition sm:text-sm lg:flex-row lg:justify-start lg:gap-3 lg:px-3 ${
                isActive
                  ? "bg-zinc-800 text-white"
                  : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
              }`}
            >
              <Icon size={18} aria-hidden="true" />

              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
      <div className="hidden shrink-0 border-t border-zinc-800 pt-5 lg:block">
        <p className="truncate text-sm font-medium text-white">{user.name}</p>

        <p className="mt-1 truncate text-xs text-zinc-500">{user.email}</p>

        <form action={logout} className="mt-4">
          <button
            type="submit"
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-zinc-400 transition hover:bg-zinc-900 hover:text-white"
          >
            <LogOut size={18} />
            Sign out
          </button>
        </form>
      </div>
    </aside>
  );
}

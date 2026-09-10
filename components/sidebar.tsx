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
    <aside className="flex w-64 flex-col border-r border-zinc-800 bg-zinc-950 p-6">
      <div>
        <h1 className="text-xl font-bold text-white">JobTrack</h1>

        <p className="mt-1 text-xs text-zinc-500">Application Tracker</p>
      </div>

      <nav className="mt-10 space-y-2">
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
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition ${
                isActive
                  ? "bg-zinc-800 text-white"
                  : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
              }`}
            >
              <Icon size={18} />

              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto border-t border-zinc-800 pt-5">
        <p className="truncate text-sm font-medium">{user.name}</p>

        <p className="truncate text-xs text-zinc-500">{user.email}</p>

        <form action={logout}>
          <button
            type="submit"
            className="mt-4 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-zinc-400 transition hover:bg-zinc-900 hover:text-white"
          >
            <LogOut size={16} />
            Sign out
          </button>
        </form>
      </div>
    </aside>
  );
}

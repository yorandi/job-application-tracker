"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  BriefcaseBusiness,
  ChartNoAxesColumnIncreasing,
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
    name: "Analytics",
    href: "/analytics",
    icon: ChartNoAxesColumnIncreasing,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-zinc-800 bg-zinc-950 p-6">
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
    </aside>
  );
}

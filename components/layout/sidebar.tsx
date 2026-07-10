"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  Wallet,
  ArrowLeftRight,
  Receipt,
  Landmark,
  Code2,
  Settings,
} from "lucide-react";

const menuItems = [
  {
    name: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    name: "Wallet",
    href: "/wallet",
    icon: Wallet,
  },
  {
    name: "Transactions",
    href: "/transactions",
    icon: ArrowLeftRight,
  },
  {
    name: "Invoices",
    href: "/invoices",
    icon: Receipt,
  },
  {
    name: "Payouts",
    href: "/payouts",
    icon: Landmark,
  },
  {
    name: "Developers",
    href: "/developers",
    icon: Code2,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex min-h-screen w-64 flex-col border-r border-slate-800 bg-slate-950 text-white">

      <div className="border-b border-slate-800 p-6">

        <h1 className="text-3xl font-bold text-green-400">
          OmniPay
        </h1>

        <p className="mt-1 text-sm text-slate-400">
          Merchant Portal
        </p>

      </div>

      <nav className="flex-1 space-y-2 p-4">

        {menuItems.map((item) => {
          const Icon = item.icon;

          const active =
            pathname === item.href ||
            (item.href !== "/" &&
              pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                active
                  ? "bg-green-500 text-white shadow-lg"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <Icon size={20} />

              <span>{item.name}</span>
            </Link>
          );
        })}

      </nav>

      <div className="border-t border-slate-800 p-5">

        <p className="text-xs text-slate-500">
          OmniPay Merchant v1.0
        </p>

      </div>

    </aside>
  );
}
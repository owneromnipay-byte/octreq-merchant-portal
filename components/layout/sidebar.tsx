"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  {
    name: "Dashboard",
    href: "/",
  },
  {
    name: "Wallet",
    href: "/wallet",
  },
  {
    name: "Transactions",
    href: "/transactions",
  },
  {
    name: "Invoices",
    href: "/invoices",
  },
  {
    name: "Payouts",
    href: "/payouts",
  },
  {
    name: "Developers",
    href: "/developers",
  },
  {
    name: "Settings",
    href: "/settings",
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex min-h-screen w-64 flex-col bg-slate-900 p-6 text-white">

      <div>

        <h1 className="text-2xl font-bold text-green-400">
          OmniPay
        </h1>

        <p className="mt-1 text-sm text-slate-400">
          Merchant Portal
        </p>

      </div>

      <nav className="mt-10 space-y-2">

        {menuItems.map((item) => (

          <Link
            key={item.href}
            href={item.href}
            className={`block rounded-lg px-3 py-2 transition ${
              pathname === item.href
                ? "bg-green-500 text-white"
                : "hover:bg-slate-800"
            }`}
          >
            {item.name}
          </Link>

        ))}

      </nav>

    </aside>
  );
}
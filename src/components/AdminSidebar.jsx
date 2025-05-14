"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Package, FileText } from "lucide-react";

export default function AdminSidebar() {
const pathname = usePathname();

const links = [
{ name: "Dashboard", href: "/Admin/dashboard", icon: <Home size={18} /> },
{ name: "Products", href: "/Admin/products", icon: <Package size={18} /> },
{ name: "Orders", href: "/Admin/orders", icon: <FileText size={18} /> },
];

return (
<aside className="h-screen w-64 bg-gradient-to-b from-white to-gray-50 border-r border-gray-200 shadow-xl p-6 flex flex-col">
{/* Logo / Title */}
<div className="mb-10 text-center">
<h2 className="text-2xl font-bold text-gray-900 tracking-tight uppercase">E-Clo Admin</h2>
<div className="h-1 w-10 bg-black mx-auto mt-2 rounded-full"></div>
</div>
{/* Navigation Links */}
  <nav className="flex-1 space-y-2">
    {links.map((link) => (
      <Link
        key={link.name}
        href={link.href}
        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
          ${
            pathname === link.href
              ? "bg-black text-white shadow-md"
              : "text-gray-700 hover:bg-gray-100 hover:text-black"
          }`}
      >
        {link.icon}
        {link.name}
      </Link>
    ))}
  </nav>

  {/* Footer / Branding */}
  <div className="mt-10 text-xs text-center text-gray-400">
    © {new Date().getFullYear()} E-Clo Admin
  </div>
</aside>
);
}
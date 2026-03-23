import Link from "next/link";
import { Home, Users, Calendar, Bell, Settings, LayoutDashboard, SearchIcon } from "lucide-react";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Discovery", href: "/discovery", icon: SearchIcon },
  { name: "Matches", href: "/matches", icon: Users },
  { name: "Sessions", href: "/sessions", icon: Calendar },
  { name: "Notifications", href: "/notifications", icon: Bell },
  { name: "Profile", href: "/profile", icon: Settings },
];

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] w-64 border-r border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-950/40 backdrop-blur-xl transition-transform hidden md:block">
      <div className="flex h-full flex-col overflow-y-auto px-4 py-8">
        <ul className="space-y-3 font-medium text-sm">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className="group flex items-center rounded-xl px-4 py-3 text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 hover:text-indigo-600 dark:hover:text-indigo-400 hover:shadow-sm hover:border hover:border-slate-200 dark:hover:border-slate-700 border border-transparent transition-all"
              >
                <item.icon className="mr-3 h-5 w-5 text-slate-400 dark:text-slate-500 group-hover:text-indigo-500 transition-colors" />
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

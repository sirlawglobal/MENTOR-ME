"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Menu, X, LayoutDashboard, Search, Users, Calendar, Bell, User, LogOut } from "lucide-react";

export function MobileMenu({ session, logoutAction }: { session: any, logoutAction: any }) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Discovery", href: "/discovery", icon: Search },
    { name: "Matches", href: "/matches", icon: Users },
    { name: "Sessions", href: "/sessions", icon: Calendar },
    { name: "Notifications", href: "/notifications", icon: Bell },
    { name: "Profile", href: "/profile", icon: User },
  ];

  return (
    <div className="md:hidden">
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={() => setIsOpen(!isOpen)}
        className="relative z-50 p-2 text-slate-600 dark:text-slate-300"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-40 bg-white dark:bg-slate-950 p-6 pt-24 animate-in slide-in-from-right duration-300">
          <nav className="flex flex-col space-y-4">
            {session ? (
              <>
                <div className="flex items-center space-x-4 p-4 mb-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800">
                  <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-xl shadow-md">
                    {session.firstName[0]}
                  </div>
                  <div>
                    <p className="text-lg font-bold text-slate-900 dark:text-white leading-tight">{session.firstName}</p>
                    <p className="text-xs font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">{session.role}</p>
                  </div>
                </div>
                {navItems.map((item) => (
                  <Link 
                    key={item.href} 
                    href={item.href} 
                    onClick={() => setIsOpen(false)}
                    className="flex items-center p-4 rounded-xl text-lg font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
                  >
                    <item.icon className="h-6 w-6 mr-4 text-indigo-500" />
                    {item.name}
                  </Link>
                ))}
                <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800">
                  <form action={logoutAction}>
                    <Button variant="outline" type="submit" className="w-full h-12 text-lg rounded-xl border-red-100 dark:border-red-900/30 text-red-600">
                      <LogOut className="h-5 w-5 mr-3" /> Logout
                    </Button>
                  </form>
                </div>
              </>
            ) : (
              <div className="flex flex-col space-y-4 pt-10">
                <Link href="/login" onClick={() => setIsOpen(false)}>
                  <Button variant="outline" className="w-full h-14 text-xl rounded-2xl">Sign In</Button>
                </Link>
                <Link href="/signup" onClick={() => setIsOpen(false)}>
                  <Button variant="primary" className="w-full h-14 text-xl rounded-2xl">Get Started</Button>
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </div>
  );
}

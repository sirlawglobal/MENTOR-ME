import Link from "next/link";
import { Button } from "../ui/Button";
import { getSession } from "@/lib/auth/session";
import { logoutAction } from "@/modules/auth/actions";
import { MobileMenu } from "./MobileMenu";

export async function Navbar() {
  const session = await getSession();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/90 backdrop-blur-xl shadow-sm transition-colors duration-500">
      <div className="container mx-auto flex h-16 items-center px-4 md:px-8">

        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 shrink-0">
          <span className="text-2xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent tracking-tighter">
            MentorMe
          </span>
        </Link>

        {/* RIGHT SIDE (Everything pushed right) */}
        <div className="hidden md:flex items-center space-x-3 ml-auto">

          {session ? (
            <>
              {/* Dashboard */}
              <Link href="/dashboard">
                <Button
                  variant="ghost"
                  className="font-semibold px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 dark:text-slate-300 dark:hover:text-white transition-all"
                >
                  Dashboard
                </Button>
              </Link>

              {/* User Info */}
              <div className="flex items-center space-x-3 px-3 border-l border-slate-200 dark:border-slate-800">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                    {session.firstName}
                  </p>
                  <p className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
                    {session.role}
                  </p>
                </div>

                <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm shadow-sm">
                  {session.firstName[0]}
                </div>
              </div>

              {/* Logout */}
              <form action={logoutAction}>
                <Button
                  variant="outline"
                  type="submit"
                  className="font-bold border-slate-200 dark:border-slate-800 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                >
                  Logout
                </Button>
              </form>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" className="font-semibold dark:text-slate-300">
                  Sign in
                </Button>
              </Link>

              <Link href="/signup">
                <Button variant="primary" className="font-bold px-6">
                  Get Started
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        <MobileMenu session={session} logoutAction={logoutAction} />
      </div>
    </nav>
  );
}
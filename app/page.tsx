import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Navbar } from "@/components/layout/Navbar";
import { getSession } from "@/lib/auth/session";

export default async function LandingPage() {
  const session = await getSession();

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 py-24 bg-gradient-to-b from-indigo-50/40 via-white to-white dark:from-indigo-950/20 dark:via-slate-950 dark:to-slate-950">
        <div className="inline-flex items-center rounded-full border border-indigo-200 dark:border-indigo-800 bg-indigo-50/80 dark:bg-indigo-900/30 px-4 py-1.5 text-sm font-semibold text-indigo-800 dark:text-indigo-300 mb-10 shadow-sm animate-in fade-in slide-in-from-top-4 duration-1000">
          <span className="flex h-2 w-2 rounded-full bg-indigo-600 dark:bg-indigo-400 mr-2 animate-pulse"></span>
          Revolutionizing Mentorship with AI
        </div>
        
        <h1 className="text-5xl md:text-8xl font-black tracking-tight mb-8 max-w-5xl text-slate-900 dark:text-white leading-[1.1]">
          Find Your Perfect{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400">
            Mentor
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mb-12 leading-relaxed animate-in fade-in duration-1000 slide-in-from-bottom-2">
          Unlock your potential with AI-driven matching. Connect with world-class experts who are ready to guide your career to new heights.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto animate-in fade-in slide-in-from-bottom-8 duration-1000">
          {session ? (
            <Link href="/dashboard" className="w-full sm:w-auto">
              <Button size="lg" variant="primary" className="w-full px-12 h-14 text-lg rounded-2xl">
                Go to Dashboard
              </Button>
            </Link>
          ) : (
            <>
              <Link href="/signup" className="w-full sm:w-auto">
                <Button size="lg" variant="primary" className="w-full px-12 h-14 text-lg rounded-2xl">
                  Get Started for Free
                </Button>
              </Link>
              <Link href="/login" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full px-12 h-14 text-lg rounded-2xl bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
                  Sign In
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Decorative elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-200/20 dark:bg-indigo-900/10 rounded-full blur-3xl -z-10 animate-pulse"></div>
      </main>
    </div>
  );
}

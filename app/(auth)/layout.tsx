import { Navbar } from "@/components/layout/Navbar";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-slate-950 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-opacity-20 relative">
      <Navbar />
      <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent dark:from-slate-950 pointer-events-none z-0" />
      <div className="flex-1 flex items-center justify-center px-4 py-12 z-10">
        {children}
      </div>
    </div>
  );
}

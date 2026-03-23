import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { registerAction } from "@/modules/auth/actions";
import Link from "next/link";

export default function SignupPage() {
  return (
    <Card className="w-full max-w-md shadow-2xl border-slate-200/60 dark:border-slate-800 transition-all hover:shadow-indigo-900/10 dark:bg-slate-900">
      <CardHeader className="text-center pb-2">
        <CardTitle className="text-3xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent pb-1">Create Account</CardTitle>
        <CardDescription className="text-base dark:text-slate-400">Join MentorMe to accelerate your career</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={registerAction} className="space-y-5 pt-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2 text-left">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">First Name</label>
              <Input name="firstName" required placeholder="John" className="rounded-2xl h-12" />
            </div>
            <div className="space-y-2 text-left">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Last Name</label>
              <Input name="lastName" required placeholder="Doe" className="rounded-2xl h-12" />
            </div>
          </div>
          <div className="space-y-2 text-left">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Email Address</label>
            <Input name="email" type="email" placeholder="you@example.com" required className="rounded-2xl h-12" />
          </div>
          <div className="space-y-2 text-left">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Password</label>
            <Input name="password" type="password" placeholder="••••••••" required minLength={6} className="rounded-2xl h-12" />
          </div>
          <div className="space-y-2 text-left">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">I want to join as a</label>
            <select 
              name="role" 
              className="flex h-12 w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-bold text-slate-700 dark:text-slate-300 transition-all hover:border-slate-300 dark:hover:border-slate-700 shadow-sm cursor-pointer" 
              required
            >
              <option value="mentee">Mentee (Looking for guidance)</option>
              <option value="mentor">Mentor (Wanting to help others)</option>
            </select>
          </div>
          <Button type="submit" className="w-full mt-6 h-12 text-lg rounded-2xl" size="lg">Create Account securely</Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center flex-col gap-2 pt-4 border-t border-slate-100 dark:border-slate-800 mt-2 p-8">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Already have an account?{" "}
          <Link href="/login" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 font-bold transition-colors">Sign in</Link>
        </p>
      </CardFooter>
    </Card>
  );
}

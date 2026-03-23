import { getSession } from "@/lib/auth/session";
import { getDiscoverableUsers } from "@/modules/user/service";
import { getMatchesByUserId } from "@/modules/match/service";
import { UserRole } from "@/modules/user/entity";
import { MatchStatus } from "@/modules/match/entity";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { redirect } from "next/navigation";
import { Search, Filter, UserPlus, Clock, CheckCircle2 } from "lucide-react";
import { ConnectButton } from "@/components/discovery/ConnectButton";

export default async function DiscoveryPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const targetRole = session.role === UserRole.MENTEE ? UserRole.MENTOR : UserRole.MENTEE;
  const users = await getDiscoverableUsers(session.userId, targetRole);
  const existingMatches = await getMatchesByUserId(session.userId);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Discovery</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Find and connect with {targetRole.toLowerCase()}s in your field.</p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search skills, names..." 
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm dark:text-white"
            />
          </div>
          <Button variant="outline" size="sm" className="bg-white dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300">
            <Filter className="h-4 w-4 mr-2" /> Filter
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {users.length === 0 ? (
          <p className="col-span-full text-center py-20 text-slate-500 dark:text-slate-400">No {targetRole.toLowerCase()}s found at the moment.</p>
        ) : (
          users.map(user => {
            const userMatch = existingMatches.find(m => m.mentor.id === user.id || m.mentee.id === user.id);
            const initials = `${user.firstName[0]}${user.lastName[0]}`;

            return (
              <Card key={user.id} className="group hover:shadow-xl transition-all duration-300 border-slate-200 dark:border-slate-800 dark:bg-slate-900 overflow-hidden">
                <div className="h-24 bg-gradient-to-r from-indigo-500 to-purple-600 relative">
                  <div className="absolute -bottom-8 left-6">
                    <div className="w-16 h-16 rounded-2xl bg-white dark:bg-slate-800 p-1 shadow-lg">
                      <div className="w-full h-full rounded-xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-xl">
                        {initials}
                      </div>
                    </div>
                  </div>
                </div>
                <CardHeader className="pt-12 pb-4">
                  <CardTitle className="text-xl text-slate-900 dark:text-white">{user.firstName} {user.lastName}</CardTitle>
                  <CardDescription className="font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider text-xs">{user.role}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 min-h-[40px] italic">
                    "{user.bio || 'Product professional looking to share knowledge and grow with the community.'}"
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {user.skills?.filter(s => s.trim() !== "").map(skill => (
                      <span key={skill} className="px-2 py-0.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 text-[10px] font-bold rounded-md border border-indigo-100 dark:border-indigo-800">
                        {skill.trim()}
                      </span>
                    )) || <span className="text-xs text-slate-400">Broad Expertise</span>}
                  </div>
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                    {userMatch ? (
                      userMatch.status === MatchStatus.PENDING ? (
                        <div className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-amber-50 dark:bg-amber-900/10 text-amber-600 dark:text-amber-400 text-sm font-bold rounded-xl border border-amber-100 dark:border-amber-900/30">
                          <Clock className="w-4 h-4" /> Pending Approval
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-emerald-50 dark:bg-emerald-900/10 text-emerald-600 dark:text-emerald-400 text-sm font-bold rounded-xl border border-emerald-100 dark:border-emerald-900/30">
                          <CheckCircle2 className="w-4 h-4" /> Already Connected
                        </div>
                      )
                    ) : (
                      <ConnectButton mentorId={user.id} />
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}

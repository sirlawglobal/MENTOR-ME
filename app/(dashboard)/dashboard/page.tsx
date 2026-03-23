import Link from "next/link";
import { getSession } from "@/lib/auth/session";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Calendar, Users, Zap, TrendingUp, CheckCircle2, XCircle, Bell } from "lucide-react";
import { getMatchStats, getPendingMatchesByMentorId } from "@/modules/match/service";
import { getUpcomingSessionCount } from "@/modules/session/service";
import { UserRole } from "@/modules/user/entity";
import { redirect } from "next/navigation";
import { MatchRequestActions } from "@/components/dashboard/MatchRequestActions";

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) redirect("/login");
  
  const role = session.role;
  const firstName = session.firstName || "User";
  const stats = await getMatchStats(session.userId);
  const sessionCount = await getUpcomingSessionCount(session.userId);
  const isMentor = role === UserRole.MENTOR;

  // For mentors, fetch their pending incoming requests
  const pendingRequests = isMentor ? await getPendingMatchesByMentorId(session.userId) : [];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Welcome back, {firstName}!
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            {isMentor ? "Guide your mentees and manage your schedule." : "Track your learning progress and connect with mentors."}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1.5 rounded-full border border-indigo-100 dark:border-indigo-800">
            {role} Account
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="hover:shadow-md transition-shadow border-slate-200 dark:border-slate-800 dark:bg-slate-900">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">
              {isMentor ? "Active Mentees" : "Active Mentors"}
            </CardTitle>
            <Users className="h-4 w-4 text-indigo-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-800 dark:text-white">{stats.active}</div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{stats.pending} connections requested</p>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow dark:border-slate-800 dark:bg-slate-900">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">Scheduled Sessions</CardTitle>
            <Calendar className="h-4 w-4 text-indigo-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-800 dark:text-white">{sessionCount}</div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{sessionCount > 0 ? "Upcoming meetings" : "No sessions today"}</p>
          </CardContent>
        </Card>

        {isMentor ? (
           <Card className="hover:shadow-md transition-shadow dark:border-slate-800 dark:bg-slate-900">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">Pending Requests</CardTitle>
              <Zap className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-800 dark:text-white">{pendingRequests.length}</div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Awaiting your approval</p>
            </CardContent>
          </Card>
        ) : (
          <Card className="hover:shadow-md transition-shadow dark:border-slate-800 dark:bg-slate-900">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">Match Accuracy</CardTitle>
              <Zap className="h-4 w-4 text-indigo-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-800 dark:text-white">92%</div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Based on your shared skills</p>
            </CardContent>
          </Card>
        )}

        <Card className="hover:shadow-md transition-shadow dark:border-slate-800 dark:bg-slate-900">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">
              {isMentor ? "Mentor Score" : "Growth Score"}
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">84%</div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Top 15% in the community</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          {isMentor && pendingRequests.length > 0 && (
            <Card className="border-amber-100 dark:border-amber-900/50 bg-amber-50/20 dark:bg-amber-950/10">
              <CardHeader>
                <CardTitle className="text-lg text-amber-900 dark:text-amber-100 flex items-center">
                  <Bell className="w-5 h-5 mr-2 animate-bounce" />
                  New Connection Requests
                </CardTitle>
                <CardDescription className="dark:text-amber-200/60">Mentee applicants looking for your guidance.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {pendingRequests.map((request) => (
                  <div key={request.id} className="flex items-center justify-between p-4 bg-white dark:bg-slate-900 rounded-xl border border-amber-100 dark:border-slate-800 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center font-bold text-indigo-600 dark:text-indigo-400">
                        {request.mentee.firstName[0]}{request.mentee.lastName[0]}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">{request.mentee.firstName} {request.mentee.lastName}</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Wants to connect for {request.mentee.skills?.[0] || 'mentorship'}</p>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <MatchRequestActions matchId={request.id} />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          <Card className="shadow-sm border-slate-200 dark:border-slate-800 dark:bg-slate-900">
            <CardHeader>
              <CardTitle className="dark:text-white">Recent Activity</CardTitle>
              <CardDescription className="dark:text-slate-400">Your latest interactions and updates.</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-5">
                <li className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mr-4 shrink-0 shadow-sm">
                    <Calendar className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">Onboarding Completed</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">You have successfully customized your profile.</p>
                  </div>
                  <div className="ml-auto text-xs font-medium text-slate-400">Just now</div>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Style Recommendations */}
        <Card className="col-span-1 shadow-md border-indigo-100 dark:border-slate-800 bg-gradient-to-br from-indigo-50/50 to-white dark:from-slate-900 dark:to-slate-950 relative overflow-hidden h-fit">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-100/50 dark:bg-indigo-900/20 rounded-full blur-3xl -mr-10 -mt-10"></div>
          <CardHeader className="relative z-10">
            <CardTitle className="flex items-center text-indigo-950 dark:text-indigo-100">
              <Zap className="mr-2 h-5 w-5 text-indigo-600 dark:text-indigo-400 fill-indigo-100 dark:fill-indigo-900/50" />
              {isMentor ? "Rising Talent" : "Top Mentors for You"}
            </CardTitle>
            <CardDescription className="text-slate-500 dark:text-slate-400">Hand-picked suggestions based on your profile.</CardDescription>
          </CardHeader>
          <CardContent className="relative z-10 space-y-3">
             <div className="p-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur rounded-xl border border-slate-100 dark:border-slate-800 text-center">
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-2 italic">Visit our discovery page to find more connections.</p>
                <Link href="/discovery">
                   <Button variant="outline" size="sm" className="w-full border-dashed border-indigo-300 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors">Explore Discovery</Button>
                </Link>
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

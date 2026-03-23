import { getSession } from "@/lib/auth/session";
import { getMatchesByUserId } from "@/modules/match/service";
import { MatchStatus } from "@/modules/match/entity";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { MessageSquare, Calendar as CalendarIcon } from "lucide-react";
import { redirect } from "next/navigation";
import { BookSessionTrigger } from "@/components/matches/BookSessionTrigger";

export default async function MatchesPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const matches = await getMatchesByUserId(session.userId);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Your Matches</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">People you are connected with for mentorship.</p>
        </div>
        <Button variant="primary">Find New Match</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {matches.length === 0 ? (
          <Card className="col-span-full p-12 text-center text-slate-500 dark:text-slate-400 dark:bg-slate-900 dark:border-slate-800">
            No matches found yet. Start by finding a mentor!
          </Card>
        ) : (
          matches.map(match => {
            const isMentor = match.mentor.id !== session.userId;
            const partner = isMentor ? match.mentor : match.mentee;
            const initials = `${partner.firstName[0]}${partner.lastName[0]}`;

            return (
              <Card key={match.id} className="hover:shadow-lg transition-all hover:-translate-y-1 dark:bg-slate-900 dark:border-slate-800">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-xl shadow-inner mb-4`}>
                      {initials}
                    </div>
                    <div className={`text-xs px-2 py-1 rounded-full font-medium ${match.status === MatchStatus.ACTIVE ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400' : 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400'}`}>
                      {match.status}
                    </div>
                  </div>
                  <CardTitle className="text-lg text-slate-800 dark:text-white">{partner.firstName} {partner.lastName}</CardTitle>
                  <CardDescription className="font-medium text-indigo-600 dark:text-indigo-400">{partner.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2 mb-6 flex-wrap">
                    {partner.skills?.filter(s => s.trim() !== "").map(skill => (
                      <span key={skill} className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2.5 py-1 rounded-md font-medium border border-slate-200/60 dark:border-slate-700">
                        {skill.trim()}
                      </span>
                    )) || <span className="text-xs text-slate-400">No skills listed</span>}
                  </div>
                  <div className="flex space-x-2 pt-4 border-t border-slate-100 dark:border-slate-800">
                    <Button variant="outline" className="flex-1 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 dark:text-slate-300" size="sm">
                      <MessageSquare className="w-4 h-4 mr-2 text-slate-400" /> Chat
                    </Button>
                    <BookSessionTrigger 
                      partnerId={partner.id} 
                      partnerName={`${partner.firstName} ${partner.lastName}`} 
                    />
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

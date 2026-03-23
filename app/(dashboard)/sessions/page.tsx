import { getSession } from "@/lib/auth/session";
import { getSessionsByUserId } from "@/modules/session/service";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Video, Calendar as CalendarIcon, Clock, CheckCircle, XCircle } from "lucide-react";
import { redirect } from "next/navigation";
import { SessionStatus } from "@/modules/session/entity";
import { SessionActions } from "@/components/sessions/SessionActions";
import Link from "next/link";

export default async function SessionsPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const sessions = await getSessionsByUserId(session.userId);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Your Sessions</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Manage your mentorship meetings and schedule.</p>
        </div>
        <Link href="/matches">
           <Button variant="primary">Schedule New</Button>
        </Link>
      </div>

      <div className="grid gap-4">
        {sessions.length === 0 ? (
          <Card className="p-12 text-center text-slate-500 dark:text-slate-400 dark:bg-slate-900 dark:border-slate-800">
            No sessions scheduled yet. Start by booking one with your matches!
          </Card>
        ) : (
          sessions.map(sess => {
            const partner = sess.mentor.id === session.userId ? sess.mentee : sess.mentor;
            const initials = `${partner.firstName[0]}${partner.lastName[0]}`;
            const isScheduled = sess.status === SessionStatus.SCHEDULED;

            return (
              <Card key={sess.id} className="hover:shadow-md transition-shadow group border-slate-200 dark:border-slate-800 dark:bg-slate-900 overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    <div className="flex items-center p-6 border-b md:border-b-0 md:border-r border-slate-100 dark:border-slate-800 min-w-[280px] bg-slate-50/30 dark:bg-slate-950/20">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold mr-4 shadow-sm">
                        {initials}
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 dark:text-white">{partner.firstName} {partner.lastName}</h3>
                        <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold uppercase">{partner.role}</p>
                      </div>
                    </div>
                    
                    <div className="flex-1 p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-center">
                      <div className="flex items-center text-slate-600 dark:text-slate-300">
                        <CalendarIcon className="w-5 h-5 mr-3 text-slate-400 dark:text-slate-500" />
                        <span className="text-sm font-medium">{new Date(sess.scheduledAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center text-slate-600 dark:text-slate-300">
                        <Clock className="w-5 h-5 mr-3 text-slate-400 dark:text-slate-500" />
                        <span className="text-sm font-medium">{new Date(sess.scheduledAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                      <div className="flex items-center">
                        <div className={`text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wider ${
                          sess.status === SessionStatus.SCHEDULED ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/50' :
                          sess.status === SessionStatus.COMPLETED ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/50' :
                          'bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-100 dark:border-slate-700'
                        }`}>
                          {sess.status}
                        </div>
                      </div>
                    </div>

                    <div className="p-6 bg-slate-50/50 dark:bg-slate-950/30 flex items-center gap-2">
                      {isScheduled ? (
                        <>
                          <Link href={sess.meetingLink || "#"} target="_blank">
                            <Video className="w-5 h-5 text-indigo-500 hover:text-indigo-600 cursor-pointer transition-colors" />
                          </Link>
                          <SessionActions sessionId={sess.id} />
                        </>
                      ) : (
                        <div className="text-slate-400 dark:text-slate-500 text-xs font-medium italic">Session ended</div>
                      )}
                    </div>
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

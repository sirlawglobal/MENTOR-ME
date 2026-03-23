import { Bell, UserPlus, Calendar as CalendarIcon, Zap, CheckCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function NotificationsPage() {
  const notifications = [
    { id: 1, type: "match", title: "New Match Suggestion", desc: "We found a great mentor for you based on React skills.", time: "2 hours ago", icon: Zap, color: "text-amber-500 bg-amber-100 dark:bg-amber-900/30 dark:text-amber-400", unread: true },
    { id: 2, type: "session", title: "Session Reminder", desc: "Your session with Sarah starts in 24 hours.", time: "1 day ago", icon: CalendarIcon, color: "text-indigo-500 bg-indigo-100 dark:bg-indigo-900/30 dark:text-indigo-400", unread: false },
    { id: 3, type: "request", title: "Connection Request", desc: "Alex Johnson has requested to connect with you.", time: "3 days ago", icon: UserPlus, color: "text-emerald-500 bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400", unread: false },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-2xl">
            <Bell className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Notifications</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">Stay updated with your mentorship activity.</p>
          </div>
        </div>
        <Button variant="outline" size="sm" className="bg-white dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300">
          <CheckCheck className="w-4 h-4 mr-2" /> Mark all as read
        </Button>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
        <ul className="divide-y divide-slate-100 dark:divide-slate-800">
          {notifications.map(note => (
            <li key={note.id} className={`p-6 flex items-start gap-5 transition-all hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer group ${note.unread ? 'bg-indigo-50/20 dark:bg-indigo-950/10' : ''}`}>
              <div className={`p-3.5 rounded-full mt-1 shrink-0 transition-transform group-hover:scale-110 ${note.color}`}>
                <note.icon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1.5">
                  <h4 className={`text-lg transition-colors ${note.unread ? 'font-bold text-slate-900 dark:text-white' : 'font-semibold text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white'}`}>
                    {note.title}
                  </h4>
                  <span className="text-xs font-medium text-slate-400 dark:text-slate-500 whitespace-nowrap ml-4 mt-1">{note.time}</span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                  {note.desc}
                </p>
              </div>
              {note.unread && (
                <div className="relative flex h-3 w-3 self-center ml-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-600"></span>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

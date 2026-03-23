import { getSession } from "@/lib/auth/session";
import { getUserById } from "@/modules/user/service";
import { getMatchStats } from "@/modules/match/service";
import { getUpcomingSessionCount } from "@/modules/session/service";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  User as UserIcon, Mail, Award, Trash2, Calendar, Users, BookOpen,
  Sparkles, Clock, Shield, Edit3, MapPin, TrendingUp
} from "lucide-react";
import { redirect } from "next/navigation";
import { updateProfileAction } from "@/modules/user/actions";

export default async function ProfilePage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const user = await getUserById(session.userId);
  if (!user) redirect("/login");

  const stats = await getMatchStats(session.userId);
  const sessionCount = await getUpcomingSessionCount(session.userId);
  const initials = `${user.firstName[0]}${user.lastName?.[0] || ""}`;
  const memberSince = new Date(user.createdAt).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
  const daysSinceJoin = Math.floor(
    (Date.now() - new Date(user.createdAt).getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">

      {/* ── Hero Banner ── */}
      <Card className="overflow-hidden border-slate-200 dark:border-slate-800 dark:bg-slate-900 relative">
        {/* Gradient banner */}
        <div className="h-44 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 relative overflow-hidden">
          {/* Decorative orbs */}
          <div className="absolute top-6 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
          <div className="absolute bottom-4 right-16 w-44 h-44 bg-indigo-300/20 rounded-full blur-3xl" />
          <div className="absolute top-12 right-1/3 w-20 h-20 bg-pink-300/20 rounded-full blur-2xl" />

          {/* Role badge on banner */}
          <div className="absolute top-4 right-4">
            <span className="text-[10px] font-black uppercase tracking-widest text-white/90 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20">
              {user.role} Account
            </span>
          </div>
        </div>

        {/* Profile identity area */}
        <CardContent className="relative px-6 md:px-8 pb-8 pt-0">
          {/* Avatar - overlaps the banner */}
          <div className="absolute -top-14 left-6 md:left-8">
            <div className="h-28 w-28 rounded-3xl bg-white dark:bg-slate-900 p-1.5 shadow-xl ring-4 ring-white dark:ring-slate-900">
              <div className="h-full w-full rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-500 text-white flex items-center justify-center text-4xl font-black shadow-inner">
                {initials}
              </div>
            </div>
          </div>

          {/* Identity + meta */}
          <div className="pt-20 md:pt-20">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                  {user.firstName} {user.lastName}
                </h1>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2">
                  <span className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                    <Mail className="w-3.5 h-3.5 mr-1.5 text-slate-400 dark:text-slate-500" />
                    {user.email}
                  </span>
                  <span className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                    <Calendar className="w-3.5 h-3.5 mr-1.5 text-slate-400 dark:text-slate-500" />
                    Member since {memberSince}
                  </span>
                </div>
              </div>
              <Button variant="outline" size="sm" className="self-start md:self-auto dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300 shrink-0">
                <Edit3 className="w-3.5 h-3.5 mr-2" /> Edit Profile
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ── Stats Row ── */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <Card className="hover:shadow-md transition-shadow border-slate-200 dark:border-slate-800 dark:bg-slate-900">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">Active Matches</CardTitle>
            <Users className="h-4 w-4 text-indigo-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-800 dark:text-white">{stats.active}</div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{stats.pending} pending</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow dark:border-slate-800 dark:bg-slate-900">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">Sessions</CardTitle>
            <BookOpen className="h-4 w-4 text-indigo-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-800 dark:text-white">{sessionCount}</div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Upcoming meetings</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow dark:border-slate-800 dark:bg-slate-900">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">Skills</CardTitle>
            <Award className="h-4 w-4 text-indigo-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-800 dark:text-white">
              {user.skills?.filter(s => s.trim() !== "").length || 0}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Listed expertise</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow dark:border-slate-800 dark:bg-slate-900">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">Member For</CardTitle>
            <Clock className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{daysSinceJoin}d</div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Since {memberSince}</p>
          </CardContent>
        </Card>
      </div>

      {/* ── Main Content Grid ── */}
      <div className="grid gap-6 md:grid-cols-3">

        {/* Left Column — Bio, Skills, Interests */}
        <div className="md:col-span-2 space-y-6">

          {/* Bio */}
          <Card className="border-slate-200 dark:border-slate-800 dark:bg-slate-900">
            <CardHeader>
              <CardTitle className="dark:text-white flex items-center">
                <UserIcon className="w-5 h-5 mr-2 text-indigo-500" /> About
              </CardTitle>
            </CardHeader>
            <CardContent>
              {user.bio ? (
                <div className="relative pl-4 border-l-2 border-indigo-200 dark:border-indigo-800">
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed italic">
                    &ldquo;{user.bio}&rdquo;
                  </p>
                </div>
              ) : (
                <p className="text-sm text-slate-400 dark:text-slate-500 italic">
                  No bio added yet. Tell others about yourself!
                </p>
              )}
            </CardContent>
          </Card>

          {/* Skills */}
          <Card className="border-slate-200 dark:border-slate-800 dark:bg-slate-900">
            <CardHeader>
              <CardTitle className="dark:text-white flex items-center">
                <Sparkles className="w-5 h-5 mr-2 text-indigo-500" /> Skills
              </CardTitle>
              <CardDescription className="dark:text-slate-400">Your areas of expertise</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {user.skills?.filter(s => s.trim() !== "").length ? (
                  user.skills.filter(s => s.trim() !== "").map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 text-xs font-bold rounded-lg border border-indigo-100 dark:border-indigo-800 hover:shadow-sm hover:scale-105 transition-all cursor-default"
                    >
                      {skill.trim()}
                    </span>
                  ))
                ) : (
                  <p className="text-sm text-slate-400 dark:text-slate-500 italic">No skills added yet.</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Interests */}
          <Card className="border-slate-200 dark:border-slate-800 dark:bg-slate-900">
            <CardHeader>
              <CardTitle className="dark:text-white flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-indigo-500" /> Interests
              </CardTitle>
              <CardDescription className="dark:text-slate-400">Topics you want to explore</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {user.interests?.filter(s => s.trim() !== "").length ? (
                  user.interests.filter(s => s.trim() !== "").map((interest) => (
                    <span
                      key={interest}
                      className="px-3 py-1.5 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs font-bold rounded-lg border border-emerald-100 dark:border-emerald-800 hover:shadow-sm hover:scale-105 transition-all cursor-default"
                    >
                      {interest.trim()}
                    </span>
                  ))
                ) : (
                  <p className="text-sm text-slate-400 dark:text-slate-500 italic">No interests added yet.</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column — Edit Form + Danger Zone */}
        <div className="space-y-6">

          {/* Edit Form */}
          <Card className="shadow-md border-indigo-100 dark:border-slate-800 bg-gradient-to-br from-indigo-50/50 to-white dark:from-slate-900 dark:to-slate-950 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-100/50 dark:bg-indigo-900/20 rounded-full blur-3xl -mr-10 -mt-10" />
            <CardHeader className="relative z-10">
              <CardTitle className="flex items-center text-indigo-950 dark:text-indigo-100">
                <Shield className="mr-2 h-5 w-5 text-indigo-600 dark:text-indigo-400 fill-indigo-100 dark:fill-indigo-900/50" />
                Quick Edit
              </CardTitle>
              <CardDescription className="text-slate-500 dark:text-slate-400">
                Update your basic information.
              </CardDescription>
            </CardHeader>
            <CardContent className="relative z-10">
              <form action={updateProfileAction} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                    <UserIcon className="w-3 h-3 text-slate-400" /> First Name
                  </label>
                  <Input name="firstName" defaultValue={user.firstName} />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                    <UserIcon className="w-3 h-3 text-slate-400" /> Last Name
                  </label>
                  <Input name="lastName" defaultValue={user.lastName} />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-300">Bio</label>
                  <textarea
                    name="bio"
                    className="flex w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm px-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent min-h-[100px] shadow-sm hover:border-slate-300 dark:hover:border-slate-700 transition-all leading-relaxed"
                    defaultValue={user.bio || ""}
                    placeholder="Tell people about yourself..."
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                    <Award className="w-3 h-3 text-slate-400" /> Skills
                  </label>
                  <Input name="skills" defaultValue={user.skills?.join(", ") || ""} placeholder="React, Design, Strategy" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                    <TrendingUp className="w-3 h-3 text-slate-400" /> Interests
                  </label>
                  <Input name="interests" defaultValue={user.interests?.join(", ") || ""} placeholder="Leadership, AI, Product" />
                </div>
                <div className="pt-2">
                  <Button type="submit" className="w-full rounded-xl">
                    Save Changes
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="border-red-100 dark:border-red-900/30 bg-red-50/30 dark:bg-red-950/10">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-red-700 dark:text-red-400 flex items-center gap-2">
                <Trash2 className="w-4 h-4" /> Danger Zone
              </CardTitle>
              <CardDescription className="dark:text-red-400/70 text-xs">
                Permanently delete your account and data.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="danger" size="sm" className="rounded-xl w-full">Delete Account</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/Card";
import { Calendar, Clock, Text as TextIcon, X, Loader2 } from "lucide-react";
import { scheduleSessionAction } from "@/modules/session/actions";

export function BookSessionModal({ 
  partnerId, 
  partnerName,
  onClose 
}: { 
  partnerId: string, 
  partnerName: string,
  onClose: () => void
}) {
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [title, setTitle] = useState(`Mentorship with ${partnerName}`);

  const handleBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !time || !title) {
      alert("Please fill in all fields");
      return;
    }
    
    setLoading(true);
    try {
      const scheduledAt = new Date(`${date}T${time}`);
      const result = await scheduleSessionAction(partnerId, scheduledAt.toISOString(), title);
      
      if (result?.error) {
        alert(result.error);
      } else {
        alert("Session scheduled successfully!");
        onClose();
      }
    } catch (err) {
      alert("Failed to schedule session. Check your date/time format.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      <Card className="w-full max-w-md shadow-2xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
        <form onSubmit={handleBook}>
          <CardHeader className="relative border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20">
            <Button 
              type="button" 
              variant="ghost" 
              size="sm" 
              onClick={onClose}
              className="absolute right-4 top-4 h-8 w-8 p-0 rounded-full"
            >
              <X className="h-4 w-4" />
            </Button>
            <CardTitle className="text-xl">Schedule Session</CardTitle>
            <CardDescription>Plan your next meeting with {partnerName}.</CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4 pt-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center">
                <TextIcon className="w-3 h-3 mr-2" /> Session Title
              </label>
              <Input 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                placeholder="e.g. Career Coaching"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center">
                  <Calendar className="w-3 h-3 mr-2" /> Date
                </label>
                <Input 
                  type="date" 
                  value={date} 
                  onChange={(e) => setDate(e.target.value)} 
                  required
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center">
                  <Clock className="w-3 h-3 mr-2" /> Time
                </label>
                <Input 
                  type="time" 
                  value={time} 
                  onChange={(e) => setTime(e.target.value)} 
                  required
                />
              </div>
            </div>
          </CardContent>

          <CardFooter className="bg-slate-50/50 dark:bg-slate-950/20 border-t border-slate-100 dark:border-slate-800 p-6 flex gap-3">
            <Button 
              type="button" 
              variant="outline" 
              className="flex-1" 
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              variant="primary" 
              className="flex-1 px-8" 
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Booking...
                </>
              ) : (
                "Confirm Session"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

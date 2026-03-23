"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { completeSessionAction, cancelSessionAction } from "@/modules/session/actions";
import { useRouter } from "next/navigation";

export function SessionActions({ sessionId }: { sessionId: string }) {
  const [loading, setLoading] = useState<string | null>(null);
  const router = useRouter();

  const handleAction = async (type: 'complete' | 'cancel') => {
    setLoading(type);
    try {
      if (type === 'complete') {
        await completeSessionAction(sessionId);
      } else {
        await cancelSessionAction(sessionId);
      }
      router.refresh();
    } catch (err) {
      alert(`Failed to ${type} session`);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button 
        variant="ghost" 
        size="sm" 
        className="h-9 w-9 p-0 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/20" 
        onClick={() => handleAction('complete')}
        disabled={loading !== null}
        title="Mark as Completed"
      >
        {loading === 'complete' ? <Loader2 className="w-5 h-5 animate-spin" /> : <CheckCircle className="w-5 h-5" />}
      </Button>
      <Button 
        variant="ghost" 
        size="sm" 
        className="h-9 w-9 p-0 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20" 
        onClick={() => handleAction('cancel')}
        disabled={loading !== null}
        title="Cancel Session"
      >
        {loading === 'cancel' ? <Loader2 className="w-5 h-5 animate-spin" /> : <XCircle className="w-5 h-5" />}
      </Button>
    </div>
  );
}

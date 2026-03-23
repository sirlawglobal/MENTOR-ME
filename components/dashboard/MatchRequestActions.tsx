"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Check, X, Loader2 } from "lucide-react";
import { respondToMatchAction } from "@/modules/match/actions";
import { useRouter } from "next/navigation";

export function MatchRequestActions({ matchId }: { matchId: string }) {
  const [loading, setLoading] = useState<string | null>(null);
  const router = useRouter();

  const handleAction = async (accept: boolean) => {
    setLoading(accept ? 'accept' : 'decline');
    try {
      const result = await respondToMatchAction(matchId, accept);
      if (result?.error) {
        alert(result.error);
      } else {
        router.refresh();
      }
    } catch (err) {
      alert("Failed to respond to request");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="flex gap-2">
      <Button 
        size="sm" 
        variant="primary" 
        onClick={() => handleAction(true)}
        disabled={loading !== null}
        className="flex-1 rounded-xl"
      >
        {loading === 'accept' ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <>
            <Check className="w-4 h-4 mr-1.5" /> Accept
          </>
        )}
      </Button>
      <Button 
        size="sm" 
        variant="ghost" 
        onClick={() => handleAction(false)}
        disabled={loading !== null}
        className="flex-1 rounded-xl text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
      >
        {loading === 'decline' ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <>
            <X className="w-4 h-4 mr-1.5" /> Decline
          </>
        )}
      </Button>
    </div>
  );
}

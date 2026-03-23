"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { UserPlus, Loader2 } from "lucide-react";
import { requestMatchAction } from "@/modules/match/actions";
import { useRouter } from "next/navigation";

export function ConnectButton({ mentorId }: { mentorId: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleConnect = async () => {
    setLoading(true);
    try {
      const result = await requestMatchAction(mentorId);
      if (result?.error) {
        alert(result.error);
      } else {
        router.refresh(); // Refresh the page to update the status
      }
    } catch (err) {
      alert("Failed to send request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button 
      onClick={handleConnect} 
      disabled={loading}
      className="w-full group-hover:bg-indigo-700 dark:group-hover:bg-indigo-600 transition-colors"
    >
      {loading ? (
        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
      ) : (
        <UserPlus className="h-4 w-4 mr-2" />
      )}
      Connect
    </Button>
  );
}

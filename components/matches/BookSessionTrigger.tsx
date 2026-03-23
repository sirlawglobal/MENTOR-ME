"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Calendar as CalendarIcon } from "lucide-react";
import { BookSessionModal } from "./BookSessionModal";

export function BookSessionTrigger({ partnerId, partnerName }: { partnerId: string, partnerName: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button 
        variant="primary" 
        size="sm" 
        className="flex-1"
        onClick={() => setIsOpen(true)}
      >
        <CalendarIcon className="w-4 h-4 mr-2" /> Book Session
      </Button>

      {isOpen && (
        <BookSessionModal 
          partnerId={partnerId} 
          partnerName={partnerName} 
          onClose={() => setIsOpen(false)} 
        />
      )}
    </>
  );
}

'use client';

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { BrainCircuit } from 'lucide-react';
import { useRouter } from "next/navigation";

interface QuizAdDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function QuizAdDialog({ open, onOpenChange }: QuizAdDialogProps) {
  const router = useRouter();

  const handleStartNow = () => {
    router.push('/quiz');
    onOpenChange(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-lg border-accent shadow-2xl">
        <AlertDialogHeader className="text-center items-center p-4">
            <div className="p-4 bg-primary/10 rounded-full mb-4">
                <BrainCircuit className="w-16 h-16 text-primary" />
            </div>
          <AlertDialogTitle className="text-2xl font-bold text-primary">
            Try Your Knowledge or Prepare For Your Paper!
          </AlertDialogTitle>
          <AlertDialogDescription className="text-lg text-foreground/80 mt-2">
            Take the <span className="font-bold text-accent">HPS_AI_QUIZ</span> Challenge Now!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-col sm:flex-col sm:space-x-0 gap-2 w-full mt-4 px-6 pb-6">
            <Button onClick={handleStartNow} size="lg" className="w-full">
                Start Now
            </Button>
            <Button onClick={() => onOpenChange(false)} variant="ghost" size="lg" className="w-full">
                Maybe Later
            </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}


import { Loader2 } from 'lucide-react';

export default function Loading() {
  // This UI will be displayed instantly on route changes while the new page loads.
  return (
    <div className="flex h-full w-full items-center justify-center bg-background/50">
      <Loader2 className="h-16 w-16 animate-spin text-primary" />
    </div>
  );
}

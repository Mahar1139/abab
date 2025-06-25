
import dynamic from 'next/dynamic';
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const SchoolInfoChatbot = dynamic(() => import('@/components/ai/SchoolInfoChatbot'), {
  loading: () => (
    <Card className="flex flex-col h-full w-full shadow-none border-0 bg-transparent backdrop-blur-xl">
      <CardHeader className="border-b border-white/20">
        <Skeleton className="h-7 w-48" />
        <Skeleton className="h-4 w-3/4" />
      </CardHeader>
      <CardContent className="flex-grow overflow-y-auto p-6 space-y-4">
        <Skeleton className="h-10 w-full" />
        <div className="flex justify-end">
          <Skeleton className="h-8 w-24" />
        </div>
        <div className="mt-6">
            <Skeleton className="h-6 w-1/4 mb-2" />
            <div className="flex flex-wrap gap-2">
                <Skeleton className="h-8 w-28" />
                <Skeleton className="h-8 w-40" />
                <Skeleton className="h-8 w-32" />
            </div>
        </div>
      </CardContent>
    </Card>
  ),
  ssr: false, 
});

export default function AIAssistantPage() {
  return (
    <div className="relative flex flex-col h-full overflow-hidden bg-background">
      {/* Animated Blobs Background Container */}
      <div aria-hidden="true" className="absolute inset-0 z-0 h-full w-full">
        <div className="relative h-full w-full">
          {/* Blob 1 */}
          <div className="absolute top-0 -left-1/3 h-[40rem] w-[40rem] rounded-full bg-gradient-to-tr from-purple-600 to-blue-900 opacity-70 blur-3xl animate-blob-1" />
          {/* Blob 2 */}
          <div className="absolute -bottom-1/4 right-0 h-[40rem] w-[40rem] rounded-full bg-gradient-to-bl from-pink-400 to-orange-500 opacity-60 blur-3xl animate-blob-2" />
          {/* Blob 3 */}
          <div className="absolute top-1/2 -right-1/4 h-[30rem] w-[30rem] rounded-full bg-gradient-to-br from-fuchsia-500 to-purple-500 opacity-50 blur-3xl animate-blob-3" />
          {/* Blob 4 */}
          <div className="absolute bottom-0 -left-1/4 h-[35rem] w-[35rem] rounded-full bg-gradient-to-r from-cyan-400 to-emerald-500 opacity-60 blur-3xl animate-blob-4" />
        </div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        <SchoolInfoChatbot />
      </div>
    </div>
  );
}

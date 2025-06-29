"use client";

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

export default function ClientSchoolInfoChatbot() {
    return <SchoolInfoChatbot />;
}
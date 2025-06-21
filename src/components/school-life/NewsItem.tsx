
'use client';

import Image from 'next/image';
import type { NewsArticle } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CalendarDays, ArrowRight } from 'lucide-react';

interface NewsItemProps {
  article: NewsArticle;
}

export default function NewsItem({ article }: NewsItemProps) {
  return (
    <Card className="flex flex-col md:flex-row overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-full group">
      <div className="md:w-1/3 relative aspect-video md:aspect-auto">
        <Image 
            src={article.imageUrl} 
            alt={article.title} 
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            data-ai-hint={article.dataAiHint || "news event"}
        />
      </div>
      <div className="md:w-2/3 flex flex-col">
        <CardHeader className="p-4 md:p-6">
          <CardTitle className="text-xl md:text-2xl text-primary group-hover:text-accent transition-colors">{article.title}</CardTitle>
          {article.date && (
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <CalendarDays className="w-3.5 h-3.5 mr-1.5" />
              {new Date(article.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
          )}
        </CardHeader>
        <CardContent className="p-4 md:p-6 pt-0 flex-grow">
          <CardDescription className="text-base text-foreground/80 leading-relaxed line-clamp-3">{article.description}</CardDescription>
        </CardContent>
        <CardFooter className="p-4 md:p-6 pt-0">
          <Button variant="link" asChild className="text-primary hover:text-accent p-0">
            <Link href="#">Read More <ArrowRight className="w-4 h-4 ml-1" /></Link>
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}

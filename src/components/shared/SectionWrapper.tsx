import React from 'react';
import { cn } from '@/lib/utils';

interface SectionWrapperProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  titleClassName?: string;
}

export default function SectionWrapper({ title, children, className, titleClassName }: SectionWrapperProps) {
  return (
    <section className={cn('py-8 md:py-12', className)}>
      <div className="container mx-auto px-4">
        {title && (
          <h2 className={cn('text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-primary text-center', titleClassName)}>
            {title}
          </h2>
        )}
        {children}
      </div>
    </section>
  );
}

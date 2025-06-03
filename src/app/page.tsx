
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-12rem)] py-10 px-4 text-center">
      <div className="w-full max-w-5xl mb-8">
        <Image
          src="https://placehold.co/1200x450.png"
          alt="Himalaya Public School Campus Scenery"
          width={1200}
          height={450}
          className="rounded-xl shadow-2xl object-cover w-full h-auto"
          data-ai-hint="school campus building"
          priority
        />
      </div>
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary mb-10">
        Welcome To Himalaya Public School
      </h1>
      <Button asChild size="lg" className="px-12 py-7 text-lg md:text-xl">
        <Link href="/admissions">Apply Now</Link>
      </Button>
    </div>
  );
}

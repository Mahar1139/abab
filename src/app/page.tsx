
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-10 px-4">
      {/* Image and Text Overlay Section */}
      <div className="relative w-full max-w-6xl mb-12 shadow-2xl rounded-xl overflow-hidden">
        <Image
          src="https://placehold.co/1200x600.png" 
          alt="Himalaya Public School Campus Scenery"
          width={1200}
          height={600}
          className="object-cover w-full h-auto block"
          data-ai-hint="school campus aerial"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 p-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white text-center">
            Welcome To Himalaya Public School
          </h1>
        </div>
      </div>

      {/* Apply Now Button */}
      <Button asChild size="lg" className="px-12 py-7 text-lg md:text-xl">
        <Link href="/admissions">Apply Now</Link>
      </Button>
    </div>
  );
}

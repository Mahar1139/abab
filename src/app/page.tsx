
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="relative w-full h-screen overflow-hidden"> {/* Full viewport height and width, acts as positioning context */}
      <Image
        src="https://placehold.co/1920x1080.png" // Larger, more standard hero dimension
        alt="Himalaya Public School Campus Scenery"
        layout="fill"
        objectFit="cover"
        className="z-0" // Behind the content
        data-ai-hint="school campus aerial view" // Updated hint
        priority
      />
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/50 p-4"> {/* Overlay for content */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-white text-center mb-8 drop-shadow-md">
          Welcome To Himalaya Public School
        </h1>
        <Button 
          asChild 
          size="lg" 
          className="px-14 py-7 text-lg md:text-xl font-semibold shadow-lg hover:scale-105 transition-transform duration-300"
        >
          <Link href="/admissions">Apply Now</Link>
        </Button>
      </div>
    </div>
  );
}

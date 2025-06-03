
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function HomePage() {
  return (
    <>
      <div className="relative w-full h-[75vh] overflow-hidden"> {/* Adjusted height */}
        <Image
          src="https://placehold.co/1920x1080.png"
          alt="Himalaya Public School Campus Scenery"
          layout="fill"
          objectFit="cover"
          className="z-0"
          data-ai-hint="school campus aerial view"
          priority
        />
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/50 p-4">
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
      {/* You can add more content sections below this hero section */}
    </>
  );
}

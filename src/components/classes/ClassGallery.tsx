
import Image from 'next/image';
import SectionWrapper from '@/components/shared/SectionWrapper';

interface ClassGalleryItem {
  src: string;
  alt: string;
  dataAiHint: string;
}

interface ClassGalleryProps {
  images: ClassGalleryItem[];
  galleryTitle?: string;
}

export default function ClassGallery({ images, galleryTitle = "Glimpses from Our Classes" }: ClassGalleryProps) {
  if (!images || images.length === 0) {
    return null;
  }

  return (
    <SectionWrapper title={galleryTitle} className="mt-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {images.map((image, index) => (
          <div key={index} className="group relative aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <Image
              src={image.src}
              alt={image.alt}
              layout="fill"
              objectFit="cover"
              data-ai-hint={image.dataAiHint}
              className="transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}

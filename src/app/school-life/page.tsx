
import SectionWrapper from "@/components/shared/SectionWrapper";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GalleryImage from "@/components/school-life/GalleryImage";
import NewsItem from "@/components/school-life/NewsItem";
import { galleryItems, newsArticles } from "./school-life-data";
import type { SchoolEvent, NewsArticle } from "@/types";
import { Images, Newspaper } from "lucide-react";

export default function SchoolLifePage() {
  return (
    <div className="container mx-auto py-8">
      <SectionWrapper title="Vibrant School Life at Himalaya">
        <p className="text-center text-lg text-foreground/80 mb-10 max-w-2xl mx-auto">
          Experience the dynamic and enriching environment at Himalaya Public School through our events, activities, and latest news.
        </p>
        <Tabs defaultValue="gallery" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="gallery" className="py-3 text-base">
              <Images className="mr-2 h-5 w-5" /> Photo Gallery
            </TabsTrigger>
            <TabsTrigger value="news" className="py-3 text-base">
              <Newspaper className="mr-2 h-5 w-5" /> School News
            </TabsTrigger>
          </TabsList>

          <TabsContent value="gallery">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {galleryItems.map((item: SchoolEvent) => (
                <div key={item.id} className="group">
                  <GalleryImage item={item} />
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="news">
            <div className="space-y-6 md:space-y-8">
              {newsArticles.map((article: NewsArticle) => (
                 <div key={article.id} className="group">
                  <NewsItem article={article} />
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </SectionWrapper>
    </div>
  );
}

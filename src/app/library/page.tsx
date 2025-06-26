
import SectionWrapper from "@/components/shared/SectionWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Laptop, Clock, Mic, Users, Rss } from "lucide-react";
import Image from "next/image";

const libraryFeatures = [
    {
        title: "Vast Collection",
        description: "Thousands of books across various genres, including fiction, non-fiction, and reference materials.",
        icon: BookOpen,
    },
    {
        title: "Digital Resources",
        description: "Access to e-books, online journals, and educational databases for research and learning.",
        icon: Laptop,
    },
    {
        title: "Quiet Study Areas",
        description: "Dedicated zones for silent reading and focused study, providing a conducive learning atmosphere.",
        icon: Mic,
    },
    {
        title: "Collaborative Spaces",
        description: "Group study tables and areas for students to collaborate on projects and assignments.",
        icon: Users,
    },
    {
        title: "Periodicals & Journals",
        description: "A wide range of magazines, newspapers, and academic journals to keep students updated.",
        icon: Rss,
    },
    {
        title: "Flexible Timings",
        description: "The library is open from 8:00 AM to 5:00 PM on all working days.",
        icon: Clock,
    }
];

export default function LibraryPage() {
    return (
        <div className="container mx-auto py-8">
            <SectionWrapper title="Our Library: A World of Knowledge">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="order-2 md:order-1">
                        <h3 className="text-2xl font-semibold text-secondary mb-4">Welcome to Our Information Hub</h3>
                        <p className="text-lg text-foreground/80 leading-relaxed mb-4">
                            The Himalaya Public School library is more than just a collection of books; it's a vibrant center for learning, discovery, and collaboration. Our mission is to foster a love for reading and provide students and faculty with the resources they need to excel.
                        </p>
                        <p className="text-lg text-foreground/80 leading-relaxed">
                            Equipped with modern amenities and a serene environment, our library supports the academic curriculum and encourages students to explore their interests beyond the classroom.
                        </p>
                    </div>
                    <div className="order-1 md:order-2">
                        <div className="rounded-xl shadow-2xl overflow-hidden aspect-video group relative">
                            <Image
                              src="https://placehold.co/600x400.png"
                              alt="School Library"
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                              data-ai-hint="school library"
                            />
                        </div>
                    </div>
                </div>
            </SectionWrapper>

            <SectionWrapper title="Resources & Services">
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {libraryFeatures.map((feature, index) => (
                        <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                                <div className="p-3 bg-primary/10 rounded-full">
                                    <feature.icon className="w-8 h-8 text-primary" />
                                </div>
                                <CardTitle>{feature.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-foreground/80">{feature.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </SectionWrapper>
        </div>
    );
}

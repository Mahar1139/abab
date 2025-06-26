
import SectionWrapper from "@/components/shared/SectionWrapper";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, MapPin } from "lucide-react";

const events = [
  {
    title: "Annual Sports Day",
    date: "November 15, 2024",
    time: "9:00 AM - 4:00 PM",
    location: "School Sports Ground",
    description: "A day full of exciting athletic events, competitions, and team spirit. All students are encouraged to participate.",
  },
  {
    title: "Science Fair Exhibition",
    date: "November 28, 2024",
    time: "10:00 AM - 2:00 PM",
    location: "Main Auditorium",
    description: "Explore innovative and creative science projects by our talented students from grades 6 to 12.",
  },
  {
    title: "Parent-Teacher Meeting (Grades 1-8)",
    date: "December 7, 2024",
    time: "10:00 AM - 1:00 PM",
    location: "Respective Classrooms",
    description: "An opportunity for parents and teachers to discuss student progress and collaborate for their development.",
  },
  {
    title: "Winter Vacation Begins",
    date: "December 23, 2024",
    time: "N/A",
    location: "School-wide",
    description: "The school will be closed for winter vacation. We wish everyone a happy and safe holiday season.",
  },
   {
    title: "Republic Day Celebrations",
    date: "January 26, 2025",
    time: "9:30 AM",
    location: "School Grounds",
    description: "Join us for the flag hoisting ceremony and cultural programs to celebrate Republic Day.",
  },
  {
    title: "Annual Function 'Sanskriti'",
    date: "February 12, 2025",
    time: "5:00 PM onwards",
    location: "Main Auditorium",
    description: "A cultural extravaganza showcasing dance, music, and drama performances by our students.",
  },
];

export default function EventsCalendarPage() {
  return (
    <div className="container mx-auto py-8">
      <SectionWrapper title="Events Calendar">
        <p className="text-center text-lg text-foreground/80 mb-10 max-w-2xl mx-auto">
          Stay updated with all the important dates, events, and happenings at Himalaya Public School.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {events.map((event, index) => (
            <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
              <CardHeader>
                <CardTitle className="text-xl text-primary">{event.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow space-y-3">
                <div className="flex items-center text-foreground/80">
                  <Calendar className="mr-2 h-4 w-4 text-accent" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center text-foreground/80">
                  <Clock className="mr-2 h-4 w-4 text-accent" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center text-foreground/80">
                  <MapPin className="mr-2 h-4 w-4 text-accent" />
                  <span>{event.location}</span>
                </div>
                <CardDescription className="pt-2">
                  {event.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </SectionWrapper>
    </div>
  );
}


import SectionWrapper from "@/components/shared/SectionWrapper";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, MapPin } from "lucide-react";

const events = [
  {
    title: "Raksha Bandhan",
    date: " Morning to early afternoon (Shubh Muhurat generally 5:47 AM to 1:24 PM, but can be observed throughout the day)",
    time: "7:00 AM - 5:00 PM",
    location: "Homes,Temples",
    description: "A Hindu festival celebrating the loving bond between brothers and sisters. Sisters tie a sacred thread called 'rakhi' around their brothers' wrists, symbolizing their prayers for their brothers' well-being, and brothers, in return, pledge to protect their sisters.",
  },
  {
    title: "Independece Day",
    date: "15 August , 2025",
    time: "10:00 AM - 2:00 PM",
    location: "School",
    description: "A national holiday commemorating the date in 1947 when India achieved independence from British rule. It is marked by patriotic fervor, flag hoisting ceremonies, parades, and cultural programs.",
  },
  {
    title: "Janmashtami",
    date: "August 16, 2025",
    time: "Full Day (Celebrations often extend into the night with 'Bhajans' and 'Kirtans')",
    location: "Temples, Homes",
    description: "Celebrates the birth of Lord Krishna, the eighth avatar of Vishnu. Devotees observe fasts, sing devotional songs, enact scenes from Krishna's life, and decorate temples and homes.",
  },
  {
    title: "Dussehra (Vijayadashami)",
    date: "October 2, 2025",
    time: "Evening (Effigy burning usually takes place in the evening)",
    location: "Public grounds (e.g., Ramlila Maidan), Temples",
    description: "Celebrates the victory of Lord Rama over the demon king Ravana, symbolizing the triumph of good over evil. Large effigies of Ravana, Meghnad, and Indrajit are burned, often after Ramlila performances.",
  },
   {
    title: "Republic Day Celebrations",
    date: "January 26, 2025",
    time: "9:30 AM",
    location: "School Grounds",
    description: "Join us for the flag hoisting ceremony and cultural programs to celebrate Republic Day.",
  },
  {
    title: "Diwali (Main Day - Lakshmi Puja)",
    date: "October 20, 2025",
    time: "Evening (Lakshmi Puja Muhurat will vary, typically after sunset)",
    location: " Homes, Temples, and Public Spaces across Pithoragarh and India",
    description: " The most significant Hindu festival, symbolizing the victory of light over darkness and good over evil. Homes are decorated with lamps (diyas) and lights, and Goddess Lakshmi (goddess of wealth) is worshipped for prosperity. Fireworks are a common part of the celebration.",
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

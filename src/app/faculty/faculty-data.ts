
import type { FacultyMember } from '@/types';

export const facultyMembers: FacultyMember[] = [
  {
    id: 'director-001',
    name: 'Mr. Heera Singh Khati',
    title: 'Manager & Owner',
    bio: `Welcome to Himalaya Public School Website. As the Admin of the reputable institution I consider it my privilege to pen down my message for our newly launched website of our school. I feel very fortunate to work with many dedicated, committed, caring and innovative staff members, parents and students.  

Many people consider education as a medium of getting good jobs, living a royal life, earning money and much more. But education doesn’t really mean this. Real meaning comes when one’s way of thinking gets changed and one starts thinking for the betterment of the society, country and world at large. On the whole education means holistic development of a child not only restricted to the achievements of academics but also helping the child to come up with those inherited knowledge to build a better tomorrow; with a disciplined way of life.

At Himalaya Public School, we believe that every child is a gift of God, and that excellence is the way of life. Keeping this in mind we provide the students value based education, opportunities to grow in every sphere of life both in academics and in their personality development. In the field of co- curricular activities, games, and sports our students are paving their way towards great heights.

I take this opportunity to thank God Almighty for his benevolence, generous blessings showered upon our institution through various people and events. I would like to express my sincere thanks to Rev. Sr Philomena, the Principal who always guides, gives confidence, inspires and supports me in all that I do. I extend my gratitude to all the staff members for their constant amicable support towards the institution. Finally I want to thank all the students of Himalaya Public School for their contribution and important role they play in the School to take the School to a greater height as per the Motto “Let Your Light Shine.”

Thank you and God Bless You!`,
    imageUrl: '/Director.jpg', // Only Manager has an image
    dataAiHint: 'director portrait man'
  },
  {
    id: '1',
    name: 'Suman Bisht',
    title: 'Principal, PhD in Education',
    bio: 'Dr. Sharma has over 20 years of experience in educational leadership and curriculum development. She is passionate about fostering an inclusive and innovative learning environment.',
    // No imageUrl or dataAiHint for other faculty
  },
  {
    id: '2',
    name: 'Mr. Rohan Verma',
    title: 'Head of Mathematics, M.Sc. Mathematics',
    bio: 'Mr. Verma is known for his engaging teaching style and ability to make complex mathematical concepts accessible to students of all levels. He has been with Himalaya Public School for 15 years.',
  },
  {
    id: '3',
    name: 'Ms. Priya Kulkarni',
    title: 'Lead Science Teacher, M.Ed. Science Education',
    bio: 'Ms. Kulkarni champions inquiry-based learning and hands-on experiments in her science classes. She actively mentors students for science olympiads and fairs.',
  },
  {
    id: '4',
    name: 'Mr. Sameer Khan',
    title: 'English Department Head, MA English Literature',
    bio: 'Mr. Khan inspires a love for literature and critical thinking. He organizes the school\'s debate club and annual literary festival.',
  },
   {
    id: '5',
    name: 'Mrs. Sunita Patel',
    title: 'Arts & Crafts Coordinator, B.F.A.',
    bio: 'Mrs. Patel believes in nurturing creativity and self-expression through various art forms. Her students regularly win accolades at inter-school art competitions.',
  },
  {
    id: '6',
    name: 'Mr. Arjun Reddy',
    title: 'Physical Education Director, M.P.Ed.',
    bio: 'Mr. Reddy is dedicated to promoting physical fitness and sportsmanship among students. He coaches multiple school sports teams, leading them to numerous victories.',
  }
];

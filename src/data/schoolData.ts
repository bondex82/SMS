import { NewsArticle, GalleryItem, StaffMember, CurriculumGrade, Testimonial, AcademyEvent } from '../types';

// Asset references
import schoolCrest from '../assets/images/school_crest_1780195641767.png';
import campusHero from '../assets/images/campus_hero_1780195666529.png';

export { schoolCrest, campusHero };

export const ACADEMY_INFO = {
  name: "Grace Junior Academy",
  tagline: "Nurturing Character, Inspiring Excellence",
  motto: "GOD IS LOVE",
  established: "2012",
  phone: "+2348032569057",
  email: "admissions@gracejunioracademy.org",
  address: "ATC Jalingo",
  officeHours: "Monday - Friday: 7:30 AM - 4:30 PM",
  socials: {
    facebook: "https://facebook.com",
    twitter: "https://twitter.com",
    instagram: "https://instagram.com",
    youtube: "https://youtube.com"
  },
  overview: "At Grace Junior Academy, we are dedicated to fostering a warm, collaborative, and academically rigorous environment where junior learners flourish. Our unique curriculum combines structural hands-on learning with creative expression and strong character education, giving each child a resilient foundation for life's challenges.",
  mission: "To provide an inclusive, holistic, and high-standard primary education that inspires intellectual curiosity, moral integrity, physical health, and lifelong civic responsibility in a supportive, student-centered community.",
  vision: "To be recognized regionally and globally as a leading educational institute that shapes resilient, innovate-focused, and compassionate future pioneers.",
  values: [
    { title: "Grace & Integrity", desc: "Acting with honesty, kindness, and moral fiber in all our deeds." },
    { title: "Academic Rigor", desc: "Setting high-grade standards and supporting every kid to exceed capability." },
    { title: "Creative Growth", desc: "Fostering arts, drama, design, and inventive problem solving." },
    { title: "Global Citizenship", desc: "Caring for the environment and respecting cultural variety." }
  ]
};

export const STAFF_MEMBERS: StaffMember[] = [
  {
    id: "staff-1",
    name: "Dr. Evelyn Grace Vane",
    role: "Founder & Headmistress",
    bio: "With over 24 years in primary school education, Dr. Vane holds a Doctorate in Child Development and is passionate about child-centered pedagogy. She believes that education should touch both the mind and the heart.",
    photoUrl: "https://picsum.photos/seed/headmistress/400/400"
  },
  {
    id: "staff-2",
    name: "Mrs. Sarah Jenkins",
    role: "Director of Academic Studies",
    bio: "Mrs. Jenkins handles our dual-focus STEM and humanities frameworks. She works closely with educators to design highly engaging, inquiry-based lessons that challenge students at every level.",
    photoUrl: "https://picsum.photos/seed/academic/400/400"
  },
  {
    id: "staff-3",
    name: "Mr. Marcus Bell",
    role: "Head of Sports and Physical Health",
    bio: "A former varsity decathlete, Coach Bell develops active programs that promote sportsmanship, endurance, coordination, and team solidarity starting right from kindergarten levels.",
    photoUrl: "https://picsum.photos/seed/sportslead/400/400"
  },
  {
    id: "staff-4",
    name: "Ms. Clara Sterling",
    role: "Lead Fine Arts Coordinator",
    bio: "Clara is a practicing watercolor artist who guides our youth through painting, sculpting, musical rhythm, and theatrical play, stimulating cognitive confidence via creative paths.",
    photoUrl: "https://picsum.photos/seed/artlead/400/400"
  }
];

export const CURRICULUM_GRADES: CurriculumGrade[] = [
  {
    gradeLevel: "Nursery Section (Pre-K & Kindergarten)",
    ageGroup: "Ages 3 - 5",
    curriculumFocus: "Motor Skills, Social Integration, Cognitive Exploration, and Phonetics.",
    subjects: [
      { name: "Phonics & Early Reading", description: "Learning letter sounds, sight words, and storytelling to foster early literacy." },
      { name: "S.T.E.A.M. Play", description: "Hands-on play-based counting, water play, basic shapes, and biology concepts." },
      { name: "Motor Coordination & Dance", description: "Refining fine and gross motor actions through music, gymnastics, and clay play." },
      { name: "Social-Emotional Learning", description: "Building empathy, expressing emotions, sharing, and active listening circles." }
    ]
  },
  {
    gradeLevel: "Lower Primary (Primary 1 - 3)",
    ageGroup: "Ages 6 - 8",
    curriculumFocus: "Foundational Literacy, Logic Processing, Scientific Enquiry, and Cultural Studies.",
    subjects: [
      { name: "Applied Mathematics", description: "Multiplication, basic geometry, division patterns, and daily word problem-solving." },
      { name: "Language Arts", description: "Creative writing, grammar structures, spelling mastery, and reading comprehension." },
      { name: "Environmental & Earth Sciences", description: "Understanding weather cycles, plant anatomy, soil ecosystems, and conservation." },
      { name: "Global Cultures & History", description: "Exploring ancient civil history, community structures, map reading, and geography." }
    ]
  },
  {
    gradeLevel: "Upper Primary (Primary 4 - 6)",
    ageGroup: "Ages 9 - 11",
    curriculumFocus: "Critical Thinking, Experimental STEM, Global Citizenship, and Preparatory Academic Rigor.",
    subjects: [
      { name: "Analytical Mathematics", description: "Fractions, decimals, algebraic logic, ratios, and real-world statistical analysis." },
      { name: "STEM Lab & Coding", description: "Introductory visual block programming, physics principles, and robotics design." },
      { name: "Literature & Debate", description: "Studying classical primary novels, essay thesis formulation, and verbal presentation skills." },
      { name: "Universal Human Rights & Citizenship", description: "Understanding civic systems, global connectivity, and collaborative design. " }
    ]
  }
];

export const NEWS_ARTICLES: NewsArticle[] = [
  {
    id: "news-1",
    title: "Admissions Portal Open for Fall Academic Year 2026-2027",
    date: "May 25, 2026",
    category: "Announcement",
    summary: "Families are invited to submit prospective student files. Dynamic financial consultation is available inside our admissions estimator.",
    content: "Grace Junior Academy has officially inaugurated the enrollment cycle for the upcoming school year. To maintain an optimal student-to-teacher ratio of 12:1, seats are carefully distributed. Prospective parents are invited to explore campus tours, file digital applications here, or coordinate offline visits directly through our Contact desk.",
    imageUrl: "https://i.ibb.co/BVd3vC5w/Whats-App-Image-2026-05-22-at-4-24-07-PM.jpg",
    author: "Admissions Office"
  },
  {
    id: "news-2",
    title: "Grace Junior Academy Captures Gold at Junior Football Competition",
    date: "April 18, 2026",
    category: "Achievement",
    summary: "Our Upper Primary robotics and science modules took 1st place in regional water filtration innovation blueprints.",
    content: "Our Grade 5 and Grade 6 STEM teams designed an incredibly efficient low-cost dynamic sand-based filtration construct that filtered mock contaminants. Competing against fifteen other institutions, they earned top marks for environmental utility, visual presentation, and teamwork. Congratulations to all participating young engineers and their guide Mrs. Jenkins!",
    imageUrl: "https://i.ibb.co/prbd65Sb/Whats-App-Image-2026-05-22-at-4-24-07-PM-1.jpg",
    author: "STEM Department"
  },
  {
    id: "news-3",
    title: "Eco-Project: Building Sustainable Permaculture Raised Beds",
    date: "March 10, 2026",
    category: "Event",
    summary: "Students and teachers plant organic vegetables as part of our Environmental and Earth Sciences curriculum.",
    content: "Every season, we expand our campus gardening blocks. This year, the focus was Permaculture and natural compost grids. Our lower-primary students loved interacting with earthworms, setting heirloom carrot roots, and establishing rosemary bush boundaries. The organic produce harvested will support our Academy's healthy lunch program directly.",
    imageUrl: "https://i.ibb.co/ZpXVpG19/Whats-App-Image-2026-05-22-at-4-24-45-PM-3.jpg",
    author: "Eco-Council"
  },
  {
    id: "news-4",
    title: "Spring Term Newsletter: Academic Innovations & Virtual Library Launch",
    date: "January 14, 2026",
    category: "Newsletter",
    summary: "Introducing our brand new catalog with 3,000+ kid-friendly digital books & active interactive quizzes.",
    content: "Our academic panel is excited to announce the full rollout of the Grace Library Cloud. Every student now has a custom login enabling them to read interactive graphic books, self-pace phonics modules, and log reading progress for our annual Principal Reading Challenge. Speak to your classroom tutor for login details.",
    imageUrl: "https://i.ibb.co/84fHj9t6/Whats-App-Image-2026-05-22-at-4-24-45-PM-1.jpg",
    author: "Headmistress Desk"
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "gal-1",
    title: "STEM Robotics Club",
    category: "Science",
    imageUrl: "https://i.ibb.co/xqf2RNCZ/Whats-App-Image-2026-05-22-at-4-24-45-PM-4.jpg",
    description: "Grade 6 pupils assembling responsive block robots."
  },
  {
    id: "gal-2",
    title: "Annual Soccer Relay Cup",
    category: "Sports",
    imageUrl: "https://i.ibb.co/czZSb0s/Whats-App-Image-2026-05-22-at-4-24-45-PM-2.jpg",
    description: "Team Blue storming the field during the Springfield Inter-School Meet."
  },
  {
    id: "gal-3",
    title: "Creative Painting Studio",
    category: "Arts",
    imageUrl: "https://i.ibb.co/4nSysS2m/Whats-App-Image-2026-05-22-at-4-24-04-PM-1.jpg",
    description: "Kindergarten students exploring fluid acrylic color palettes."
  },
  {
    id: "gal-4",
    title: "Interactive Smart Classrooms",
    category: "Classroom",
    imageUrl: "https://i.ibb.co/0V18VDRW/Whats-App-Image-2026-05-22-at-4-24-06-PM-1.jpg",
    description: "Mrs. Jenkins utilizing interactive projection maps for geography."
  },
  {
    id: "gal-5",
    title: "Spring Drama Presentation",
    category: "Events",
    imageUrl: "https://i.ibb.co/sJ2kGX0Y/Whats-App-Image-2026-05-22-at-4-24-07-PM-3.jpg",
    description: "A beautiful display of theatrical confidence and historic costume play."
  },
  {
    id: "gal-6",
    title: "Solar System Physics Fair",
    category: "Science",
    imageUrl: "https://i.ibb.co/s9bwXckc/Whats-App-Image-2026-05-22-at-4-24-06-PM.jpg",
    description: "Innovative orbiting gravity models designed from sustainable clay."
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "test-1",
    name: "Dr. Robert Carter",
    relation: "Parent",
    quote: "My twins entered Grace Junior in kindergarten lacking structural confidence. Now, in Grade 2, they read complete storybooks, discuss soil ecosystems, and genuinely jump with excitement every morning. The instructors here are unmatched experts.",
    avatarUrl: "https://picsum.photos/seed/parent1/100/100"
  },
  {
    id: "test-2",
    name: "Samantha Brooks",
    relation: "Alumni",
    quote: "The values of intellectual integrity and moral service I learned at Grace Academy stuck with me through high school and university. It was a space that didn't just teach us facts, it taught us how to be compassionate leaders.",
    avatarUrl: "https://picsum.photos/seed/alumnus1/100/100"
  },
  {
    id: "test-3",
    name: "Aisha Al-Jamil",
    relation: "Parent",
    quote: "We transferred our daughter to Grace Junior from a rigid, overcrowded institution. The difference was night and day. The small class size, STEM play modules, and personal attention restored her absolute curiosity for learning.",
    avatarUrl: "https://picsum.photos/seed/parent2/100/100"
  }
];

export const PROPRIETOR_INFO = {
  name: "Hon. Rebo Usman",
  role: "Founder/Proprietor",
  bio: "An active philanthropist and retired educator, Hon. Reboi Usman founded the academy with a singular vision: to bring top-tier science and character values directly to Springfield families. He continues to steer physical expansion and state-funded academic sponsorships.",
  imageUrl: "https://i.ibb.co/wrhtFjdQ/rebo.jpg",
  message: "We don't just build kids who excel on pages of test papers; we build people who rise to world challenges with grace, character, and intellect. Our investments in modern laboratories, clean play-yards, and expert mentoring guarantee your child receives the elite academic foundation they deserve."
};

export const BANNER_SLIDES = [
  {
    id: 1,
    title: "Looking for an Educational Haven for Your Kids?",
    subtitle: "THEN WELCOME TO GRACE JUNIOR ACADEMY JALINGO. Experience a fully equipped junior space designed for academic growth & moral development.",
    buttonText: "Apply Online Now",
    tab: "admissions" as const,
    imageUrl: "https://i.ibb.co/fd3wTbYy/Whats-App-Image-2026-05-22-at-4-24-46-PM.jpg"
  },
  {
    id: 2,
    title: "Consider Your Child a Winner ",
    subtitle: "@ Grace Junior. nurturing creative science models, phonetics, skill acquisition and other extra curricullum remains our drilling tools.",
    buttonText: "Explore Curriculum",
    tab: "academics" as const,
    imageUrl: "https://i.ibb.co/s9bwXckc/Whats-App-Image-2026-05-22-at-4-24-06-PM.jpg"
  },
  {
    id: 3,
    title: "A Vibrant School Life",
    subtitle: "Merging rigorous classroom learnings with active athletic meets, swimming, and paint-craft exhibits.",
    buttonText: "Our Event Calendar",
    tab: "events" as const,
    imageUrl: "https://i.ibb.co/prbd65Sb/Whats-App-Image-2026-05-22-at-4-24-07-PM-1.jpg"
  }
];

export const ACADEMY_EVENTS: AcademyEvent[] = [
  {
    id: "evt-1",
    title: "Annual Science & STEM Exhibition",
    date: "June 15, 2026",
    time: "09:00 AM - 02:00 PM",
    location: "Main S.T.E.A.M. Hall",
    description: "Our eager pupils from Grades 1 through 6 present solar orbit trackers, dynamic filtration grids, and introductory scratch games. Parents are warmly invited to interact with active exhibitions.",
    imageUrl: "https://i.ibb.co/HLRf8Ysq/Whats-App-Image-2026-05-22-at-4-24-06-PM-2.jpg",
    category: "Science"
  },
  {
    id: "evt-2",
    title: "Fall 2026 Sibling Interview Round",
    date: "June 28, 2026",
    time: "08:00 AM - 04:00 PM",
    location: "Admissions Admin Block",
    description: "Accelerated booking assessments for siblings of current active students. Financial estimators and custom waiver packages are processed on the spot.",
    imageUrl: "https://i.ibb.co/xqf2RNCZ/Whats-App-Image-2026-05-22-at-4-24-45-PM-4.jpg",
    category: "Admissions"
  },
  {
    id: "evt-3",
    title: "Inter-School Sports & Track Meet",
    date: "July 12, 2026",
    time: "10:00 AM - 04:30 PM",
    location: "Springfield Central Fields",
    description: "A fun-filled day of athletic relays, group running events, tug-of-war, and parent-pupil running matches under Coach Marcus Bell's administration.",
    imageUrl: "https://i.ibb.co/sJ2kGX0Y/Whats-App-Image-2026-05-22-at-4-24-07-PM-3.jpg",
    category: "Sports"
  },
  {
    id: "evt-4",
    title: "Mid-Year Fine Arts Showcase",
    date: "July 24, 2026",
    time: "03:00 PM - 06:00 PM",
    location: "Academy Amphitheater",
    description: "An elegant display of watercolor paintings, craft designs, clay models, and special theatrical dialogues hosted under Ms. Clara Sterling's coordination.",
    imageUrl: "https://i.ibb.co/ccgshNxP/Whats-App-Image-2026-05-22-at-4-24-04-PM.jpg",
    category: "Arts"
  },
  {
    id: "evt-5",
    title: "Parent-Teacher Collaborative Alliance",
    date: "August 05, 2026",
    time: "02:00 PM - 05:00 PM",
    location: "Grade Classrooms",
    description: "Detailed reviews of child behavioral progress reports, portfolio files, and upcoming autumn syllabus calendars. Refreshments will be active in the court.",
    imageUrl: "https://i.ibb.co/wZZMkcS5/Whats-App-Image-2026-05-22-at-4-24-07-PM-2.jpg",
    category: "Academic"
  }
];

export const ACADEMIC_CALENDAR = [
  { date: "June 08, 2026", event: "Final Term Examinations Begin (Grades 1-6)" },
  { date: "June 19, 2026", event: "Science & Craft Fair and Student Portfolio Review" },
  { date: "June 25, 2026", event: "End of Term Assembly & Graduation Day 2026" },
  { date: "June 26, 2026", event: "Summer Vacation Period Officially Begins" },
  { date: "August 24, 25, 2026", event: "New Intake Orientation & Classroom Setup Days" },
  { date: "September 01, 2026", event: "Fall Semester Classes Open: Academic Year 2026/27" }
];

export const ANNOUNCEMENTS = [
  {
    id: "ann-1",
    title: "Transportation Updates: New Sabon Gari Bussing Route added",
    date: "May 29, 2026",
    priority: "Medium",
    desc: "To ease the dynamic morning commute, Bus Route 4 is extended to touch Valley-Heights with real-time tracking badges."
  },
  {
    id: "ann-2",
    title: "Accreditation Renewal & Perfect 100/100 General Inspection Score",
    date: "May 15, 2026",
    priority: "High",
    desc: "The State Board has affirmed our full primary level certification with praise for children's hygiene and code-based playing yards."
  }
];

export const ADMISSION_UPDATES = {
  currentStage: "Round 2 Applications",
  deadline: "June 30, 2026",
  financialAidAvailable: true,
  siblingDiscountPct: "15% discount for consecutive kids enrolled",
  availableSeats: {
    nursery: "4 slots remaining",
    lowerPrimary: "7 slots remaining",
    upperPrimary: "3 slots remaining"
  }
};

export const MOCK_BANK_DETAILS = {
  bankName: "Guaranty Trust Bank (GTBank)",
  accountName: "Grace Junior Academy Ltd",
  accountNumber: "0123456789",
  referenceFormat: "Student Full Name-Student Class & Arm. (E.g Mike Bondima - Primary 1 Gold)"
};


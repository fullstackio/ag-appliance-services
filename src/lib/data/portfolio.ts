import type {
  ServiceCard,
  ExperienceItem,
  SkillGroup,
  Project,
  EducationItem,
  WorkflowStep,
  Review,
} from "@/lib/types";

export const services: ServiceCard[] = [
  {
    icon: "code",
    title: "Frontend & UI Engineering",
    description:
      "Pixel-perfect, accessible interfaces built with React, Next.js, Redux and TypeScript — responsive across every device and browser.",
  },
  {
    icon: "cms",
    title: "WordPress & CMS Development",
    description:
      "WordPress VIP, Multisite and custom theme/plugin development — including WooCommerce stores and large-scale, high-traffic systems.",
  },
  {
    icon: "bolt",
    title: "Performance & API Integration",
    description:
      "Core Web Vitals optimization, caching and CDN tuning, plus clean REST API integrations with a Node.js, Express and MongoDB backend.",
  },
];

export const stats = [
  { count: 8, suffix: "+", label: "Years of Experience" },
  { count: 50, suffix: "+", label: "Projects Delivered" },
  { count: 98, suffix: "%", label: "Core Web Vitals Pass Rate", offset: true },
];

export const experience: ExperienceItem[] = [
  {
    period: "Feb 2022 — Present",
    role: "Software Developer",
    org: "Indus Net Technologies Ltd.",
    location: "Ecospace, Kolkata",
    points: [
      "Developing scalable web applications using React, Next.js and Redux.",
      "Implementing API integrations, state management and performance optimizations.",
      "Working with Docker and Jenkins for CI/CD pipeline automation.",
      "Managing GitHub and Bitbucket repositories for version control.",
      "Leading a team of developers — resource management, task allocation and mentoring.",
      "Ensuring code quality through reviews, testing and best practices.",
    ],
  },
  {
    period: "Aug 2020 — Jan 2022",
    role: "Senior HTML Developer",
    org: "Techno Exponent Pvt. Ltd.",
    location: "Saltlake Sec V, Kolkata",
    points: [
      "Led frontend development for multiple projects, ensuring high performance.",
      "Developed reusable components using HTML, SCSS and JavaScript.",
      "Mentored junior developers and conducted code reviews.",
    ],
  },
  {
    period: "Jun 2019 — Aug 2020",
    role: "Frontend Developer",
    org: "Ivan Web Solutions",
    location: "Salt Lake Sec V, Kolkata",
    points: [
      "Developed and maintained HTML, CSS and Bootstrap-based templates.",
      "Converted UI/UX wireframes into functional web pages.",
      "Focused on accessibility and SEO-friendly development.",
    ],
  },
  {
    period: "Nov 2018 — May 2019",
    role: "HTML Developer",
    org: "Navsoft",
    location: "Topsia Road, Kolkata",
    points: [
      "Built interactive and dynamic user interfaces using JavaScript and jQuery.",
      "Worked closely with backend teams to integrate APIs.",
      "Improved website performance and ensured mobile responsiveness.",
    ],
  },
  {
    period: "Jan 2017 — Aug 2018",
    role: "Web Designer",
    org: "Met Technologies Pvt. Ltd.",
    location: "Newtown, Rajarhat, Kolkata",
    points: [
      "Developed and maintained responsive web pages using HTML, CSS and JavaScript.",
      "Collaborated with UI/UX designers to implement pixel-perfect designs.",
      "Ensured cross-browser compatibility and optimized web performance.",
    ],
  },
  {
    period: "Mar 2013 — Dec 2016",
    role: "Web Designer",
    org: "Brishti Technologies Pvt. Ltd.",
    location: "Kalikapur, Haltu, Kolkata",
    points: [
      "Created wireframes, mockups and UI prototypes for web applications.",
      "Worked closely with developers to ensure seamless UI/UX implementation.",
      "Developed branding materials and visual assets to enhance user experience.",
    ],
  },
];

export const skillGroups: SkillGroup[] = [
  {
    title: "Frontend",
    icon: "code",
    tags: [
      "React.js", "Vite", "Next.js", "Redux", "TypeScript",
      "JavaScript (ES6+)", "Tailwind", "SCSS", "Prime React", "ShadCn",
      "Bootstrap", "WordPress", "System Architecture & Design", "Microservices",
      "Mobile Responsive", "Cross-Browser Compatibility", "Lazy Loading",
      "Code Splitting", "SSR / CSR", "PWA",
    ],
  },
  {
    title: "Backend & APIs",
    icon: "database",
    tags: [
      "Node.js", "Express", "MongoDB", "Postman", "REST APIs",
      "Database Design", "Relational DB Management", "Data Modeling",
    ],
  },
  {
    title: "DevOps & Tools",
    icon: "tools",
    tags: [
      "GitHub", "Bitbucket", "Jira", "Trello", "GitHub Actions",
      "CI/CD Workflows", "Docker", "Jenkins",
    ],
  },
];

export const relocateLocations =
  "Bhubaneswar · Bangalore · Kolkata · Gujarat · Mumbai · Delhi NCR";

export const projects: Project[] = [
  {
    role: "Frontend Developer",
    name: "Audio Engine",
    sub: "Premium Audio Products — E-commerce",
    description:
      "Development and optimization of a premium e-commerce store for high-quality audio equipment. WooCommerce customization, product layout enhancement, improved Core Web Vitals, advanced caching and CDN configuration for faster global delivery.",
    tags: ["WordPress", "WooCommerce", "ACF Pro", "PHP", "JavaScript", "SCSS"],
    href: "https://audioengine.com",
  },
  {
    role: "MERN Developer",
    name: "SOVI Health Solutions",
    sub: "B2B Productivity Platform",
    description:
      "Corporate-facing platform helping companies grow revenue by uncovering hidden causes of productivity loss. Content-rich site with strong UI/UX, responsive design, lead-capture conversion forms and performance optimisation.",
    tags: ["React.js", "Tailwind", "Redux", "TanStack", "Node.js", "MongoDB"],
    href: "https://sovihealthsolutions.com",
  },
  {
    role: "Frontend Developer",
    name: "Alaska Gulf Coast Expeditions",
    sub: "Charter Fishing & Hunting",
    description:
      "Promotes charter fishing and hunting expeditions on Alaska's North Gulf Coast, based out of Ninilchik. Multiple service categories, trip booking options and large visual galleries to showcase the experience.",
    tags: ["WordPress", "HTML5", "CSS3"],
    href: "#",
  },
  {
    role: "Frontend Developer",
    name: "CSI Pro",
    sub: "ERP — Claims & Insurance Processing",
    description:
      "An ERP solution for managing claims and insurance processing efficiently, with a structured workflow enabling seamless interaction between clients and insurers. Built reusable Angular components from Zeplin and Figma designs.",
    tags: ["Angular", "SCSS", "JavaScript"],
    href: "#",
  },
  {
    role: "Frontend Developer",
    name: "LACare Insurance Calculator",
    sub: "Online Premium Estimator",
    description:
      "An online tool that helps users estimate insurance costs with an intuitive interface for selecting plans and viewing premium calculations in real time. Styled with SCSS and optimized for cross-browser performance.",
    tags: ["React.js", "SCSS", "TanStack", "JavaScript"],
    href: "#",
  },
];

export const educationAcademics: EducationItem[] = [
  { date: "2009 — 2013", name: "Bachelor of Arts", org: "West Bengal State University" },
  { date: "2008 — 2009", name: "Higher Secondary", org: "WBCHSE" },
];

export const educationCertifications: EducationItem[] = [
  { date: "Jan 2017 — Jun 2017", name: "Linux Administration", org: "TATA Consultancy Services" },
  { date: "Oct 2011 — Mar 2013", name: "Computer Application (Diploma)", org: "Youth Computer Training Center" },
];

export const workflowSteps: WorkflowStep[] = [
  {
    no: "01",
    title: "Consultation & Diagnosis",
    points: [
      "Free initial consultation to understand your needs",
      "Honest assessment of the problem or project scope",
      "Transparent estimate before any work begins",
    ],
  },
  {
    no: "02",
    title: "Planning & Quote",
    points: [
      "Define goals, timeline and deliverables",
      "Clear, itemised quote with no hidden costs",
      "Agree on milestones and communication",
    ],
  },
  {
    no: "03",
    title: "Execution",
    points: [
      "Skilled, careful work using quality parts & practices",
      "Regular progress updates throughout",
      "Clean, professional finish every time",
    ],
  },
  {
    no: "04",
    title: "Delivery & Support",
    points: [
      "Final review and walkthrough with you",
      "Warranty & aftercare on every service",
      "Always a message away for follow-ups",
    ],
  },
];

export const reviews: Review[] = [
  {
    stars: 5,
    quote:
      "Clean, well-tested code delivered on time and on budget. Avijit understood exactly what my product needed. Best engineer I've worked with.",
    name: "Lars Jensen",
    avatar: "L",
  },
  {
    stars: 5,
    quote:
      "My washing machine and fridge were both fixed in one visit. Genuinely cares about doing the job right. Highly recommended!",
    name: "Sneha Lindberg",
    avatar: "S",
  },
  {
    stars: 4,
    quote:
      "Booked a bike service and a full car wash — quick, thorough and fairly priced. My ride feels brand new again.",
    name: "Richard Snow",
    avatar: "R",
  },
  {
    stars: 5,
    quote:
      "From a custom dashboard to fixing our kitchen chimney, Avijit is the rare professional who does it all and does it well.",
    name: "Andrew Johnson",
    avatar: "A",
  },
  {
    stars: 5,
    quote:
      "Reliable, professional and skilled across the board. Avijit has become our go-to for both IT projects and home repairs.",
    name: "Maria Costa",
    avatar: "M",
  },
];

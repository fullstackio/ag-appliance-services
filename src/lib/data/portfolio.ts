import type {
  ServiceCard,
  ExperienceItem,
  SkillGroup,
  Project,
  EducationItem,
  WorkflowStep,
  Review,
} from "@/lib/types";

// Body copy throughout the site uses lorem ipsum placeholder text; titles,
// labels and category names stay meaningful (home-appliance service theme).
const LOREM =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.";

export const services: ServiceCard[] = [
  {
    icon: "cooling",
    title: "AC & Refrigeration Repair",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim.",
  },
  {
    icon: "laundry",
    title: "Washing Machine & Dryer Service",
    description:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat.",
  },
  {
    icon: "kitchen",
    title: "Microwave & Kitchen Appliances",
    description:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor.",
  },
];

export const stats = [
  { count: 8, suffix: "+", label: "Years of Experience" },
  { count: 1500, suffix: "+", label: "Appliances Repaired" },
  { count: 98, suffix: "%", label: "Customer Satisfaction", offset: true },
];

export const experience: ExperienceItem[] = [
  {
    period: "Feb 2022 — Present",
    role: "Senior Appliance Technician",
    org: "CoolFix Home Services",
    location: "Ecospace, Kolkata",
    points: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod.",
      "Tempor incididunt ut labore et dolore magna aliqua ut enim ad minim.",
      "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.",
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.",
      "Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia.",
      "Deserunt mollit anim id est laborum lorem ipsum dolor sit amet consectetur.",
    ],
  },
  {
    period: "Aug 2020 — Jan 2022",
    role: "Refrigeration Specialist",
    org: "ChillZone Appliance Care",
    location: "Saltlake Sec V, Kolkata",
    points: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor.",
      "Incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis.",
      "Nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    ],
  },
  {
    period: "Jun 2019 — Aug 2020",
    role: "AC Service Engineer",
    org: "BreezeCool Services",
    location: "Salt Lake Sec V, Kolkata",
    points: [
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.",
      "Eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt.",
      "In culpa qui officia deserunt mollit anim id est laborum lorem ipsum dolor.",
    ],
  },
  {
    period: "Nov 2018 — May 2019",
    role: "Washing Machine Technician",
    org: "HomeCare Repairs",
    location: "Topsia Road, Kolkata",
    points: [
      "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor.",
      "Incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis.",
      "Nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    ],
  },
  {
    period: "Jan 2017 — Aug 2018",
    role: "Appliance Repair Technician",
    org: "QuickFix Appliances",
    location: "Newtown, Rajarhat, Kolkata",
    points: [
      "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor.",
      "Incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud.",
      "Exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute.",
    ],
  },
  {
    period: "Mar 2013 — Dec 2016",
    role: "Junior Service Technician",
    org: "Sundar Home Appliances",
    location: "Kalikapur, Haltu, Kolkata",
    points: [
      "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor.",
      "Incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud.",
      "Exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute.",
    ],
  },
];

export const skillGroups: SkillGroup[] = [
  {
    title: "Cooling & Refrigeration",
    icon: "cooling",
    tags: [
      "Split AC", "Window AC", "Cassette AC", "Refrigerators", "Deep Freezers",
      "Water Coolers", "Gas Charging", "Compressor Repair", "Thermostat Calibration",
      "Coil Cleaning", "Leak Detection", "Cooling Diagnostics",
    ],
  },
  {
    title: "Laundry & Kitchen",
    icon: "power",
    tags: [
      "Washing Machines", "Dryers", "Dishwashers", "Microwave Ovens",
      "Induction Cooktops", "Mixer Grinders", "Chimneys", "Water Purifiers",
      "Geysers", "PCB Repair",
    ],
  },
  {
    title: "Diagnostics & Tools",
    icon: "tools",
    tags: [
      "Fault Diagnosis", "Multimeter Testing", "Wiring & Electricals",
      "Refrigerant Handling", "Preventive Maintenance", "Safety Compliance",
      "Genuine Spare Parts", "Installation & Setup",
    ],
  },
];

export const relocateLocations =
  "Bhubaneswar · Bangalore · Kolkata · Gujarat · Mumbai · Delhi NCR";

export const projects: Project[] = [
  {
    role: "Lead Technician",
    name: "CityCool AC Rollout",
    sub: "Commercial AC Installation & Servicing",
    description: LOREM,
    tags: ["Split AC", "VRV Systems", "Maintenance", "Gas Charging"],
    href: "#",
  },
  {
    role: "Service Engineer",
    name: "FreshKeep Cold Storage",
    sub: "Refrigeration Maintenance Contract",
    description: LOREM,
    tags: ["Refrigeration", "Compressors", "Cold Storage", "Preventive Care"],
    href: "#",
  },
  {
    role: "Appliance Technician",
    name: "HomeCare Annual Plans",
    sub: "Household Appliance Care Program",
    description: LOREM,
    tags: ["Washing Machines", "Microwaves", "Geysers", "AMC"],
    href: "#",
  },
  {
    role: "Repair Specialist",
    name: "KitchenPro Servicing",
    sub: "Kitchen Appliance Repairs",
    description: LOREM,
    tags: ["Chimneys", "Induction", "Dishwashers", "Mixers"],
    href: "#",
  },
  {
    role: "Installation Lead",
    name: "PureFlow Water Solutions",
    sub: "Water Purifier Installation & Service",
    description: LOREM,
    tags: ["RO Systems", "Water Purifiers", "Installation", "Filters"],
    href: "#",
  },
];

export const educationAcademics: EducationItem[] = [
  { date: "2009 — 2013", name: "Bachelor of Arts", org: "West Bengal State University" },
  { date: "2008 — 2009", name: "Higher Secondary", org: "WBCHSE" },
];

export const educationCertifications: EducationItem[] = [
  { date: "Jan 2017 — Jun 2017", name: "HVAC & Refrigeration Certification", org: "National Skill Development Centre" },
  { date: "Oct 2011 — Mar 2013", name: "Electrical Appliance Repair (Diploma)", org: "Youth Technical Training Center" },
];

export const workflowSteps: WorkflowStep[] = [
  {
    no: "01",
    title: "Consultation & Diagnosis",
    points: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod.",
      "Tempor incididunt ut labore et dolore magna aliqua ut enim ad minim.",
      "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.",
    ],
  },
  {
    no: "02",
    title: "Planning & Quote",
    points: [
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.",
      "Eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident.",
      "Sunt in culpa qui officia deserunt mollit anim id est laborum.",
    ],
  },
  {
    no: "03",
    title: "Execution",
    points: [
      "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor.",
      "Incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis.",
      "Nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    ],
  },
  {
    no: "04",
    title: "Delivery & Support",
    points: [
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.",
      "Eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt.",
      "In culpa qui officia deserunt mollit anim id est laborum lorem ipsum dolor.",
    ],
  },
];

export const reviews: Review[] = [
  {
    stars: 5,
    quote:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam.",
    name: "Lars Jensen",
    avatar: "L",
  },
  {
    stars: 5,
    quote:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident.",
    name: "Sneha Lindberg",
    avatar: "S",
  },
  {
    stars: 4,
    quote:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium totam rem aperiam eaque ipsa quae ab illo inventore.",
    name: "Richard Snow",
    avatar: "R",
  },
  {
    stars: 5,
    quote:
      "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    name: "Andrew Johnson",
    avatar: "A",
  },
  {
    stars: 5,
    quote:
      "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet consectetur adipisci velit sed quia non numquam eius modi tempora incidunt ut labore.",
    name: "Maria Costa",
    avatar: "M",
  },
];

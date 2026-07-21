import type { Post } from "@/lib/types";

export const posts: Post[] = [
  {
    slug: "shipping-a-nestjs-api-the-right-way",
    title: "Shipping a NestJS API the right way",
    titleLines: ["SHIPPING A", "NESTJS API", "THE RIGHT WAY"],
    categories: ["Engineering", "Backend"],
    moreCategory: "API",
    categoryTokens: "engineering backend api",
    author: "Avijit Ghosh",
    date: "2026-06-14",
    dateDisplay: "June 14, 2026",
    image: "/assets/images/blog1.jpg",
    readTime: "6 min read",
    excerpt:
      "A backend is easy to write and hard to keep. The difference usually comes down to a handful of decisions made on day one.",
  },
  {
    slug: "5-signs-your-ac-needs-a-service",
    title: "5 signs your AC needs a service",
    titleLines: ["5 SIGNS YOUR", "AC NEEDS", "A SERVICE"],
    categories: ["Appliances", "AC Repair"],
    moreCategory: "Summer",
    categoryTokens: "appliances ac repair summer",
    author: "Avijit Ghosh",
    date: "2026-06-11",
    dateDisplay: "June 11, 2026",
    image: "/assets/images/blog2.jpg",
    readTime: "4 min read",
    excerpt:
      "Weak airflow, warm air, strange noises — the early warning signs that your air conditioner needs attention before summer peaks.",
  },
  {
    slug: "monsoon-proofing-your-bike",
    title: "Monsoon-proofing your bike",
    titleLines: ["MONSOON-", "PROOFING", "YOUR BIKE"],
    categories: ["Bike & Car", "Maintenance"],
    moreCategory: "Monsoon",
    categoryTokens: "bike & car maintenance monsoon",
    author: "Avijit Ghosh",
    date: "2026-06-08",
    dateDisplay: "June 08, 2026",
    image: "/assets/images/blog3.jpg",
    readTime: "5 min read",
    excerpt:
      "Rust, slipping brakes and a fussy engine — a simple pre-monsoon routine that keeps your two-wheeler road-ready all season.",
  },
  {
    slug: "why-i-write-tests-before-features",
    title: "Why I write tests before features",
    titleLines: ["WHY I WRITE", "TESTS BEFORE", "FEATURES"],
    categories: ["Engineering", "Testing"],
    moreCategory: "TDD",
    categoryTokens: "engineering testing tdd",
    author: "Avijit Ghosh",
    date: "2026-06-05",
    dateDisplay: "June 05, 2026",
    image: "/assets/images/blog4.png",
    readTime: "7 min read",
    excerpt:
      "Test-driven development is less about tests and more about design. Writing the test first forces the interface to earn its shape.",
  },
  {
    slug: "fridge-not-cooling-start-here",
    title: "Fridge not cooling? Start here",
    titleLines: ["FRIDGE NOT", "COOLING?", "START HERE"],
    categories: ["Appliances", "Cooling"],
    moreCategory: "DIY",
    categoryTokens: "appliances cooling diy",
    author: "Avijit Ghosh",
    date: "2026-06-02",
    dateDisplay: "June 02, 2026",
    image: "/assets/images/blog1.jpg",
    readTime: "5 min read",
    excerpt:
      "Before you call anyone, a five-minute checklist — coils, gaskets, thermostat and airflow — that solves most fridge cooling issues.",
  },
  {
    slug: "the-perfect-at-home-car-wash",
    title: "The perfect at-home car wash",
    titleLines: ["THE PERFECT", "AT-HOME", "CAR WASH"],
    categories: ["Bike & Car", "Detailing"],
    moreCategory: "Car Wash",
    categoryTokens: "bike & car detailing car wash",
    author: "Avijit Ghosh",
    date: "2026-05-29",
    dateDisplay: "May 29, 2026",
    image: "/assets/images/blog2.jpg",
    readTime: "6 min read",
    excerpt:
      "The two-bucket method, the right microfibre and a bit of shade — how to get a swirl-free finish without a professional detailer.",
  },
  {
    slug: "whats-new-this-quarter",
    title: "What's new this quarter",
    titleLines: ["WHAT'S NEW", "THIS QUARTER"],
    categories: ["News", "Updates"],
    moreCategory: "Studio",
    categoryTokens: "news updates studio",
    author: "Avijit Ghosh",
    date: "2026-05-25",
    dateDisplay: "May 25, 2026",
    image: "/assets/images/blog3.jpg",
    readTime: "3 min read",
    excerpt:
      "New service slots, a refreshed booking flow and a couple of engineering projects shipped — a quick roundup from the studio.",
  },
  {
    slug: "designing-apis-that-scale",
    title: "Designing APIs that scale",
    titleLines: ["DESIGNING", "APIS THAT", "SCALE"],
    categories: ["Engineering", "Databases"],
    moreCategory: "Scaling",
    categoryTokens: "engineering databases scaling",
    author: "Avijit Ghosh",
    date: "2026-05-21",
    dateDisplay: "May 21, 2026",
    image: "/assets/images/blog4.png",
    readTime: "8 min read",
    excerpt:
      "Pagination, caching and idempotency aren't afterthoughts — they're the load-bearing walls of an API that survives real traffic.",
  },
  {
    slug: "washing-machine-care-101",
    title: "Washing machine care 101",
    titleLines: ["WASHING", "MACHINE", "CARE 101"],
    categories: ["Appliances", "Laundry"],
    moreCategory: "Care",
    categoryTokens: "appliances laundry care",
    author: "Avijit Ghosh",
    date: "2026-05-18",
    dateDisplay: "May 18, 2026",
    image: "/assets/images/blog1.jpg",
    readTime: "4 min read",
    excerpt:
      "Clean the drum, check the hoses and never overload — the small habits that add years to your washing machine's life.",
  },
];

/** Latest 7 posts — used by the home page blog slider. */
export const latestPosts = posts.slice(0, 7);

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export const blogCategoryOptions = [
  { value: "all", label: "All Categories" },
  { value: "engineering", label: "Engineering" },
  { value: "appliances", label: "Appliances" },
  { value: "bike & car", label: "Bike & Car" },
  { value: "news", label: "News" },
];

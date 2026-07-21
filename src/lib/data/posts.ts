import type { Post } from "@/lib/types";

// Post titles and categories stay meaningful (home-appliance theme); excerpts
// use lorem ipsum placeholder body copy.
export const posts: Post[] = [
  {
    slug: "5-signs-your-ac-needs-a-service",
    title: "5 signs your AC needs a service",
    titleLines: ["5 SIGNS YOUR", "AC NEEDS", "A SERVICE"],
    categories: ["AC & Cooling", "Maintenance"],
    moreCategory: "Summer",
    categoryTokens: "ac & cooling maintenance summer",
    author: "Avijit Ghosh",
    date: "2026-06-14",
    dateDisplay: "June 14, 2026",
    image: "/assets/images/blog2.jpg",
    readTime: "4 min read",
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim.",
  },
  {
    slug: "fridge-not-cooling-start-here",
    title: "Fridge not cooling? Start here",
    titleLines: ["FRIDGE NOT", "COOLING?", "START HERE"],
    categories: ["Refrigeration", "Appliances"],
    moreCategory: "DIY",
    categoryTokens: "refrigeration appliances diy",
    author: "Avijit Ghosh",
    date: "2026-06-11",
    dateDisplay: "June 11, 2026",
    image: "/assets/images/blog1.jpg",
    readTime: "5 min read",
    excerpt:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident.",
  },
  {
    slug: "washing-machine-care-101",
    title: "Washing machine care 101",
    titleLines: ["WASHING", "MACHINE", "CARE 101"],
    categories: ["Laundry", "Maintenance"],
    moreCategory: "Care",
    categoryTokens: "laundry maintenance care",
    author: "Avijit Ghosh",
    date: "2026-06-08",
    dateDisplay: "June 08, 2026",
    image: "/assets/images/blog3.jpg",
    readTime: "4 min read",
    excerpt:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium totam rem aperiam eaque ipsa quae ab illo.",
  },
  {
    slug: "keeping-your-microwave-safe",
    title: "Keeping your microwave safe",
    titleLines: ["KEEPING YOUR", "MICROWAVE", "SAFE"],
    categories: ["Kitchen", "Appliances"],
    moreCategory: "Safety",
    categoryTokens: "kitchen appliances safety",
    author: "Avijit Ghosh",
    date: "2026-06-05",
    dateDisplay: "June 05, 2026",
    image: "/assets/images/blog4.png",
    readTime: "6 min read",
    excerpt:
      "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit sed quia consequuntur magni dolores eos qui ratione voluptatem sequi.",
  },
  {
    slug: "when-to-repair-vs-replace",
    title: "When to repair vs replace",
    titleLines: ["WHEN TO", "REPAIR VS", "REPLACE"],
    categories: ["Appliances", "Maintenance"],
    moreCategory: "Guide",
    categoryTokens: "appliances maintenance guide",
    author: "Avijit Ghosh",
    date: "2026-06-02",
    dateDisplay: "June 02, 2026",
    image: "/assets/images/blog1.jpg",
    readTime: "5 min read",
    excerpt:
      "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet consectetur adipisci velit sed quia non numquam eius modi tempora incidunt.",
  },
  {
    slug: "getting-your-ac-summer-ready",
    title: "Getting your AC summer-ready",
    titleLines: ["GETTING YOUR", "AC SUMMER-", "READY"],
    categories: ["AC & Cooling", "Maintenance"],
    moreCategory: "Summer",
    categoryTokens: "ac & cooling maintenance summer",
    author: "Avijit Ghosh",
    date: "2026-05-29",
    dateDisplay: "May 29, 2026",
    image: "/assets/images/blog2.jpg",
    readTime: "6 min read",
    excerpt:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit.",
  },
  {
    slug: "a-guide-to-chimney-cleaning",
    title: "A guide to chimney cleaning",
    titleLines: ["A GUIDE TO", "CHIMNEY", "CLEANING"],
    categories: ["Kitchen", "Maintenance"],
    moreCategory: "Cleaning",
    categoryTokens: "kitchen maintenance cleaning",
    author: "Avijit Ghosh",
    date: "2026-05-25",
    dateDisplay: "May 25, 2026",
    image: "/assets/images/blog3.jpg",
    readTime: "5 min read",
    excerpt:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum lorem ipsum dolor sit amet.",
  },
  {
    slug: "geyser-maintenance-tips",
    title: "Geyser maintenance tips",
    titleLines: ["GEYSER", "MAINTENANCE", "TIPS"],
    categories: ["Appliances", "Maintenance"],
    moreCategory: "Winter",
    categoryTokens: "appliances maintenance winter",
    author: "Avijit Ghosh",
    date: "2026-05-21",
    dateDisplay: "May 21, 2026",
    image: "/assets/images/blog4.png",
    readTime: "4 min read",
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim veniam.",
  },
  {
    slug: "whats-new-this-quarter",
    title: "What's new this quarter",
    titleLines: ["WHAT'S NEW", "THIS QUARTER"],
    categories: ["News", "Updates"],
    moreCategory: "Studio",
    categoryTokens: "news updates studio",
    author: "Avijit Ghosh",
    date: "2026-05-18",
    dateDisplay: "May 18, 2026",
    image: "/assets/images/blog3.jpg",
    readTime: "3 min read",
    excerpt:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident.",
  },
];

/** Latest 7 posts — used by the home page blog slider. */
export const latestPosts = posts.slice(0, 7);

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export const blogCategoryOptions = [
  { value: "all", label: "All Categories" },
  { value: "ac & cooling", label: "AC & Cooling" },
  { value: "refrigeration", label: "Refrigeration" },
  { value: "laundry", label: "Laundry" },
  { value: "kitchen", label: "Kitchen" },
  { value: "appliances", label: "Appliances" },
  { value: "news", label: "News" },
];

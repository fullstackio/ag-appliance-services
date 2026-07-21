import { posts, latestPosts } from "@/lib/data/posts";
import { services, reviews } from "@/lib/data/portfolio";
import type { Post, Review, ServiceCard } from "@/lib/types";

/** Simulate a network round-trip so React Query loading states / skeletons are visible. */
function delay<T>(value: T, ms = 700): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

export const api = {
  getPosts: (): Promise<Post[]> => delay(posts),
  getLatestPosts: (): Promise<Post[]> => delay(latestPosts),
  getServices: (): Promise<ServiceCard[]> => delay(services),
  getReviews: (): Promise<Review[]> => delay(reviews),
};

"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

export function usePosts() {
  return useQuery({ queryKey: ["posts"], queryFn: api.getPosts });
}

export function useLatestPosts() {
  return useQuery({ queryKey: ["posts", "latest"], queryFn: api.getLatestPosts });
}

export function useServices() {
  return useQuery({ queryKey: ["services"], queryFn: api.getServices });
}

export function useReviews() {
  return useQuery({ queryKey: ["reviews"], queryFn: api.getReviews });
}

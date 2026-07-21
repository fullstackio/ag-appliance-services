"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { PostCard } from "@/components/blog/post-card";
import { SearchIcon } from "@/components/icons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePosts } from "@/lib/hooks/use-portfolio-data";
import { blogCategoryOptions } from "@/lib/data/posts";

function ListingSkeleton() {
  return (
    <div className="blog-list">
      {Array.from({ length: 6 }).map((_, i) => (
        <div className="skeleton-card blog-list-skeleton" key={i}>
          <span className="sk sk--title" />
          <span className="sk sk--line" />
          <span className="sk sk--line short" />
        </div>
      ))}
    </div>
  );
}

export function BlogListing() {
  const { data: posts, isPending } = usePosts();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState<"newest" | "oldest">("newest");

  const filtered = useMemo(() => {
    if (!posts) return [];
    const q = query.trim().toLowerCase();
    const result = posts.filter((post) => {
      const cats = post.categoryTokens.toLowerCase();
      const inCat = category === "all" || cats.includes(category);
      const inSearch = !q || `${post.title.toLowerCase()} ${cats}`.includes(q);
      return inCat && inSearch;
    });
    result.sort((a, b) =>
      sort === "oldest" ? a.date.localeCompare(b.date) : b.date.localeCompare(a.date),
    );
    return result;
  }, [posts, query, category, sort]);

  const resetAll = () => {
    setQuery("");
    setCategory("all");
    setSort("newest");
  };

  return (
    <section className="block plain blog-listing">
      {/* Toolbar */}
      <div className="blog-toolbar">
        <div className="blog-toolbar__search">
          <SearchIcon width={18} height={18} aria-hidden="true" />
          <label className="visually-hidden" htmlFor="blogSearch">
            Search articles
          </label>
          <input
            type="search"
            id="blogSearch"
            placeholder="Search articles…"
            autoComplete="off"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="blog-toolbar__filters">
          <Select value={category} onValueChange={(v) => setCategory(v ?? "all")}>
            <SelectTrigger className="blog-shadcn-select" aria-label="Filter by category">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              {blogCategoryOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={sort}
            onValueChange={(v) => setSort((v as "newest" | "oldest") ?? "newest")}
          >
            <SelectTrigger className="blog-shadcn-select" aria-label="Sort by date">
              <SelectValue placeholder="Newest First" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
            </SelectContent>
          </Select>
          <button type="button" className="btn btn--primary btn--sm" onClick={resetAll}>
            Reset All
          </button>
        </div>
      </div>

      {isPending ? (
        <ListingSkeleton />
      ) : (
        <>
          <div className="blog-list" id="blogList">
            {filtered.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="blog-empty">
              No articles match your filters.{" "}
              <Link
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  resetAll();
                }}
              >
                Reset all
              </Link>
              .
            </p>
          )}
        </>
      )}

      {/* Static pagination (UI only) */}
      <nav className="pagination" aria-label="Blog pages">
        <span className="is-current" aria-current="page">
          1
        </span>
        <Link href="#">2</Link>
        <Link href="#">3</Link>
        <span className="pagination__gap">…</span>
        <Link href="#" aria-label="Next page">
          →
        </Link>
      </nav>
    </section>
  );
}

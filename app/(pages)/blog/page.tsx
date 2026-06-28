"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";
import PageHeader from "@/app/components/ui/PageHeader";
import { blogPosts } from "@/lib/mockData";
import { cn } from "@/lib/utils";

const TYPE_COLORS: Record<string, string> = {
  "Yapım Günlüğü": "#C4522A",
  "Malzeme Rehberi": "#6B8C6B",
  "Teknik Anlatım": "#2B4F7A",
  "İlham Kaynağı": "#C9A043",
  "Kitap Özeti": "#9B9189",
};

const FILTERS = ["Tümü", "Yapım Günlüğü", "Malzeme Rehberi", "Teknik Anlatım", "İlham Kaynağı"];

export default function BlogPage() {
  const [activeFilter, setActiveFilter] = useState("Tümü");

  const filtered = activeFilter === "Tümü"
    ? blogPosts
    : blogPosts.filter(p => p.type === activeFilter);

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <>
      <PageHeader
        label="Blog"
        title="Sanatçılardan Sanatçılara"
        desc="Yapım günlükleri, malzeme incelemeleri, teknik rehberler — teknik değil, yaratıcılık ön planda."
      />

      <div className="container-wide py-10">
        {/* Type filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={cn(
                "px-4 py-2 rounded-sm border text-sm font-medium transition-all",
                activeFilter === f
                  ? "bg-[#C4522A] text-white border-[#C4522A]"
                  : "border-[#2C2620] text-[#9B9189] hover:border-[#5A534C] bg-[#141210]"
              )}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Featured post */}
        {featured && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
            <Link href={`/blog/${featured.slug}`} className="group block">
              <div className="grid lg:grid-cols-2 gap-0 bg-[#141210] border border-[#2C2620] rounded-sm overflow-hidden card-hover">
                <div
                  className="h-64 lg:h-auto min-h-[280px]"
                  style={{ background: `linear-gradient(135deg, ${featured.colorA}20, ${featured.colorB}20)` }}
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-6xl opacity-20">✍</div>
                  </div>
                </div>
                <div className="p-8 lg:p-10 flex flex-col justify-center">
                  <span
                    className="label-sm mb-3"
                    style={{ color: TYPE_COLORS[featured.type] ?? "#C9A043" }}
                  >
                    {featured.type}
                  </span>
                  <h2
                    className="heading-md text-[#EDE8DF] mb-3 group-hover:text-[#C9A043] transition-colors"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {featured.title}
                  </h2>
                  <p className="text-[#9B9189] text-sm leading-relaxed mb-6">{featured.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#2C2620] flex items-center justify-center text-xs text-[#9B9189]">
                        {featured.author[0]}
                      </div>
                      <div>
                        <p className="text-xs font-medium text-[#EDE8DF]">{featured.author}</p>
                        <p className="text-[10px] text-[#5A534C] flex items-center gap-1">
                          <Clock size={9} /> {featured.readTime} dk okuma
                        </p>
                      </div>
                    </div>
                    <span className="flex items-center gap-1 text-xs text-[#C9A043] group-hover:gap-2 transition-all">
                      Oku <ArrowRight size={12} />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Rest of posts */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {rest.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 + i * 0.05 }}
            >
              <Link href={`/blog/${post.slug}`} className="group block h-full">
                <div className="bg-[#141210] border border-[#2C2620] rounded-sm overflow-hidden card-hover h-full flex flex-col">
                  <div
                    className="h-40"
                    style={{ background: `linear-gradient(135deg, ${post.colorA}20, ${post.colorB}20)` }}
                  >
                    <div className="w-full h-full flex items-center justify-center text-4xl opacity-15">✍</div>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <span
                      className="label-sm mb-2"
                      style={{ color: TYPE_COLORS[post.type] ?? "#C9A043" }}
                    >
                      {post.type}
                    </span>
                    <h3
                      className="font-semibold text-[#EDE8DF] mb-2 group-hover:text-[#C9A043] transition-colors leading-snug"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      {post.title}
                    </h3>
                    <p className="text-xs text-[#5A534C] leading-relaxed mb-4 flex-1">{post.excerpt}</p>
                    <div className="flex items-center justify-between pt-3 border-t border-[#1E1A17]">
                      <span className="text-xs text-[#5A534C]">{post.author}</span>
                      <span className="text-xs text-[#3A332D] flex items-center gap-1">
                        <Clock size={9} /> {post.readTime} dk
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
}

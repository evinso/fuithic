"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, BookMarked, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ArtworkCardData {
  id: number | string;
  slug: string;
  title: string;
  artist: string;
  artistHandle: string;
  category: string;
  reactions: number;
  colorA: string;
  colorB: string;
  accent: string;
  forSale?: boolean;
  price?: string;
  isWIP?: boolean;
  isFeatured?: boolean;
}

interface Props {
  artwork: ArtworkCardData;
  index?: number;
  className?: string;
  size?: "normal" | "tall" | "wide";
}

export default function ArtworkCard({ artwork, index = 0, className, size = "normal" }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "group relative bg-[#141210] border border-[#2C2620] rounded-sm overflow-hidden card-hover cursor-pointer",
        size === "tall" && "row-span-2",
        size === "wide" && "col-span-2",
        className
      )}
    >
      <Link href={`/eser/${artwork.slug}`} className="block h-full">
        {/* Artwork visual */}
        <div
          className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
          style={{
            background: `radial-gradient(ellipse at 40% 40%, ${artwork.colorA} 0%, ${artwork.colorB} 100%)`,
          }}
        />
        <div
          className="absolute inset-0 opacity-70"
          style={{
            background: `radial-gradient(ellipse 70% 60% at 50% 40%, ${artwork.accent} 0%, transparent 70%)`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0806]/95 via-[#0A0806]/20 to-transparent" />

        {/* Top badges */}
        <div className="absolute top-3 left-3 flex gap-1.5 z-10">
          <span className="badge">{artwork.category}</span>
          {artwork.isWIP && (
            <span className="badge border-[#C4522A]/50 text-[#C4522A]">WIP</span>
          )}
          {artwork.isFeatured && (
            <span className="badge border-[#C9A043]/50 text-[#C9A043]">Editör</span>
          )}
        </div>

        {/* Hover actions */}
        <div className="absolute top-3 right-3 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 translate-y-1 group-hover:translate-y-0">
          <button
            onClick={(e) => { e.preventDefault(); }}
            className="w-8 h-8 bg-[#0A0806]/80 backdrop-blur-sm border border-[#2C2620] rounded-sm flex items-center justify-center text-[#9B9189] hover:text-[#C9A043] hover:border-[#C9A043]/50 transition-all"
          >
            <Sparkles size={13} />
          </button>
          <button
            onClick={(e) => { e.preventDefault(); }}
            className="w-8 h-8 bg-[#0A0806]/80 backdrop-blur-sm border border-[#2C2620] rounded-sm flex items-center justify-center text-[#9B9189] hover:text-[#C9A043] hover:border-[#C9A043]/50 transition-all"
          >
            <BookMarked size={13} />
          </button>
        </div>

        {/* Bottom info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
          <p
            className="text-[#EDE8DF] text-sm font-semibold leading-tight mb-1 font-display"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {artwork.title}
          </p>
          <div className="flex items-center justify-between">
            <p className="text-[#5A534C] text-xs">@{artwork.artistHandle}</p>
            <div className="flex items-center gap-2">
              {artwork.forSale && (
                <div className="flex items-center gap-1 text-[#C9A043] text-xs">
                  <ShoppingBag size={10} />
                  <span>{artwork.price}</span>
                </div>
              )}
              <div className="flex items-center gap-1 text-[#C9A043] text-xs">
                <Sparkles size={10} />
                <span>{artwork.reactions}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

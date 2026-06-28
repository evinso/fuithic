"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { Sparkles, BookMarked, ArrowRight } from "lucide-react";

const artworks = [
  { id: 1, title: "Boğaz Sisi", artist: "mehmet_cizer", category: "Suluboya", reactions: 234, size: "tall", colorA: "#1A3A5C", colorB: "#0A1E35", accent: "rgba(43,79,122,0.4)" },
  { id: 2, title: "Geometrik Düş", artist: "zeynep_art", category: "Dijital", reactions: 187, size: "normal", colorA: "#2A1A3A", colorB: "#150D20", accent: "rgba(120,60,180,0.3)" },
  { id: 3, title: "Bahar 01", artist: "ali_suluboya", category: "Karakalem", reactions: 156, size: "normal", colorA: "#1A2A1A", colorB: "#0D150D", accent: "rgba(107,140,107,0.3)" },
  { id: 4, title: "Kızıl Öfke", artist: "deniz_konsept", category: "Konsept", reactions: 312, size: "tall", colorA: "#3A1A0A", colorB: "#200E05", accent: "rgba(196,82,42,0.4)" },
  { id: 5, title: "Hat #7", artist: "hasan_hat", category: "Kaligrafi", reactions: 89, size: "normal", colorA: "#2A2A1A", colorB: "#151508", accent: "rgba(201,160,67,0.25)" },
  { id: 6, title: "Çini Masa", artist: "ayse_seramik", category: "Seramik", reactions: 143, size: "normal", colorA: "#1A2A2A", colorB: "#0A1515", accent: "rgba(74,123,138,0.3)" },
  { id: 7, title: "Dijital Orman", artist: "can_3d", category: "3D", reactions: 267, size: "tall", colorA: "#0A2A1A", colorB: "#051510", accent: "rgba(107,140,107,0.35)" },
  { id: 8, title: "Manga Kahraman", artist: "yuki_manga", category: "Manga", reactions: 198, size: "normal", colorA: "#2A1A2A", colorB: "#150A15", accent: "rgba(160,60,200,0.3)" },
  { id: 9, title: "Ahşap Heykel", artist: "orhan_usta", category: "Ahşap", reactions: 76, size: "normal", colorA: "#2A1A0A", colorB: "#150D05", accent: "rgba(139,107,74,0.35)" },
];

function ArtCard({ artwork, index }: { artwork: typeof artworks[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  const height = artwork.size === "tall" ? "row-span-2" : "";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className={`${height} group relative bg-[#141210] border border-[#2C2620] rounded-sm overflow-hidden card-hover cursor-pointer`}
      style={{ minHeight: artwork.size === "tall" ? "360px" : "180px" }}
    >
      {/* Artwork background */}
      <div
        className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
        style={{
          background: `radial-gradient(ellipse at 40% 40%, ${artwork.colorA} 0%, ${artwork.colorB} 100%)`,
        }}
      />

      {/* Abstract color blob */}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background: `radial-gradient(ellipse 70% 60% at 50% 50%, ${artwork.accent} 0%, transparent 70%)`,
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0806]/90 via-transparent to-transparent" />

      {/* Top category */}
      <div className="absolute top-3 left-3">
        <span className="badge text-[#5A534C] border-[#1E1A17]">{artwork.category}</span>
      </div>

      {/* Hover actions */}
      <div className="absolute top-3 right-3 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button className="w-8 h-8 bg-[#0A0806]/80 border border-[#2C2620] rounded-sm flex items-center justify-center text-[#9B9189] hover:text-[#C9A043] transition-colors">
          <Sparkles size={13} />
        </button>
        <button className="w-8 h-8 bg-[#0A0806]/80 border border-[#2C2620] rounded-sm flex items-center justify-center text-[#9B9189] hover:text-[#C9A043] transition-colors">
          <BookMarked size={13} />
        </button>
      </div>

      {/* Bottom info */}
      <div className="absolute bottom-0 left-0 right-0 p-3">
        <p className="text-[#EDE8DF] text-sm font-medium font-display leading-tight" style={{ fontFamily: "var(--font-playfair)" }}>
          {artwork.title}
        </p>
        <div className="flex items-center justify-between mt-1">
          <p className="text-[#5A534C] text-xs">@{artwork.artist}</p>
          <div className="flex items-center gap-1 text-[#C9A043] text-xs">
            <Sparkles size={10} />
            <span>{artwork.reactions}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function RecentArtworks() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="section-pad">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-10"
        >
          <div>
            <span className="gold-line" />
            <h2 className="heading-lg text-[#EDE8DF]">Son Eklenen Eserler</h2>
            <p className="text-[#9B9189] mt-2">Her sanat dalından, her seviyeden — canlı bir akış.</p>
          </div>
          <Link href="/kesfet" className="hidden sm:flex items-center gap-2 label-sm text-[#5A534C] hover:text-[#C9A043] transition-colors group">
            Tümünü Keşfet
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Masonry-like grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 auto-rows-[180px]">
          {artworks.map((art, i) => (
            <ArtCard key={art.id} artwork={art} index={i} />
          ))}

          {/* "Daha Fazla" card */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
          >
            <Link
              href="/kesfet"
              className="flex flex-col items-center justify-center min-h-[180px] h-full border border-dashed border-[#2C2620] rounded-sm text-[#5A534C] hover:border-[#C9A043] hover:text-[#C9A043] transition-all group"
            >
              <ArrowRight size={24} className="mb-2 group-hover:translate-x-1 transition-transform" />
              <span className="label-sm">Tümünü Gör</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

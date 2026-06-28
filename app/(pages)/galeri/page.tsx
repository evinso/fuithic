"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import PageHeader from "@/app/components/ui/PageHeader";
import ArtworkCard from "@/app/components/ui/ArtworkCard";
import { artworks } from "@/lib/mockData";
import { cn } from "@/lib/utils";

const EXHIBITIONS = [
  { id: 1, title: "Anadolu'nun Renkleri", month: "Haziran 2026", artist: "Curated by Fuithic", count: 18, active: true, colorA: "#C4522A", colorB: "#C9A043" },
  { id: 2, title: "Şehir ve Sessizlik", month: "Mayıs 2026", artist: "Curated by Fuithic", count: 24, active: false, colorA: "#2B4F7A", colorB: "#6B8C6B" },
  { id: 3, title: "Karakalem Ustası", month: "Nisan 2026", artist: "Curated by Fuithic", count: 16, active: false, colorA: "#9B9189", colorB: "#5A534C" },
];

export default function GaleriPage() {
  const [selectedExhibition, setSelectedExhibition] = useState(0);
  const exhibition = EXHIBITIONS[selectedExhibition];
  const exhibitionArtworks = artworks.slice(0, exhibition.count);

  return (
    <>
      <PageHeader
        label="Galeri"
        title="Aylık Dijital Sergiler"
        desc="Her ay Fuithic editörleri tarafından derlenen özel koleksiyonlar — sanat galerisinde yürümek gibi."
      />

      <div className="container-wide py-10">
        {/* Exhibition selector */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {EXHIBITIONS.map((ex, i) => (
              <button
                key={ex.id}
                onClick={() => setSelectedExhibition(i)}
                className={cn(
                  "shrink-0 flex items-center gap-3 px-4 py-3 rounded-sm border text-sm transition-all",
                  selectedExhibition === i
                    ? "border-[#C9A043]/40 bg-[#C9A043]/06 text-[#EDE8DF]"
                    : "border-[#2C2620] bg-[#141210] text-[#5A534C] hover:border-[#5A534C]"
                )}
              >
                <div
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: selectedExhibition === i ? ex.colorA : "#5A534C" }}
                />
                <div className="text-left">
                  <p className="font-medium leading-none mb-0.5">{ex.title}</p>
                  <p className="text-[10px] text-[#3A332D]">{ex.month}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Active exhibition header */}
        <motion.div
          key={exhibition.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative overflow-hidden rounded-sm p-8 mb-10"
          style={{ background: `linear-gradient(135deg, ${exhibition.colorA}12, ${exhibition.colorB}12)`, border: `1px solid ${exhibition.colorA}20` }}
        >
          <div className="flex items-end justify-between">
            <div>
              <span className="label-sm text-[#C9A043] mb-2 block">Dijital Sergi · {exhibition.month}</span>
              <h2 className="heading-lg text-[#EDE8DF] mb-2" style={{ fontFamily: "var(--font-playfair)" }}>
                &ldquo;{exhibition.title}&rdquo;
              </h2>
              <p className="text-[#9B9189] text-sm flex items-center gap-2">
                <Calendar size={13} /> {exhibition.count} eser seçildi
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedExhibition(p => Math.max(0, p - 1))}
                disabled={selectedExhibition === 0}
                className="w-9 h-9 border border-[#2C2620] rounded-sm flex items-center justify-center text-[#5A534C] hover:border-[#C9A043]/50 hover:text-[#C9A043] disabled:opacity-30 transition-all"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => setSelectedExhibition(p => Math.min(EXHIBITIONS.length - 1, p + 1))}
                disabled={selectedExhibition === EXHIBITIONS.length - 1}
                className="w-9 h-9 border border-[#2C2620] rounded-sm flex items-center justify-center text-[#5A534C] hover:border-[#C9A043]/50 hover:text-[#C9A043] disabled:opacity-30 transition-all"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Gallery grid — full masonry */}
        <motion.div
          key={`grid-${exhibition.id}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 auto-rows-[180px]"
        >
          {exhibitionArtworks.map((artwork, i) => (
            <ArtworkCard
              key={artwork.id}
              artwork={artwork}
              index={i}
              size={i === 0 || i === 5 ? "wide" : artwork.isFeatured ? "tall" : "normal"}
            />
          ))}
        </motion.div>

        {/* Past exhibitions archive */}
        <div className="mt-16">
          <span className="gold-line" />
          <h3 className="heading-md text-[#EDE8DF] mb-6">Geçmiş Sergiler</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {EXHIBITIONS.filter((_, i) => i !== selectedExhibition).map(ex => (
              <button
                key={ex.id}
                onClick={() => setSelectedExhibition(EXHIBITIONS.indexOf(ex))}
                className="p-5 bg-[#141210] border border-[#2C2620] rounded-sm text-left hover:border-[#5A534C] transition-all group"
              >
                <div
                  className="h-24 rounded-sm mb-4"
                  style={{ background: `linear-gradient(135deg, ${ex.colorA}20, ${ex.colorB}20)` }}
                />
                <p className="font-semibold text-[#EDE8DF] mb-1 group-hover:text-[#C9A043] transition-colors" style={{ fontFamily: "var(--font-playfair)" }}>
                  &ldquo;{ex.title}&rdquo;
                </p>
                <p className="text-xs text-[#5A534C]">{ex.month} · {ex.count} eser</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

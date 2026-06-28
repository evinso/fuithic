"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Users, Clock, Trophy, ArrowRight, Flame, CheckCircle2, Calendar } from "lucide-react";
import PageHeader from "@/app/components/ui/PageHeader";
import ArtworkCard from "@/app/components/ui/ArtworkCard";
import { challenges, artworks } from "@/lib/mockData";
import { cn } from "@/lib/utils";

function Countdown() {
  const [time, setTime] = useState({ h: 47, m: 23, s: 11 });
  useEffect(() => {
    const t = setInterval(() => setTime(p => {
      if (p.s > 0) return { ...p, s: p.s - 1 };
      if (p.m > 0) return { ...p, m: p.m - 1, s: 59 };
      if (p.h > 0) return { h: p.h - 1, m: 59, s: 59 };
      return p;
    }), 1000);
    return () => clearInterval(t);
  }, []);
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    <div className="flex items-center gap-2 text-2xl font-bold tabular-nums" style={{ fontFamily: "var(--font-playfair)", color: "#C9A043" }}>
      {pad(time.h)}:{pad(time.m)}:{pad(time.s)}
    </div>
  );
}

const challengeArtworks = artworks.slice(0, 6);
const themes = ["Sessizlik", "Kayıp Hatıralar", "Eski İstanbul", "Anadolu Renkleri", "Şehirde Doğal", "Küçük Mutluluklar", "Korkularım", "Tek Renk", "1 Saat İçinde", "Referanssız"];

export default function ChallengePage() {
  const [activeFilter, setActiveFilter] = useState<"all" | "active" | "upcoming" | "past">("all");
  const active = challenges.find(c => c.status === "active");
  const filtered = challenges.filter(c => activeFilter === "all" || c.status === activeFilter);

  return (
    <>
      <PageHeader
        label="Challenge"
        title="Her Hafta Yeni Bir Tema"
        desc="Düzenli temalar üretmeye motive eder, topluluğu bir arada tutar. Picasso da her gün çiziyordu."
      />

      <div className="container-wide py-10">
        {/* Active challenge hero */}
        {active && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden rounded-sm border border-[#C4522A]/30 bg-[#141210] mb-12 p-8 lg:p-12"
          >
            <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 80% at 80% 50%, rgba(196,82,42,0.1) 0%, transparent 70%)" }} />
            <div className="absolute top-0 right-0 opacity-5"><Trophy size={200} className="text-[#C9A043]" /></div>

            <div className="relative z-10 grid lg:grid-cols-[1fr_auto] gap-8 items-start">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C4522A] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C4522A]" />
                  </span>
                  <span className="label-sm text-[#C4522A]">Aktif Challenge</span>
                </div>

                <h2 className="heading-md text-[#EDE8DF] mb-3">
                  Bu Hafta Tema:{" "}
                  <em className="text-[#C9A043] not-italic">&ldquo;{active.title}&rdquo;</em>
                </h2>
                <p className="text-[#9B9189] mb-6 max-w-lg">{active.theme}</p>

                <div className="flex flex-wrap gap-4 mb-8 text-sm text-[#5A534C]">
                  <span className="flex items-center gap-1.5"><Users size={14} /><strong className="text-[#9B9189]">{active.participants}</strong> katılımcı</span>
                  <span className="flex items-center gap-1.5"><Trophy size={14} />Kazanan ana sayfaya çıkar + Rozet</span>
                  <span className="flex items-center gap-1.5"><CheckCircle2 size={14} />WIP serisi zorunlu</span>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Link href={`/challenge/${active.slug}`} className="btn-primary gap-2 group">
                    Katıl
                    <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link href="/kesfet?filter=challenge" className="btn-outline gap-2">
                    Eserleri İncele
                  </Link>
                </div>
              </div>

              <div className="shrink-0">
                <p className="label-sm text-[#5A534C] mb-3">Bitmesine</p>
                <Countdown />
              </div>
            </div>
          </motion.div>
        )}

        {/* Filter tabs */}
        <div className="flex gap-2 mb-8">
          {[["all", "Tümü"], ["active", "Aktif"], ["upcoming", "Yakında"], ["past", "Geçmiş"]].map(([v, l]) => (
            <button
              key={v}
              onClick={() => setActiveFilter(v as typeof activeFilter)}
              className={cn(
                "px-4 py-2 rounded-sm text-sm font-medium transition-all",
                activeFilter === v
                  ? "bg-[#C4522A] text-white"
                  : "bg-[#141210] border border-[#2C2620] text-[#9B9189] hover:border-[#5A534C]"
              )}
            >
              {l}
            </button>
          ))}
        </div>

        {/* Challenge cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {filtered.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link href={`/challenge/${c.slug}`} className="block group">
                <div
                  className="p-6 bg-[#141210] border rounded-sm card-hover h-full"
                  style={{ borderColor: c.status === "active" ? `${c.color}40` : "#2C2620" }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={cn(
                        "label-sm",
                        c.status === "active" ? "text-[#C4522A]" : c.status === "upcoming" ? "text-[#C9A043]" : "text-[#5A534C]"
                      )}
                    >
                      {c.status === "active" ? "● Aktif" : c.status === "upcoming" ? "◎ Yakında" : "○ Sona Erdi"}
                    </span>
                    <span className="text-xs text-[#5A534C]">{c.endsIn}</span>
                  </div>

                  <h3 className="text-lg font-bold text-[#EDE8DF] group-hover:text-[#C9A043] transition-colors mb-2" style={{ fontFamily: "var(--font-playfair)" }}>
                    &ldquo;{c.title}&rdquo;
                  </h3>
                  <p className="text-sm text-[#5A534C] mb-4 leading-relaxed">{c.theme}</p>

                  <div className="flex items-center gap-3 text-xs text-[#5A534C]">
                    <span className="flex items-center gap-1"><Users size={12} />{c.participants} katılımcı</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}

          {/* Upcoming teaser */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
            <div className="p-6 bg-[#141210] border border-dashed border-[#2C2620] rounded-sm h-full flex flex-col items-center justify-center text-center gap-3">
              <Calendar size={32} className="text-[#3A332D]" />
              <p className="text-sm text-[#5A534C]">Her Pazartesi yeni tema açılır</p>
              <p className="text-xs text-[#3A332D]">Sonraki challenge için bildirim al</p>
              <button className="btn-outline text-xs py-2 px-4">Bildirim Al</button>
            </div>
          </motion.div>
        </div>

        {/* Challenge artworks grid */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="gold-line" />
              <h2 className="heading-md text-[#EDE8DF]">Bu Haftanın Eserleri</h2>
            </div>
            <Link href="/kesfet?filter=challenge" className="label-sm text-[#5A534C] hover:text-[#C9A043] transition-colors">
              Tümünü Gör
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 auto-rows-[200px]">
            {challengeArtworks.map((a, i) => (
              <ArtworkCard key={a.id} artwork={a} index={i} />
            ))}
          </div>
        </div>

        {/* Theme suggestions */}
        <div className="p-8 bg-[#141210] border border-[#2C2620] rounded-sm">
          <p className="label-sm text-[#5A534C] mb-4">Gelecek Tema Önerileri</p>
          <div className="flex flex-wrap gap-2">
            {themes.map((t) => (
              <span key={t} className="reaction-pill text-[#5A534C]">&ldquo;{t}&rdquo;</span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

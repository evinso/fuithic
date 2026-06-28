"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { Heart, Sparkles, BookMarked, ArrowRight } from "lucide-react";

const reactions = [
  { emoji: "✨", label: "İlham Verdi", count: "847", color: "#C9A043" },
  { emoji: "🎨", label: "Çok Yaratıcı", count: "412", color: "#C4522A" },
  { emoji: "💙", label: "Duygusal Etki", count: "289", color: "#2B4F7A" },
  { emoji: "🙌", label: "Emeğe Saygı", count: "193", color: "#6B8C6B" },
  { emoji: "🖼", label: "Koleksiyonuma Ekledim", count: "124", color: "#C9A043" },
];

export default function WeeklyArtwork() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="section-pad">
      <div className="brush-divider mb-16" />

      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Artwork visual */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {/* Frame */}
            <div className="relative aspect-[4/5] bg-[#141210] border border-[#2C2620] rounded-sm overflow-hidden group">
              {/* Placeholder artwork — oil painting feel */}
              <div className="absolute inset-0">
                <div
                  className="w-full h-full"
                  style={{
                    background:
                      "radial-gradient(ellipse 70% 60% at 40% 45%, #1A3A5C 0%, #0F1A2E 50%, #0A0806 100%)",
                  }}
                />
                {/* Abstract brushstroke shapes */}
                <svg
                  className="absolute inset-0 w-full h-full"
                  viewBox="0 0 400 500"
                  preserveAspectRatio="xMidYMid slice"
                >
                  <defs>
                    <filter id="blur-art">
                      <feGaussianBlur stdDeviation="8" />
                    </filter>
                  </defs>
                  {/* Sky/background */}
                  <ellipse cx="200" cy="180" rx="180" ry="140" fill="rgba(43,79,122,0.3)" filter="url(#blur-art)" />
                  {/* Warm sun glow */}
                  <circle cx="290" cy="100" r="60" fill="rgba(201,160,67,0.2)" filter="url(#blur-art)" />
                  {/* Dark foreground */}
                  <ellipse cx="200" cy="460" rx="220" ry="80" fill="rgba(8,6,4,0.9)" />
                  {/* Building silhouettes */}
                  <rect x="60" y="280" width="40" height="160" fill="rgba(8,6,4,0.85)" />
                  <rect x="110" y="260" width="30" height="180" fill="rgba(12,9,7,0.9)" />
                  <rect x="150" y="300" width="50" height="140" fill="rgba(8,6,4,0.85)" />
                  <rect x="210" y="270" width="35" height="170" fill="rgba(12,9,7,0.9)" />
                  <rect x="255" y="290" width="45" height="150" fill="rgba(8,6,4,0.85)" />
                  <rect x="310" y="275" width="30" height="165" fill="rgba(12,9,7,0.9)" />
                  {/* Minaret */}
                  <rect x="178" y="200" width="8" height="100" fill="rgba(6,4,2,0.9)" />
                  <ellipse cx="182" cy="200" rx="8" ry="15" fill="rgba(6,4,2,0.9)" />
                  {/* Bosphorus water reflection */}
                  <ellipse cx="200" cy="420" rx="200" ry="30" fill="rgba(43,79,122,0.15)" filter="url(#blur-art)" />
                  {/* Golden light on water */}
                  <ellipse cx="200" cy="410" rx="80" ry="8" fill="rgba(201,160,67,0.12)" filter="url(#blur-art)" />
                </svg>

                {/* Painterly overlay texture */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent 60%, rgba(10,8,6,0.8) 100%)",
                    mixBlendMode: "multiply",
                  }}
                />
              </div>

              {/* Artwork info overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-[#0A0806] to-transparent">
                <p className="label-sm text-[#C9A043] mb-1">Suluboya · 2024</p>
                <h3 className="font-display text-[#EDE8DF] text-xl font-bold" style={{ fontFamily: "var(--font-playfair)" }}>
                  &ldquo;Kayıp İstanbul&rdquo;
                </h3>
              </div>

              {/* Hover reveal */}
              <div className="absolute inset-0 bg-[#0A0806]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <Link href="/eser/kayip-istanbul" className="btn-outline border-[#EDE8DF]/30">
                  Eseri İncele
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Floating reaction count */}
            <div className="absolute -right-4 top-1/3 bg-[#141210] border border-[#2C2620] rounded-sm p-3 shadow-xl hidden lg:block">
              <p className="label-sm text-[#5A534C] mb-2">Bu Hafta</p>
              <p className="text-2xl font-bold text-[#C9A043] font-display" style={{ fontFamily: "var(--font-playfair)" }}>
                1.8K
              </p>
              <p className="text-xs text-[#5A534C]">tepki</p>
            </div>
          </motion.div>

          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="gold-line" />
            <p className="label-sm text-[#C9A043] mb-3">Haftanın Eseri</p>
            <h2 className="heading-lg text-[#EDE8DF] mb-4">
              Topluluk ve editör seçimi ile belirlendi
            </h2>
            <p className="text-[#9B9189] leading-relaxed mb-2">
              Elif, 3 hafta boyunca İstanbul&apos;un kaybolmakta olan mahallelerini suluboyayla belgeledi. Fırça darbelerinde Van Gogh&apos;un izlerini taşıyan bu seri, platformun en çok konuşulan eser serisi oldu.
            </p>
            <p className="text-[#5A534C] text-sm mb-8">
              &ldquo;Perfection has nothing to do with it. It&apos;s about what you see.&rdquo; — Van Gogh
            </p>

            {/* Sanatçı */}
            <div className="flex items-center gap-3 mb-8 p-4 bg-[#141210] border border-[#2C2620] rounded-sm">
              <div className="w-10 h-10 rounded-full bg-[#1E1A17] border border-[#2C2620] flex items-center justify-center text-[#C9A043] font-bold font-display" style={{ fontFamily: "var(--font-playfair)" }}>
                E
              </div>
              <div>
                <p className="text-sm font-medium text-[#EDE8DF]">Elif Çizer</p>
                <p className="text-xs text-[#5A534C]">@elif_cizer · Platformda 14 aydır üretiyor</p>
              </div>
              <Link href="/profil/elif_cizer" className="ml-auto label-sm text-[#5A534C] hover:text-[#C9A043] transition-colors underline-anim">
                Profil
              </Link>
            </div>

            {/* Reactions */}
            <div className="space-y-2 mb-8">
              <p className="label-sm text-[#5A534C] mb-3">Bu Esere Verilen Tepkiler</p>
              {reactions.map((r) => (
                <div key={r.label} className="flex items-center gap-3">
                  <span className="text-base w-6">{r.emoji}</span>
                  <div className="flex-1 h-1.5 bg-[#1E1A17] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${(parseInt(r.count) / 847) * 100}%` } : {}}
                      transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: r.color }}
                    />
                  </div>
                  <span className="text-xs text-[#5A534C] w-10 text-right">{r.count}</span>
                  <span className="text-xs text-[#3A332D] hidden sm:block min-w-28">{r.label}</span>
                </div>
              ))}
            </div>

            <Link href="/eser/kayip-istanbul" className="btn-primary inline-flex group">
              Eseri İncele
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>

      <div className="brush-divider mt-16" />
    </section>
  );
}

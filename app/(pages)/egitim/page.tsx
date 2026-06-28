"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Play, Users, Clock, Star, BookOpen, Video, Gift, Lock } from "lucide-react";
import PageHeader from "@/app/components/ui/PageHeader";
import { cn } from "@/lib/utils";

const WORKSHOPS = [
  { id: 1, title: "Suluboya ile Atmosfer Yaratmak", instructor: "Zeynep Aydın", type: "live", price: 0, duration: "2 saat", enrolled: 234, rating: 4.9, date: "Salı 19:00", level: "Orta", colorA: "#2B4F7A", colorB: "#6B8C6B" },
  { id: 2, title: "Karakalem Anatomisi: Figür Çalışması", instructor: "Mert Çelik", type: "recorded", price: 149, duration: "5.5 saat", enrolled: 1820, rating: 4.8, date: null, level: "Başlangıç", colorA: "#9B9189", colorB: "#5A534C" },
  { id: 3, title: "Dijital İllüstrasyon: Procreate Masterclass", instructor: "Selin Kara", type: "recorded", price: 299, duration: "8 saat", enrolled: 3400, rating: 4.9, date: null, level: "Orta", colorA: "#C4522A", colorB: "#C9A043" },
  { id: 4, title: "Renk Teorisi ve Palet Oluşturma", instructor: "Ali Yıldız", type: "live", price: 0, duration: "1.5 saat", enrolled: 89, rating: 0, date: "Perşembe 20:00", level: "Başlangıç", colorA: "#C9A043", colorB: "#C4522A" },
  { id: 5, title: "Seramik: Temel Teknikler", instructor: "Burcu Demirci", type: "recorded", price: 0, duration: "3 saat", enrolled: 670, rating: 4.7, date: null, level: "Başlangıç", colorA: "#C4522A", colorB: "#9B9189" },
  { id: 6, title: "Yağlıboya Manzara: Studio Teknikleri", instructor: "Hasan Öz", type: "recorded", price: 399, duration: "12 saat", enrolled: 980, rating: 5.0, date: null, level: "İleri", colorA: "#6B8C6B", colorB: "#2B4F7A" },
];

type FilterType = "all" | "live" | "recorded" | "free" | "paid";

export default function EgitimPage() {
  const [filter, setFilter] = useState<FilterType>("all");

  const filtered = WORKSHOPS.filter(w => {
    if (filter === "live") return w.type === "live";
    if (filter === "recorded") return w.type === "recorded";
    if (filter === "free") return w.price === 0;
    if (filter === "paid") return w.price > 0;
    return true;
  });

  return (
    <>
      <PageHeader
        label="Eğitim"
        title="Sanatçılardan Öğren"
        desc="Canlı atölyeler, kayıtlı dersler — teknik değil, yaratıcılık ön planda. Özgün sanatçıların özgün anlatımı."
      />

      <div className="container-wide py-10">
        {/* Stat bar */}
        <div className="grid grid-cols-3 gap-4 mb-10 p-6 bg-[#141210] border border-[#2C2620] rounded-sm">
          {[["12K+", "Öğrenci"], ["48", "Aktif Ders"], ["4.8", "Ortalama Puan"]].map(([n, l]) => (
            <div key={l} className="text-center">
              <p className="text-2xl font-bold text-[#C9A043]" style={{ fontFamily: "var(--font-playfair)" }}>{n}</p>
              <p className="text-xs text-[#5A534C]">{l}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {([["all", "Tümü"], ["live", "Canlı"], ["recorded", "Kayıtlı"], ["free", "Ücretsiz"], ["paid", "Ücretli"]] as const).map(([v, l]) => (
            <button key={v} onClick={() => setFilter(v)}
              className={cn("px-4 py-2 rounded-sm border text-sm font-medium transition-all",
                filter === v ? "bg-[#C4522A] text-white border-[#C4522A]" : "border-[#2C2620] text-[#9B9189] hover:border-[#5A534C] bg-[#141210]"
              )}>
              {l}
            </button>
          ))}
        </div>

        {/* Workshop grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {filtered.map((w, i) => (
            <motion.div key={w.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <div className="group bg-[#141210] border border-[#2C2620] rounded-sm overflow-hidden card-hover h-full flex flex-col">
                {/* Thumbnail */}
                <div className="relative h-44" style={{ background: `linear-gradient(135deg, ${w.colorA}25, ${w.colorB}25)` }}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-[#0A0806]/60 border border-[#2C2620] flex items-center justify-center text-[#EDE8DF] group-hover:border-[#C9A043]/50 transition-all">
                      {w.type === "live" ? <Video size={20} /> : <Play size={20} />}
                    </div>
                  </div>
                  <div className="absolute top-3 left-3 flex gap-2">
                    {w.type === "live" && (
                      <span className="label-sm text-[#C4522A] bg-[#0A0806]/80 px-2 py-1 rounded-sm">● Canlı</span>
                    )}
                    {w.price === 0 ? (
                      <span className="label-sm text-[#6B8C6B] bg-[#0A0806]/80 px-2 py-1 rounded-sm flex items-center gap-1"><Gift size={10} />Ücretsiz</span>
                    ) : (
                      <span className="label-sm text-[#9B9189] bg-[#0A0806]/80 px-2 py-1 rounded-sm">{w.price}₺</span>
                    )}
                  </div>
                  <div className="absolute bottom-3 right-3">
                    <span className="text-xs px-2 py-1 bg-[#0A0806]/80 rounded-sm text-[#5A534C] border border-[#2C2620]">{w.level}</span>
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-semibold text-[#EDE8DF] mb-1 leading-snug group-hover:text-[#C9A043] transition-colors" style={{ fontFamily: "var(--font-playfair)" }}>
                    {w.title}
                  </h3>
                  <p className="text-xs text-[#5A534C] mb-3">{w.instructor}</p>

                  <div className="flex items-center gap-3 text-xs text-[#5A534C] mb-4 flex-wrap">
                    <span className="flex items-center gap-1"><Clock size={11} />{w.duration}</span>
                    <span className="flex items-center gap-1"><Users size={11} />{w.enrolled.toLocaleString()}</span>
                    {w.rating > 0 && <span className="flex items-center gap-1 text-[#C9A043]"><Star size={11} />{w.rating}</span>}
                    {w.date && <span className="flex items-center gap-1"><BookOpen size={11} />{w.date}</span>}
                  </div>

                  <div className="mt-auto">
                    <button className={cn(
                      "w-full py-2.5 rounded-sm border text-sm font-medium transition-all",
                      w.price > 0 ? "btn-primary justify-center" : "btn-outline justify-center"
                    )}>
                      {w.price > 0 ? <><Lock size={13} /> Satın Al — {w.price}₺</> : w.type === "live" ? "Kayıt Ol" : "Ücretsiz İzle"}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Instructor CTA */}
        <div className="p-8 bg-[#141210] border border-[#C9A043]/20 rounded-sm text-center">
          <span className="gold-line mx-auto" />
          <h3 className="heading-md text-[#EDE8DF] mb-3">Eğitmen Olmak İster Misin?</h3>
          <p className="text-[#9B9189] text-sm mb-6 max-w-md mx-auto">Bilgini paylaş, topluluğa katkı sağla ve gelirine destek ol. Fuithic eğitmenleri kendi ders fiyatını belirler.</p>
          <button className="btn-primary gap-2">Eğitmen Başvurusu</button>
        </div>
      </div>
    </>
  );
}

"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Quote } from "lucide-react";

const stories = [
  {
    quote: "Galeri beni buradan buldu. Müdür eserlerimi Keşfet sayfasında gördükten sonra doğrudan mesaj attı.",
    name: "Selin Yıldız",
    handle: "@selin_sanat",
    title: "Karakalem & Suluboya Sanatçısı",
    metric: "12",
    metricLabel: "Galeri Davetiyesi",
    colorBg: "#1A1208",
    colorAccent: "#C9A043",
    initial: "S",
  },
  {
    quote: "İlk siparişimi aldım! Mentorim WIP serimi inceledi ve 'müşterilerin süreci de satın alıyor' dedi. Haklıydı.",
    name: "Burak Ateş",
    handle: "@burak_dijital",
    title: "Dijital Sanat & Konsept",
    metric: "47",
    metricLabel: "Tamamlanan Sipariş",
    colorBg: "#0A1018",
    colorAccent: "#2B4F7A",
    initial: "B",
  },
  {
    quote: "Platform bana 'sen zaten iyi' demiyor. Mentorluk sistemi gerçekten gelişimimi görünür kıldı.",
    name: "Ayşe Nur Kaya",
    handle: "@aysenur_cini",
    title: "Seramik & Çini Sanatçısı",
    metric: "8",
    metricLabel: "Ay'da Ustalaştı",
    colorBg: "#0A1510",
    colorAccent: "#6B8C6B",
    initial: "A",
  },
];

export default function ArtistStories() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="section-pad bg-[#0D0B09]">
      <div className="brush-divider mb-16" />
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="gold-line mx-auto" />
          <h2 className="heading-lg text-[#EDE8DF] mb-4">Sanatçı Hikayeleri</h2>
          <p className="text-[#9B9189] max-w-xl mx-auto">
            Buraya gelenler &ldquo;en iyi sanatçı&rdquo; olmak için değil, büyümek için geldi.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {stories.map((story, i) => (
            <motion.div
              key={story.handle}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="relative group"
            >
              <div
                className="p-7 rounded-sm border border-[#2C2620] card-hover h-full flex flex-col"
                style={{ backgroundColor: story.colorBg }}
              >
                {/* Quote icon */}
                <div
                  className="w-10 h-10 rounded-sm flex items-center justify-center mb-5"
                  style={{ backgroundColor: `${story.colorAccent}18` }}
                >
                  <Quote size={18} style={{ color: story.colorAccent }} />
                </div>

                {/* Quote */}
                <p className="text-[#9B9189] leading-relaxed flex-1 mb-6 font-display italic" style={{ fontFamily: "var(--font-playfair)" }}>
                  &ldquo;{story.quote}&rdquo;
                </p>

                {/* Metric */}
                <div
                  className="flex items-baseline gap-2 mb-5 pb-5 border-b border-[#2C2620]"
                >
                  <span
                    className="font-display text-4xl font-bold"
                    style={{ color: story.colorAccent, fontFamily: "var(--font-playfair)" }}
                  >
                    {story.metric}
                  </span>
                  <span className="text-[#5A534C] text-sm">{story.metricLabel}</span>
                </div>

                {/* Artist */}
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm border"
                    style={{
                      backgroundColor: `${story.colorAccent}18`,
                      borderColor: `${story.colorAccent}40`,
                      color: story.colorAccent,
                      fontFamily: "var(--font-playfair)",
                    }}
                  >
                    {story.initial}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#EDE8DF]">{story.name}</p>
                    <p className="text-xs text-[#5A534C]">{story.handle} · {story.title}</p>
                  </div>
                </div>

                {/* Bottom accent line */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-sm origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                  style={{ backgroundColor: story.colorAccent }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="brush-divider mt-16" />
    </section>
  );
}

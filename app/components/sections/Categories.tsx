"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  Pencil, Droplets, Monitor, Box, CupSoda, TreePine,
  BookOpen, Sword, Type, Lightbulb,
} from "lucide-react";

const categories = [
  { label: "Karakalem", icon: Pencil, color: "#9B9189", count: "4.2K" },
  { label: "Suluboya", icon: Droplets, color: "#2B4F7A", count: "3.1K" },
  { label: "Dijital", icon: Monitor, color: "#C4522A", count: "6.8K" },
  { label: "3D", icon: Box, color: "#6B8C6B", count: "1.4K" },
  { label: "Seramik", icon: CupSoda, color: "#C9A043", count: "890" },
  { label: "Ahşap", icon: TreePine, color: "#8B6B4A", count: "540" },
  { label: "Manga", icon: BookOpen, color: "#7B5EA7", count: "2.3K" },
  { label: "Heykel", icon: Sword, color: "#4A7B8A", count: "310" },
  { label: "Kaligrafi", icon: Type, color: "#9B9189", count: "720" },
  { label: "Konsept", icon: Lightbulb, color: "#C4522A", count: "1.9K" },
];

export default function Categories() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-16 overflow-hidden">
      <div className="container-wide mb-8">
        <div className="flex items-center justify-between">
          <div>
            <span className="gold-line" />
            <h2 className="heading-md text-[#EDE8DF]">Sanat Dalları</h2>
          </div>
          <Link href="/kesfet" className="label-sm text-[#5A534C] hover:text-[#C9A043] transition-colors underline-anim">
            Tümünü Gör
          </Link>
        </div>
      </div>

      {/* Horizontal scroll strip */}
      <div className="relative">
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-[#0A0806] to-transparent pointer-events-none" />
        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-[#0A0806] to-transparent pointer-events-none" />

        <div className="flex gap-4 overflow-x-auto scrollbar-none pl-[clamp(1.25rem,5vw,6rem)] pr-[clamp(1.25rem,5vw,6rem)] pb-4">
          {categories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.label}
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  href={`/kesfet/${cat.label.toLowerCase()}`}
                  className="flex flex-col items-center gap-3 p-5 bg-[#141210] border border-[#2C2620] rounded-sm min-w-[110px] group card-hover"
                  style={{ "--hover-color": cat.color } as React.CSSProperties}
                >
                  <div
                    className="w-12 h-12 rounded-sm flex items-center justify-center transition-colors duration-300"
                    style={{ backgroundColor: `${cat.color}18` }}
                  >
                    <Icon
                      size={22}
                      style={{ color: cat.color }}
                      className="group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-[#EDE8DF] group-hover:text-[#C9A043] transition-colors whitespace-nowrap">
                      {cat.label}
                    </p>
                    <p className="text-xs text-[#5A534C] mt-0.5">{cat.count} eser</p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

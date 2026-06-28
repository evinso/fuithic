"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Users, Image as ImageIcon, ArrowRight, Search, Plus } from "lucide-react";
import PageHeader from "@/app/components/ui/PageHeader";
import { ateliers } from "@/lib/mockData";
import { cn } from "@/lib/utils";

const ICONS: Record<string, string> = {
  karakalem: "✏️", suluboya: "💧", dijital: "🖥", "3d": "📦",
  yagliboy: "🖼", manga: "📖", seramik: "🏺", ahsap: "🪵",
  kaligrafi: "🖋", konsept: "💡",
};

export default function AtolyelerPage() {
  const [search, setSearch] = useState("");
  const [joined, setJoined] = useState<string[]>(["suluboya", "karakalem"]);

  const filtered = ateliers.filter(a =>
    a.name.toLowerCase().includes(search.toLowerCase()) ||
    a.desc.toLowerCase().includes(search.toLowerCase())
  );

  const toggle = (slug: string) =>
    setJoined(j => j.includes(slug) ? j.filter(x => x !== slug) : [...j, slug]);

  return (
    <>
      <PageHeader
        label="Atölyeler"
        title="Sanat Dalı Topluluklarına Katıl"
        desc="Her sanat dalı için ayrı bir atölye — alt topluluklar, haftanın mini challenge'ı, malzeme önerileri."
      >
        <div className="relative max-w-md">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5A534C]" />
          <input
            type="text"
            placeholder="Atölye ara..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-[#141210] border border-[#2C2620] rounded-sm text-sm text-[#EDE8DF] placeholder:text-[#3A332D] focus:outline-none focus:border-[#C9A043]/50 transition-colors"
          />
        </div>
      </PageHeader>

      <div className="container-wide py-10">
        {/* Joined ateliers */}
        {joined.length > 0 && (
          <div className="mb-10">
            <p className="label-sm text-[#C9A043] mb-4">Üye Olduğun Atölyeler</p>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {ateliers.filter(a => joined.includes(a.slug)).map(a => (
                <Link
                  key={a.id}
                  href={`/atolyeler/${a.slug}`}
                  className="shrink-0 flex items-center gap-3 px-4 py-3 bg-[#141210] border border-[#C9A043]/30 rounded-sm hover:border-[#C9A043]/60 transition-all"
                >
                  <span className="text-xl">{ICONS[a.slug] ?? "🎨"}</span>
                  <div>
                    <p className="text-sm font-medium text-[#EDE8DF]">{a.name}</p>
                    <p className="text-xs text-[#5A534C]">{a.members.toLocaleString()} üye</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* All ateliers grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((atelier, i) => {
            const isJoined = joined.includes(atelier.slug);
            return (
              <motion.div
                key={atelier.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              >
                <div
                  className="group p-5 bg-[#141210] border rounded-sm card-hover flex flex-col h-full transition-all duration-300"
                  style={{ borderColor: isJoined ? `${atelier.color}30` : "#2C2620" }}
                >
                  {/* Icon & color accent */}
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className="w-12 h-12 rounded-sm flex items-center justify-center text-2xl"
                      style={{ backgroundColor: `${atelier.color}18` }}
                    >
                      {ICONS[atelier.slug] ?? "🎨"}
                    </div>
                    <button
                      onClick={() => toggle(atelier.slug)}
                      className={cn(
                        "flex items-center gap-1.5 px-3 py-1.5 rounded-sm border text-xs font-medium transition-all",
                        isJoined
                          ? "border-[#2C2620] text-[#5A534C] hover:border-red-900/50 hover:text-red-400"
                          : "border-current hover:opacity-80"
                      )}
                      style={!isJoined ? { borderColor: `${atelier.color}50`, color: atelier.color } : undefined}
                    >
                      {isJoined ? "Ayrıl" : <><Plus size={11} />Katıl</>}
                    </button>
                  </div>

                  <Link href={`/atolyeler/${atelier.slug}`} className="flex-1">
                    <h3
                      className="font-semibold text-[#EDE8DF] mb-2 group-hover:text-[#C9A043] transition-colors"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      {atelier.name}
                    </h3>
                    <p className="text-sm text-[#5A534C] leading-relaxed mb-4">{atelier.desc}</p>
                  </Link>

                  <div className="flex items-center justify-between text-xs text-[#5A534C] border-t border-[#1E1A17] pt-3 mt-auto">
                    <span className="flex items-center gap-1.5">
                      <Users size={11} />
                      {atelier.members.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <ImageIcon size={11} />
                      {atelier.works.toLocaleString()} eser
                    </span>
                    <Link
                      href={`/atolyeler/${atelier.slug}`}
                      className="flex items-center gap-1 hover:text-[#C9A043] transition-colors"
                    >
                      Gir <ArrowRight size={10} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </>
  );
}

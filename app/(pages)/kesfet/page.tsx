"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, X, ArrowUpDown } from "lucide-react";
import PageHeader from "@/app/components/ui/PageHeader";
import ArtworkCard from "@/app/components/ui/ArtworkCard";
import { artworks } from "@/lib/mockData";
import { cn } from "@/lib/utils";

const categories = ["Tümü", "Karakalem", "Suluboya", "Dijital", "3D", "Seramik", "Ahşap", "Manga", "Kaligrafi", "Konsept", "Yağlıboya"];
const sortOptions = ["En Yeni", "En Çok Tepki", "En Çok Koleksiyon", "Rastgele"];
const sections = ["Tümü", "Editör Seçimi", "Hızla Yükselenler", "Yeni Gelenler", "Challenge Eserleri", "Bu Hafta Trend"];

export default function KesfetPage() {
  const [activeCategory, setActiveCategory] = useState("Tümü");
  const [activeSection, setActiveSection] = useState("Tümü");
  const [activeSort, setActiveSort] = useState("En Çok Tepki");
  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [forSaleOnly, setForSaleOnly] = useState(false);
  const [wipOnly, setWipOnly] = useState(false);

  const filtered = artworks.filter((a) => {
    if (activeCategory !== "Tümü" && a.category !== activeCategory) return false;
    if (forSaleOnly && !a.forSale) return false;
    if (wipOnly && !a.isWIP) return false;
    if (search && !a.title.toLowerCase().includes(search.toLowerCase()) && !a.artistHandle.includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <>
      <PageHeader
        label="Keşfet"
        title="Türkiye'nin En Yaratıcı Topluluğu"
        desc="Her sanat dalından, her seviyeden eserler. Algoritma değil, anlam skoru."
      >
        {/* Search bar */}
        <div className="flex gap-3 max-w-2xl">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5A534C]" />
            <input
              type="text"
              placeholder="Eser adı veya sanatçı ara..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[#141210] border border-[#2C2620] rounded-sm text-sm text-[#EDE8DF] placeholder:text-[#3A332D] focus:outline-none focus:border-[#C9A043]/50 transition-colors"
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5A534C] hover:text-[#9B9189]">
                <X size={14} />
              </button>
            )}
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={cn("btn-outline gap-2 py-2.5", showFilters && "border-[#C9A043] text-[#C9A043]")}
          >
            <SlidersHorizontal size={15} />
            Filtreler
          </button>
        </div>
      </PageHeader>

      <div className="container-wide py-8">
        {/* Section tabs */}
        <div className="flex gap-2 overflow-x-auto scrollbar-none mb-6 pb-2">
          {sections.map((s) => (
            <button
              key={s}
              onClick={() => setActiveSection(s)}
              className={cn(
                "shrink-0 px-4 py-2 rounded-sm text-sm font-medium transition-all",
                activeSection === s
                  ? "bg-[#C4522A] text-white"
                  : "bg-[#141210] border border-[#2C2620] text-[#9B9189] hover:border-[#5A534C]"
              )}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="flex gap-6">
          {/* Sidebar filters */}
          {showFilters && (
            <motion.aside
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              className="w-56 shrink-0 space-y-6"
            >
              <div>
                <p className="label-sm text-[#5A534C] mb-3">Sıralama</p>
                <div className="space-y-1">
                  {sortOptions.map((o) => (
                    <button
                      key={o}
                      onClick={() => setActiveSort(o)}
                      className={cn(
                        "w-full text-left px-3 py-2 rounded-sm text-sm transition-colors",
                        activeSort === o
                          ? "bg-[#1E1A17] text-[#C9A043] border border-[#C9A043]/30"
                          : "text-[#9B9189] hover:bg-[#141210]"
                      )}
                    >
                      {o}
                    </button>
                  ))}
                </div>
              </div>

              <div className="brush-divider" />

              <div>
                <p className="label-sm text-[#5A534C] mb-3">Filtreler</p>
                <label className="flex items-center gap-2 cursor-pointer group mb-2">
                  <div
                    onClick={() => setForSaleOnly(!forSaleOnly)}
                    className={cn(
                      "w-4 h-4 border rounded-sm flex items-center justify-center transition-all",
                      forSaleOnly ? "bg-[#C4522A] border-[#C4522A]" : "border-[#2C2620] group-hover:border-[#5A534C]"
                    )}
                  >
                    {forSaleOnly && <span className="text-white text-[10px]">✓</span>}
                  </div>
                  <span className="text-sm text-[#9B9189]">Satışta Olanlar</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <div
                    onClick={() => setWipOnly(!wipOnly)}
                    className={cn(
                      "w-4 h-4 border rounded-sm flex items-center justify-center transition-all",
                      wipOnly ? "bg-[#C4522A] border-[#C4522A]" : "border-[#2C2620] group-hover:border-[#5A534C]"
                    )}
                  >
                    {wipOnly && <span className="text-white text-[10px]">✓</span>}
                  </div>
                  <span className="text-sm text-[#9B9189]">WIP Seriler</span>
                </label>
              </div>
            </motion.aside>
          )}

          <div className="flex-1 min-w-0">
            {/* Category pills */}
            <div className="flex gap-2 overflow-x-auto scrollbar-none mb-6 pb-2">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setActiveCategory(c)}
                  className={cn(
                    "shrink-0 px-3 py-1.5 rounded-sm text-xs font-medium transition-all",
                    activeCategory === c
                      ? "bg-[#1E1A17] border border-[#C9A043]/50 text-[#C9A043]"
                      : "border border-[#2C2620] text-[#5A534C] hover:border-[#5A534C] hover:text-[#9B9189]"
                  )}
                >
                  {c}
                </button>
              ))}
            </div>

            {/* Results count */}
            <div className="flex items-center justify-between mb-5">
              <p className="text-sm text-[#5A534C]">
                <span className="text-[#9B9189] font-medium">{filtered.length}</span> eser bulundu
              </p>
              <div className="flex items-center gap-2 text-xs text-[#5A534C]">
                <ArrowUpDown size={12} />
                <span>{activeSort}</span>
              </div>
            </div>

            {/* Grid */}
            {filtered.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 auto-rows-[200px]">
                {filtered.map((art, i) => (
                  <ArtworkCard
                    key={art.id}
                    artwork={art}
                    index={i}
                    size={art.isFeatured ? "tall" : "normal"}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-24 text-[#5A534C]">
                <Search size={40} className="mb-4 opacity-30" />
                <p className="text-lg mb-1">Eser bulunamadı</p>
                <p className="text-sm">Farklı bir arama veya filtre deneyin</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

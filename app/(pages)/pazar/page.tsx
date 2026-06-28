"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ShoppingBag, Search, SlidersHorizontal, Shield, Truck, RefreshCw } from "lucide-react";
import PageHeader from "@/app/components/ui/PageHeader";
import { artworks } from "@/lib/mockData";
import { cn } from "@/lib/utils";

const SORT_OPTIONS = ["Öne Çıkanlar", "En Yeni", "En Düşük Fiyat", "En Yüksek Fiyat"];
const PRICE_RANGES = [["Tümü", 0, 99999], ["0–500₺", 0, 500], ["500–2000₺", 500, 2000], ["2000₺+", 2000, 99999]];

const saleArtworks = artworks.filter(a => a.forSale);
const fakePrices: Record<string, number> = {};
saleArtworks.forEach((a, i) => { fakePrices[a.id] = [350, 1200, 850, 2500, 600, 4000, 750, 1800][i % 8]; });

export default function PazarPage() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("Öne Çıkanlar");
  const [priceRange, setPriceRange] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [cart, setCart] = useState<(number | string)[]>([]);

  const filtered = saleArtworks.filter(a => {
    const [, min, max] = PRICE_RANGES[priceRange];
    const price = fakePrices[a.id as number];
    return price >= (min as number) && price <= (max as number) &&
      a.title.toLowerCase().includes(search.toLowerCase());
  });

  const addToCart = (id: number | string) => setCart(c => c.includes(id) ? c.filter(x => x !== id) : [...c, id]);

  return (
    <>
      <PageHeader
        label="Pazar"
        title="Özgün Eserler, Baskılar"
        desc="Sanatçıları doğrudan destekle. Orijinal eserler ve sertifikalı baskılar."
      >
        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5A534C]" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Eser veya sanatçı ara..."
              className="w-full pl-9 pr-4 py-2.5 bg-[#141210] border border-[#2C2620] rounded-sm text-sm text-[#EDE8DF] placeholder:text-[#3A332D] focus:outline-none focus:border-[#C9A043]/50 transition-colors" />
          </div>
          {cart.length > 0 && (
            <div className="relative">
              <ShoppingBag size={20} className="text-[#C9A043]" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#C4522A] rounded-full text-[9px] text-white flex items-center justify-center">{cart.length}</span>
            </div>
          )}
        </div>
      </PageHeader>

      <div className="container-wide py-10">
        {/* Trust badges */}
        <div className="grid sm:grid-cols-3 gap-3 mb-10">
          {[
            [Shield, "Güvenli Ödeme", "SSL + iyzico korumalı"],
            [Truck, "Hızlı Kargo", "3–5 iş günü teslimat"],
            [RefreshCw, "14 Gün İade", "Sorunsuz iade garantisi"],
          ].map(([Icon, l, d], i) => {
            const Ic = Icon as React.ElementType;
            return (
              <div key={i} className="flex items-center gap-3 p-4 bg-[#141210] border border-[#2C2620] rounded-sm">
                <div className="w-9 h-9 rounded-sm bg-[#6B8C6B]/15 flex items-center justify-center">
                  <Ic size={16} className="text-[#6B8C6B]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[#EDE8DF]">{l as string}</p>
                  <p className="text-xs text-[#5A534C]">{d as string}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Filters bar */}
        <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={cn("flex items-center gap-2 px-4 py-2 border rounded-sm text-sm transition-all", showFilters ? "border-[#C9A043]/50 text-[#C9A043]" : "border-[#2C2620] text-[#9B9189] hover:border-[#5A534C]")}
            >
              <SlidersHorizontal size={13} /> Filtrele
            </button>
            {PRICE_RANGES.map(([l,,,], i) => (
              <button key={i} onClick={() => setPriceRange(i)}
                className={cn("px-3 py-2 border rounded-sm text-xs transition-all", priceRange === i ? "border-[#C4522A]/50 text-[#C4522A] bg-[#C4522A]/08" : "border-[#2C2620] text-[#9B9189] hover:border-[#5A534C]")}>
                {l as string}
              </button>
            ))}
          </div>
          <select value={sort} onChange={e => setSort(e.target.value)}
            className="px-3 py-2 bg-[#141210] border border-[#2C2620] rounded-sm text-xs text-[#9B9189] focus:outline-none focus:border-[#C9A043]/50">
            {SORT_OPTIONS.map(o => <option key={o}>{o}</option>)}
          </select>
        </div>

        <p className="text-xs text-[#5A534C] mb-6">{filtered.length} eser bulundu</p>

        {/* Product grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((artwork, i) => {
            const price = fakePrices[artwork.id as number];
            const inCart = cart.includes(artwork.id);
            return (
              <motion.div
                key={artwork.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
              >
                <div className="group bg-[#141210] border border-[#2C2620] rounded-sm overflow-hidden card-hover">
                  <Link href={`/eser/${artwork.slug}`}>
                    <div
                      className="h-52 relative"
                      style={{ background: `linear-gradient(135deg, ${artwork.colorA}30, ${artwork.colorB}30)` }}
                    >
                      <div className="absolute inset-0 flex items-center justify-center opacity-20">
                        <svg viewBox="0 0 200 200" className="w-full h-full">
                          <rect width="200" height="200" fill={artwork.colorA} opacity={0.4} />
                          <ellipse cx="100" cy="100" rx="60" ry="80" fill={artwork.colorB} opacity={0.5} />
                          <circle cx="140" cy="60" r="30" fill={artwork.accent} opacity={0.6} />
                        </svg>
                      </div>
                      {artwork.isFeatured && (
                        <span className="absolute top-2 left-2 badge text-[#C9A043] border-[#C9A043]/40">Editör Seçimi</span>
                      )}
                    </div>
                  </Link>
                  <div className="p-4">
                    <Link href={`/eser/${artwork.slug}`}>
                      <p className="font-semibold text-[#EDE8DF] mb-1 group-hover:text-[#C9A043] transition-colors text-sm" style={{ fontFamily: "var(--font-playfair)" }}>
                        {artwork.title}
                      </p>
                    </Link>
                    <p className="text-xs text-[#5A534C] mb-3">{artwork.artist} · {artwork.category}</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-lg font-bold text-[#C9A043]">{price.toLocaleString("tr")}₺</p>
                        <p className="text-[10px] text-[#3A332D]">+ kargo</p>
                      </div>
                      <button
                        onClick={() => addToCart(artwork.id)}
                        className={cn(
                          "flex items-center gap-1.5 px-3 py-2 rounded-sm border text-xs font-medium transition-all",
                          inCart ? "border-[#6B8C6B]/50 text-[#6B8C6B] bg-[#6B8C6B]/08" : "border-[#C4522A]/40 text-[#C4522A] hover:bg-[#C4522A]/08"
                        )}
                      >
                        <ShoppingBag size={11} />
                        {inCart ? "Sepette" : "Sepete Ekle"}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <ShoppingBag size={40} className="text-[#2C2620] mx-auto mb-4" />
            <p className="text-[#5A534C]">Bu kriterlere uygun eser bulunamadı.</p>
          </div>
        )}
      </div>
    </>
  );
}

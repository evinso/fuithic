"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Sparkles, Heart, Smile, HandHeart, BookMarked,
  MessageCircle, Share2, ShoppingBag, ArrowLeft,
  ChevronRight, Star, Flag, Send, Check
} from "lucide-react";
import { artworks } from "@/lib/mockData";
import { cn } from "@/lib/utils";
import ArtworkCard from "@/app/components/ui/ArtworkCard";

const reactions = [
  { emoji: "✨", label: "İlham Verdi", count: 847, color: "#C9A043" },
  { emoji: "🎨", label: "Çok Yaratıcı", count: 412, color: "#C4522A" },
  { emoji: "💙", label: "Duygusal Etki Yarattı", count: 289, color: "#2B4F7A" },
  { emoji: "🙌", label: "Emeğe Saygı", count: 193, color: "#6B8C6B" },
  { emoji: "🖼", label: "Koleksiyonuma Ekledim", count: 124, color: "#C9A043" },
];

const commentTags = ["Hikayesi", "Renkleri", "Fikri", "Duygusu", "Cesareti", "Mizahı", "Detayları", "Farklı Oluşu"];

const comments = [
  { id: 1, user: "mehmet_cizer", name: "Mehmet Yılmaz", tag: "Hikayesi", text: "İstanbul'un kaybolmakta olan bu dokusunu bu kadar sahici aktaran başka bir eser görmedim. Boğaziçi yalılarının o ışığı tam yakalanmış.", isMentor: true, likes: 34, time: "2 saat önce" },
  { id: 2, user: "zeynep_art", name: "Zeynep Aydın", tag: "Renkleri", text: "Prussian blue ile sienna'nın bu geçişi nefes kesici. Renk tercihleri çok bilinçli.", isMentor: false, likes: 18, time: "4 saat önce" },
  { id: 3, slug: "can_3d", user: "can_3d", name: "Can Yılmaz", tag: "Cesareti", text: "WIP serisini de takip ettim. İlk taslaktan finali görmek bu eserin değerini katladı. Süreç paylaşımı için teşekkürler.", isMentor: false, likes: 12, time: "6 saat önce" },
];

const wipSteps = [
  { step: 1, label: "İlk Taslak", desc: "Kompozisyon kararı ve siluetler" },
  { step: 2, label: "Zemin", desc: "Gökyüzü ve su geçişleri" },
  { step: 3, label: "Ara Aşama", desc: "Bina detayları ve gölgeler" },
  { step: 4, label: "Final", desc: "Son rötuşlar, imza" },
];

export default function EserDetay({ params }: { params: { slug: string } }) {
  const artwork = artworks.find(a => a.slug === params.slug) ?? artworks[0];
  const related = artworks.filter(a => a.id !== artwork.id && a.category === artwork.category).slice(0, 4);
  const [activeReaction, setActiveReaction] = useState<string | null>(null);
  const [commentTag, setCommentTag] = useState<string | null>(null);
  const [commentText, setCommentText] = useState("");
  const [activeTab, setActiveTab] = useState<"yorumlar" | "wip">("yorumlar");
  const [inCollection, setInCollection] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="container-wide py-4 border-b border-[#2C2620]">
        <div className="flex items-center gap-2 text-xs text-[#5A534C]">
          <Link href="/" className="hover:text-[#9B9189] transition-colors">Ana Sayfa</Link>
          <ChevronRight size={12} />
          <Link href="/kesfet" className="hover:text-[#9B9189] transition-colors">Keşfet</Link>
          <ChevronRight size={12} />
          <span className="text-[#9B9189]">{artwork.title}</span>
        </div>
      </div>

      <div className="container-wide py-8 lg:py-12">
        <div className="grid lg:grid-cols-[1fr_400px] gap-10 lg:gap-16">
          {/* Left: Artwork */}
          <div>
            {/* Main artwork */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative aspect-[4/5] max-h-[700px] bg-[#141210] border border-[#2C2620] rounded-sm overflow-hidden mb-6"
            >
              <div
                className="absolute inset-0"
                style={{
                  background: `radial-gradient(ellipse at 40% 40%, ${artwork.colorA} 0%, ${artwork.colorB} 100%)`,
                }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background: `radial-gradient(ellipse 70% 60% at 50% 40%, ${artwork.accent} 0%, transparent 70%)`,
                }}
              />
              {/* Featured badge */}
              {artwork.isFeatured && (
                <div className="absolute top-4 left-4">
                  <span className="badge border-[#C9A043]/50 text-[#C9A043]">⭐ Editör Seçimi</span>
                </div>
              )}
              {/* Action buttons top right */}
              <div className="absolute top-4 right-4 flex gap-2">
                <button className="w-9 h-9 bg-[#0A0806]/80 backdrop-blur-sm border border-[#2C2620] rounded-sm flex items-center justify-center text-[#9B9189] hover:text-[#C9A043] transition-colors">
                  <Share2 size={15} />
                </button>
                <button className="w-9 h-9 bg-[#0A0806]/80 backdrop-blur-sm border border-[#2C2620] rounded-sm flex items-center justify-center text-[#9B9189] hover:text-red-400 transition-colors">
                  <Flag size={15} />
                </button>
              </div>
            </motion.div>

            {/* WIP steps (if applicable) */}
            {artwork.isWIP && (
              <div className="mb-6 p-5 bg-[#141210] border border-[#2C2620] rounded-sm">
                <p className="label-sm text-[#C4522A] mb-4">WIP Serisi — Yapım Süreci</p>
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {wipSteps.map((step, i) => (
                    <div
                      key={step.step}
                      className={cn(
                        "shrink-0 w-28 aspect-square rounded-sm border flex flex-col justify-end p-2",
                        i === wipSteps.length - 1
                          ? "border-[#C9A043]/50 bg-[#1A1208]"
                          : "border-[#2C2620] bg-[#0D0B09]"
                      )}
                      style={{
                        background: `linear-gradient(135deg, ${artwork.colorB} 0%, ${artwork.colorA}80 100%)`,
                      }}
                    >
                      <p className="text-[10px] font-semibold text-[#EDE8DF]">{step.label}</p>
                      <p className="text-[9px] text-[#5A534C]">{step.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Related artworks */}
            {related.length > 0 && (
              <div>
                <p className="label-sm text-[#5A534C] mb-4">Aynı Kategoriden</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 auto-rows-[140px]">
                  {related.map((a, i) => (
                    <ArtworkCard key={a.id} artwork={a} index={i} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: Info panel */}
          <div className="space-y-6">
            {/* Title & artist */}
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span className="badge mb-3">{artwork.category}</span>
              <h1
                className="heading-md text-[#EDE8DF] mb-3"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {artwork.title}
              </h1>

              {/* Artist */}
              <Link
                href={`/profil/${artwork.artistHandle}`}
                className="flex items-center gap-3 group"
              >
                <div className="w-10 h-10 rounded-full bg-[#1E1A17] border border-[#2C2620] flex items-center justify-center font-bold text-[#C9A043] font-display group-hover:border-[#C9A043]/50 transition-colors">
                  {artwork.artist[0]}
                </div>
                <div>
                  <p className="text-sm font-medium text-[#EDE8DF] group-hover:text-[#C9A043] transition-colors">
                    {artwork.artist}
                  </p>
                  <p className="text-xs text-[#5A534C]">@{artwork.artistHandle} · Platforma 14 aydır üretiyor</p>
                </div>
                <ChevronRight size={14} className="text-[#3A332D] group-hover:text-[#C9A043] ml-auto transition-colors" />
              </Link>
            </motion.div>

            <div className="brush-divider" />

            {/* Reactions */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <p className="label-sm text-[#5A534C] mb-4">Tepkini Ver</p>
              <div className="space-y-2">
                {reactions.map((r) => (
                  <button
                    key={r.label}
                    onClick={() => setActiveReaction(activeReaction === r.label ? null : r.label)}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-3 rounded-sm border transition-all text-left",
                      activeReaction === r.label
                        ? "border-current bg-opacity-10"
                        : "border-[#2C2620] hover:border-[#5A534C] bg-[#141210]"
                    )}
                    style={{
                      borderColor: activeReaction === r.label ? r.color : undefined,
                      backgroundColor: activeReaction === r.label ? `${r.color}12` : undefined,
                    }}
                  >
                    <span className="text-lg">{r.emoji}</span>
                    <span
                      className={cn(
                        "text-sm flex-1 transition-colors",
                        activeReaction === r.label ? "font-medium" : "text-[#9B9189]"
                      )}
                      style={{ color: activeReaction === r.label ? r.color : undefined }}
                    >
                      {r.label}
                    </span>
                    <span
                      className="text-xs font-medium tabular-nums"
                      style={{ color: r.color }}
                    >
                      {activeReaction === r.label ? r.count + 1 : r.count}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>

            <div className="brush-divider" />

            {/* Collection & Buy actions */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col gap-3"
            >
              {artwork.forSale && (
                <div className="flex items-center justify-between p-4 bg-[#141210] border border-[#2C2620] rounded-sm">
                  <div>
                    <p className="label-sm text-[#5A534C] mb-0.5">Satış Fiyatı</p>
                    <p className="text-2xl font-bold text-[#C9A043] font-display" style={{ fontFamily: "var(--font-playfair)" }}>
                      {artwork.price}
                    </p>
                  </div>
                  <button className="btn-primary gap-2 py-3">
                    <ShoppingBag size={15} />
                    Satın Al
                  </button>
                </div>
              )}

              <button
                onClick={() => setInCollection(!inCollection)}
                className={cn(
                  "w-full flex items-center justify-center gap-2 py-3 rounded-sm border transition-all text-sm font-medium",
                  inCollection
                    ? "border-[#C9A043]/50 text-[#C9A043] bg-[#C9A043]/08"
                    : "border-[#2C2620] text-[#9B9189] hover:border-[#5A534C]"
                )}
              >
                {inCollection ? <Check size={15} /> : <BookMarked size={15} />}
                {inCollection ? "Koleksiyonumda" : "Koleksiyona Ekle"}
              </button>
            </motion.div>

            <div className="brush-divider" />

            {/* Tabs: Yorumlar / WIP */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex gap-1 mb-5">
                {(["yorumlar", "wip"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={cn(
                      "px-4 py-2 rounded-sm text-sm transition-colors capitalize",
                      activeTab === tab
                        ? "bg-[#1E1A17] text-[#EDE8DF] border border-[#2C2620]"
                        : "text-[#5A534C] hover:text-[#9B9189]"
                    )}
                  >
                    {tab === "yorumlar" ? `Yorumlar (${comments.length})` : "Yapım Süreci"}
                  </button>
                ))}
              </div>

              {activeTab === "yorumlar" && (
                <div className="space-y-4">
                  {/* Comment input */}
                  <div className="p-4 bg-[#141210] border border-[#2C2620] rounded-sm">
                    <p className="text-xs text-[#5A534C] mb-3">En çok neyi beğendin?</p>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {commentTags.map((tag) => (
                        <button
                          key={tag}
                          onClick={() => setCommentTag(commentTag === tag ? null : tag)}
                          className={cn(
                            "text-xs px-2.5 py-1 rounded-sm border transition-all",
                            commentTag === tag
                              ? "border-[#C9A043]/50 text-[#C9A043] bg-[#C9A043]/08"
                              : "border-[#2C2620] text-[#5A534C] hover:border-[#5A534C]"
                          )}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        placeholder="Yapıcı bir yorum yaz..."
                        className="flex-1 bg-[#0A0806] border border-[#2C2620] rounded-sm px-3 py-2 text-sm text-[#EDE8DF] placeholder:text-[#3A332D] focus:outline-none focus:border-[#C9A043]/50 transition-colors"
                      />
                      <button className="btn-primary py-2 px-3">
                        <Send size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Comments list */}
                  {comments.map((c) => (
                    <div key={c.id} className="p-4 bg-[#141210] border border-[#2C2620] rounded-sm">
                      <div className="flex items-start gap-3 mb-2">
                        <div className="w-8 h-8 rounded-full bg-[#1E1A17] border border-[#2C2620] flex items-center justify-center text-xs font-bold text-[#9B9189] shrink-0">
                          {c.name[0]}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-sm font-medium text-[#EDE8DF]">{c.name}</span>
                            {c.isMentor && (
                              <span className="badge border-[#C9A043]/50 text-[#C9A043]">Mentor</span>
                            )}
                            <span className="badge">{c.tag}</span>
                            <span className="text-xs text-[#3A332D] ml-auto">{c.time}</span>
                          </div>
                          <p className="text-sm text-[#9B9189] mt-1.5 leading-relaxed">{c.text}</p>
                          <div className="flex items-center gap-3 mt-2">
                            <button className="flex items-center gap-1 text-xs text-[#5A534C] hover:text-[#C9A043] transition-colors">
                              <Heart size={11} />
                              <span>{c.likes}</span>
                            </button>
                            <button className="text-xs text-[#5A534C] hover:text-[#9B9189] transition-colors">
                              Yanıtla
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "wip" && (
                <div className="space-y-3">
                  {wipSteps.map((step, i) => (
                    <div key={step.step} className="flex gap-4 p-4 bg-[#141210] border border-[#2C2620] rounded-sm">
                      <div
                        className="w-16 h-16 shrink-0 rounded-sm"
                        style={{ background: `linear-gradient(135deg, ${artwork.colorB} 0%, ${artwork.colorA}80 100%)` }}
                      />
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="label-sm text-[#C9A043]">Adım {step.step}</span>
                          {i === wipSteps.length - 1 && <span className="badge border-[#6B8C6B]/50 text-[#6B8C6B]">Final</span>}
                        </div>
                        <p className="text-sm font-medium text-[#EDE8DF] mb-0.5">{step.label}</p>
                        <p className="text-xs text-[#5A534C]">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

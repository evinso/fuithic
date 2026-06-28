"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Grid, BookOpen, BarChart2, ImagePlay,
  Star, Award, Flame, ShoppingBag, Trophy,
  Users, MessageCircle, Share2, UserPlus, Check
} from "lucide-react";
import ArtworkCard from "@/app/components/ui/ArtworkCard";
import { artworks, blogPosts } from "@/lib/mockData";
import { cn } from "@/lib/utils";

const badges = [
  { id: 1, emoji: "🖼", name: "İlk Eser", desc: "Platforma ilk eserini yükledin", earned: true },
  { id: 2, emoji: "🔄", name: "Sürecci", desc: "5 eser için WIP paylaştın", earned: true },
  { id: 3, emoji: "✨", name: "İlham Kaynağı", desc: "100 kişiye İlham Verdi tepkisi kazandın", earned: true },
  { id: 4, emoji: "💬", name: "Topluluk Destekçisi", desc: "10 farklı kişiye yorum yaptın", earned: true },
  { id: 5, emoji: "🎓", name: "Mentor", desc: "5 farklı sanatçıya mentörlük ettin", earned: false },
  { id: 6, emoji: "🏆", name: "Ustala", desc: "50 eser ürettin", earned: false },
  { id: 7, emoji: "⚡", name: "Challenge Ustası", desc: "3 farklı challenge'a katıldın", earned: true },
  { id: 8, emoji: "🔥", name: "Popüler Sanatçı", desc: "Bir eserin 500 tepki aldı", earned: false },
  { id: 9, emoji: "💰", name: "İlk Satış", desc: "Platforma ilk eserini sattın", earned: false },
  { id: 10, emoji: "❤️", name: "Koleksiyoner Favorisi", desc: "Bir eserin 10 kişinin koleksiyonuna girdi", earned: false },
  { id: 11, emoji: "📅", name: "Devamlılık Seridi", desc: "30 gün üst üste üretim paylaşımı yaptın", earned: true },
  { id: 12, emoji: "⭐", name: "Editör Seçimi", desc: "Editörler tarafından seçildi", earned: true },
];

const metrics = [
  { label: "Üretilen Eser", value: "47", icon: Grid, color: "#C9A043" },
  { label: "İlham Verilen Kişi", value: "1.2K", icon: Star, color: "#C4522A" },
  { label: "Süreç Paylaşım Oranı", value: "%89", icon: ImagePlay, color: "#2B4F7A" },
  { label: "Yardım Edilen Sanatçı", value: "23", icon: Users, color: "#6B8C6B" },
];

const monthlyData = [12, 8, 15, 22, 18, 31, 27, 19, 35, 42, 38, 47];
const months = ["Oca", "Şub", "Mar", "Nis", "May", "Haz", "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara"];

export default function ProfilPage({ params }: { params: { username: string } }) {
  const [activeTab, setActiveTab] = useState<"eserler" | "surec" | "blog" | "istatistik">("eserler");
  const [following, setFollowing] = useState(false);

  const userArtworks = artworks.slice(0, 8);
  const userBlog = blogPosts.slice(0, 4);
  const maxVal = Math.max(...monthlyData);

  return (
    <div className="min-h-screen">
      {/* Cover */}
      <div
        className="h-48 lg:h-64 relative"
        style={{
          background: "radial-gradient(ellipse 80% 100% at 30% 50%, #1A3A5C 0%, #0A1E35 50%, #0A0806 100%)",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0A0806]/60" />
        {/* SVG art decoration */}
        <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 1200 300" preserveAspectRatio="xMidYMid slice">
          <ellipse cx="900" cy="150" rx="300" ry="200" fill="rgba(201,160,67,0.2)" />
          <ellipse cx="200" cy="100" rx="200" ry="150" fill="rgba(43,79,122,0.3)" />
        </svg>
      </div>

      <div className="container-wide">
        {/* Profile header */}
        <div className="-mt-16 lg:-mt-20 mb-8 relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-6 mb-6">
            {/* Avatar */}
            <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-full border-4 border-[#0A0806] bg-[#1E1A17] flex items-center justify-center shrink-0">
              <span
                className="text-4xl lg:text-5xl font-bold text-[#C9A043]"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {params.username?.[0]?.toUpperCase() ?? "E"}
              </span>
            </div>

            {/* Name & actions */}
            <div className="flex-1 pb-1">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-[#EDE8DF]" style={{ fontFamily: "var(--font-playfair)" }}>
                    Elif Çizer
                  </h1>
                  <p className="text-[#5A534C] text-sm">@{params.username} · İstanbul · Platformda 14 aydır üretiyor</p>
                </div>
                <div className="flex gap-2 sm:ml-auto">
                  <button
                    onClick={() => setFollowing(!following)}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-sm border text-sm font-medium transition-all",
                      following
                        ? "border-[#2C2620] text-[#9B9189] bg-[#141210]"
                        : "border-[#C4522A] text-[#C4522A] bg-[#C4522A]/08 hover:bg-[#C4522A]/15"
                    )}
                  >
                    {following ? <Check size={14} /> : <UserPlus size={14} />}
                    {following ? "Takip Ediliyor" : "Takip Et"}
                  </button>
                  <button className="w-9 h-9 border border-[#2C2620] rounded-sm flex items-center justify-center text-[#5A534C] hover:text-[#9B9189] hover:border-[#5A534C] transition-all">
                    <MessageCircle size={15} />
                  </button>
                  <button className="w-9 h-9 border border-[#2C2620] rounded-sm flex items-center justify-center text-[#5A534C] hover:text-[#9B9189] hover:border-[#5A534C] transition-all">
                    <Share2 size={15} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bio & tags */}
          <div className="mb-6">
            <p className="text-[#9B9189] mb-3 max-w-2xl">
              İstanbul'u suluboya ve karakalemle belgeliyorum. Kaybolmakta olan şeyleri görünür kılmak istiyorum.
            </p>
            <div className="flex flex-wrap gap-2">
              {["Suluboya", "Karakalem", "Konsept"].map((t) => (
                <span key={t} className="badge hover:border-[#C9A043]/50 hover:text-[#C9A043] transition-all cursor-default">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
            {metrics.map((m, i) => {
              const Icon = m.icon;
              return (
                <motion.div
                  key={m.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="p-4 bg-[#141210] border border-[#2C2620] rounded-sm"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Icon size={14} style={{ color: m.color }} />
                    <span className="text-xs text-[#5A534C]">{m.label}</span>
                  </div>
                  <p
                    className="text-2xl font-bold"
                    style={{ color: m.color, fontFamily: "var(--font-playfair)" }}
                  >
                    {m.value}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Badges */}
          <div className="mb-8">
            <p className="label-sm text-[#5A534C] mb-3">Rozetler</p>
            <div className="flex flex-wrap gap-2">
              {badges.map((b) => (
                <div
                  key={b.id}
                  title={`${b.name}: ${b.desc}`}
                  className={cn(
                    "w-10 h-10 rounded-sm border flex items-center justify-center text-lg cursor-help transition-all",
                    b.earned
                      ? "border-[#C9A043]/30 bg-[#C9A043]/08 hover:scale-110"
                      : "border-[#2C2620] bg-[#141210] opacity-30 grayscale"
                  )}
                >
                  {b.emoji}
                </div>
              ))}
            </div>
            <p className="text-xs text-[#3A332D] mt-2">
              {badges.filter(b => b.earned).length}/{badges.length} rozet kazanıldı
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-[#2C2620] mb-8">
          <div className="flex gap-1">
            {([
              { id: "eserler", label: "Eserler", icon: Grid },
              { id: "surec", label: "Süreç Galerisi", icon: ImagePlay },
              { id: "blog", label: "Blog Yazıları", icon: BookOpen },
              { id: "istatistik", label: "İstatistikler", icon: BarChart2 },
            ] as const).map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-all -mb-px",
                    activeTab === tab.id
                      ? "border-[#C9A043] text-[#C9A043]"
                      : "border-transparent text-[#5A534C] hover:text-[#9B9189]"
                  )}
                >
                  <Icon size={14} />
                  <span className="hidden sm:block">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "eserler" && (
          <div className="pb-16">
            <div className="flex items-center justify-between mb-5">
              <p className="text-sm text-[#5A534C]"><span className="text-[#9B9189]">47</span> eser</p>
              <div className="flex gap-2">
                {["Yeni", "Eski", "En Çok Tepki"].map((s) => (
                  <button key={s} className="text-xs px-3 py-1.5 border border-[#2C2620] rounded-sm text-[#5A534C] hover:border-[#5A534C] hover:text-[#9B9189] transition-all">
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 auto-rows-[200px]">
              {userArtworks.map((art, i) => (
                <ArtworkCard key={art.id} artwork={art} index={i} size={art.isFeatured ? "tall" : "normal"} />
              ))}
            </div>
          </div>
        )}

        {activeTab === "surec" && (
          <div className="pb-16">
            <p className="text-sm text-[#9B9189] mb-6">
              Eser başına önce/sonra süreç karşılaştırması. Sanatçının gelişimini adım adım takip et.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {userArtworks.filter(a => a.isWIP || a.isFeatured).slice(0, 3).map((art, i) => (
                <motion.div
                  key={art.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-[#141210] border border-[#2C2620] rounded-sm p-4"
                >
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="aspect-square rounded-sm" style={{ background: `linear-gradient(135deg, ${art.colorB} 0%, ${art.colorA}60 100%)` }}>
                      <div className="flex items-center justify-center h-full text-xs text-[#5A534C]">Taslak</div>
                    </div>
                    <div className="aspect-square rounded-sm" style={{ background: `linear-gradient(135deg, ${art.colorA} 0%, ${art.colorB} 100%)` }}>
                      <div className="flex items-center justify-center h-full text-xs text-[#5A534C]">Final</div>
                    </div>
                  </div>
                  <p className="text-sm font-medium text-[#EDE8DF] mb-1" style={{ fontFamily: "var(--font-playfair)" }}>{art.title}</p>
                  <p className="text-xs text-[#5A534C]">4 aşamalı WIP serisi</p>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "blog" && (
          <div className="pb-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {userBlog.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link href={`/blog/${post.slug}`} className="block group">
                  <div
                    className="aspect-video rounded-sm mb-3"
                    style={{ background: `linear-gradient(135deg, ${post.colorA} 0%, ${post.colorB} 100%)` }}
                  />
                  <span className="badge mb-2">{post.type}</span>
                  <h3 className="text-[#EDE8DF] font-medium mb-2 group-hover:text-[#C9A043] transition-colors" style={{ fontFamily: "var(--font-playfair)" }}>
                    {post.title}
                  </h3>
                  <p className="text-xs text-[#5A534C]">{post.date} · {post.readTime} okuma</p>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === "istatistik" && (
          <div className="pb-16 space-y-8">
            {/* Monthly chart */}
            <div className="p-6 bg-[#141210] border border-[#2C2620] rounded-sm">
              <p className="label-sm text-[#5A534C] mb-6">Son 12 Ay — Toplam Eser ve Tepki</p>
              <div className="flex items-end gap-2 h-32">
                {monthlyData.map((v, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${(v / maxVal) * 100}%` }}
                      transition={{ delay: i * 0.05, duration: 0.6, ease: "easeOut" }}
                      className="w-full rounded-sm"
                      style={{ backgroundColor: i === monthlyData.length - 1 ? "#C9A043" : "#2C2620" }}
                    />
                    <span className="text-[9px] text-[#3A332D]">{months[i]}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reaction breakdown */}
            <div className="p-6 bg-[#141210] border border-[#2C2620] rounded-sm">
              <p className="label-sm text-[#5A534C] mb-5">Tepki Dağılımı — Tüm Eserler</p>
              <div className="space-y-3">
                {[
                  { emoji: "✨", label: "İlham Verdi", count: 1847, pct: 42, color: "#C9A043" },
                  { emoji: "🎨", label: "Çok Yaratıcı", count: 892, pct: 23, color: "#C4522A" },
                  { emoji: "💙", label: "Duygusal Etki", count: 634, pct: 17, color: "#2B4F7A" },
                  { emoji: "🙌", label: "Emeğe Saygı", count: 412, pct: 11, color: "#6B8C6B" },
                  { emoji: "🖼", label: "Koleksiyona Ekle", count: 289, pct: 7, color: "#9B9189" },
                ].map((r) => (
                  <div key={r.label} className="flex items-center gap-3">
                    <span className="text-base w-6">{r.emoji}</span>
                    <div className="flex-1 h-2 bg-[#1E1A17] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${r.pct}%` }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: r.color }}
                      />
                    </div>
                    <span className="text-xs text-[#5A534C] w-8 text-right">%{r.pct}</span>
                    <span className="text-xs text-[#3A332D] w-12 text-right">{r.count.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

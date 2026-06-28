"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Zap, Crown, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";

const PLANS = [
  {
    id: "free",
    name: "Ücretsiz",
    icon: Zap,
    price: { monthly: 0, yearly: 0 },
    color: "#9B9189",
    desc: "Platformu keşfetmek için",
    features: [
      "20MB dosya yükleme",
      "Aylık 10 eser",
      "Tüm atölyelere göz atma",
      "5 reaksiyon",
      "Yorum yapma",
    ],
    missing: ["WIP süreç analitiği", "Gelişmiş istatistikler", "Öncelikli Challenge değerlendirmesi", "Premium rozetler", "Eğitim indirimleri"],
  },
  {
    id: "artist",
    name: "Sanatçı",
    icon: Crown,
    price: { monthly: 79, yearly: 59 },
    color: "#C9A043",
    desc: "Aktif üretenler için",
    recommended: true,
    features: [
      "100MB dosya yükleme",
      "Sınırsız eser",
      "WIP süreç analitiği",
      "Gelişmiş istatistikler",
      "Öncelikli Challenge değerlendirmesi",
      "2 premium rozet / ay",
      "%20 eğitim indirimi",
      "Mavi rozet (doğrulanmış)",
      "Portföy PDF dışa aktarımı",
    ],
    missing: [],
  },
  {
    id: "studio",
    name: "Stüdyo",
    icon: Building2,
    price: { monthly: 199, yearly: 149 },
    color: "#C4522A",
    desc: "Kurumlar ve ekipler için",
    features: [
      "500MB dosya yükleme",
      "5 üye hesabı",
      "Özel atölye sayfası",
      "Markalı profil",
      "Analitik dashboard",
      "Fatura & muhasebe entegrasyonu",
      "Öncelikli destek",
      "Tüm Sanatçı özellikleri",
    ],
    missing: [],
  },
];

export default function PremiumPage() {
  const [yearly, setYearly] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="min-h-screen py-16">
      <div className="container-wide max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="gold-line mx-auto" />
          <h1 className="heading-xl text-[#EDE8DF] mb-4">Üretimini Destekle</h1>
          <p className="text-[#9B9189] max-w-lg mx-auto">Fuithic, ücretsiz olarak kullanılabilir. Premium; daha çok üreten, daha fazla kazanmak isteyen sanatçılar için.</p>
          {/* Billing toggle */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <span className={cn("text-sm", !yearly ? "text-[#EDE8DF]" : "text-[#5A534C]")}>Aylık</span>
            <button
              onClick={() => setYearly(!yearly)}
              className={cn("relative w-12 h-6 rounded-full transition-all", yearly ? "bg-[#C9A043]" : "bg-[#2C2620]")}
            >
              <div className={cn("absolute top-1 w-4 h-4 rounded-full bg-white transition-all", yearly ? "right-1" : "left-1")} />
            </button>
            <span className={cn("text-sm", yearly ? "text-[#EDE8DF]" : "text-[#5A534C]")}>
              Yıllık <span className="text-[#6B8C6B] text-xs ml-1">%25 indirim</span>
            </span>
          </div>
        </div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-3 gap-5 mb-16">
          {PLANS.map((plan, i) => {
            const Icon = plan.icon;
            const price = yearly ? plan.price.yearly : plan.price.monthly;
            const isRec = plan.recommended;
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={cn("relative", isRec && "-mt-4")}
              >
                {isRec && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#C9A043] text-[#0A0806] text-xs font-bold rounded-full whitespace-nowrap">
                    En Popüler
                  </div>
                )}
                <div
                  className={cn(
                    "p-6 rounded-sm border h-full flex flex-col transition-all",
                    isRec ? "border-[#C9A043]/40 bg-[#141210]" : "border-[#2C2620] bg-[#141210]",
                    selected === plan.id && "ring-1 ring-[#C9A043]/50"
                  )}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-sm flex items-center justify-center" style={{ backgroundColor: `${plan.color}18` }}>
                      <Icon size={20} style={{ color: plan.color }} />
                    </div>
                    <div>
                      <p className="font-semibold text-[#EDE8DF]" style={{ fontFamily: "var(--font-playfair)" }}>{plan.name}</p>
                      <p className="text-xs text-[#5A534C]">{plan.desc}</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    {price === 0 ? (
                      <p className="text-3xl font-bold text-[#EDE8DF]" style={{ fontFamily: "var(--font-playfair)" }}>Ücretsiz</p>
                    ) : (
                      <div>
                        <p className="text-3xl font-bold text-[#EDE8DF]" style={{ fontFamily: "var(--font-playfair)", color: plan.color }}>
                          {price}₺<span className="text-base font-normal text-[#5A534C]">/ay</span>
                        </p>
                        {yearly && <p className="text-xs text-[#5A534C] mt-1">Yıllık {price * 12}₺ olarak faturalanır</p>}
                      </div>
                    )}
                  </div>

                  <ul className="space-y-2.5 flex-1 mb-6">
                    {plan.features.map(f => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-[#9B9189]">
                        <Check size={14} className="shrink-0 mt-0.5" style={{ color: plan.color }} />
                        {f}
                      </li>
                    ))}
                    {plan.missing.map(f => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-[#3A332D] line-through">
                        <span className="w-3.5 h-3.5 shrink-0 mt-0.5 opacity-20 border border-current rounded-full inline-block" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => setSelected(plan.id)}
                    className={cn(
                      "w-full py-3 rounded-sm border text-sm font-medium transition-all",
                      plan.id === "free"
                        ? "border-[#2C2620] text-[#5A534C] hover:border-[#5A534C] hover:text-[#9B9189]"
                        : isRec
                          ? "btn-primary justify-center"
                          : "btn-outline justify-center"
                    )}
                  >
                    {plan.id === "free" ? "Mevcut Plan" : `${plan.name} Planına Geç`}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* FAQ */}
        <div className="max-w-2xl mx-auto">
          <span className="gold-line mx-auto" />
          <h2 className="heading-md text-[#EDE8DF] text-center mb-8">Sık Sorulan Sorular</h2>
          <div className="space-y-4">
            {[
              ["İstediğim zaman iptal edebilir miyim?", "Evet, her zaman. Hiçbir taahhüt yok. Premium özellikler dönem sonuna kadar aktif kalır."],
              ["Ödeme yöntemleri neler?", "Kredi/banka kartı ve havale ile ödeme yapabilirsin. iyzico güvenceli."],
              ["Ücretsiz plan gerçekten ücretsiz mi?", "Evet, sonsuza dek. Platform felsefemiz: üretmek isteyen herkese açık olmak."],
            ].map(([q, a]) => (
              <div key={q} className="p-5 bg-[#141210] border border-[#2C2620] rounded-sm">
                <p className="font-medium text-[#EDE8DF] mb-2 text-sm">{q}</p>
                <p className="text-xs text-[#5A534C] leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

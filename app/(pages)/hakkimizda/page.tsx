"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Heart, Lightbulb, Users, ArrowRight } from "lucide-react";

const TEAM = [
  { name: "Elif Demircan", role: "Kurucu & Tasarım", art: "Suluboya, Dijital", colorA: "#2B4F7A", colorB: "#6B8C6B" },
  { name: "Mert Yılmaz", role: "Kurucu & Geliştirme", art: "Karakalem, Konsept", colorA: "#C4522A", colorB: "#C9A043" },
  { name: "Zeynep Arslan", role: "Topluluk Lideri", art: "Seramik, Heykel", colorA: "#C9A043", colorB: "#6B8C6B" },
];

const VALUES = [
  { icon: Lightbulb, title: "Süreç > Sonuç", desc: "Tamamlanmış bir eserden daha değerli: arkasındaki hikaye, yapım aşamaları, öğrenme anları.", color: "#C9A043" },
  { icon: Heart, title: "Teknik değil, Yaratıcılık", desc: "Mükemmel teknik kullanan değil, özgün bakış açısına sahip olan sanatçıyı öne çıkarıyoruz.", color: "#C4522A" },
  { icon: Users, title: "Topluluk > Algoritma", desc: "Popülerliği değil üretkenliği ödüllendiren, sanatçıyı büyüten bir topluluk inşa ediyoruz.", color: "#2B4F7A" },
];

const MILESTONES = [
  { year: "2024", event: "Fuithic fikri doğdu — İstanbul'da küçük bir stüdyoda." },
  { year: "Ocak 2025", event: "İlk beta — 200 sanatçı ile kapalı test." },
  { year: "Mart 2025", event: "Challenge sistemi devreye girdi." },
  { year: "Haziran 2025", event: "10.000 eser yüklendi." },
  { year: "2026", event: "Açık erişim — Fuithic.com herkese açıldı." },
];

export default function HakkimizdaPage() {
  return (
    <div>
      {/* Hero */}
      <section className="section-pad border-b border-[#2C2620]">
        <div className="container-wide max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="gold-line" />
            <h1 className="heading-xl text-[#EDE8DF] mb-6">
              Sanatı seviyoruz —
              <br />
              <em className="text-[#C9A043] not-italic">ama popülerliği değil.</em>
            </h1>
            <p className="text-[#9B9189] text-lg leading-relaxed mb-6">
              Fuithic, sanatçıların ürettiklerini değil, <strong className="text-[#EDE8DF]">nasıl ürettiklerini</strong> paylaşabildiği bir platformdur.
              Instagram&apos;ın beğeni yarışından, Behance&apos;in portfolyo gösterisinden farklı: burada süreç başrol.
            </p>
            <p className="text-[#5A534C] leading-relaxed">
              &ldquo;Teknik değil, yaratıcılık. Popülerlik değil, üretim.&rdquo; — Bu tek cümle Fuithic&apos;in felsefesinin özü.
              Picasso her gün çiziyordu. Van Gogh hiç satamadı. İkisi de büyüktü.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="section-pad border-b border-[#2C2620]">
        <div className="container-wide">
          <span className="gold-line" />
          <h2 className="heading-lg text-[#EDE8DF] mb-10">Ne İnanıyoruz</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {VALUES.map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-7 bg-[#141210] border border-[#2C2620] rounded-sm"
                >
                  <div className="w-11 h-11 rounded-sm flex items-center justify-center mb-5" style={{ backgroundColor: `${v.color}18` }}>
                    <Icon size={22} style={{ color: v.color }} />
                  </div>
                  <h3 className="text-lg font-bold text-[#EDE8DF] mb-3" style={{ fontFamily: "var(--font-playfair)" }}>{v.title}</h3>
                  <p className="text-sm text-[#9B9189] leading-relaxed">{v.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-pad border-b border-[#2C2620]">
        <div className="container-wide max-w-2xl">
          <span className="gold-line" />
          <h2 className="heading-lg text-[#EDE8DF] mb-10">Yolculuğumuz</h2>
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-[#C9A043]/40 via-[#C9A043]/20 to-transparent" />
            <div className="space-y-8 pl-8">
              {MILESTONES.map((m, i) => (
                <motion.div
                  key={m.year}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative"
                >
                  <div className="absolute -left-9 top-0 w-2 h-2 rounded-full bg-[#C9A043] mt-1.5" />
                  <p className="label-sm text-[#C9A043] mb-1">{m.year}</p>
                  <p className="text-[#9B9189] text-sm leading-relaxed">{m.event}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-pad border-b border-[#2C2620]">
        <div className="container-wide">
          <span className="gold-line" />
          <h2 className="heading-lg text-[#EDE8DF] mb-10">Ekip</h2>
          <div className="grid sm:grid-cols-3 gap-5 max-w-2xl">
            {TEAM.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 bg-[#141210] border border-[#2C2620] rounded-sm text-center"
              >
                <div
                  className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-xl font-bold text-white"
                  style={{ background: `linear-gradient(135deg, ${member.colorA}, ${member.colorB})` }}
                >
                  {member.name[0]}
                </div>
                <p className="font-semibold text-[#EDE8DF] mb-1" style={{ fontFamily: "var(--font-playfair)" }}>{member.name}</p>
                <p className="text-xs text-[#C9A043] mb-1">{member.role}</p>
                <p className="text-[10px] text-[#5A534C]">{member.art}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-pad">
        <div className="container-wide max-w-2xl text-center">
          <span className="gold-line mx-auto" />
          <h2 className="heading-lg text-[#EDE8DF] mb-4">Sen de Topluluğun Parçası Ol</h2>
          <p className="text-[#9B9189] mb-8">Fuithic sanatçıları tarafından, sanatçılar için inşa ediliyor. Sesin önemli.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/kayit" className="btn-primary gap-2">
              Ücretsiz Kaydol <ArrowRight size={15} />
            </Link>
            <a href="mailto:merhaba@fuithic.com" className="btn-outline gap-2">İletişim</a>
          </div>
        </div>
      </section>
    </div>
  );
}

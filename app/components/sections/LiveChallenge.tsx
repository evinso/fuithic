"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { Clock, Users, ArrowRight, Trophy } from "lucide-react";

function useCountdown(targetHours: number) {
  const [time, setTime] = useState({ h: targetHours, m: 23, s: 47 });

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => {
        if (prev.s > 0) return { ...prev, s: prev.s - 1 };
        if (prev.m > 0) return { ...prev, m: prev.m - 1, s: 59 };
        if (prev.h > 0) return { h: prev.h - 1, m: 59, s: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return time;
}

export default function LiveChallenge() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const time = useCountdown(47);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <section ref={ref} className="py-16">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-sm border border-[#2C2620] bg-[#141210]"
        >
          {/* Background glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 60% 80% at 80% 50%, rgba(196,82,42,0.08) 0%, transparent 70%)",
            }}
          />

          {/* Decorative corner */}
          <div className="absolute top-0 right-0 w-40 h-40 opacity-5">
            <Trophy size={160} className="text-[#C9A043]" />
          </div>

          <div className="relative z-10 p-8 lg:p-12">
            <div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-16">
              {/* Left: info */}
              <div className="flex-1">
                {/* Live badge */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C4522A] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C4522A]" />
                  </span>
                  <span className="label-sm text-[#C4522A]">Canlı Challenge</span>
                </div>

                <h2 className="heading-md text-[#EDE8DF] mb-2">
                  Bu hafta tema:{" "}
                  <em className="not-italic text-[#C9A043]">
                    &ldquo;Eski İstanbul&rdquo;
                  </em>
                </h2>
                <p className="text-[#9B9189] mb-6 max-w-lg">
                  Boğaziçi&apos;nin eski ahşap yalıları, Beyoğlu&apos;nun pasajları, kaybolmakta olan mahalleler... Gözünle gördüğünü, yüreğinle hissettiğini çiz.
                </p>

                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center gap-2 text-[#5A534C] text-sm">
                    <Users size={15} />
                    <span><strong className="text-[#9B9189]">284</strong> katılımcı</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#5A534C] text-sm">
                    <Trophy size={15} />
                    <span>Kazanan ana sayfaya çıkar + rozet</span>
                  </div>
                </div>

                <Link href="/challenge/eski-istanbul" className="btn-primary group inline-flex">
                  Ben de Katılayım
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Right: countdown */}
              <div className="shrink-0">
                <p className="label-sm text-[#5A534C] mb-4 text-center">Bitmesine</p>
                <div className="flex items-center gap-3">
                  {[
                    { value: pad(time.h), label: "Saat" },
                    { value: pad(time.m), label: "Dakika" },
                    { value: pad(time.s), label: "Saniye" },
                  ].map((unit, i) => (
                    <div key={unit.label} className="flex items-center gap-3">
                      <div className="text-center">
                        <div className="w-20 h-20 bg-[#0A0806] border border-[#2C2620] rounded-sm flex items-center justify-center">
                          <motion.span
                            key={unit.value}
                            initial={{ y: -8, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="font-display text-3xl font-bold text-[#EDE8DF] tabular-nums"
                            style={{ fontFamily: "var(--font-playfair)" }}
                          >
                            {unit.value}
                          </motion.span>
                        </div>
                        <p className="label-sm text-[#5A534C] mt-2">{unit.label}</p>
                      </div>
                      {i < 2 && (
                        <span className="text-[#3A332D] text-xl font-bold mb-4">:</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

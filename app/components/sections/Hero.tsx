"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";

const WORDS = ["Karakalem", "Suluboya", "Dijital", "Seramik", "Heykel", "Konsept"];

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);
    let animId: number;

    const onResize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    // Paint stroke particles
    const particles: {
      x: number; y: number; vx: number; vy: number;
      size: number; alpha: number; color: string; life: number;
    }[] = [];

    const COLORS = [
      "rgba(196,82,42,",  // terra
      "rgba(201,160,67,", // gold
      "rgba(43,79,122,",  // blue
      "rgba(107,140,107,",// sage
    ];

    const spawnParticle = () => {
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.4 + 0.05,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        life: 1,
      });
    };

    for (let i = 0; i < 80; i++) spawnParticle();

    const tick = () => {
      ctx.clearRect(0, 0, W, H);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.002;

        if (p.life <= 0 || p.x < 0 || p.x > W || p.y < 0 || p.y > H) {
          particles.splice(i, 1);
          spawnParticle();
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha * p.life})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(tick);
    };

    tick();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-end overflow-hidden">
      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* Radial gradient focal point */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 60%, rgba(196,82,42,0.08) 0%, transparent 70%), radial-gradient(ellipse 60% 80% at 20% 50%, rgba(43,79,122,0.06) 0%, transparent 60%)",
        }}
      />

      {/* Haftanın Eseri — blurred background fill */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(10,8,6,0.4) 50%, #0A0806 100%)",
        }}
      />

      {/* Decorative vertical lines */}
      <div className="absolute left-[5vw] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#2C2620] to-transparent opacity-60" />
      <div className="absolute right-[5vw] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#2C2620] to-transparent opacity-60" />

      {/* Content */}
      <div className="relative z-10 container-wide pb-20 lg:pb-32 pt-36">
        <div className="max-w-4xl">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-3 mb-8"
          >
            <span className="gold-line !mb-0 !w-8" />
            <span className="label-sm text-[#C9A043]">Türkiye&apos;nin Yaratıcı Sanat Platformu</span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="heading-xl text-[#EDE8DF] mb-6"
          >
            Burada kusursuz
            <br />
            <em className="text-[#C9A043] not-italic">eserler değil,</em>
            <br />
            özgün fikirler öne çıkar.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="text-[#9B9189] text-lg max-w-xl leading-relaxed mb-10"
          >
            Eserini paylaş, topluluğundan eleştiri al, mentorunla gelişirken keşfedil. Picasso&apos;dan Van Gogh&apos;a — büyük sanatçılar süreçlerini saklamadı.
          </motion.p>

          {/* Scrolling art types */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex items-center gap-3 mb-10 overflow-hidden"
          >
            <span className="text-[#5A534C] text-sm shrink-0">Sanat dalları:</span>
            <div className="flex gap-2 flex-wrap">
              {WORDS.map((w) => (
                <span
                  key={w}
                  className="badge hover:border-[#C9A043] hover:text-[#C9A043] transition-all cursor-default"
                >
                  {w}
                </span>
              ))}
              <span className="badge">+Daha Fazla</span>
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-wrap gap-4"
          >
            <Link href="/kesfet" className="btn-primary group">
              Keşfet
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/kayit" className="btn-outline group">
              Ücretsiz Kaydol
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Haftanın Eseri — bottom right corner tag */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 1.2 }}
        className="absolute bottom-8 right-[5vw] z-10 text-right hidden lg:block"
      >
        <p className="label-sm text-[#5A534C] mb-1">Haftanın Eseri</p>
        <p className="font-display text-[#EDE8DF] text-sm" style={{ fontFamily: "var(--font-playfair)" }}>
          &ldquo;Kayıp İstanbul&rdquo;
        </p>
        <p className="text-[#5A534C] text-xs">@elif_cizer</p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="label-sm text-[#3A332D]">Aşağı Kaydır</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-[#2C2620] to-transparent"
        />
      </motion.div>
    </section>
  );
}

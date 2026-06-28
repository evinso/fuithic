"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Upload, MessageCircle, TrendingUp, Compass } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Upload,
    title: "Eser Yükle",
    desc: "Sadece final değil — taslağını, sürecini, yapım hikayeni de paylaş. Burada yolculuk da eser kadar değerlidir.",
    color: "#C4522A",
  },
  {
    number: "02",
    icon: MessageCircle,
    title: "Topluluktan Tepki Al",
    desc: "5 anlamlı tepki: İlham Verdi, Çok Yaratıcı, Duygusal Etki... Teknik değil, özgünlük ve cesaret ölçülür.",
    color: "#2B4F7A",
  },
  {
    number: "03",
    icon: TrendingUp,
    title: "Gelişimini Göster",
    desc: "Aylık gelişim grafiği, rozet sistemi, mentor geri bildirimleri. Kim gelişiyor? Kim üretiyor?",
    color: "#C9A043",
  },
  {
    number: "04",
    icon: Compass,
    title: "Keşfedil",
    desc: "Galeriler, koleksiyonerler, markalar ve iş arayanlar seni bulsun. Kariyer merkezi gibi çalış.",
    color: "#6B8C6B",
  },
];

export default function HowItWorks() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="section-pad">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="gold-line mx-auto" />
          <h2 className="heading-lg text-[#EDE8DF] mb-4">Nasıl Çalışır?</h2>
          <p className="text-[#9B9189] max-w-xl mx-auto">
            Picasso perspektifi bildiği için ünlü değildi. Van Gogh renk teorisine tam uyduğu için sevilmiyordu.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connecting line (desktop) */}
          <div className="absolute top-12 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-[#2C2620] to-transparent hidden lg:block" />

          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="relative group"
              >
                <div className="p-6 bg-[#141210] border border-[#2C2620] rounded-sm card-hover">
                  {/* Step number */}
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className="relative w-12 h-12 rounded-sm flex items-center justify-center z-10"
                      style={{ backgroundColor: `${step.color}18` }}
                    >
                      <Icon size={22} style={{ color: step.color }} />
                    </div>
                    <span
                      className="font-display text-5xl font-bold opacity-15"
                      style={{ color: step.color, fontFamily: "var(--font-playfair)" }}
                    >
                      {step.number}
                    </span>
                  </div>

                  <h3
                    className="font-display text-[#EDE8DF] text-lg font-semibold mb-3 group-hover:text-[#C9A043] transition-colors"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-[#9B9189] text-sm leading-relaxed">{step.desc}</p>

                  {/* Bottom accent */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-0.5 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-b-sm"
                    style={{ backgroundColor: step.color }}
                  />
                </div>

                {/* Arrow between steps (mobile/tablet) */}
                {i < 3 && (
                  <div className="lg:hidden text-center mt-4 mb-0 text-[#3A332D] text-xl">↓</div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

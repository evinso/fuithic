"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Eye, EyeOff, Check, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const ART_FIELDS = ["Karakalem", "Suluboya", "Dijital", "3D", "Seramik", "Ahşap", "Manga", "Kaligrafi", "Konsept", "Yağlıboya", "Heykel", "El Sanatları"];

export default function KayitPage() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [done, setDone] = useState(false);

  const toggle = (f: string) => setSelected(p => p.includes(f) ? p.filter(x => x !== f) : [...p, f]);

  if (done) return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-sm">
        <div className="w-16 h-16 rounded-full bg-[#6B8C6B]/20 border border-[#6B8C6B]/40 flex items-center justify-center mx-auto mb-6">
          <Check size={28} className="text-[#6B8C6B]" />
        </div>
        <span className="gold-line mx-auto" />
        <h2 className="heading-md text-[#EDE8DF] mb-3">Hoş geldin, {name}!</h2>
        <p className="text-[#9B9189] mb-6">İlk eserini yüklemeye hazır mısın?</p>
        <Link href="/yukle" className="btn-primary justify-center w-full">İlk Eserimi Yükle</Link>
      </motion.div>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="text-center mb-8">
          <span className="gold-line mx-auto" />
          <h1 className="heading-md text-[#EDE8DF] mb-2">Fuithic&apos;e Katıl</h1>
          <p className="text-[#9B9189] text-sm">Ücretsiz · Kredi kartı gerekmez</p>
        </div>

        <div className="p-8 bg-[#141210] border border-[#2C2620] rounded-sm">
          {/* Progress */}
          <div className="flex gap-1 mb-8">
            {[1, 2, 3].map(s => (
              <div key={s} className={cn("flex-1 h-1 rounded-full transition-all", s <= step ? "bg-[#C4522A]" : "bg-[#2C2620]")} />
            ))}
          </div>

          {step === 1 && (
            <div className="space-y-4">
              <p className="label-sm text-[#5A534C] mb-4">Hesap Oluştur</p>
              <div>
                <label className="text-xs text-[#5A534C] block mb-1.5">E-posta *</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="sanatci@mail.com" className="w-full px-4 py-3 bg-[#0A0806] border border-[#2C2620] rounded-sm text-[#EDE8DF] placeholder:text-[#3A332D] focus:outline-none focus:border-[#C9A043]/50 transition-colors text-sm" />
              </div>
              <div className="relative">
                <label className="text-xs text-[#5A534C] block mb-1.5">Şifre *</label>
                <input type={showPass ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} placeholder="En az 8 karakter" className="w-full px-4 py-3 pr-10 bg-[#0A0806] border border-[#2C2620] rounded-sm text-[#EDE8DF] placeholder:text-[#3A332D] focus:outline-none focus:border-[#C9A043]/50 transition-colors text-sm" />
                <button onClick={() => setShowPass(!showPass)} className="absolute right-3 top-8 text-[#5A534C] hover:text-[#9B9189]">
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              <button onClick={() => setStep(2)} disabled={!email || password.length < 8} className="btn-primary w-full justify-center gap-2 disabled:opacity-40">
                Devam Et <ArrowRight size={15} />
              </button>
              <div className="text-center">
                <span className="text-[#5A534C] text-xs">veya</span>
              </div>
              <button className="w-full flex items-center justify-center gap-3 py-3 border border-[#2C2620] rounded-sm text-sm text-[#9B9189] hover:border-[#5A534C] transition-all">
                <span>G</span> Google ile devam et
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <p className="label-sm text-[#5A534C] mb-4">Profil Bilgileri</p>
              <div>
                <label className="text-xs text-[#5A534C] block mb-1.5">Adın *</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Elif Çizer" className="w-full px-4 py-3 bg-[#0A0806] border border-[#2C2620] rounded-sm text-[#EDE8DF] placeholder:text-[#3A332D] focus:outline-none focus:border-[#C9A043]/50 transition-colors text-sm" />
              </div>
              <div>
                <label className="text-xs text-[#5A534C] block mb-1.5">Kullanıcı Adı *</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#3A332D] text-sm">@</span>
                  <input type="text" value={username} onChange={e => setUsername(e.target.value.replace(/\s/g, "_").toLowerCase())} placeholder="elif_cizer" className="w-full px-4 py-3 pl-7 bg-[#0A0806] border border-[#2C2620] rounded-sm text-[#EDE8DF] placeholder:text-[#3A332D] focus:outline-none focus:border-[#C9A043]/50 transition-colors text-sm" />
                </div>
              </div>
              <button onClick={() => setStep(3)} disabled={!name || !username} className="btn-primary w-full justify-center gap-2 disabled:opacity-40">
                Devam Et <ArrowRight size={15} />
              </button>
            </div>
          )}

          {step === 3 && (
            <div>
              <p className="label-sm text-[#5A534C] mb-2">Hangi alanda üretiyorsun?</p>
              <p className="text-xs text-[#3A332D] mb-4">Birden fazla seçebilirsin</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {ART_FIELDS.map(f => (
                  <button key={f} onClick={() => toggle(f)}
                    className={cn("px-3 py-2 rounded-sm border text-xs font-medium transition-all",
                      selected.includes(f)
                        ? "border-[#C4522A]/50 text-[#C4522A] bg-[#C4522A]/08"
                        : "border-[#2C2620] text-[#9B9189] hover:border-[#5A534C]"
                    )}>
                    {f}
                  </button>
                ))}
              </div>
              <button onClick={() => setDone(true)} disabled={selected.length === 0}
                className="btn-primary w-full justify-center gap-2 disabled:opacity-40">
                Hesabı Oluştur <Check size={15} />
              </button>
            </div>
          )}
        </div>

        <p className="text-center text-xs text-[#3A332D] mt-6">
          Zaten hesabın var mı?{" "}
          <Link href="/giris" className="text-[#9B9189] hover:text-[#C9A043] transition-colors">Giriş Yap</Link>
        </p>
      </motion.div>
    </div>
  );
}

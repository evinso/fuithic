"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Eye, EyeOff, ArrowRight } from "lucide-react";

export default function GirisPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-10 h-10 bg-[#C9A043] text-[#0A0806] text-xl font-black flex items-center justify-center mx-auto mb-4 font-mono">F</div>
          <span className="gold-line mx-auto" />
          <h1 className="heading-md text-[#EDE8DF] mb-2">Giriş Yap</h1>
          <p className="text-[#9B9189] text-sm">Seni özledik, sanatçı.</p>
        </div>

        <div className="p-8 bg-[#141210] border border-[#2C2620] rounded-sm space-y-4">
          <div>
            <label className="text-xs text-[#5A534C] block mb-1.5">E-posta</label>
            <input
              type="email" value={email} onChange={e => setEmail(e.target.value)}
              placeholder="sanatci@mail.com"
              className="w-full px-4 py-3 bg-[#0A0806] border border-[#2C2620] rounded-sm text-[#EDE8DF] placeholder:text-[#3A332D] focus:outline-none focus:border-[#C9A043]/50 transition-colors text-sm"
            />
          </div>
          <div className="relative">
            <label className="text-xs text-[#5A534C] block mb-1.5">Şifre</label>
            <input
              type={showPass ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 pr-10 bg-[#0A0806] border border-[#2C2620] rounded-sm text-[#EDE8DF] placeholder:text-[#3A332D] focus:outline-none focus:border-[#C9A043]/50 transition-colors text-sm"
            />
            <button onClick={() => setShowPass(!showPass)} className="absolute right-3 top-8 text-[#5A534C] hover:text-[#9B9189]">
              {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>
          <div className="flex justify-end">
            <button className="text-xs text-[#5A534C] hover:text-[#C9A043] transition-colors">Şifremi Unuttum</button>
          </div>
          <Link href="/" className="btn-primary w-full justify-center gap-2">
            Giriş Yap <ArrowRight size={15} />
          </Link>
          <div className="text-center"><span className="text-[#3A332D] text-xs">veya</span></div>
          <button className="w-full flex items-center justify-center gap-3 py-3 border border-[#2C2620] rounded-sm text-sm text-[#9B9189] hover:border-[#5A534C] transition-all">
            <span className="font-bold">G</span> Google ile giriş yap
          </button>
        </div>

        <p className="text-center text-xs text-[#3A332D] mt-6">
          Henüz hesabın yok mu?{" "}
          <Link href="/kayit" className="text-[#9B9189] hover:text-[#C9A043] transition-colors">Ücretsiz Kaydol</Link>
        </p>
      </motion.div>
    </div>
  );
}

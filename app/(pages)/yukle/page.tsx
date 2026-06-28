"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Image, Video, FileText, Layers, Check, ChevronRight, X, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = [
  { id: 1, label: "Eser Tipi", short: "Tip" },
  { id: 2, label: "Dosya Yükle", short: "Dosya" },
  { id: 3, label: "Eser Bilgileri", short: "Bilgi" },
  { id: 4, label: "Kategorileme", short: "Kategori" },
  { id: 5, label: "Gizlilik", short: "Ayarlar" },
  { id: 6, label: "Yayınla", short: "Yayınla" },
];

const TYPES = [
  { id: "final", icon: Image, label: "Final Eser", desc: "Tamamlanmış tek fotoğraf veya dosya", color: "#C9A043" },
  { id: "wip", icon: Layers, label: "WIP Serisi", desc: "Süreç + final — taslaktan finale", color: "#C4522A" },
  { id: "draft", icon: FileText, label: "Yalnızca Taslak", desc: "Fikir aşamasında, görüş almak için", color: "#2B4F7A" },
  { id: "video", icon: Video, label: "Video / Timelapse", desc: "Yapım süreci kaydı", color: "#6B8C6B" },
];

const CATEGORIES = ["Karakalem", "Suluboya", "Dijital", "3D", "Seramik", "Ahşap", "Manga", "Kaligrafi", "Konsept", "Yağlıboya"];
const TAG_SUGGESTIONS = ["istanbul", "soyut", "figüratif", "doğa", "karakter", "manzara", "porttre", "karikatür", "hat", "suluboya"];

export default function YuklePage() {
  const [step, setStep] = useState(1);
  const [type, setType] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [files, setFiles] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [material, setMaterial] = useState("");
  const [hours, setHours] = useState("");
  const [hasRef, setHasRef] = useState(false);
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [privacy, setPrivacy] = useState("public");
  const [wantCritique, setWantCritique] = useState(true);
  const [forSale, setForSale] = useState(false);
  const [price, setPrice] = useState("");
  const [published, setPublished] = useState(false);

  const canNext = () => {
    if (step === 1) return !!type;
    if (step === 2) return files.length > 0;
    if (step === 3) return title.length >= 3;
    if (step === 4) return !!category;
    return true;
  };

  const addTag = (t: string) => {
    if (!tags.includes(t) && tags.length < 10) setTags(prev => [...prev, t]);
    setTagInput("");
  };

  if (published) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <div className="w-20 h-20 rounded-full bg-[#6B8C6B]/20 border border-[#6B8C6B]/40 flex items-center justify-center mx-auto mb-6">
            <Check size={36} className="text-[#6B8C6B]" />
          </div>
          <span className="gold-line mx-auto" />
          <h1 className="heading-md text-[#EDE8DF] mb-3">Eser Yayınlandı!</h1>
          <p className="text-[#9B9189] mb-2">&ldquo;{title || "Yeni Eser"}&rdquo; toplulukla paylaşıldı.</p>
          <p className="text-[#5A534C] text-sm mb-8">Takipçilerine ve atölyene bildirim gitti.</p>
          <div className="flex flex-col gap-3">
            <button onClick={() => { setPublished(false); setStep(1); setType(null); setFiles([]); setTitle(""); }}
              className="btn-primary justify-center">
              Yeni Eser Yükle
            </button>
            <a href="/profil/me" className="btn-outline justify-center">Profilime Git</a>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10">
      <div className="container-wide max-w-3xl">
        {/* Header */}
        <div className="mb-10">
          <span className="gold-line" />
          <h1 className="heading-lg text-[#EDE8DF] mb-2">Eser Yükle</h1>
          <p className="text-[#9B9189]">Sadece final değil — sürecini de paylaş.</p>
        </div>

        {/* Step progress */}
        <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-2">
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => step > s.id && setStep(s.id)}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-sm text-xs font-medium transition-all",
                  step === s.id
                    ? "bg-[#C4522A] text-white"
                    : step > s.id
                      ? "bg-[#1E1A17] text-[#C9A043] border border-[#C9A043]/30 cursor-pointer hover:border-[#C9A043]"
                      : "bg-[#141210] border border-[#2C2620] text-[#3A332D]"
                )}
              >
                {step > s.id ? <Check size={12} /> : <span>{s.id}</span>}
                <span className="hidden sm:block">{s.short}</span>
              </button>
              {i < STEPS.length - 1 && (
                <div className={cn("w-6 h-px", step > s.id ? "bg-[#C9A043]/40" : "bg-[#2C2620]")} />
              )}
            </div>
          ))}
        </div>

        {/* Step content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.3 }}
          >
            {/* Step 1: Type */}
            {step === 1 && (
              <div>
                <h2 className="text-xl font-semibold text-[#EDE8DF] mb-2" style={{ fontFamily: "var(--font-playfair)" }}>Eser tipi seç</h2>
                <p className="text-[#5A534C] text-sm mb-6">Ne paylaşmak istiyorsun?</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {TYPES.map(t => {
                    const Icon = t.icon;
                    return (
                      <button
                        key={t.id}
                        onClick={() => setType(t.id)}
                        className={cn(
                          "p-5 rounded-sm border text-left transition-all card-hover",
                          type === t.id
                            ? "border-current bg-opacity-10"
                            : "border-[#2C2620] bg-[#141210] hover:border-[#5A534C]"
                        )}
                        style={type === t.id ? { borderColor: t.color, backgroundColor: `${t.color}0A` } : undefined}
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 rounded-sm flex items-center justify-center" style={{ backgroundColor: `${t.color}18` }}>
                            <Icon size={20} style={{ color: t.color }} />
                          </div>
                          {type === t.id && <Check size={16} style={{ color: t.color }} className="ml-auto" />}
                        </div>
                        <p className="font-medium text-[#EDE8DF] mb-1">{t.label}</p>
                        <p className="text-xs text-[#5A534C]">{t.desc}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 2: Upload */}
            {step === 2 && (
              <div>
                <h2 className="text-xl font-semibold text-[#EDE8DF] mb-2" style={{ fontFamily: "var(--font-playfair)" }}>Dosya yükle</h2>
                <p className="text-[#5A534C] text-sm mb-6">JPG, PNG, WEBP · Maks 20MB (ücretsiz) / 100MB (premium)</p>

                <div
                  onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                  onDragLeave={() => setDragging(false)}
                  onDrop={(e) => { e.preventDefault(); setDragging(false); setFiles(prev => [...prev, `dosya-${prev.length + 1}.jpg`]); }}
                  className={cn(
                    "border-2 border-dashed rounded-sm p-12 text-center transition-all cursor-pointer mb-4",
                    dragging ? "border-[#C9A043] bg-[#C9A043]/05" : "border-[#2C2620] hover:border-[#5A534C]"
                  )}
                  onClick={() => setFiles(prev => [...prev, `dosya-${prev.length + 1}.jpg`])}
                >
                  <Upload size={32} className="mx-auto text-[#5A534C] mb-3" />
                  <p className="text-[#9B9189] mb-1">Dosyayı sürükle bırak veya tıkla</p>
                  <p className="text-xs text-[#3A332D]">JPG, PNG, WEBP, MP4, PDF</p>
                </div>

                {files.length > 0 && (
                  <div className="grid grid-cols-3 gap-2">
                    {files.map((f, i) => (
                      <div key={i} className="relative aspect-square bg-[#141210] border border-[#2C2620] rounded-sm flex items-center justify-center">
                        <span className="text-xs text-[#5A534C]">{f}</span>
                        <button onClick={() => setFiles(prev => prev.filter((_, j) => j !== i))}
                          className="absolute top-1 right-1 w-5 h-5 bg-[#0A0806] border border-[#2C2620] rounded-sm flex items-center justify-center text-[#5A534C] hover:text-red-400">
                          <X size={10} />
                        </button>
                      </div>
                    ))}
                    {type === "wip" && files.length < 4 && (
                      <button
                        onClick={() => setFiles(prev => [...prev, `asama-${prev.length + 1}.jpg`])}
                        className="aspect-square bg-[#141210] border border-dashed border-[#2C2620] rounded-sm flex flex-col items-center justify-center gap-1 text-[#3A332D] hover:border-[#5A534C] hover:text-[#5A534C] transition-all"
                      >
                        <Plus size={16} />
                        <span className="text-[10px]">Aşama Ekle</span>
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Info */}
            {step === 3 && (
              <div className="space-y-5">
                <div>
                  <h2 className="text-xl font-semibold text-[#EDE8DF] mb-2" style={{ fontFamily: "var(--font-playfair)" }}>Eser bilgileri</h2>
                  <p className="text-[#5A534C] text-sm mb-6">Bu fikir nereden çıktı? Nasıl gelişti?</p>
                </div>
                <div>
                  <label className="label-sm text-[#5A534C] block mb-2">Başlık *</label>
                  <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Eserinin adı..." className="w-full px-4 py-3 bg-[#141210] border border-[#2C2620] rounded-sm text-[#EDE8DF] placeholder:text-[#3A332D] focus:outline-none focus:border-[#C9A043]/50 transition-colors" />
                </div>
                <div>
                  <label className="label-sm text-[#5A534C] block mb-2">Açıklama — yapım hikayesi</label>
                  <textarea value={desc} onChange={e => setDesc(e.target.value)} rows={4} placeholder="Bu fikir nereden çıktı? Ne hissettirdi? Süreçte ne öğrendin?" className="w-full px-4 py-3 bg-[#141210] border border-[#2C2620] rounded-sm text-[#EDE8DF] placeholder:text-[#3A332D] focus:outline-none focus:border-[#C9A043]/50 transition-colors resize-none" />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="label-sm text-[#5A534C] block mb-2">Materyal</label>
                    <input type="text" value={material} onChange={e => setMaterial(e.target.value)} placeholder="suluboya, karakalem, tablet..." className="w-full px-4 py-3 bg-[#141210] border border-[#2C2620] rounded-sm text-[#EDE8DF] placeholder:text-[#3A332D] focus:outline-none focus:border-[#C9A043]/50 transition-colors" />
                  </div>
                  <div>
                    <label className="label-sm text-[#5A534C] block mb-2">Çalışma Süresi</label>
                    <input type="text" value={hours} onChange={e => setHours(e.target.value)} placeholder="yaklaşık kaç saat?" className="w-full px-4 py-3 bg-[#141210] border border-[#2C2620] rounded-sm text-[#EDE8DF] placeholder:text-[#3A332D] focus:outline-none focus:border-[#C9A043]/50 transition-colors" />
                  </div>
                </div>
                <div>
                  <label className="label-sm text-[#5A534C] block mb-2">Referans kullandın mı?</label>
                  <div className="flex gap-2">
                    {[["Hayır", false], ["Evet", true]].map(([l, v]) => (
                      <button
                        key={String(l)}
                        onClick={() => setHasRef(v as boolean)}
                        className={cn(
                          "px-5 py-2.5 rounded-sm border text-sm transition-all",
                          hasRef === v ? "border-[#C9A043]/50 text-[#C9A043] bg-[#C9A043]/08" : "border-[#2C2620] text-[#9B9189]"
                        )}
                      >
                        {l as string}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Category */}
            {step === 4 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-[#EDE8DF] mb-2" style={{ fontFamily: "var(--font-playfair)" }}>Kategorileme</h2>
                  <p className="text-[#5A534C] text-sm mb-6">Doğru kategori, doğru kişilere ulaşmanı sağlar.</p>
                </div>
                <div>
                  <label className="label-sm text-[#5A534C] block mb-3">Ana Kategori *</label>
                  <div className="flex flex-wrap gap-2">
                    {CATEGORIES.map(c => (
                      <button key={c} onClick={() => setCategory(c)}
                        className={cn(
                          "px-4 py-2 rounded-sm border text-sm transition-all",
                          category === c ? "border-[#C4522A]/50 text-[#C4522A] bg-[#C4522A]/08" : "border-[#2C2620] text-[#9B9189] hover:border-[#5A534C]"
                        )}>{c}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="label-sm text-[#5A534C] block mb-3">Etiketler (max 10)</label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {tags.map(t => (
                      <span key={t} className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1E1A17] border border-[#C9A043]/30 rounded-sm text-xs text-[#C9A043]">
                        #{t}
                        <button onClick={() => setTags(prev => prev.filter(x => x !== t))}><X size={10} /></button>
                      </span>
                    ))}
                    {tags.length < 10 && (
                      <input
                        type="text"
                        value={tagInput}
                        onChange={e => setTagInput(e.target.value)}
                        onKeyDown={e => { if ((e.key === "Enter" || e.key === ",") && tagInput.trim()) { e.preventDefault(); addTag(tagInput.trim()); } }}
                        placeholder="Etiket ekle..."
                        className="px-3 py-1.5 bg-[#141210] border border-[#2C2620] rounded-sm text-sm text-[#EDE8DF] placeholder:text-[#3A332D] focus:outline-none focus:border-[#C9A043]/50 transition-colors"
                      />
                    )}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {TAG_SUGGESTIONS.filter(t => !tags.includes(t)).slice(0, 6).map(t => (
                      <button key={t} onClick={() => addTag(t)} className="text-xs px-2.5 py-1 border border-[#2C2620] rounded-sm text-[#5A534C] hover:border-[#C9A043]/50 hover:text-[#C9A043] transition-all">
                        +{t}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Privacy */}
            {step === 5 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-[#EDE8DF] mb-2" style={{ fontFamily: "var(--font-playfair)" }}>Gizlilik ve Seçenekler</h2>
                  <p className="text-[#5A534C] text-sm mb-6">Kim görebilir? Ne yapabilir?</p>
                </div>
                <div>
                  <label className="label-sm text-[#5A534C] block mb-3">Görünürlük</label>
                  <div className="space-y-2">
                    {[["public", "Herkese Açık", "Keşfet sayfasında görünür"], ["atelier", "Yalnızca Atölye", "Üye olduğun atölyeler"], ["private", "Yalnızca Ben", "Taslak olarak sakla"]].map(([v, l, d]) => (
                      <button key={v} onClick={() => setPrivacy(v)}
                        className={cn(
                          "w-full flex items-center gap-4 p-4 rounded-sm border text-left transition-all",
                          privacy === v ? "border-[#C9A043]/50 bg-[#C9A043]/05" : "border-[#2C2620] bg-[#141210] hover:border-[#5A534C]"
                        )}
                      >
                        <div className={cn("w-4 h-4 rounded-full border-2 flex items-center justify-center", privacy === v ? "border-[#C9A043]" : "border-[#5A534C]")}>
                          {privacy === v && <div className="w-2 h-2 rounded-full bg-[#C9A043]" />}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-[#EDE8DF]">{l}</p>
                          <p className="text-xs text-[#5A534C]">{d}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  {[
                    [wantCritique, setWantCritique, "Eleştiri Al", "Topluluk eleştiri yapabilsin"],
                    [forSale, setForSale, "Satışa Çıkar", "Bu eser satılabilir"],
                  ].map(([v, s, l, d], i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-[#141210] border border-[#2C2620] rounded-sm">
                      <div>
                        <p className="text-sm font-medium text-[#EDE8DF]">{l as string}</p>
                        <p className="text-xs text-[#5A534C]">{d as string}</p>
                      </div>
                      <button onClick={() => (s as (val: boolean) => void)(!v as boolean)} className={cn("w-10 h-6 rounded-full transition-all relative", v ? "bg-[#C4522A]" : "bg-[#2C2620]")}>
                        <div className={cn("absolute top-1 w-4 h-4 rounded-full bg-white transition-all", v ? "right-1" : "left-1")} />
                      </button>
                    </div>
                  ))}
                  {forSale && (
                    <div className="flex items-center gap-3">
                      <input type="text" value={price} onChange={e => setPrice(e.target.value)} placeholder="Fiyat (₺)" className="flex-1 px-4 py-3 bg-[#141210] border border-[#2C2620] rounded-sm text-[#EDE8DF] placeholder:text-[#3A332D] focus:outline-none focus:border-[#C9A043]/50 transition-colors" />
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Step 6: Preview & Publish */}
            {step === 6 && (
              <div>
                <h2 className="text-xl font-semibold text-[#EDE8DF] mb-2" style={{ fontFamily: "var(--font-playfair)" }}>Önizleme & Yayınla</h2>
                <p className="text-[#5A534C] text-sm mb-6">Her şey doğru mu? Yayına al!</p>

                <div className="p-6 bg-[#141210] border border-[#2C2620] rounded-sm mb-6 space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-20 h-20 rounded-sm bg-[#1E1A17] border border-[#2C2620] shrink-0 flex items-center justify-center text-[#5A534C] text-xs">
                      {files.length > 0 ? "📎" : "Yok"}
                    </div>
                    <div>
                      <p className="font-semibold text-[#EDE8DF] mb-1" style={{ fontFamily: "var(--font-playfair)" }}>{title || "—"}</p>
                      <p className="text-xs text-[#5A534C] mb-2">{TYPES.find(t => t.id === type)?.label} · {category || "—"}</p>
                      <div className="flex flex-wrap gap-1">
                        {tags.map(t => <span key={t} className="text-[10px] px-2 py-0.5 bg-[#1E1A17] border border-[#2C2620] rounded text-[#5A534C]">#{t}</span>)}
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3 text-xs">
                    <div className="p-3 bg-[#0A0806] rounded-sm">
                      <p className="text-[#3A332D] mb-1">Görünürlük</p>
                      <p className="text-[#9B9189]">{privacy === "public" ? "Herkese Açık" : privacy === "atelier" ? "Atölye" : "Yalnızca Ben"}</p>
                    </div>
                    <div className="p-3 bg-[#0A0806] rounded-sm">
                      <p className="text-[#3A332D] mb-1">Eleştiri</p>
                      <p className="text-[#9B9189]">{wantCritique ? "Açık" : "Kapalı"}</p>
                    </div>
                    <div className="p-3 bg-[#0A0806] rounded-sm">
                      <p className="text-[#3A332D] mb-1">Satış</p>
                      <p className="text-[#9B9189]">{forSale ? price || "Fiyatsız" : "Yok"}</p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setPublished(true)}
                  className="btn-primary w-full justify-center text-base py-4"
                >
                  Yayınla
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-10 pt-6 border-t border-[#2C2620]">
          <button
            onClick={() => setStep(s => Math.max(1, s - 1))}
            className={cn("btn-outline", step === 1 && "opacity-30 pointer-events-none")}
          >
            Geri
          </button>
          {step < 6 && (
            <button
              onClick={() => canNext() && setStep(s => s + 1)}
              disabled={!canNext()}
              className={cn("btn-primary gap-2 group", !canNext() && "opacity-40")}
            >
              Devam Et
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

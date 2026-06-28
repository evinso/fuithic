"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Bell,
  Upload,
  User,
  ChevronDown,
  Palette,
  Trophy,
  BookOpen,
  ShoppingBag,
  GalleryThumbnails,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  {
    label: "Keşfet",
    href: "/kesfet",
    sub: ["Trending", "Yeni Eserler", "Kategoriler", "Sanatçılar"],
  },
  {
    label: "Atölyeler",
    href: "/atolyeler",
    sub: ["Karakalem", "Suluboya", "Dijital", "Geleneksel", "3D"],
  },
  {
    label: "Challenge",
    href: "/challenge",
    sub: ["Aktif", "Geçmiş", "Duyurular"],
  },
  {
    label: "Galeri",
    href: "/galeri",
    sub: ["Aylık Sergi", "3D Galeri", "Koleksiyoner Erişimi"],
  },
  {
    label: "Pazar",
    href: "/pazar",
    sub: ["Orijinal Eserler", "Baskılar", "Sipariş Ver"],
  },
  {
    label: "Eğitim",
    href: "/egitim",
    sub: ["Canlı", "Kayıtlı", "Ücretsiz", "Ücretli"],
  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-[#0A0806]/95 backdrop-blur-md border-b border-[#2C2620]"
            : "bg-transparent"
        )}
      >
        <div className="container-wide">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="w-8 h-8 border border-[#C9A043] rounded-sm flex items-center justify-center">
                  <span
                    className="font-display text-[#C9A043] text-sm font-bold tracking-wider"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    F
                  </span>
                </div>
              </div>
              <span
                className="text-[#EDE8DF] text-xl font-bold tracking-[0.15em] uppercase group-hover:text-[#C9A043] transition-colors duration-300"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Fuithic
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setActiveMenu(item.label)}
                  onMouseLeave={() => setActiveMenu(null)}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-1 text-sm font-medium tracking-wide transition-colors duration-200",
                      activeMenu === item.label
                        ? "text-[#C9A043]"
                        : "text-[#9B9189] hover:text-[#EDE8DF]"
                    )}
                  >
                    {item.label}
                    <ChevronDown
                      size={12}
                      className={cn(
                        "transition-transform duration-200",
                        activeMenu === item.label ? "rotate-180" : ""
                      )}
                    />
                  </Link>

                  <AnimatePresence>
                    {activeMenu === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-4 bg-[#141210] border border-[#2C2620] rounded-sm shadow-2xl min-w-40 overflow-hidden"
                      >
                        {item.sub.map((sub) => (
                          <Link
                            key={sub}
                            href={`${item.href}/${sub.toLowerCase().replace(/\s+/g, "-")}`}
                            className="block px-5 py-3 text-sm text-[#9B9189] hover:text-[#EDE8DF] hover:bg-[#1E1A17] transition-colors duration-150 whitespace-nowrap"
                          >
                            {sub}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              {/* Search */}
              <button className="hidden md:flex items-center gap-2 px-3 py-2 rounded-sm border border-[#2C2620] bg-[#141210]/60 text-[#5A534C] hover:border-[#5A534C] hover:text-[#9B9189] transition-all duration-200 text-sm">
                <Search size={14} />
                <span className="hidden lg:block text-xs tracking-wide">Ara...</span>
                <span className="hidden lg:block text-xs text-[#3A332D] border border-[#2C2620] rounded px-1">⌘K</span>
              </button>

              {/* Upload */}
              <Link
                href="/yukle"
                className="hidden sm:flex btn-primary text-xs py-2 px-4 gap-2"
              >
                <Upload size={14} />
                <span>Eser Yükle</span>
              </Link>

              {/* Notification */}
              <button className="relative p-2 text-[#5A534C] hover:text-[#9B9189] transition-colors">
                <Bell size={18} />
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[#C4522A] rounded-full" />
              </button>

              {/* Profile */}
              <button className="flex items-center gap-2 p-1.5 rounded-full border border-[#2C2620] hover:border-[#C9A043] transition-colors duration-200 group">
                <div className="w-7 h-7 rounded-full bg-[#1E1A17] flex items-center justify-center">
                  <User size={14} className="text-[#5A534C] group-hover:text-[#C9A043] transition-colors" />
                </div>
              </button>

              {/* Mobile menu toggle */}
              <button
                className="lg:hidden p-2 text-[#9B9189] hover:text-[#EDE8DF]"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-[#0A0806] lg:hidden flex flex-col pt-20"
          >
            <div className="flex-1 overflow-y-auto px-6 py-8 space-y-6">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="block text-2xl font-display text-[#EDE8DF] hover:text-[#C9A043] transition-colors mb-2"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {item.label}
                  </Link>
                  <div className="flex flex-wrap gap-2 pl-1">
                    {item.sub.map((sub) => (
                      <Link
                        key={sub}
                        href={`${item.href}/${sub.toLowerCase()}`}
                        onClick={() => setMobileOpen(false)}
                        className="text-sm text-[#5A534C] hover:text-[#9B9189] transition-colors"
                      >
                        {sub}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="px-6 pb-8 border-t border-[#2C2620] pt-6">
              <Link href="/kayit" className="btn-primary w-full justify-center mb-3" onClick={() => setMobileOpen(false)}>
                Ücretsiz Kaydol
              </Link>
              <Link href="/giris" className="btn-outline w-full justify-center" onClick={() => setMobileOpen(false)}>
                Giriş Yap
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-[#0A0806]/95 backdrop-blur-md border-t border-[#2C2620]">
        <div className="flex items-center justify-around h-16 px-2">
          {[
            { icon: <GalleryThumbnails size={20} />, label: "Akış", href: "/" },
            { icon: <Search size={20} />, label: "Keşfet", href: "/kesfet" },
            { icon: <Upload size={22} />, label: "Yükle", href: "/yukle", accent: true },
            { icon: <Bell size={20} />, label: "Bildirim", href: "/bildirimler" },
            { icon: <User size={20} />, label: "Profil", href: "/profil" },
          ].map((tab) => (
            <Link
              key={tab.label}
              href={tab.href}
              className={cn(
                "flex flex-col items-center gap-0.5 text-[10px] transition-colors",
                tab.accent
                  ? "bg-[#C4522A] text-white rounded-full p-3 -mt-6 shadow-lg shadow-[#C4522A]/30"
                  : "text-[#5A534C] hover:text-[#9B9189]"
              )}
            >
              {tab.icon}
              {!tab.accent && <span>{tab.label}</span>}
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}

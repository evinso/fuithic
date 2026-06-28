import Link from "next/link";

const footerLinks = {
  Platform: [
    { label: "Keşfet", href: "/kesfet" },
    { label: "Atölyeler", href: "/atolyeler" },
    { label: "Challenge", href: "/challenge" },
    { label: "Galeri", href: "/galeri" },
    { label: "Pazar", href: "/pazar" },
  ],
  Topluluk: [
    { label: "Karakalem Atölyesi", href: "/atolyeler/karakalem" },
    { label: "Suluboya Atölyesi", href: "/atolyeler/suluboya" },
    { label: "Dijital Sanat", href: "/atolyeler/dijital" },
    { label: "3D & Heykel", href: "/atolyeler/3d" },
    { label: "Manga & İllüstrasyon", href: "/atolyeler/manga" },
  ],
  Sanatçılar: [
    { label: "Ücretsiz Kaydol", href: "/kayit" },
    { label: "Premium Üyelik", href: "/premium" },
    { label: "Eser Yükle", href: "/yukle" },
    { label: "Mentor Ol", href: "/mentor-basvuru" },
    { label: "Sponsor Challenge", href: "/sponsor" },
  ],
  Kurumsal: [
    { label: "Hakkımızda", href: "/hakkimizda" },
    { label: "Blog", href: "/blog" },
    { label: "Kariyer", href: "/kariyer" },
    { label: "Gizlilik", href: "/gizlilik" },
    { label: "Kullanım Şartları", href: "/sartlar" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#0D0B09] border-t border-[#2C2620] pb-24 lg:pb-0">
      <div className="container-wide py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-7 h-7 border border-[#C9A043] rounded-sm flex items-center justify-center">
                <span
                  className="text-[#C9A043] text-xs font-bold"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  F
                </span>
              </div>
              <span
                className="text-[#EDE8DF] text-lg font-bold tracking-[0.15em] uppercase"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Fuithic
              </span>
            </div>
            <p className="text-[#5A534C] text-sm leading-relaxed mb-5 max-w-48">
              &ldquo;Burada kusursuz eserler değil, özgün fikirler öne çıkar.&rdquo;
            </p>
            <p className="text-[#3A332D] text-xs">
              Türkiye&apos;nin yaratıcı sanat topluluğu.
              <br />
              fuithic.com
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <p className="label-sm text-[#5A534C] mb-4">{title}</p>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-[#5A534C] hover:text-[#9B9189] transition-colors underline-anim"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="brush-divider mb-8" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#3A332D] text-xs">
            © 2025 Fuithic. Tüm hakları saklıdır.
          </p>
          <div className="flex items-center gap-1">
            <span className="text-[#3A332D] text-xs">İstanbul&apos;dan</span>
            <span className="text-[#C4522A] text-xs">♥</span>
            <span className="text-[#3A332D] text-xs">ile yapıldı</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

import type { ArtworkCardData } from "@/app/components/ui/ArtworkCard";

export const artworks: ArtworkCardData[] = [
  { id: 1, slug: "kayip-istanbul", title: "Kayıp İstanbul", artist: "Elif Çizer", artistHandle: "elif_cizer", category: "Suluboya", reactions: 847, colorA: "#1A3A5C", colorB: "#0A1E35", accent: "rgba(43,79,122,0.5)", forSale: false, isFeatured: true },
  { id: 2, slug: "geometrik-dus", title: "Geometrik Düş", artist: "Zeynep Aydın", artistHandle: "zeynep_art", category: "Dijital", reactions: 312, colorA: "#2A1A3A", colorB: "#150D20", accent: "rgba(120,60,180,0.4)", forSale: true, price: "₺1.200" },
  { id: 3, slug: "bahar-serisi-01", title: "Bahar Serisi #01", artist: "Ali Kaya", artistHandle: "ali_suluboya", category: "Karakalem", reactions: 156, colorA: "#1A2A1A", colorB: "#0D150D", accent: "rgba(107,140,107,0.4)", isWIP: true },
  { id: 4, slug: "kizil-ofke", title: "Kızıl Öfke", artist: "Deniz Ateş", artistHandle: "deniz_konsept", category: "Konsept", reactions: 589, colorA: "#3A1A0A", colorB: "#200E05", accent: "rgba(196,82,42,0.5)", forSale: true, price: "₺3.500", isFeatured: true },
  { id: 5, slug: "hat-no-7", title: "Hat #7", artist: "Hasan Güler", artistHandle: "hasan_hat", category: "Kaligrafi", reactions: 89, colorA: "#2A2A1A", colorB: "#151508", accent: "rgba(201,160,67,0.3)" },
  { id: 6, slug: "cini-masa", title: "Çini Masa", artist: "Ayşe Demir", artistHandle: "ayse_seramik", category: "Seramik", reactions: 143, colorA: "#1A2A2A", colorB: "#0A1515", accent: "rgba(74,123,138,0.4)", forSale: true, price: "₺850" },
  { id: 7, slug: "dijital-orman", title: "Dijital Orman", artist: "Can Yılmaz", artistHandle: "can_3d", category: "3D", reactions: 267, colorA: "#0A2A1A", colorB: "#051510", accent: "rgba(107,140,107,0.5)" },
  { id: 8, slug: "manga-kahraman", title: "Manga Kahraman", artist: "Yuki Sato", artistHandle: "yuki_manga", category: "Manga", reactions: 198, colorA: "#2A1A2A", colorB: "#150A15", accent: "rgba(160,60,200,0.4)" },
  { id: 9, slug: "ahsap-heykel", title: "Ahşap Heykel", artist: "Orhan Usta", artistHandle: "orhan_usta", category: "Ahşap", reactions: 76, colorA: "#2A1A0A", colorB: "#150D05", accent: "rgba(139,107,74,0.4)", forSale: true, price: "₺5.200" },
  { id: 10, slug: "mavi-esinti", title: "Mavi Esinti", artist: "Selin Yıldız", artistHandle: "selin_sanat", category: "Yağlıboya", reactions: 421, colorA: "#0A1A3A", colorB: "#050D1E", accent: "rgba(43,79,122,0.5)", isFeatured: true },
  { id: 11, slug: "modernist-hat", title: "Modernist Hat", artist: "Burak Ateş", artistHandle: "burak_dijital", category: "Dijital", reactions: 334, colorA: "#1A1A2A", colorB: "#0D0D15", accent: "rgba(80,80,180,0.4)", isWIP: true },
  { id: 12, slug: "cini-seri-3", title: "Çini Seri #3", artist: "Ayşe Nur Kaya", artistHandle: "aysenur_cini", category: "Seramik", reactions: 178, colorA: "#1A2A2A", colorB: "#0D1515", accent: "rgba(74,138,138,0.4)", forSale: true, price: "₺1.100" },
];

export const challenges = [
  { id: 1, slug: "eski-istanbul", title: "Eski İstanbul", status: "active", endsIn: "2 gün", participants: 284, theme: "Boğaziçi'nin eski yalıları, Beyoğlu'nun pasajları, kaybolmakta olan mahalleler.", color: "#C4522A" },
  { id: 2, slug: "anadolu-renkleri", title: "Anadolu Renkleri", status: "upcoming", endsIn: "9 gün", participants: 0, theme: "Anadolu'nun sonsuz renk paleti — toprak, kızılçam, lacivert.", color: "#C9A043" },
  { id: 3, slug: "sessizlik", title: "Sessizlik", status: "past", endsIn: "Sona erdi", participants: 412, theme: "Sessizliği görsel bir dile çevir.", color: "#2B4F7A" },
  { id: 4, slug: "kucuk-mutluluklar", title: "Küçük Mutluluklar", status: "past", endsIn: "Sona erdi", participants: 356, theme: "Günlük hayatın gözden kaçan güzellikleri.", color: "#6B8C6B" },
];

export const ateliers = [
  { id: 1, slug: "karakalem", name: "Karakalem Atölyesi", desc: "Çizim teknikleri, kurşun kalem, eskiz paylaşımı", members: 2840, works: 4200, color: "#9B9189" },
  { id: 2, slug: "suluboya", name: "Suluboya Atölyesi", desc: "Kağıt teknikleri, renk karışımları, malzeme önerileri", members: 1920, works: 3100, color: "#2B4F7A" },
  { id: 3, slug: "dijital", name: "Dijital Sanat Atölyesi", desc: "Tablet, yazılım, brush paketleri, UI/UX", members: 3650, works: 6800, color: "#C4522A" },
  { id: 4, slug: "3d", name: "3D ve Heykel", desc: "Clay, resin, 3D yazıcı, yüksek relief", members: 780, works: 1400, color: "#6B8C6B" },
  { id: 5, slug: "yagliboy", name: "Geleneksel Yağlıboya", desc: "Tuval, fırçalar, kansoya germe, vernikleme", members: 1240, works: 2100, color: "#8B6B4A" },
  { id: 6, slug: "manga", name: "Manga ve İllüstrasyon", desc: "Karakter tasarımı, hikaye panelleri, stil geliştirme", members: 2150, works: 2300, color: "#7B5EA7" },
  { id: 7, slug: "seramik", name: "Seramik ve Çini", desc: "Fırça, sırlama, fırın sıcaklıkları, pişirim teknikleri", members: 540, works: 890, color: "#4A7B8A" },
  { id: 8, slug: "ahsap", name: "Ahşap ve El Sanatları", desc: "Oyma, yakma, vernikleme, ahşap seçimi", members: 320, works: 540, color: "#8B6B4A" },
  { id: 9, slug: "kaligrafi", name: "Kaligrafi ve Yazı Sanatı", desc: "Hat, modern kaligrafi, uygulama alanları", members: 680, works: 720, color: "#9B9189" },
  { id: 10, slug: "konsept", name: "Konsept Art ve Tasarım", desc: "Karakter designi, ortam tasarımı, storyboard", members: 1100, works: 1900, color: "#C4522A" },
];

export const blogPosts = [
  { id: 1, slug: "suluboya-baslangic", title: "Suluboya'ya Nasıl Başladım?", author: "Elif Çizer", authorHandle: "elif_cizer", type: "Yapım Günlüğü", readTime: "4 dk", date: "12 Haz 2025", excerpt: "Üç yıl önce ilk fırçamı eline aldığımda ne yapacağımı bilmiyordum. Şimdi geriye bakınca...", colorA: "#1A3A5C", colorB: "#0A1E35" },
  { id: 2, slug: "dijital-tablet-rehberi", title: "500₺ Altında En İyi Dijital Tablet", author: "Can Yılmaz", authorHandle: "can_3d", type: "Malzeme Rehberi", readTime: "6 dk", date: "8 Haz 2025", excerpt: "Dijital sanata başlamak için ne kadar harcaman gerektiğini söyleyeyim: Sandığından az.", colorA: "#0A2A1A", colorB: "#051510" },
  { id: 3, slug: "1-yil-once-simdi", title: "1 Yıl Önce ve Şimdi", author: "Zeynep Aydın", authorHandle: "zeynep_art", type: "Retrospektif", readTime: "5 dk", date: "3 Haz 2025", excerpt: "Platform bana en büyük şeyi öğretti: kusursuz olmak için değil, büyümek için çiziyoruz.", colorA: "#2A1A3A", colorB: "#150D20" },
  { id: 4, slug: "kuru-firca-rehber", title: "Kuru Fırçayla Doku Oluşturma Rehberi", author: "Selin Yıldız", authorHandle: "selin_sanat", type: "Teknik Anlatım", readTime: "8 dk", date: "28 May 2025", excerpt: "Adım adım anlattığım bu teknikle tuvalinize sinema kalitesinde dokular ekleyebilirsiniz.", colorA: "#0A1A3A", colorB: "#050D1E" },
  { id: 5, slug: "karakalem-anatomisi", title: "Karakalem: Anatomi Değil, Duygu", author: "Burak Ateş", authorHandle: "burak_dijital", type: "Teknik Anlatım", readTime: "7 dk", date: "20 May 2025", excerpt: "Teknik doğru çizim öğretebilir. Ama bir çizimi hayat yapan şey teknik değil.", colorA: "#1A1A2A", colorB: "#0D0D15" },
  { id: 6, slug: "seramik-baslangic", title: "Seramikte İlk Adım: Çamur Korku Değil", author: "Ayşe Nur Kaya", authorHandle: "aysenur_cini", type: "Yapım Günlüğü", readTime: "3 dk", date: "15 May 2025", excerpt: "Ellerim çamurla kaplandığı an sanatla ilk gerçek temasımı kurdum.", colorA: "#1A2A2A", colorB: "#0D1515" },
];

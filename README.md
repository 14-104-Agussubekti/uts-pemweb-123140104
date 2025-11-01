# Proyek Ujian: React News Portal

# VoxA

**Nama:** Agus Subekti
**NIM:** 123140104

---

## 🚀 Link Deployment

Aplikasi ini telah di-deploy menggunakan Vercel dan dapat diakses melalui link berikut:

**[Link Deploy](https://uts-pemweb-123140104.vercel.app/)**

---

## 📸 Screenshot Aplikasi

<img width="960" height="418" alt="Screenshot 2025-11-01 162228" src="https://github.com/user-attachments/assets/4ad05a95-6e5d-4c8c-ba85-080f2e4103fe" />
<img width="960" height="415" alt="image" src="https://github.com/user-attachments/assets/5ae51c0f-5c8f-4d20-9e35-6066e9cc2a42" />
<img width="960" height="419" alt="Screenshot 2025-11-01 162311" src="https://github.com/user-attachments/assets/66e0dcb3-16f6-461d-b5d5-9dc077ac4ffb" />

---

## 📖 Deskripsi Proyek

Ini adalah aplikasi portal berita canggih yang dibuat dengan React dan Vite. Aplikasi ini mengambil data secara *real-time* dari **NewsAPI.org** dan menampilkannya dalam antarmuka *dark mode* yang elegan dan minimalis.

Desainnya terinspirasi oleh portal berita modern (seperti CNA), menggunakan tata letak 3-kolom modular untuk menampilkan "Berita Terbaru", "Artikel Utama", dan "Berita Terkait".

---

## ✨ Fitur Utama

Proyek ini telah mengalami refactor besar-besaran dan sekarang memiliki fitur-fitur berikut:

* **Palet Warna Elegan:** Menggunakan *dark mode* yang canggih (Deep Navy, Charcoal, dengan aksen Biru/Silver) untuk tampilan yang profesional.
* **Layout 3-Kolom (Modular):** Tata letak halaman utama menggunakan CSS Grid untuk membagi konten menjadi:
    * `sidebar-left` (Berita Terbaru)
    * `main-article-section` (Berita Utama)
    * `sidebar-right` (Berita Sampingan)
* **Header Interaktif:**
    * Logo di tengah.
    * Menu dropdown fungsional untuk "Edisi" (Edisi: Indonesia).
    * Ikon pencarian yang membuka overlay.
* **Overlay Pencarian (Search Overlay):** Menggantikan form pencarian lama dengan overlay *full-screen* yang bersih. Fitur ini juga dilengkapi tombol "Topik Trending" untuk pencarian cepat.
* **Format Waktu Dinamis:** Menggunakan library `date-fns` untuk mengubah timestamp API (misal: `2025-11-01T14:00:00Z`) menjadi format waktu relatif yang mudah dibaca ("2 jam yang lalu").
* **Penanganan Error Gambar (CORS):** Gambar yang gagal dimuat dari API (karena *hotlink protection* / `net::ERR_BLOCKED_BY_RESPONSE`) akan secara otomatis diganti dengan gambar *placeholder* lokal (`/placeholder.png`) menggunakan event `onError`.
* **Desain Responsif:** Layout beradaptasi dengan baik di perangkat desktop, tablet, dan mobile.

---

## 🛠️ Stack Teknologi

* **Framework:** ReactJS v18+ (dengan Functional Components & Hooks)
* **Build Tool:** Vite
* **State Management:** React Hooks (`useState`, `useEffect`)
* **HTTP Client:** Fetch API (bawaan browser)
* **Styling:** CSS Murni (Flexbox, Grid, Variabel, Media Queries)
* **API:** [NewsAPI.org](https://newsapi.org/)
* **Library Tambahan:**
    * `react-icons`: Untuk ikon di seluruh aplikasi.
    * `date-fns`: Untuk memformat tanggal relatif ("...yang lalu").

---

## 📦 Cara Instalasi & Menjalankan (Lokal)

Proyek ini diinisiasi menggunakan `npm create vite@latest`.

**1. Clone Repositori**
```bash
git clone https://github.com/14-104-Agussubekti/uts-pemweb-123140104.git

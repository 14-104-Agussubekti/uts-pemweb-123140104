# Proyek Ujian: VoxA

Proyek ini adalah aplikasi portal berita yang dibuat sebagai bagian dari ujian ReactJS. Aplikasi ini mengambil data secara *real-time* dari **NewsAPI.org** dan menampilkannya dalam antarmuka yang bersih, responsif, dan interaktif.

**Nama:** [Agus Subekti]
**NIM:** [123140104]


## 📸 Screenshot Aplikasi


## ✨ Fitur Utama

* **Navigasi Kategori:** Pengguna dapat memfilter berita berdasarkan kategori ("Beranda", "Technology", "Business", "Sports").
* **Pencarian Lanjutan:** Form pencarian memungkinkan pengguna mencari artikel berdasarkan *keyword* dan *tanggal* spesifik.
* **Filter Tambahan:** Pengguna juga dapat memfilter berita berdasarkan *bahasa* (misal: 'en', 'id', 'de').
* **Daftar Artikel (Card):** Tampilan daftar berita modern menggunakan CSS Grid, menampilkan thumbnail, judul, sumber, dan tanggal publikasi.
* **Pagination:** Navigasi halaman "Previous" dan "Next" untuk menjelajahi lebih banyak berita.
* **Indikator Loading & Error:** Umpan balik visual yang jelas saat aplikasi sedang mengambil data atau jika terjadi kesalahan API.
* **Desain Responsif:** Layout beradaptasi untuk perangkat desktop, tablet, dan mobile menggunakan CSS Murni.

---

## 🛠️ Stack Teknologi

* **Framework:** ReactJS v18+ (dengan Functional Components & Hooks)
* **Build Tool:** Vite
* **State Management:** React Hooks (`useState`, `useEffect`)
* **HTTP Client:** Fetch API (bawaan browser)
* **Styling:** CSS Murni (dengan Flexbox, Grid, dan Media Queries)
* **API:** [NewsAPI.org](https://newsapi.org/)
* **Library Tambahan:** `react-icons`

---

## 📦 Cara Instalasi & Menjalankan (Lokal)

Proyek ini diinisiasi menggunakan `npm create vite@latest`.

**1. Clone Repositori**

```bash
git clone 
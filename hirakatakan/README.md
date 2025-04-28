# Quiz Hirakatakan

Aplikasi quiz interaktif untuk belajar Hiragana, Katakana, dan Kanji bahasa Jepang.

## Struktur Direktori

```
quiz-hirakatakan/
├── index.html          ← Halaman pembuka (intro/menu)
├── selectscript.html   ← Halaman pemilihan huruf/kanji
├── selectcategory.html ← Halaman pemilihan categori dari huruf/kanji yg dipilih
├── game.html           ← Halaman kuis interaktif
├── result.html         ← Halaman hasil kuis
├── learning.html       ← Halaman untuk belajar
├── css/
│   └── style.css       ← Styling untuk semua halaman
├── js/
│   └── script.js       ← Semua function ada disini
└── img/
    ├── iconweb.ico     ← Ikon
    └── logo.jpg        ← logo
```

## Fitur
- Tema terang/gelap yang dapat diubah
- Quiz interaktif dengan berbagai kategori
- Halaman belajar dengan referensi karakter
- Dukungan untuk Hiragana, Katakana, dan Kanji
- Responsif untuk berbagai ukuran layar
- Fitur suara untuk pengucapan karakter (jika browser mendukung)

## Penggunaan
1. Buka `rvldx.my.id/hirakatakan` untuk memulai aplikasi
2. Pilih "Mulai Quiz" untuk memulai quiz atau "Sumber Belajar" untuk melihat referensi karakter
3. Untuk quiz, pilih jenis skrip (Hiragana, Katakana, atau Kanji) dan kategori yang ingin dipelajari
4. Jawab pertanyaan dan lihat hasil di akhir quiz

## Teknologi
- HTML5
- CSS3
- JavaScript (Vanilla)
- Web Speech API untuk fitur suara
- Canvas Confetti untuk efek visual

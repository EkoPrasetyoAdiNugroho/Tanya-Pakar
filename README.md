# Tanya Pakar 🏥👨‍⚕️

**Tanya Pakar** adalah sistem pakar berbasis web yang dirancang untuk mendiagnosa penyakit pada **Manusia**, **Hewan & Tanaman**, serta kerusakan **Hardware Komputer**. 

Aplikasi ini menggunakan metode **Forward Chaining** untuk menelusuri gejala secara cerdas dan **Certainty Factor (CF)** untuk menghitung tingkat keyakinan diagnosis, memberikan hasil yang akurat beserta rekomendasinya.

![Tanya Pakar Showcase](https://via.placeholder.com/800x400?text=Tanya+Pakar+Dashboard)

## 🌟 Fitur Unggulan

*   **Multi-Kategori Diagnosis**:
    *   🏥 **Manusia**: Flu, Tifus, DBD, Maag, COVID-19, dll.
    *   🐈 **Hewan & Tanaman**: Penyakit Kucing (Panleukopenia), Anjing (Parvo), Tanaman (Hama Kutu Putih).
    *   💻 **Hardware**: Kerusakan Laptop/HP (RAM, HDD, Baterai, Overheat).
*   **Smart Checklist System**: UI pemilihan gejala yang dinamis; sistem otomatis memfilter/menyembunyikan gejala yang tidak relevan berdasarkan pilihan pengguna.
*   **Kalkulasi Akurat**: Menggunakan algoritma Certainty Factor untuk memberikan persentase kemungkina.
*   **Rekomendasi Solusi**: Memberikan saran Tindakan Awal, Pencegahan, dan Pengobatan.
*   **Admin Dashboard**: Halaman admin untuk mengelola (CRUD) penyakit, gejala, dan aturan diagnosa.
*   **Responsive Design**: Tampilan modern dan responsif (Mobile-Friendly).

## 🛠️ Teknologi yang Digunakan

**Frontend:**
*   React.js (Vite)
*   Tailwind CSS (Styling)
*   Framer Motion (Animasi)
*   Axios (API Request)

**Backend:**
*   Node.js & Express.js
*   MongoDB (Database)
*   Mongoose (ODM)
*   JWT (Authentication)

## 🚀 Cara Menjalankan (Local)

### 1. Clone Repository
```bash
git clone https://github.com/username-anda/tanya-pakar.git
cd tanya-pakar
```

### 2. Setup Backend
Masuk ke folder backend, install dependencies, dan jalankan server.
```bash
cd backend
npm install
```

Buat file `.env` di dalam folder `backend` dan isi konfigurasi berikut:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/sistempakar
JWT_SECRET=rahasia_negara_api
NODE_ENV=development
```

Jalankan backend:
```bash
npm start
```
*Backend akan berjalan di port 5000 dan otomatis melakukan seeding data penyakit.*

### 3. Setup Frontend
Buka terminal baru, masuk ke folder frontend, dan jalankan aplikasi.
```bash
cd frontend
npm install
npm run dev
```
*Frontend akan berjalan di http://localhost:5173*.

## 🌐 Panduan Deployment (Vercel)

Aplikasi ini disiapkan untuk deployment modern.

1.  **Frontend**: Dapat dideploy langsung ke Vercel dengan menghubungkan repository GitHub.
2.  **Backend**: Disarankan menggunakan cloud database (**MongoDB Atlas**) agar bisa diakses secara online. Localhost MongoDB tidak akan bekerja di deployment Vercel.

## 📝 Lisensi

Project ini dibuat untuk tujuan edukasi dan pengembangan sistem pakar.

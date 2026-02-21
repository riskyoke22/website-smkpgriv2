# Website Profil Sekolah SMK Bimari

Website profil sekolah modern yang dibangun dengan Next.js 16, TypeScript, Tailwind CSS, dan Prisma ORM.

## Fitur Utama

### Frontend (User Side)
- ✅ Hero section fullscreen dengan slogan sekolah
- ✅ Navbar transparan yang berubah saat scroll
- ✅ Smooth scrolling
- ✅ Section Profil Sekolah
- ✅ Visi dan Misi
- ✅ Program Keahlian (6 jurusan)
- ✅ Fasilitas Sekolah
- ✅ Berita Terbaru (dinamis dari database)
- ✅ Galeri Kegiatan (dinamis dari database)
- ✅ Kontak dan Google Maps embed
- ✅ Footer lengkap dengan sosial media
- ✅ Responsive mobile-friendly
- ✅ Animasi ringan (fade-in, hover effects, glassmorphism)

### Backend (Admin Panel)
- ✅ Login & Logout menggunakan session
- ✅ Password menggunakan password_hash() dan password_verify()
- ✅ Dashboard admin modern
- ✅ CRUD Berita (judul, isi, upload gambar, tanggal otomatis)
- ✅ CRUD Galeri (judul, upload gambar, hapus)
- ✅ Validasi upload file (maks 2MB, format jpg/png/webp)
- ✅ Proteksi halaman admin

## Teknologi

- **Framework**: Next.js 16 dengan App Router
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui
- **Database**: SQLite dengan Prisma ORM
- **Authentication**: Session-based dengan bcryptjs
- **Icons**: Lucide React

## Struktur Database

### users
- id (String, primary key)
- username (String, unique)
- password (String, hashed)
- role (String, default: "admin")
- created_at (DateTime)
- updated_at (DateTime)

### berita
- id (String, primary key)
- judul (String)
- isi (String)
- gambar (String, optional)
- created_at (DateTime)
- updated_at (DateTime)

### galeri
- id (String, primary key)
- judul (String)
- gambar (String)
- created_at (DateTime)
- updated_at (DateTime)

## Instalasi & Menjalankan

### Prerequisites
- Node.js 18+ 
- Bun (recommended) atau npm
- Git

### Langkah-langkah

1. **Clone repository**
```bash
git clone <repository-url>
cd my-project
```

2. **Install dependencies**
```bash
bun install
```

3. **Setup environment**
```bash
# File .env sudah tersedia dengan konfigurasi default
```

4. **Setup database**
```bash
# Push schema ke database
bun run db:push

# Seed database dengan admin user dan sample data
bunx tsx prisma/seed.ts
```

5. **Jalankan development server**
```bash
bun run dev
```

6. **Buka browser**
```
http://localhost:3000
```

### Login Admin

- **URL**: http://localhost:3000/admin
- **Username**: admin
- **Password**: admin123

## Struktur Folder

```
/
├── prisma/
│   ├── schema.prisma       # Schema database
│   └── seed.ts             # Seed script
├── public/
│   └── uploads/            # Folder upload gambar
│       ├── berita/
│       └── galeri/
├── src/
│   ├── app/
│   │   ├── admin/          # Halaman admin
│   │   │   ├── dashboard/
│   │   │   ├── berita/
│   │   │   └── galeri/
│   │   ├── api/            # API Routes
│   │   │   ├── auth/       # Authentication
│   │   │   ├── berita/     # Berita CRUD
│   │   │   ├── galeri/     # Galeri CRUD
│   │   │   └── upload/     # File upload
│   │   └── page.tsx        # Landing page
│   ├── components/
│   │   └── ui/             # shadcn/ui components
│   └── lib/
│       └── db.ts           # Prisma client
├── db/
│   └── custom.db           # SQLite database
└── package.json
```

## API Routes

### Authentication
- `POST /api/auth/login` - Login admin
- `POST /api/auth/logout` - Logout admin
- `GET /api/auth/me` - Get current user

### Berita
- `GET /api/berita` - Get all berita
- `POST /api/berita` - Create new berita
- `GET /api/berita/[id]` - Get single berita
- `PUT /api/berita/[id]` - Update berita
- `DELETE /api/berita/[id]` - Delete berita

### Galeri
- `GET /api/galeri` - Get all galeri items
- `POST /api/galeri` - Create new galeri item
- `DELETE /api/galeri/[id]` - Delete galeri item

### Upload
- `POST /api/upload` - Upload image file

## Deployment

### Deployment ke Vercel (Recommended)

1. Push code ke GitHub
2. Import project ke Vercel
3. Configure environment variables
4. Deploy

### Manual Deployment

```bash
# Build project
bun run build

# Start production server
bun start
```

## Kontribusi

1. Fork project
2. Buat branch fitur (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buka Pull Request

## Lisensi

This project is licensed under the MIT License.

## Kontak

- **Email**: info@smkbimari.sch.id
- **Phone**: (0351) 123-4567
- **Address**: Jl. Pendidikan No. 123, Wonoasri, Madiun

---

Dibuat dengan ❤️ untuk SMK Bimari

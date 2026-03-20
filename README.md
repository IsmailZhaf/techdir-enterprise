# TechDir Enterprise

Internal HR Management Console untuk mengelola data karyawan perusahaan.

---

## Tech Stack

- **React** + **TypeScript** + **Vite**
- **Tailwind CSS** + **shadcn/ui**
- **TanStack Query** — data fetching & caching
- **Jotai** — global state management
- **React Router DOM** — routing
- **Axios** — HTTP client
- **React Hook Form** — form state management
- **Zod** — schema validation
- **jwt-decode** — decode dan validasi JWT token
- **Tailwind CSS** — utility-first CSS framework
- **shadcn/ui** — reusable component library

---

## Setup

### 1. Clone repository

```bash
git clone https://github.com/IsmailZhaf/techdir-enterprise.git
cd techdir-enterprise
```

### 2. Install dependencies

```bash
npm install
```

### 3. Buat file environment

Buat file `.env` di root project:

```env
VITE_API_BASE_URL=https://dummyjson.com
```

---

## Cara Run

### Development

```bash
npm run dev
```

Aplikasi akan berjalan di `http://localhost:5173`

### Build

```bash
npm run build
```

### Preview build

```bash
npm run preview
```

---

## Testing

```bash
# Jalankan semua test
npm test

# Jalankan dengan UI
npm run test:ui
```

---

## Folder Structure

```
<ul>
    <li>atoms : Folder untuk menyimpan atom yang digunakan untuk global state management </li>
    <li>components : Folder untuk menyimpan components</li>
    <li>hooks : Folder yang berisi custom hooks yang berisi logic dari aplikasi </li>
    <li>libs : Folder yang berisi fungsi-fungsi pembantu atau helper </li>
    <li>pages: Folder yang berisi halaman-halaman utama dari aplikasi </li>
    <li>services : Folder yang berfungsi untuk berkomunikasi dengan API </li>
    <li>test : Folder tempat menyimpan setup untuk testing </li>
    <li>types : Folder tempat menyimpan TypeScript type dan interface yang dipakai di seluruh aplikasi </li>
</ul>

```

---

## Default Login

```
Username : emilys
Password : emilyspass
```

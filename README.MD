# Vote CSUI

_Website_ sederhana untuk _voting_ nama angkatan menggunakan SSO UI.

## Daftar Isi

## Penjelasan Awal

#### Kriteria Pemilihan Nama Angkatan

Jika sekarang adalah tahun **`n`**, maka :

- Nama angkatan yang dipilih adalah nama angkatan untuk CSUI angkatan tahun **`n`**;
- _User_ yang dapat ikut memilih nama angkatan hanyalah **mahasiswa Fakultas Ilmu Komputer** angkatan **`n-1`**, **`n-2`**, **`n-3`**, dst dengan syarat akun SSO UI-nya masih aktif.

#### Hasil Pemilihan Nama Angkatan

- Hasil pemilihan nama angkatan dapat dilihat pada _route_ `/result`
- Admin hanya terdiri atas 1 (satu) orang dan hanya admin yang dapat melihat hasil pemilihan nama angkatan.

## Konfigurasi Awal

1. _Fork_ repositori ini ke GitHub.
2. _Clone_ repositori ke komputer.
3. Atur _Deadline Voting_ dan Pilihan Calon Nama Angkatan

   - Buka _file_ `serverData.json`

     ```
     {
         "deadlineVoting": "October 30, 2020 23:55:00",
         "calonNamaAngkatan": ["satu", "dua", "tiga", "empat"]
     }
     ```

   - Ubah _value_ dari deadlineVoting dengan format `"Month DD, YYYY HH:MM:SS"`
   - Ubah _value_ dari calonNamaAngkatan sesuai pilihan calon nama angkatan yang telah ditentukan
     > Perlu diperhatikan bahwa `"maung"` dan `"Maung"` adalah 2 (dua) calon nama angkatan yang berbeda.

4. Atur _Icon_ dan _Background Image (optional)_
   - Letakkan _file_ untuk _icon_ dengan nama _file_ `icon.jpg` pada _directory_ `./static/img/`
   - Letakkan _file_ untuk _background image_ dengan nama _file_ `background-desktop.png` pada _directory_ `./static/img/`
   - Struktur _folder_ akan menjadi seperti berikut :
     ```
     vote-csui
     ├── app
     |   └──	...
     ├── static
     |   ├── css
     |   |	└── ...
     |   ├── img
     |   |	├── icon.jpg
     |   |	└── background-desktop.png
     |   ├── js
     |   |	└── ...
     |   └──	...
     └── ...
     ```

## _Deployment_

## Khusus _Contributors_

#### Membuat _File_ .env

File `.env` merupakan file yang berisi _environment variable_ yang akan digunakan jika program dijalankan di _local_.

1.  Buatlah file `.env` pada _root_ repositori.
2.  Isi file `.env` seperti contoh yang ada di file `.env.sample`.

        PORT=3000
        ADMIN_SSO=username.ssoui
        DATABASE_URL=postgres://user:pass@localhost:5432/dbname

    > _Value_ dari `ADMIN_SSO` adalah _username_ SSO-UI milik seseorang yang akan menjadi admin.
    >
    > _Value_ dari `user`, `pass`, dan `dbname` berlaku untuk _database local_.

#### _Install Dependencies_

     npm install

#### Menjalankan Program

     npm run dev

## Lisensi

# Vote CSUI

_Website_ sederhana untuk _voting_ nama angkatan Fasilkom menggunakan SSO UI.

![Screenshot-1](https://i.imgur.com/gm8FxmE.png)
![Screenshot-2](https://i.imgur.com/vKjWbwU.png)
![Screenshot-3](https://i.imgur.com/1kWjcFg.png)

## Daftar Isi

1. [Penjelasan Singkat](#penjelasan-singkat)
2. [Persiapan Awal](#persiapan-awal)
3. [_Deployment_](#deployment)
4. [Petunjuk Khusus _Contributors_](#petunjuk-khusus-contributors)
5. [_Contributors_](#contributors)

## Penjelasan Singkat

#### Kriteria Pemilihan Nama Angkatan

Jika sekarang adalah tahun **`n`**, maka :

- Nama angkatan yang dipilih adalah nama angkatan untuk CSUI angkatan tahun **`n`**
- _User_ yang dapat ikut memilih nama angkatan hanyalah **mahasiswa Fakultas Ilmu Komputer** angkatan tahun **`n-1`**, **`n-2`**, **`n-3`**, dst dengan syarat akun SSO UI-nya masih aktif

#### Hasil Pemilihan Nama Angkatan

- Hasil pemilihan nama angkatan dapat dilihat pada _route_ `/result`
- Admin hanya terdiri atas 1 (satu) orang dan hanya admin yang dapat melihat hasil pemilihan nama angkatan

## Persiapan Awal

1. _Clone_ repositori ke komputer
   ```
   $ git clone https://github.com/raryasdya/vote-csui vote-csui
   ```
2. Atur _deadine voting_ dan pilihan calon nama angkatan

   - Buka _file_ `serverData.json`

     ```
     {
         "deadlineVoting": "October 30, 2020 23:55:00",
         "calonNamaAngkatan": ["satu", "dua", "tiga", "empat"]
     }
     ```

   - Ubah _value_ dari deadlineVoting dengan format `"Month DD, YYYY HH:MM:SS"`
   - Ubah _value_ dari calonNamaAngkatan sesuai pilihan calon nama angkatan yang telah ditentukan

     > Perlu diperhatikan bahwa `"maung"` dan `"Maung"` adalah 2 (dua) calon nama angkatan yang berbeda

3. Atur _icon_ dan _background image_
   - Letakkan _file_ untuk _icon_ dengan nama _file_ `icon.png` pada _directory_ `./static/img/`
   - Letakkan _file_ untuk _background image_ dengan nama _file_ `background-desktop.png` pada _directory_ `./static/img/`
4. Pastikan struktur _folder_ adalah seperti berikut :
   ```
   vote-csui
   ├── app
   |   ├── controllers
   |   |   └── ...
   |   └── models
   |       └── ...
   ├── static
   |   ├── css
   |   |	└── ...
   |   ├── img
   |   |	├── icon.png
   |   |	└── background-desktop.png
   |   ├── js
   |   |	└── ...
   |   └──	...
   ├── serverData.json
   └── ...
   ```
5. _Add_ repositori
   ```
   $ git add .
   ```
6. _Commit_ repositori
   ```
   $ git commit -m "Update data"
   ```

## _Deployment_

1. Install Heroku CLI
2. Buka terminal
3. Login ke Heroku
   ```
   $ heroku login
   ```
4. Buat app Heroku
   ```
   $ heroku create <nama_app>
   ```
5. Buat _database_ postgres
   ```
   $ heroku addons:create heroku-postgresql:hobby-dev
   ```
6. Tambahkan _configuration variable_ `ADMIN_SS0`
   ```
   $ heroku config:set ADMIN_SSO=<username_SSO_UI_admin>
   ```
   > _Value_ dari `ADMIN_SSO` adalah _username_ SSO-UI milik seseorang yang akan menjadi admin
7. Tambahkan _configuration variable_ `URL`
   ```
   $ heroku config:set URL=http://<nama_app>.herokuapp.com
   ```
8. Deploy repositori ke Heroku
   ```
   $ git push heroku master
   ```

## Petunjuk Khusus _Contributors_

#### Membuat _File_ .env

File `.env` merupakan file yang berisi _environment variable_ yang akan digunakan jika program dijalankan di _local_.

1.  Buatlah file `.env` pada _root_ repositori
2.  Isi file `.env` seperti contoh yang ada di file `.env.sample`

        PORT=3000
        ADMIN_SSO=username.ssoui
        DATABASE_URL=postgres://user:pass@localhost:5432/dbname

    > _Value_ dari `ADMIN_SSO` adalah _username_ SSO-UI milik seseorang yang akan menjadi admin
    >
    > _Value_ dari `user`, `pass`, dan `dbname` berlaku untuk _database local_

#### _Install Dependencies_

     $ npm install

#### Menjalankan Program

     $ npm run dev

## _Contributors_

Muhammad Indra Ramadhan / [indravb6](https://github.com/indravb6)

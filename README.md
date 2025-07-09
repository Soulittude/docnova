# Docnova

**Basit bir fatura yönetim uygulaması**

Bu proje, React.js, Redux Toolkit ve Ant Design kullanarak 3 sayfalı bir örnek web uygulaması sunar:

1. **Login Sayfası**
2. **Fatura Listesi Sayfası**
3. **Fatura Detay Sayfası**

---

## Teknolojiler

* React.js (Vite)
* Redux Toolkit (veri yönetimi)
* Ant Design (UI bileşenleri)
* React Router (sayfa geçişleri)
* i18next & react-i18next (çoklu dil desteği)
* axios (API çağrıları)

## Kurulum

1. Repoyu klonlayın:

   ```bash
   git clone https://github.com/Soulittude/docnova.git
   cd docnova
   ```
2. Gerekli kütüphaneleri yükleyin:

   ```bash
   npm install
   ```
3. Çeviri dosyaları için `public/locales` klasör yapısını koruduğunuzdan emin olun:

   ```text
   public/
   └─ locales/
      ├─ en/translation.json
      └─ tr/translation.json
   ```

## Geliştirme Ortamı Ayarları

* **Vite Proxy**: CORS sorunlarını engellemek için, `vite.config.js` içinde `/api` proxy yapılandırması eklendi. Tüm API çağrıları `/api/auth` ve `/api/invoice` prefix’i ile gönderilmeli.

```js
// vite.config.js
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://api-dev.docnova.ai',
        changeOrigin: true,
        secure: false,
        rewrite: path => path.replace(/^\/api/, ''),
        configure: proxy => proxy.on('proxyReq', req => req.removeHeader('origin')),
      },
    },
  },
});
```

## Çalıştırma

```bash
npm run dev
```

Tarayıcıda otomatik açılan adres genellikle `http://localhost:5173` olur. Oturum açmak için `/login` sayfasına gidin; başarılı girişten sonra `/invoices` sayfasına yönlendirilirsiniz.

## Auth Persistence ve Logout

* Giriş başarılı olunca `auth` slice’ı `localStorage`’e kaydedilir ve sayfa yenilendiğinde yeniden yüklenir.
* **Logout** butonu, `logout` action’ını dispatch edip hem Redux store hem de `localStorage`’ı temizler, ardından `/login` sayfasına yönlendirir.

## Proje Yapısı

```text
src/
├─ api/
│   ├─ auth.js             # Login API client
│   └─ invoice.js          # Invoice arama API client
├─ components/
│   ├─ LanguageSwitcher.jsx # Dil değiştirme butonu
│   └─ LogoutButton.jsx     # Oturumu kapatma butonu
├─ features/
│   ├─ auth/
│   │   ├─ authSlice.js
│   │   └─ authThunks.js
│   └─ invoice/
│       ├─ invoiceSlice.js
│       └─ invoiceThunks.js
├─ pages/
│   ├─ LoginPage.jsx
│   ├─ InvoiceListPage.jsx
│   └─ InvoiceDetailPage.jsx
├─ store/
│   └─ index.js            # Redux store + preloadedState
├─ utils/
│   └─ localStorage.js     # Auth persistence helpers
├─ i18n.js                 # i18next config
├─ App.jsx                 # Router ve layout
└─ main.jsx                # Application bootstrap
```

## Kullanım

1. **Login**: E-posta ve parola girin:

   * Email: `devmelauser@yopmail.com`
   * Parola: `Work123???`
2. **Fatura Listesi**: Başarılı giriş sonrası `/invoices` sayfası.
3. **Fatura Detay**: Listeden "Detay" butonuna tıklayın.

## Postman ile Test

1. **Login** isteği:

   * URL: `https://api-dev.docnova.ai/auth/login/dev`
   * Method: `POST`
   * Body:

     ```json
     { "email": "devmelauser@yopmail.com", "password": "Work123???" }
     ```
2. Dönen `jwt` değerini kopyalayın.
3. **Invoice Search** isteği:

   * URL: `https://api-dev.docnova.ai/invoice/search`
   * Method: `POST`
   * Headers:

     * `Content-Type: application/json`
     * `R-Auth: <jwt>`
   * Body:

     ```json
     {
       "companyId": "01c880ca-46b5-4699-a477-616b84770071",
       "documentType": "OUTGOING",
       "startDate": "2025-06-27T00:00:00.000Z",
       "endDate": "2025-07-04T08:31:10.422Z",
       "page": 0,
       "size": 20,
       "referenceDocument": "",
       "type": null,
       "status": null,
       "paymentStatus": null,
       "isDeleted": false
     }
     ```

---

## Lisans

MIT © 2025

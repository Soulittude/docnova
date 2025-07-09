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

1. Depoyu klonlayın:

   ```bash
   git clone https://github.com/Soulittude/docnova.git
   cd docnova
   ```
2. Bağımlılıkları yükleyin:

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

## Çalıştırma

```bash
npm run dev
```

Tarayıcıda otomatik açılan adres genellikle `http://localhost:5173` olur.

## Ortam Değişkenleri

Eğer loginin dummy bir token ile simüle edilmesi gerekiyorsa, proje kökünde bir `.env` dosyası oluşturup:

```env
VITE_DUMMY_JWT=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

şeklinde tanımlayabilirsiniz.

## Proje Yapısı

```
src/
├─ api/                # axios istemcileri
│   ├─ auth.js         # login endpoint
│   └─ invoice.js      # invoice arama endpoint
├─ features/
│   ├─ auth/           # authSlice + authThunks
│   └─ invoice/        # invoiceSlice + invoiceThunks
├─ pages/
│   ├─ LoginPage.jsx
│   ├─ InvoiceListPage.jsx
│   └─ InvoiceDetailPage.jsx
├─ store/              # Redux store
│   └─ index.js
├─ i18n.js             # i18next konfigürasyonu
├─ App.jsx             # router + layout
└─ main.jsx            # uygulama başlatma
```

## Kullanım

1. **Login**: `devmelauser@yopmail.com` / `Work123???`
2. **Fatura Listesi**: Başarıyla giriş yaptıktan sonra otomatik `/invoices` sayfasına yönlendirilirsiniz.
3. **Fatura Detay**: Listeden "Detay" butonuna tıklayarak.

## Simülasyon (Backend Hatası Durumunda)

Eğer gerçek JWT alınamıyorsa, invoice bileşenlerini test etmek için authSlice içinde dummy bir token kullanabilirsiniz:

```js
// src/features/auth/authSlice.js
const initialState = {
  user: { jwt: import.meta.env.VITE_DUMMY_JWT },
  status: 'succeeded',
  error: null
};
```

Bu sayede `fetchInvoices` thunk’ı taşınılan `jwt` ile çağrılır ve invoice listesi mock veya gerçek API’dan test edilebilir.

---

## Lisans

MIT © 2025

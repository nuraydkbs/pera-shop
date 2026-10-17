# Pera Shop

Ürün ekleme, listeleme, düzenleme ve silme işlemlerini yapabileceğin basit bir React uygulaması. Ürünler sunucuya gönderilmez; kullandığın tarayıcının LocalStorage alanında saklanır.

## Başlangıç

1. Bilgisayarında Node.js'in güncel LTS sürümünü kur: https://nodejs.org/
2. Terminalde proje klasörüne geç: `cd ~/dukkanim`
3. Bağımlılıkları kur: `npm install`
4. Geliştirme sunucusunu başlat: `npm run dev`
5. Terminalde gösterilen yerel adresi tarayıcıda aç.

Üretim derlemesini kontrol etmek için `npm run build` komutunu çalıştır. Derleme çıktısı `dist` klasörüne yazılır.

## Klasör yapısı

```text
src/
  components/     Tekrar kullanılan React parçaları
  pages/          Ürünler sayfası
  utils/          LocalStorage ve örnek ürün verileri
  App.jsx         Uygulama başlangıç bileşeni
  main.jsx        React giriş noktası
  styles.css      Uygulamanın CSS stilleri
```

İlk açılışta örnek ürünler görünür. Değişiklikler aynı tarayıcıda saklanır. Tarayıcı verilerini temizlersen ürün kayıtları da silinir. Ürün görseli eklemek için görselin internet adresini kullan.

## GitHub

Proje klasöründe Git deposu oluşturup GitHub'da boş bir depo aç. Ardından GitHub'ın verdiği uzak depo adresini ekleyerek projeyi gönder:

```bash
git init
git add .
git commit -m "Dukkanim uygulamasini olustur"
git branch -M main
git remote add origin GITHUB_DEPO_ADRESI
git push -u origin main
```

`GITHUB_DEPO_ADRESI` yerine GitHub'da oluşturduğun deponun adresini yaz.

## Netlify

Netlify'da **Add new site** > **Import an existing project** adımlarını izleyip GitHub deponu seç. Yapılandırma `netlify.toml` içinde hazırdır: derleme komutu `npm run build`, yayın klasörü `dist`.

> Bu başlangıç projesi veritabanı veya çevrim içi eşitleme içermez. LocalStorage kayıtları yalnızca mevcut tarayıcıda bulunur.
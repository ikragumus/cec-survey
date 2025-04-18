// Uygulamanın başlangıç noktası

// kütüphaneleri import ettik
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var databaseConnection=require("./db-action.js");
var indexRouter = require('./routes/index'); // index.js dosyasını import ettik ve indexRouter değişkenine atadık
const xss = require('xss-clean');

var app = express(); // express uygulamasını oluşturduk
databaseConnection()
// Burada ayar çektik
const rateLimit = require('express-rate-limit');

const anketLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 dakika
  max: 100, // Maksimum 100 istek
  message: 'Çok fazla istek gönderdiniz. Lütfen biraz sonra tekrar deneyin.'
});

const helmet = require('helmet');

app.use(helmet());
app.use(xss());
app.use(express.json({ limit: '10kb' }));
app.use(logger('dev')); // logları konsola yazdırmak için
app.use(express.json()); // json veri almak için
app.use(express.urlencoded({ extended: false })); // urlencoded veri almak için
app.use(cookieParser()); // cookie işlemleri için
// Burada bütün methodları yönlendirdik

app.use('/surveys', indexRouter); // domain.tdl/deneme -> indexRouter (/routes/index.js) dosyasına yönlendirme yaptık

//app.use("/baskabiradres", baskaRouter); // domain.tld/baskabiradres -> baskaRouter dosyasına yönlendirme yapar (burası yorum satırı olduğu için çalışmayacak)

// ilk çalıştırmada önce kütüphaneleri yüklemek için npm install yazmalıyız
// sonra uygulamayı çalıştırmak için npm start yazmalıyız
// npm start dediğimizde bu dosya çalışacak

module.exports = app; // app.js dosyasını dışarıya açtık
// Bu dosyayı require eden dosyada app değişkenine ulaşabiliriz

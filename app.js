// kütüphaneleri import ettik
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var databaseConnection=require("./db-action.js");
var surveyRouter = require('./routes/survey'); // survey.js dosyasını import ettik ve surveyRouter değişkenine atadık
var answerRouter = require('./routes/answer'); // answer.js dosyasını import ettik ve answerRouter değişkenine atadık
const xss = require('xss-clean');
var app = express(); // express uygulamasını oluşturduk
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
require('dotenv').config(); // .env dosyasını kullanabilmek için dotenv kütüphanesini import ettik

const anketLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 dakika
  max: 100, // Maksimum 100 istek
  message: 'Çok fazla istek gönderdiniz. Lütfen biraz sonra tekrar deneyin.'
});

databaseConnection()

// Burada ayar çektik
app.use(helmet());
app.use(xss());
app.use(express.json({ limit: '10kb' }));
app.use(logger('dev')); // logları konsola yazdırmak için
app.use(express.json()); // json veri almak için
app.use(express.urlencoded({ extended: false })); // urlencoded veri almak için
app.use(cookieParser()); // cookie işlemleri için

app.use('/surveys', surveyRouter); // domain.tdl/surveys -> surveyRouter (/routes/survey.js) dosyasına yönlendirme yaptık

//app.use("/baskabiradres", baskaRouter); // domain.tld/baskabiradres -> baskaRouter dosyasına yönlendirme yapar (burası yorum satırı olduğu için çalışmayacak)

module.exports = app;

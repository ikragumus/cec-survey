var express = require('express');
var router = express.Router();
var Survey = require('../models/Survey');
var Answer = require('../models/Answer');
// req: request -> gelen istek
// res: response -> cevap
// next: sonraki işlem

//CEVAP EKLEMEK İÇİN KULLANILACAK ENDPOİNT YAZILACAK

// burası cevapları almak için kullanılan bir endpoint
router.get('/:survey_id/answers', async (req, res) => {
  try {
    // KULLANICININ CEVAPLARI GÖRME YETKİSİ VAR MI KONTROL EDİLECEK
    const answers = await Answer.find({ survey: req.params.survey_id });

    res.json({
      //buraya veri tabanından gelen cevaplar verisini yazdıracağız
    });
  } catch (err) {
    res.status(500).json({ error: 'Anket getirilirken hata oluştu.' });
  }
});

// burası answer_id'ye sahip id li cevabı güncellemek için kullanılan bir endpoint
router.put('/:answer_id', async (req, res) => {
  try {
    // KULLANICININ CEVAPLARI GÜNCELLEME YETKİSİ VAR MI KONTROL EDİLECEK
    const updateAnswer = await Answer.findByIdAndUpdate(
      req.params.answer_id,
      req.body,
      { new: true }
    );

    res.json({
      //buraya verinin güncellendiği mesajını yazdıracağız
    });
  } catch (err) {
    res.status(500).json({ error: 'Anket güncellenirken hata oluştu.' });
  }
});

// burası cevap silmek için kullanılan bir endpoint
router.delete('/:answer_id', async (req, res) => {
  try {
    // KULLANICININ CEVAPLARI SİLME YETKİSİ VAR MI KONTROL EDİLECEK
    const deletedAnswer = await Answer.findBYIdAndDelete(req.params.answer_id);

    if (!deletedAnswer) {
      return res.status(404).json({ error: "Cevap bulunamadı" });
    }
    
    res.json({ message: "Cevap başarıyla silindi." })
  } catch (err) {
    res.status(500).json({ error: 'Anket getirilirken hata oluştu.' });
  }
});

module.exports = router;

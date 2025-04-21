var express = require('express');
var router = express.Router();
var Survey = require('../models/Survey');
var Answer = require('../models/Answer');
// req: request -> gelen istek
// res: response -> cevap
// next: sonraki işlem

// burası anketleri almak için kullanılan bir endpoint
router.get('/', async (req, res) => {
  try {
    const surveys = await Survey.find({});

    res.json(surveys);
  } catch (error) {
    res.status(500).json({ error: 'Anketleri getirirken bir hata oluştu.' });
  }
});

// burası anket eklemek için kullanılan bir endpoint
router.post('/', async (req, res) => {
  try {
    // KULLANICININ ANKET OLUŞTURMA YETKİS VAR MI KONTROL EDİLECEK
    let perms = []
    req.user.roles.forEach(async roleId => {
      const role = await mongoose.model("Role").findById(roleId)
      role.permissions.forEach(perm =>{
        perms.push(perm)
      })
    });

    // ANKET OLUŞTURMA KODU YAZILACAK

    res.status(201).json({
      id: newSurvey._id,
      title: newSurvey.title,
      status: newSurvey.status
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Anket oluşturulurken bir hata oluştu.' });
  }
});

// burası anketi id'sine göre almak için kullanılan bir endpoint
router.get('/:survey_id', async (req, res) => {
  try {
    // KULLANICININ ANKETİ GÖRME YETKİSİ VAR MI KONTROL EDİLECEK

    const survey = await Survey.findById(req.params.survey_id);

    if (!survey) {
      return res.status(404).json({ error: 'Anket bulunamadı' });
    }

    res.json({
      id: survey._id,
      title: survey.title,
      questions: survey.questions
    });
  } catch (err) {
    res.status(500).json({ error: 'Anket getirilirken hata oluştu.' });
  }
});

router.put('/:survey_id', async (req, res) => {
  try {
    // KULLANICININ ANKETİ GÜNCELLEME YETKİSİ VAR MI KONTROL EDİLECEK

    const { title, description } = req.body; // Güncellenen verileri al


    // AŞAĞIDAKİ KISIMDA SADECE TİTLE VE DESCRİPTİON DEĞİŞTİRİLİYOR, DİĞER VERİLERİNDE GÜNCELLENMESİ LAZIM

    // Güncellenen alanları içeren bir nesne oluştur
    const updateData = {};
    if (title) updateData.title = title;
    if (description) updateData.description = description;

    // Anketi güncelle
    const updatedSurvey = await Survey.findByIdAndUpdate(
      req.params.survey_id,
      { $set: updateData },
      { new: true, runValidators: true } // Güncellenmiş anketi döndür ve doğrulamaları çalıştır
    );

    if (!updatedSurvey) {
      return res.status(404).json({ error: 'Anket bulunamadı' });
    }

    res.json({ message: 'Anket güncellendi.', survey: updatedSurvey });
  } catch (err) {
    res.status(500).json({ error: 'Anket güncellenirken hata oluştu.' });
  }
});

// burası anket silmek için kullanılan bir endpoint
router.delete('/:survey_id', async (req, res) => {
  try {
    // KULLANICININ ANKETİ SİLME YETKİSİ VAR MI KONTROL EDİLECEK

    const deletedSurvey = await Survey.findByIdAndDelete(req.params.survey_id);

    if (!deletedSurvey) {
      return res.status(404).json({ error: 'Anket bulunamadı' });
    }

    res.json({ message: 'Anket silindi.' });
  } catch (err) {
    res.status(500).json({ error: 'Anket silinirken hata oluştu.' });
  }
});

module.exports = router;

var express = require('express');
var router = express.Router();
var Survey = require('../models/Survey');
var Answer=require('../models/Answer');
// req: request -> gelen istek
// res: response -> cevap
// next: sonraki işlem

router.get('/', async (req, res) => {
  try {
    const surveys = await Survey.find({});
    const surveyMap = surveys.reduce((map, survey) => {
      map[survey._id] = survey;
      return map;
    }, {});

    res.json(surveyMap);
  } catch (error) {
    res.status(500).json({ error: 'Anketleri getirirken bir hata oluştu.' });
  }
});
router.post('/', async (req, res) => {
  try {
    

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
router.get('/:survey_id', async (req, res) => {
  try {
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
    const { title, description } = req.body; // Güncellenen verileri al

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
router.delete('/:survey_id', async (req, res) => {
  try {
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

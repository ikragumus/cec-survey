var express = require('express');
var router = express.Router();
var Survey = require('../models/Survey');
var Answer=require('../models/Answer');
// req: request -> gelen istek
// res: response -> cevap
// next: sonraki işlem


router.get('/:survey_id/answers', async (req, res) => {
  //burada answer şemasındaki verilerin içinden survey verisi req.params.survey_id olanları listeleyen kod
  try {
    const answers = await Answer.find({ survey: req.params.survey_id });
    res.json({
     
    });
  } catch (err) {
    res.status(500).json({ error: 'Anket getirilirken hata oluştu.' });
  }
});
router.put('/:answer_id', async (req, res) => {
  //burada answer şemasındaki answer_id ye sahip idli cevabı düzenleme kodu
  try {
    const updateAnswer= await Answer.findByIdAndUpdate(
      req.params.answer_id,

      req.body,
      {new:true}
    );
    res.json({
     
    });
  } catch (err) {
    res.status(500).json({ error: 'Anket getirilirken hata oluştu.' });
  }
});
router.delete('/:answer_id', async (req, res) => {
  //burada answer şemasındaki answer_id sahip idli cevabı silme kodu
  try {
    const deletedAnswer=await Answer.findBYIdAndDelete(req.params.answer_id);
    if(!deletedAnswer){
      return res.status(404).json ({error:"Cevap bulunamadı"});
    }
    res.json({message:"Cevap başarıyla silindi."})
    res.json({
     
    });
  } catch (err) {
    res.status(500).json({ error: 'Anket getirilirken hata oluştu.' });
  }
});
module.exports = router;

const mongoose = require('mongoose');

// Soruların alt yapısını tanımla (Her soru için)
const QuestionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  type: {
    type: String,  // Soru tipi (çoktan seçmeli, metin, vb.)
    required: true,  // Bu alan zorunludur
    enum: ['multiple-choice', 'text', 'rating']  // Sadece bu seçeneklerden biri olabilir
  },
  options: [{ type: String }],
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, default: 'active' },
});

// Ana anket (Survey) şeması
const SurveySchema = new mongoose.Schema({
  title: { type: String, required: true },          // Anket Başlığı
  description: { type: String, required: true },    // Anket Açıklaması
  questions: { type: [QuestionSchema], required: true },  // Sorular dizisi (obje olarak)
  date: { type: Date, default: Date.now }           // Oluşturulma tarihi
});

// Model olarak dışa aktar
module.exports = mongoose.model('Survey', SurveySchema);


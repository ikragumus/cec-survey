
const mongoose = require('mongoose');

// Cevap (Answer) şeması
const AnswerSchema = new mongoose.Schema({
    survey: { 
        type: mongoose.Schema.Types.ObjectId,  // Anket ID
        ref: 'Survey',                         // Hangi ankete ait
        required: true
    },
    user: { 
        type: mongoose.Schema.Types.ObjectId,  // Kullanıcı ID
        ref: 'User',                           // Kim doldurdu
        required: true
    },
    answers: { 
        type: [String],                        // Cevaplar dizisi
        required: true
    },
    createdAt: { 
        type: Date,                            // Ne zaman dolduruldu
        default: Date.now                      // Otomatik eklenir
    }
});

module.exports = mongoose.model('Answer', AnswerSchema);

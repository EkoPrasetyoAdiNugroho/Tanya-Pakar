const mongoose = require('mongoose');

const DiseaseSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['human', 'animal', 'hardware'],
        required: true
    },
    recommendation: {
        initialAction: [String], // Pertolongan pertama / Solusi ringan
        prevention: [String],    // Pencegahan / Hal yang dihindari
        treatment: [String],     // Pengobatan / Servis / Tindakan lanjut
        risk: String             // Risiko jika dibiarkan (Hardware)
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Disease', DiseaseSchema);

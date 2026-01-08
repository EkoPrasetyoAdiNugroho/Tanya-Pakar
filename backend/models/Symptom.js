const mongoose = require('mongoose');

const SymptomSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    question: {
        type: String, // "Apakah [gejala]?"
        required: true
    },
    category: {
        type: String,
        enum: ['human', 'animal', 'hardware'],
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Symptom', SymptomSchema);

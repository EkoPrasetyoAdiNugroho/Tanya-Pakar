const mongoose = require('mongoose');

const RuleSchema = new mongoose.Schema({
    disease: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Disease',
        required: true
    },
    symptoms: [{
        symptom: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Symptom'
        },
        cf_weight: {
            type: Number,
            required: true,
            min: 0,
            max: 1 // Certainty Factor usually 0 to 1
        }
    }],
    category: {
        type: String,
        enum: ['human', 'animal', 'hardware'],
        required: true
    }
});

module.exports = mongoose.model('Rule', RuleSchema);

const Disease = require('../models/Disease');
const Symptom = require('../models/Symptom');
const Rule = require('../models/Rule');

// --- Disease CRUD ---
exports.createDisease = async (req, res) => {
    try {
        const disease = await Disease.create(req.body);
        res.status(201).json({ success: true, data: disease });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

exports.getDiseases = async (req, res) => {
    try {
        const diseases = await Disease.find();
        res.status(200).json({ success: true, count: diseases.length, data: diseases });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

exports.deleteDisease = async (req, res) => {
    try {
        await Disease.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// --- Symptom CRUD ---
exports.createSymptom = async (req, res) => {
    try {
        const symptom = await Symptom.create(req.body);
        res.status(201).json({ success: true, data: symptom });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

exports.getSymptoms = async (req, res) => {
    try {
        const symptoms = await Symptom.find();
        res.status(200).json({ success: true, count: symptoms.length, data: symptoms });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

exports.deleteSymptom = async (req, res) => {
    try {
        await Symptom.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// --- Rule CRUD ---
exports.createRule = async (req, res) => {
    try {
        // Check if rule for disease already exists
        const existingRule = await Rule.findOne({ disease: req.body.disease });
        if (existingRule) {
            return res.status(400).json({ success: false, error: 'Rule for this disease already exists' });
        }
        const rule = await Rule.create(req.body);
        res.status(201).json({ success: true, data: rule });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

exports.getRules = async (req, res) => {
    try {
        const rules = await Rule.find().populate('disease').populate('symptoms.symptom');
        res.status(200).json({ success: true, count: rules.length, data: rules });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

const Disease = require('../models/Disease');
const Symptom = require('../models/Symptom');
const Rule = require('../models/Rule');
const History = require('../models/History');

// @desc    Get Knowledge Base (Symptoms & Rules) for a category
// @route   GET /api/diagnosis/knowledge/:category
// @access  Public
exports.getKnowledgeBase = async (req, res) => {
    try {
        const { category } = req.params;
        const symptoms = await Symptom.find({ category });
        // Retrieve rules and populate disease details for frontend display if needed
        const rules = await Rule.find({ category }).populate('disease', 'name code');

        // We might want to send full disease info too?
        // Actually frontend just needs rules to know which symptoms map to which disease code/id.
        // And symptoms details to display questions.

        res.status(200).json({
            success: true,
            data: {
                symptoms,
                rules
            }
        });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// @desc    Process Diagnosis
// @route   POST /api/diagnosis/submit
// @access  Private (User)
exports.diagnose = async (req, res) => {
    try {
        const { selectedSymptomIds, category } = req.body;

        if (!selectedSymptomIds || !category) {
            return res.status(400).json({ success: false, error: 'Please provide symptoms and category' });
        }

        const rules = await Rule.find({ category }).populate('disease');

        let results = [];

        // CF Calculation Strategy:
        // For each rule (disease), calculate CF based on selected symptoms.
        // CF_combine(old, new) = old + new * (1 - old)

        for (const rule of rules) {
            let cf_total = 0;
            let matched = false;

            for (const item of rule.symptoms) {
                // If the symptom matches user selection
                if (selectedSymptomIds.includes(item.symptom.toString())) {
                    matched = true;
                    const weight = item.cf_weight;
                    // Formula: CF_new = CF_old + weight * (1 - CF_old)
                    cf_total = cf_total + weight * (1 - cf_total);
                }
            }

            if (matched) {
                results.push({
                    disease: rule.disease,
                    cf: cf_total
                });
            }
        }

        // Sort by CF descending
        results.sort((a, b) => b.cf - a.cf);

        if (results.length === 0) {
            return res.status(200).json({
                success: true,
                result: null,
                message: "No disease matched."
            });
        }

        const bestMatch = results[0];

        // Save to History
        await History.create({
            user: req.user.id,
            category,
            disease: bestMatch.disease._id,
            cf_result: bestMatch.cf,
            selected_symptoms: selectedSymptomIds
        });

        res.status(200).json({
            success: true,
            result: {
                disease: bestMatch.disease,
                cf: bestMatch.cf,
                cf_percentage: (bestMatch.cf * 100).toFixed(2) + '%'
            },
            alternatives: results.slice(1, 4) // Show top 3 alternatives
        });

    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

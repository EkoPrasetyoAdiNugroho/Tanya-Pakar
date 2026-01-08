const express = require('express');
const {
    createDisease, getDiseases, deleteDisease,
    createSymptom, getSymptoms, deleteSymptom,
    createRule, getRules
} = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);
router.use(authorize('admin'));

router.route('/diseases').post(createDisease).get(getDiseases);
router.route('/diseases/:id').delete(deleteDisease);

router.route('/symptoms').post(createSymptom).get(getSymptoms);
router.route('/symptoms/:id').delete(deleteSymptom);

router.route('/rules').post(createRule).get(getRules);

module.exports = router;

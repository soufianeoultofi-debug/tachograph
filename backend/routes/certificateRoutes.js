const express = require('express');
const router = express.Router();
const { getCertificates, createCertificate, updateCertificate, deleteCertificate } = require('../controllers/certificateController');

router.route('/').get(getCertificates).post(createCertificate);
router.route('/:id').put(updateCertificate).delete(deleteCertificate);

module.exports = router;
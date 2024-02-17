const express = require('express');
const router = express.Router();
const registrationController = require('../controllers/registration');

router.get('/', registrationController.getRegistrations);
router.post('/', registrationController.postRegistration);
router.delete('/:id',registrationController.deleteRegistration);
router.put('/:id', registrationController.updateRegistration);
router.put('/:id/schedule',registrationController.updateRegistrationStatus);


module.exports = router;

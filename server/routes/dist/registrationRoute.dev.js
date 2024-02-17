"use strict";

var express = require('express');

var router = express.Router();

var registrationController = require('../controllers/registration');

router.get('/', registrationController.getRegistrations);
router.post('/', registrationController.postRegistration);
router["delete"]('/:id', registrationController.deleteRegistration);
router.put('/:id', registrationController.updateRegistration);
router.put('/:id/schedule', registrationController.updateRegistrationStatus);
module.exports = router;
//# sourceMappingURL=registrationRoute.dev.js.map

"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Registration = require('../models/model');

var getRegistrations = function getRegistrations(req, res) {
  var registrations;
  return regeneratorRuntime.async(function getRegistrations$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(Registration.find().sort({
            created_at: -1
          }));

        case 3:
          registrations = _context.sent;
          res.status(200).json(registrations);
          _context.next = 11;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.error('Error fetching registrations:', _context.t0);
          res.status(500).json({
            message: 'Internal Server Error'
          });

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

var postRegistration = function postRegistration(req, res) {
  var _req$body, firstName, lastName, phoneNumber, email, qualification, gender, location, job_title, employee_id, x, newRegistration;

  return regeneratorRuntime.async(function postRegistration$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _req$body = req.body, firstName = _req$body.firstName, lastName = _req$body.lastName, phoneNumber = _req$body.phoneNumber, email = _req$body.email, qualification = _req$body.qualification, gender = _req$body.gender, location = _req$body.location, job_title = _req$body.job_title, employee_id = _req$body.employee_id, x = _req$body.x;

          if (!(!firstName || !lastName || !phoneNumber || !email || !qualification || !gender || !location || !job_title || !employee_id)) {
            _context2.next = 4;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            message: 'All fields are required.'
          }));

        case 4:
          newRegistration = new Registration({
            firstName: firstName,
            lastName: lastName,
            phoneNumber: phoneNumber,
            email: email,
            qualification: qualification,
            gender: gender,
            location: location,
            job_title: job_title,
            employee_id: employee_id,
            status: 'Currently Working'
          });
          _context2.next = 7;
          return regeneratorRuntime.awrap(newRegistration.save());

        case 7:
          res.status(201).json({
            message: 'Empolyee registration successful.',
            registration: _objectSpread({}, newRegistration.toObject(), {
              status: 'pending'
            })
          });
          _context2.next = 14;
          break;

        case 10:
          _context2.prev = 10;
          _context2.t0 = _context2["catch"](0);
          console.error('Error registering employee:', _context2.t0);
          res.status(500).json({
            message: 'Internal Server Error'
          });

        case 14:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 10]]);
};

var deleteRegistration = function deleteRegistration(req, res) {
  var id, deletedRegistration;
  return regeneratorRuntime.async(function deleteRegistration$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          id = req.params.id;
          _context3.prev = 1;
          _context3.next = 4;
          return regeneratorRuntime.awrap(Registration.findByIdAndDelete(id));

        case 4:
          deletedRegistration = _context3.sent;

          if (deletedRegistration) {
            _context3.next = 7;
            break;
          }

          return _context3.abrupt("return", res.status(404).json({
            message: 'Registration not found.'
          }));

        case 7:
          res.status(200).json({
            message: 'Registration deleted successfully.'
          });
          _context3.next = 14;
          break;

        case 10:
          _context3.prev = 10;
          _context3.t0 = _context3["catch"](1);
          console.error('Error deleting registration:', _context3.t0);
          res.status(500).json({
            message: 'Internal Server Error'
          });

        case 14:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[1, 10]]);
};

var updateRegistration = function updateRegistration(req, res) {
  var id, updatedRegistration;
  return regeneratorRuntime.async(function updateRegistration$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          id = req.params.id;
          _context4.prev = 1;
          _context4.next = 4;
          return regeneratorRuntime.awrap(Registration.findByIdAndUpdate(id, req.body, {
            "new": true
          }));

        case 4:
          updatedRegistration = _context4.sent;

          if (updatedRegistration) {
            _context4.next = 7;
            break;
          }

          return _context4.abrupt("return", res.status(404).json({
            error: 'Registration not found'
          }));

        case 7:
          res.json(updatedRegistration);
          _context4.next = 14;
          break;

        case 10:
          _context4.prev = 10;
          _context4.t0 = _context4["catch"](1);
          console.error('Error updating registration:', _context4.t0);
          res.status(500).json({
            error: 'Internal Server Error'
          });

        case 14:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[1, 10]]);
};

var updateRegistrationStatus = function updateRegistrationStatus(req, res) {
  var id, _req$body2, status, date, updatedRegistration;

  return regeneratorRuntime.async(function updateRegistrationStatus$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          id = req.params.id;
          _req$body2 = req.body, status = _req$body2.status, date = _req$body2.date;
          _context5.prev = 2;
          console.log('Received registration_id:', id);
          _context5.next = 6;
          return regeneratorRuntime.awrap(Registration.findByIdAndUpdate(id, {
            status: status,
            date: date
          }, {
            "new": true
          }));

        case 6:
          updatedRegistration = _context5.sent;

          if (updatedRegistration) {
            _context5.next = 10;
            break;
          }

          console.error('Registration not found in the database.');
          return _context5.abrupt("return", res.status(404).json({
            error: 'Registration not found'
          }));

        case 10:
          console.log('Updated registration:', updatedRegistration);
          res.status(200).json(updatedRegistration);
          _context5.next = 18;
          break;

        case 14:
          _context5.prev = 14;
          _context5.t0 = _context5["catch"](2);
          console.error("Error updating registration status:", _context5.t0);
          res.status(500).json({
            error: "Internal Server Error"
          });

        case 18:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[2, 14]]);
};

module.exports = {
  getRegistrations: getRegistrations,
  postRegistration: postRegistration,
  deleteRegistration: deleteRegistration,
  updateRegistration: updateRegistration,
  updateRegistrationStatus: updateRegistrationStatus
};
//# sourceMappingURL=registration.dev.js.map

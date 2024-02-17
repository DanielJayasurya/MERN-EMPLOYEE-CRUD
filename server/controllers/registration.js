const Registration = require('../models/model');

const getRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find().sort({ created_at: -1 });
    res.status(200).json(registrations);
  } catch (error) {
    console.error('Error fetching registrations:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const postRegistration = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      phoneNumber,
      email,
      qualification,
      gender,
      location,
      job_title,
      employee_id,x
    } = req.body;

    if (!firstName || !lastName || !phoneNumber || !email || !qualification || !gender || !location || !job_title || !employee_id) {
      return res.status(400).json({ message: 'All fields are required.' });
    }
    const newRegistration = new Registration({
      firstName,
      lastName,
      phoneNumber,
      email,
      qualification,
      gender,
      location,
      job_title,
      employee_id,
      status: 'Currently Working',
    });

    await newRegistration.save();
    res.status(201).json({
      message: 'Empolyee registration successful.',
      registration: { ...newRegistration.toObject(), status: 'pending' },
    });
  } catch (error) {
    console.error('Error registering employee:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const deleteRegistration = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedRegistration = await Registration.findByIdAndDelete(id);
    if (!deletedRegistration) {
      return res.status(404).json({ message: 'Registration not found.' });
    }
    res.status(200).json({ message: 'Registration deleted successfully.' });
  } catch (error) {
    console.error('Error deleting registration:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


const updateRegistration = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedRegistration = await Registration.findByIdAndUpdate(
      id,
      req.body,
      { new: true } 
    );
    if (!updatedRegistration) {
      return res.status(404).json({ error: 'Registration not found' });
    }
    res.json(updatedRegistration);
  } catch (error) {
    console.error('Error updating registration:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateRegistrationStatus = async (req, res) => {
  const { id } = req.params;
  const { status, date } = req.body;
  try {
    console.log('Received registration_id:', id);
    const updatedRegistration = await Registration.findByIdAndUpdate(
      id,
      { status, date },
      { new: true }
    );
    if (!updatedRegistration) {
      console.error('Registration not found in the database.');
      return res.status(404).json({ error: 'Registration not found' });
    }
    console.log('Updated registration:', updatedRegistration);
    res.status(200).json(updatedRegistration);
  } catch (error) {
    console.error("Error updating registration status:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


module.exports = {
  getRegistrations,
  postRegistration,
  deleteRegistration,
  updateRegistration,
  updateRegistrationStatus,
};
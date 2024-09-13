const express = require('express');
const router = express.Router();
const Form = require('../models/form'); // Ensure this path is correct

// GET /form - Render the form
router.get('/form', (req, res) => {
  res.render('form', { title: 'Flight Booking Form' });
});

// POST /form - Handle form submission
router.post('/form', async (req, res) => {
  try {
    const { fullName, gender, dob, nationality, phoneNumber, email, poBox, emergencyPhoneNumber, passportNumber, visaDocument, departureCity, destinationCity } = req.body;

    console.log('Form data:', req.body); // Debug: Log the form data

    // Validate required fields
    if (!fullName || !gender || !dob || !nationality || !phoneNumber || !email || !passportNumber || !departureCity || !destinationCity) {
      return res.status(400).render('form', { title: 'Flight Booking Form', error: 'All fields are required.' });
    }

    // Validate age
    const today = new Date();
    const birthDate = new Date(dob);
    const age = today.getFullYear() - birthDate.getFullYear();
    if (age < 18) {
      return res.status(400).render('form', { title: 'Flight Booking Form', error: 'You must be at least 18 years old.' });
    }

    // Save form data to the database
    const form = new Form({
      fullName,
      gender,
      dob,
      nationality,
      phoneNumber,
      email,
      poBox,
      emergencyPhoneNumber,
      passportNumber,
      visaDocument, // Handle file upload separately if needed
      departureCity,
      destinationCity
    });

    await form.save();
    console.log('Form saved:', form); // Debug: Log the saved form data

    res.redirect('/success'); // Redirect to a success page or show a success message
  } catch (err) {
    console.error('Error processing form submission:', err);
    res.status(500).render('form', { title: 'Flight Booking Form', error: 'An error occurred while processing your request.' });
  }
});

module.exports = router;

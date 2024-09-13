const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Define the schema
const FormSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  gender: { type: String, required: true },
  dob: { type: Date, required: true },
  nationality: { type: String, required: true },
  
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true },
  poBox: { type: String, required: true },
  emergencyPhone: { type: String, required: true },

  passportNumber: { type: String, required: true },
  visaDocument: { type: String, required: true },
  departureCity: { type: String, required: true },
  destinationCity: { type: String, required: true }
});

// Create the model
const Form = mongoose.model('Form', FormSchema);

module.exports = Form;

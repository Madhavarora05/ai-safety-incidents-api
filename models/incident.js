const mongoose = require('mongoose');

const incidentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true
  },
  severity: {
    type: String,
    required: [true, 'Severity is required'],
    enum: {
      values: ['Low', 'Medium', 'High'],
      message: 'Severity must be one of: Low, Medium, High'
    }
  },
  reported_at: {
    type: Date,
    default: Date.now
  }
});

const Incident = mongoose.model('Incident', incidentSchema);

module.exports = Incident;
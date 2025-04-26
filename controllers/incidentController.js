const Incident = require('../models/incident');
const mongoose = require('mongoose');

// Get all incidents
exports.getAllIncidents = async (req, res) => {
  try {
    const incidents = await Incident.find().sort({ reported_at: -1 });
    
    return res.status(200).json(incidents);
  } catch (error) {
    console.error('Error fetching incidents:', error);
    return res.status(500).json({ message: 'Failed to retrieve incidents', error: error.message });
  }
};

// Get a specific incident by ID
exports.getIncidentById = async (req, res) => {
  try {
    const incidentId = req.params.id;
    
    if (!mongoose.Types.ObjectId.isValid(incidentId)) {
      return res.status(400).json({ message: 'Invalid incident ID format' });
    }
    
    const incident = await Incident.findById(incidentId);
    
    if (!incident) {
      return res.status(404).json({ message: `Incident with ID ${incidentId} not found` });
    }
    
    return res.status(200).json(incident);
  } catch (error) {
    console.error('Error fetching incident:', error);
    return res.status(500).json({ message: 'Failed to retrieve incident', error: error.message });
  }
};

// Create a new incident
exports.createIncident = async (req, res) => {
  try {
    const { title, description, severity } = req.body;
    
    const newIncident = new Incident({
      title,
      description,
      severity,
      reported_at: new Date()
    });
    
    const validationError = newIncident.validateSync();
    if (validationError) {
      return res.status(400).json({ 
        message: 'Validation error', 
        errors: Object.values(validationError.errors).map(err => ({
          field: err.path,
          message: err.message
        }))
      });
    }

    await newIncident.save();
    
    return res.status(201).json(newIncident);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        message: 'Validation error', 
        errors: Object.values(error.errors).map(err => ({
          field: err.path,
          message: err.message
        }))
      });
    }
    
    console.error('Error creating incident:', error);
    return res.status(500).json({ message: 'Failed to create incident', error: error.message });
  }
};

// Delete an incident
exports.deleteIncident = async (req, res) => {
  try {
    const incidentId = req.params.id;
    
    if (!mongoose.Types.ObjectId.isValid(incidentId)) {
      return res.status(400).json({ message: 'Invalid incident ID format' });
    }
    
    const incident = await Incident.findByIdAndDelete(incidentId);
    
    if (!incident) {
      return res.status(404).json({ message: `Incident with ID ${incidentId} not found` });
    }
    
    return res.status(204).send();
  } catch (error) {
    console.error('Error deleting incident:', error);
    return res.status(500).json({ message: 'Failed to delete incident', error: error.message });
  }
};
const express = require('express');
const router = express.Router();
const incidentController = require('../controllers/incidentController');

// GET all incidents
router.get('/', incidentController.getAllIncidents);

// GET incident by ID
router.get('/:id', incidentController.getIncidentById);

// POST new incident
router.post('/', incidentController.createIncident);

// DELETE incident by ID
router.delete('/:id', incidentController.deleteIncident);

module.exports = router;
const mongoose = require('mongoose');
const Incident = require('./models/incident');
require('dotenv').config();

const sampleIncidents = [
  {
    title: 'Chatbot Recommending Harmful Content',
    description: 'A customer reported that our AI chatbot recommended potentially harmful medical advice to users seeking health information.',
    severity: 'High',
    reported_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) // 5 days ago
  },
  {
    title: 'AI Content Generator Hallucinating Facts',
    description: 'The AI content generator produced factually incorrect information about historical events when generating educational content.',
    severity: 'Medium',
    reported_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) // 2 days ago
  },
  {
    title: 'Privacy Leak in User Conversation',
    description: 'A bug in the AI system caused it to reference private information from previous conversations with other users.',
    severity: 'High',
    reported_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) // 1 day ago
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    
    // Delete all existing incidents
    await Incident.deleteMany({});
    console.log('Cleared existing incidents');
    
    // Insert sample incidents
    await Incident.insertMany(sampleIncidents);
    console.log('Sample incidents seeded successfully');
    
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
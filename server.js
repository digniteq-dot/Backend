require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err));

const createCrudRouter = require('./routes/genericCrud');
const createSingleItemRouter = require('./routes/singleItemCrud');
const models = require('./models/Content');

app.use('/api/auth', require('./routes/auth'));
app.use('/api/upload', require('./routes/upload'));

// Single items
app.use('/api/hero', createSingleItemRouter(models.Hero, {
    title: 'DIGITAL',
    subtitle: 'AGENCY',
    description: 'We help you build your brand and find more customers online. We handle the digital stuff so you can focus on what you do best.',
    ctaText: 'Get Free Consultation ➔',
    ctaLink: 'https://wa.me/916205318620?text=Hello!%20I\'d%20like%20to%20get%20a%20free%20consultation.'
}));
app.use('/api/about', createSingleItemRouter(models.About, {
    title: 'We Build Digital Legacies For Small Businesses',
    paragraph1: 'Digniteq was born from a simple idea...',
    paragraph2: 'We combine creative design with smart technology...',
    mission: 'Making marketing simple & affordable for every business.',
    vision: 'Empowering local brands to grow and thrive digitally.',
    yearsExp: '02+',
    happyClients: '50+'
}));

// Collections
app.use('/api/services', createCrudRouter(models.Service));
app.use('/api/stats', createCrudRouter(models.Stat));
app.use('/api/process', createCrudRouter(models.ProcessStep));
app.use('/api/portfolio', createCrudRouter(models.PortfolioItem));
app.use('/api/pricing', createCrudRouter(models.PricingPlan));
app.use('/api/contact', createCrudRouter(models.ContactSubmission));

app.get('/', (req, res) => {
    res.send('Digniteq API is running');
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

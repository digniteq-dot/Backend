const mongoose = require('mongoose');

const heroSchema = new mongoose.Schema({
    title: String,
    subtitle: String,
    description: String,
    ctaText: String,
    ctaLink: String,
}, { timestamps: true });

const serviceSchema = new mongoose.Schema({
    title: String,
    description: String,
    icon: String,
    order: Number,
}, { timestamps: true });

const statSchema = new mongoose.Schema({
    label: String,
    value: String,
    sub: String,
    order: Number,
}, { timestamps: true });

const aboutSchema = new mongoose.Schema({
    title: String,
    paragraph1: String,
    paragraph2: String,
    mission: String,
    vision: String,
    yearsExp: String,
    happyClients: String,
}, { timestamps: true });

const processSchema = new mongoose.Schema({
    step: String,
    title: String,
    description: String,
    order: Number,
}, { timestamps: true });

const portfolioSchema = new mongoose.Schema({
    title: String,
    cat: String,
    desc: String,
    img: String, // URL to the image
    order: Number,
}, { timestamps: true });

const pricingSchema = new mongoose.Schema({
    serviceType: String,
    planName: String,
    price: String,
    period: String,
    desc: String,
    targetAudience: [String],
    features: [String],
    isPopular: Boolean,
    ctaLabel: String,
    order: Number,
}, { timestamps: true });

const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    message: String,
    status: { type: String, default: 'new' }, // new, read, resolved
}, { timestamps: true });

const proposalSchema = new mongoose.Schema({
    proposalId: { type: String, unique: true },
    clientName: String,
    businessName: String,
    email: String,
    phone: String,
    description: String,
    budget: String,
    address: String,
    selectedServices: [{
        serviceType: String,
        planName: String,
        price: String,
        features: [String]
    }],
    totalPrice: String,
    status: { type: String, default: 'new' }
}, { timestamps: true });

const settingSchema = new mongoose.Schema({
    username: { type: String, default: 'admin' },
    password: { type: String, required: true },
    companyName: { type: String, default: 'DIGNITEQ' },
    tagline: { type: String, default: 'Best & Affordable Digital Solutions' },
    contactEmail: { type: String, default: 'contact@digniteq.in' },
    contactPhone: { type: String, default: '' },
    facebook: { type: String, default: '' },
    instagram: { type: String, default: '' },
    twitter: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    logoUrl: { type: String, default: '/assets/logo.png' }
}, { timestamps: true });

module.exports = {
    Hero: mongoose.model('Hero', heroSchema),
    Service: mongoose.model('Service', serviceSchema),
    Stat: mongoose.model('Stat', statSchema),
    About: mongoose.model('About', aboutSchema),
    ProcessStep: mongoose.model('ProcessStep', processSchema),
    PortfolioItem: mongoose.model('PortfolioItem', portfolioSchema),
    PricingPlan: mongoose.model('PricingPlan', pricingSchema),
    ContactSubmission: mongoose.model('ContactSubmission', contactSchema),
    Proposal: mongoose.model('Proposal', proposalSchema),
    Setting: mongoose.model('Setting', settingSchema)
};

const mongoose = require('mongoose');
require('dotenv').config();
const { PortfolioItem } = require('./models/Content');

const defaultProjects = [
  {
    title: "Lumina Boutique",
    cat: "Web Design",
    img: "/assets/portfolio/web-design.png",
    desc: "A high-end e-commerce experience for a luxury fashion brand.",
    order: 1
  },
  {
    title: "Aura Identity",
    cat: "Branding",
    img: "/assets/portfolio/branding.png",
    desc: "Complete brand redesign and visual identity system.",
    order: 2
  },
  {
    title: "Vibe Social",
    cat: "SMM Strategy",
    img: "/assets/portfolio/social-media.png",
    desc: "Data-driven social media growth strategy for a lifestyle brand.",
    order: 3
  },
  {
    title: "Growth Metrics",
    cat: "SEO Strategy",
    img: "/assets/portfolio/seo.png",
    desc: "Dominating search results for a global tech consultancy.",
    order: 4
  },
  {
    title: "Ethos Watch",
    cat: "Web Design",
    img: "/assets/portfolio/web-design.png",
    desc: "Minimalist portfolio for an architectural firm.",
    order: 5
  },
  {
    title: "Nexus Brand",
    cat: "Branding",
    img: "/assets/portfolio/branding.png",
    desc: "Modern identity for a next-gen software house.",
    order: 6
  }
];

async function seed() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');
        
        console.log('Clearing existing portfolio items...');
        await PortfolioItem.deleteMany({});
        
        console.log('Seeding portfolio items...');
        await PortfolioItem.insertMany(defaultProjects);
        console.log('Successfully seeded portfolio items!');
        
        process.exit(0);
    } catch (err) {
        console.error('Seeding error:', err);
        process.exit(1);
    }
}

seed();

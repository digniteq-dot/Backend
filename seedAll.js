const mongoose = require('mongoose');
require('dotenv').config();
const { Service, Stat, ProcessStep, PortfolioItem, PricingPlan, Hero, About } = require('./models/Content');

const defaultServices = [
  { title: "Modern Websites", description: "Building beautiful sites that turn visitors into customers.", icon: "◈", order: 1 },
  { title: "Brand & Design", description: "Creating logos and styles that people remember.", icon: "⬢", order: 2 },
  { title: "Social Media", description: "Telling your story and building your community.", icon: "✧", order: 3 },
  { title: "SEO (Ranking)", description: "Helping you show up when customers search for you.", icon: "✦", order: 4 }
];

const defaultStats = [
  { label: "Active Clients", value: "50+", sub: "Trusted Partners", order: 1 },
  { label: "Success Rate", value: "98%", sub: "Project Excellence", order: 2 },
  { label: "ROI Average", value: "3.5x", sub: "Growth Driven", order: 3 },
  { label: "Years Exp.", value: "02+", sub: "Digital Mastery", order: 4 }
];

const defaultProcessSteps = [
  { step: "01", title: "Discovery", description: "We learn about your business and goals.", order: 1 },
  { step: "02", title: "Planning", description: "We create a simple roadmap for success.", order: 2 },
  { step: "03", title: "Building", description: "We bring your vision to life.", order: 3 },
  { step: "04", title: "Growing", description: "We help you scale and get more results.", order: 4 }
];

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

const defaultPlans = [
    // Website Design
    { 
      serviceType: "website-design", 
      planName: "Standard Website", 
      price: "₹11,999", 
      desc: "Specially designed for small businesses with 100% responsiveness.", 
      targetAudience: ["Local Restaurant", "Cafe", "Gym", "Salon", "Coaching center"], 
      features: [
        "1-5 Page", 
        "1 year hosting", 
        "1 business emails", 
        "3 month support", 
        "Free SSL", 
        "Basic SEO setup", 
        "Basic contact form", 
        "Mobile responsive design", 
        "Social media links", 
        "Google map integration", 
        "Fast loading"
      ], 
      ctaLabel: "Deploy Standard", 
      order: 1 
    },
    { 
      serviceType: "website-design", 
      planName: "Premium Website", 
      price: "₹29,999", 
      desc: "Advanced growth-focused platform for expanding brands.", 
      targetAudience: ["Bigger Restaurant", "Dental clinic", "Multi-branch Gym", "Construction company", "E-commerce Startup"], 
      features: [
        "5-10 Pages", 
        "1 domain free", 
        "1 year hosting", 
        "3 emails", 
        "6 month support", 
        "Free SSL", 
        "Blog setup", 
        "Google Analytics", 
        "Basic on-page SEO", 
        "Lead form setup", 
        "Social media integ.", 
        "Custom UI design"
      ], 
      isPopular: true, 
      ctaLabel: "Deploy Premium", 
      order: 2 
    },
    { 
      serviceType: "website-design", 
      planName: "Elite Website", 
      price: "₹44,999", 
      desc: "The ultimate digital ecosystem for total market dominance.", 
      targetAudience: ["Established companies", "Big Startup", "Agencies", "SaaS Startup", "Large Real Estate firms"], 
      features: [
        "10-20 pages", 
        "Advanced UI/UX", 
        "Full Admin panel", 
        "1 domain free", 
        "Booking/inquiry system", 
        "SEO Setup", 
        "one domain free", 
        "CRM/WhatsApp integration", 
        "1-year hosting & emails", 
        "1-year maintenance", 
        "Speed optimization", 
        "GSC or Analytics"
      ], 
      ctaLabel: "Deploy Elite", 
      order: 3 
    },
    
    // SMM Strategy
    { 
      serviceType: "smm-strategy", 
      planName: "SMM Silver", 
      price: "₹7,000", 
      desc: "Build a social identity and maintain a consistent online presence.", 
      features: [
        "Profile Optimization",
        "Branded Designs",
        "2 Platforms: FB & Instagram",
        "3 Posts Per Week",
        "Posts: Info/Testimonial/Offer/BTS",
        "12 Static Posts + 2 Reels/Mo",
        "Hashtag & Caption Optimization",
        "Basic Engagement & Report"
      ], 
      ctaLabel: "Deploy Silver", 
      order: 1 
    },
    { 
      serviceType: "smm-strategy", 
      planName: "SMM Gold", 
      price: "₹12,000", 
      desc: "Start your journey into professional social media marketing.", 
      features: [
        "Profile Optimization",
        "Premium Designs",
        "3 Platforms: FB, Insta, LI/YT",
        "4 Posts Per Week",
        "Posts: Info/Testimonial/Offer/BTS",
        "12 Posts + 4 Reels/Mo",
        "Hashtag & Caption Optimization",
        "Content Calendar Sheet",
        "Meta Ads Setup",
        "2 Ad Campaigns Setup",
        "Awareness & Lead Gen Strategy",
        "Monthly Growth & Insights Report"
      ], 
      ctaLabel: "Deploy Gold", 
      isPopular: true, 
      order: 2 
    },
    { 
      serviceType: "smm-strategy", 
      planName: "SMM Diamond", 
      price: "₹18,000", 
      desc: "Build strong presence and drive revenue with positive ROAS.", 
      features: [
        "Profile & GMB Optimization",
        "Premium Designs",
        "5 Platforms: FB, IG, LI, YT, GMB",
        "5 Posts Per Week",
        "Total: 16 Posts + 8 Reels/Mo",
        "Competitor & Audience Analysis",
        "Hashtag & Caption Optimization",
        "Content Calendar Sheet",
        "Meta Ads & Pixel Setup",
        "5 Ad Campaigns Setup",
        "Custom Conversion Setup",
        "Monthly Growth & Insights Report"
      ], 
      ctaLabel: "Deploy Diamond", 
      order: 3 
    },

    // SEO Strategy
    { 
      serviceType: "seo-strategy", 
      planName: "Local SEO", 
      price: "₹9,500", 
      period: "Calls, Leads & Map Visibility", 
      desc: "Best for service-based and location-focused businesses.", 
      features: [
        "Site Analyses & Report",
        "Local Keyword Research",
        "Google Business Profile Optimization",
        "On-page SEO for 5 Core Pages",
        "Local Schema Markup",
        "NAP Consistency & Citation Cleanup",
        "Review Strategy Guidance",
        "Monthly Lead & Ranking Report"
      ], 
      targetAudience: ["Doctors", "Salons", "Real Estate Agents"], 
      ctaLabel: "Deploy Local", 
      order: 1 
    },
    { 
      serviceType: "seo-strategy", 
      planName: "Growth SEO", 
      price: "₹17,500", 
      period: "Ranking + Qualified Traffic", 
      desc: "Best for businesses competing on Google search.", 
      features: [
        "Site Analyses & Report",
        "Competitor-Driven Keyword Research",
        "On-page SEO for 10 Pages",
        "Technical SEO & Core Web Vitals",
        "Indexing & Crawl Optimization",
        "Content Published (2 SEO Blogs)",
        "High-Quality Backlinks (6-8/Mo)",
        "Conversion-Focused SEO Suggestions",
        "Monthly Ranking & Traffic Insights"
      ], 
      ctaLabel: "Deploy Growth", 
      isPopular: true, 
      order: 2 
    },
    { 
      serviceType: "seo-strategy", 
      planName: "Premium SEO", 
      price: "₹27,500", 
      period: "Authority & Sustainable Rankings", 
      desc: "Best for brands that want long-term dominance.", 
      features: [
        "Advanced SEO Audit & Roadmap",
        "Keyword Strategy (50+ Intent Terms)",
        "On-page SEO for 20 Pages",
        "Content Publish (4 SEO Blogs/Mo)",
        "Authority Backlinks (12-15/Mo)",
        "Internal Linking & Topical Clusters",
        "Competitor Backlink Gap Analysis",
        "CRO-Focused SEO Improvements",
        "Detailed Monthly Growth Report"
      ], 
      targetAudience: ["E-commerce", "SaaS", "National Brands"], 
      ctaLabel: "Deploy Premium", 
      order: 3 
    },

    // Branding
    { serviceType: "branding", planName: "Basic", price: "₹1,999", desc: "Essential visual foundation for emerging brands.", targetAudience: ["Local shops", "Small restaurant", "Salon, Gym", "Small startup"], features: ["3-5 Logo concepts/options", "PNG + JPG", "Transparent logo", "Basic color palette", "Basic mockup"], ctaLabel: "Deploy Basic", order: 1 },
    { serviceType: "branding", planName: "Standard", price: "₹2,999", desc: "Complete cross-platform identity system.", targetAudience: ["Growing business", "Cafe brands", "Dental clinic", "Personal brand", "Medium startup"], features: ["Professional logo", "Multiple logo versions", "Brand colors", "Font selection", "Business card design", "SVG / PDF source files"], isPopular: true, ctaLabel: "Deploy Standard", order: 2 },
    { serviceType: "branding", planName: "Elite", price: "₹4,999", desc: "Full-scale strategic market presence.", targetAudience: ["Agencies", "E-commerce brands", "Companies", "Fashion brands", "Coaches / Premium business"], features: ["Color psychology", "Premium mockups", "Strategy-based logo", "Social media branding", "Brand guideline PDF", "Typography system", "Brand style direction"], ctaLabel: "Deploy Elite", order: 3 }
];

async function seed() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');
        
        console.log('Clearing existing services...');
        await Service.deleteMany({});
        console.log('Seeding services...');
        await Service.insertMany(defaultServices);

        console.log('Clearing existing stats...');
        await Stat.deleteMany({});
        console.log('Seeding stats...');
        await Stat.insertMany(defaultStats);

        console.log('Clearing existing process steps...');
        await ProcessStep.deleteMany({});
        console.log('Seeding process steps...');
        await ProcessStep.insertMany(defaultProcessSteps);

        console.log('Clearing existing portfolio items...');
        await PortfolioItem.deleteMany({});
        console.log('Seeding portfolio items...');
        await PortfolioItem.insertMany(defaultProjects);

        console.log('Clearing existing pricing plans...');
        await PricingPlan.deleteMany({});
        console.log('Seeding pricing plans...');
        await PricingPlan.insertMany(defaultPlans);

        // Ensure Hero and About are also initialized in DB
        const heroExists = await Hero.findOne();
        if (!heroExists) {
            console.log('Initializing Hero content...');
            await Hero.create({
                title: 'DIGITAL',
                subtitle: 'AGENCY',
                description: 'We help you build your brand and find more customers online. We handle the digital stuff so you can focus on what you do best.',
                ctaText: 'Get Free Consultation ➔',
                ctaLink: 'https://wa.me/916205318620?text=Hello!%20I\'d%20like%20to%20get%20a%20free%20consultation.'
            });
        }

        const aboutExists = await About.findOne();
        if (!aboutExists) {
            console.log('Initializing About content...');
            await About.create({
                title: 'We Build Digital Legacies For Small Businesses',
                paragraph1: 'Digniteq was born from a simple idea: that every business, no matter its size, deserves a world-class digital presence. We treat your business as our own.',
                paragraph2: 'We combine creative design with smart technology to help you find more customers, build trust, and grow faster.',
                mission: 'Making marketing simple & affordable for every business.',
                vision: 'Empowering local brands to grow and thrive digitally.',
                yearsExp: '02+',
                happyClients: '50+'
            });
        }

        console.log('Database successfully seeded with all default content!');
        process.exit(0);
    } catch (err) {
        console.error('Seeding error:', err);
        process.exit(1);
    }
}

seed();

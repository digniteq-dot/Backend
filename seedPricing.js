const mongoose = require('mongoose');
require('dotenv').config();
const { PricingPlan } = require('./models/Content');

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
        
        console.log('Clearing existing pricing plans...');
        await PricingPlan.deleteMany({});
        
        console.log('Seeding pricing plans...');
        await PricingPlan.insertMany(defaultPlans);
        console.log('Successfully seeded pricing plans!');
        
        process.exit(0);
    } catch (err) {
        console.error('Seeding error:', err);
        process.exit(1);
    }
}

seed();

const fs = require('fs');
const path = require('path');

// --- Helper function to ensure directory exists
function ensureDirSync(dirpath) {
  if (!fs.existsSync(dirpath)) {
    fs.mkdirSync(dirpath, { recursive: true });
  }
}

// --- Data to migrate
const experienceData = [
  {
    role: "Senior Full-Stack & AI Software Developer",
    company: "Freelance/Contract", // using company for type too
    period: "Jan 2024 \u2013 Present",
    location: "Remote, Iran",
    achievements: [
      "Architected highly-optimized Next.js/React.js web applications (top-tier SEO).",
      "Developed scalable FastAPI and Strapi CMS backends with PostgreSQL.",
      "Engineered AI-driven Telegram bots and autonomous agents.",
      "Built resilient Python web scraping pipelines (Scrapy, Selenium) bypassing Cloudflare WAF.",
      "Implemented ML/DL models (TensorFlow, PyTorch) for time-series forecasting."
    ]
  },
  {
    role: "Mobile & Flutter Developer",
    company: "Freelance via Freelancer.com",
    period: "May 2022 \u2013 Dec 2023",
    location: "Remote, Iran",
    achievements: [
      "Architected a high-scale Flutter lead management app using Clean Architecture and BLoC/Cubit.",
      "Engineered secure networking (Dio, Interceptors) and dual-layer caching (Hive NoSQL)."
    ]
  },
  {
    role: "Android Developer",
    company: "Sanay Company",
    period: "May 2021 \u2013 Dec 2022",
    location: "Zanjan, Iran",
    achievements: [
      "Built 3+ cutting-edge apps, including a flagship app with 50K+ users.",
      "Implemented Video Streaming, VoIP calls, and Room Database Caching."
    ]
  },
  {
    role: "Android Developer and UI/UX Designer",
    company: "Vincode Company",
    period: "Dec 2019 \u2013 Oct 2020",
    location: "Remote, Iran",
    achievements: [
      "Worked on 6 Android apps, full SDLC for online and social products."
    ]
  },
  {
    role: "Co-Founder & Android Developer",
    company: "Darika Startup",
    period: "Feb 2019 \u2013 Nov 2020",
    location: "Zanjan, Iran",
    achievements: [
      "Spearheaded development of 4 Android apps (architect, develop, QA, deploy)."
    ]
  },
  {
    role: "Freelance Android Developer",
    company: "",
    period: "Since Summer 2017",
    location: "",
    achievements: [
      "Created 15+ applications for local businesses."
    ]
  }
];

const portfolioData = [
  { "area": "Android (High-Scale & Geo-Location)", "highlight": "Developed a travel companion app with offline maps and in-app calls using the Google Maps API, scaling successfully to over 100,000 users." },
  { "area": "Android (Complex Apps)", "highlight": "Contributed to a large-scale Android social network, implementing advanced features like real-time video conferencing, screen sharing, and complex chat functionalities." },
  { "area": "Android (Multi-Version & Geo-Location)", "highlight": "Engineered dual-version Android apps for ride-sharing and restaurant management, leveraging Google Maps API for location services and serving both customer and business users." },
  { "area": "Android (Core Services)", "highlight": "Integrated core Firebase services like Cloud Messaging (FCM) for push notifications and Analytics for user behavior tracking across numerous Android projects." },
  { "area": "Flutter (E-commerce)", "highlight": "Developed multiple full-featured Flutter e-commerce app from scratch, focusing on advanced search/filtering and a seamless user experience for Browse and saving items." },
  { "area": "Flutter (Security/Tooling)", "highlight": "Created a secure Flutter app for managing transactions, featuring data scanning from documents and end-to-end encrypted API communications." },
  { "area": "Python (Automation & Efficiency + backend)", "highlight": "Built a Python automation script for content posting that eliminated over 20 hours of manual work per week for the client." },
  { "area": "Python (backend)", "highlight": "Built backend(fastapi) for an ai book translation website. Built several telegram bots, handling and managing complex flows, user data, and membership." },
  { "area": "Machine Learning (Data Processing)", "highlight": "Engineered a data pipeline for a financial ML project, performing advanced data cleansing, standardization, and enrichment to prepare datasets for model training." },
  { "area": "Strapi (Backend)", "highlight": "Architected and deployed scalable Strapi backends with PostgreSQL, managing complex data relationships for high-volume e-commerce sites and user-intensive chatbots." },
  { "area": "Web (Next.js/React)", "highlight": "Built a highly-optimized e-commerce website, ai book translation website, b2b Grains and cereals sales website, using Next.js, focusing on top-tier SEO performance, fast load times, and a fully responsive design for custom product variants and admin panels." },
  { "area": "AI & Data Engineering (LLM & Market Analysis)", "highlight": "Developed robust web scraping pipelines using Scrapy, Selenium, and BeautifulSoup to extract e-commerce data. Utilized Large Language Models (LLMs) to analyze product weaknesses and generate actionable insights for product improvement." },
  { "area": "Machine Learning & Deep Learning (Crypto & Time-Series)", "highlight": "Engineered comprehensive data pipelines for crypto markets (cleaning, feature engineering). Applied ML/DL frameworks (TensorFlow, PyTorch, Keras) and models like LSTM and XGBoost for advanced time-series forecasting and predictive analysis." },
  { "area": "Python (Web Scraping & Lead Generation)", "highlight": "Built custom Python scraping scripts targeting major e-commerce platforms to automate pricing data collection and generate high-quality B2B/B2C sales leads across diverse product categories." },
  { "area": "Data Analytics (Arbitrage Detection)", "highlight": "Engineered an automated arbitrage detection system. Collected and analyzed regional product pricing data to identify profitable price discrepancies and market inefficiencies based on specific categories and keywords." },
  { "area": "Python (Audio Data Processing)", "highlight": "Implemented an audio data analysis project using Python to perform advanced noise reduction, signal filtering, and the detection/removal of abnormal and anomalous sounds from audio datasets." },
  { "area": "Python (Advanced Web Scraping & Anti-Bot Bypass)", "highlight": "Engineered a highly resilient Python data scraper for a complex sports database, successfully bypassing aggressive Cloudflare WAF protections using human-mimicking algorithms. Implemented strict multi-layered business logic for accurate data extraction, API integration, and discipline matching." },
  { "area": "Next.js & React (FinTech & Data Visualization)", "highlight": "Architected an interactive B2B financial simulator dashboard using Next.js and Recharts. Implemented complex state management and financial modeling, including inflation erosion analysis, working capital optimization, and custom reverse goal-seeking (binary search) algorithms." }
];

// Map some portfolio items to experiences roughly based on text for demonstration and testing purposes
const mapProjectToExperience = (area) => {
    if (area.includes('Android')) return 'android-developer'; // Sanay or Vincode
    if (area.includes('Flutter')) return 'mobile-flutter-developer';
    if (area.includes('Next.js') || area.includes('Python') || area.includes('AI') || area.includes('Machine Learning') || area.includes('Strapi') || area.includes('Data Analytics')) return 'senior-full-stack-ai-software-developer';
    return '';
};


// 1. Migrate Experiences
const expDir = path.join(__dirname, 'src/data/experiences/en');
ensureDirSync(expDir);

const expDirFa = path.join(__dirname, 'src/data/experiences/fa');
ensureDirSync(expDirFa);

experienceData.forEach((exp, index) => {
  const slug = exp.role.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  const dateStr = new Date(Date.now() - index * 100000000).toISOString().split('T')[0]; // fake date for slug
  const fileName = `${dateStr}-${slug}.md`;

  const frontmatter = `---
role: "${exp.role.replace(/"/g, '\\"')}"
company: "${exp.company ? exp.company.replace(/"/g, '\\"') : ''}"
period: "${exp.period.replace(/"/g, '\\"')}"
location: "${exp.location ? exp.location.replace(/"/g, '\\"') : ''}"
achievements:
${exp.achievements.map(a => `  - "${a.replace(/"/g, '\\"')}"`).join('\n')}
order: ${index}
---
`;

  fs.writeFileSync(path.join(expDir, fileName), frontmatter);
  fs.writeFileSync(path.join(expDirFa, fileName), frontmatter); // Just copy EN to FA for now for migration
});


// 2. Migrate Portfolio Data
const projDir = path.join(__dirname, 'src/data/portfolio_items/en');
ensureDirSync(projDir);

const projDirFa = path.join(__dirname, 'src/data/portfolio_items/fa');
ensureDirSync(projDirFa);

portfolioData.forEach((proj, index) => {
    const slug = proj.area.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '').substring(0, 30);
    const dateStr = new Date(Date.now() - index * 100000000).toISOString().split('T')[0]; // fake date for slug
    const fileName = `${dateStr}-${slug}.md`;

    // Map to experience for testing
    let experienceSlug = '';
    const expMap = mapProjectToExperience(proj.area);
    if (expMap) {
        // find matching experience file
        const files = fs.readdirSync(expDir);
        const match = files.find(f => f.includes(expMap));
        if (match) {
            experienceSlug = match.replace('.md', '');
        }
    }

    const frontmatter = `---
title: "${proj.area.replace(/"/g, '\\"')}"
area: "${proj.area.replace(/"/g, '\\"')}"
highlight: "${proj.highlight.replace(/"/g, '\\"')}"
experience: "${experienceSlug}"
featured_on_timeline: ${index % 2 === 0 ? 'true' : 'false'}
---
`;
    fs.writeFileSync(path.join(projDir, fileName), frontmatter);
    fs.writeFileSync(path.join(projDirFa, fileName), frontmatter);
});


// 3. Global settings
const settingsDir = path.join(__dirname, 'src/data/settings/en');
ensureDirSync(settingsDir);
const settingsDirFa = path.join(__dirname, 'src/data/settings/fa');
ensureDirSync(settingsDirFa);

const globalSettingsEn = {
    enable_bilingual: true,
    hero_greeting: "Hi, I'm Fazel (Ross) Heidari",
    hero_role: "Versatile Software Developer",
    hero_tagline: "Crafting scalable architectures, intuitive apps, and AI-driven solutions.",
    about_text: "Software engineer with 6+ years of accumulated experience. I specialize in Next.js, Python (FastAPI), Flutter, and AI integration. Currently targeting straightforward, clearly defined tasks."
};

fs.writeFileSync(path.join(settingsDir, 'globals.json'), JSON.stringify(globalSettingsEn, null, 2));
fs.writeFileSync(path.join(settingsDirFa, 'globals.json'), JSON.stringify(globalSettingsEn, null, 2));

console.log("Migration complete!");

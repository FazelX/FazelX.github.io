"use client";

import { motion } from "framer-motion";

export function AboutSkillsSection({ dict, globals }: { dict: Record<string, any>, globals?: Record<string, any> }) {
  const aboutText = globals?.about_text || dict.about.description;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const skillCategories = [
    { name: dict.skills.categories.android, level: "Mid-level", stack: "Java & Kotlin, BLoC/Cubit, Jetpack Compose, Room, Firebase (25+ projects, 4+ years)" },
    { name: dict.skills.categories.backend, level: "", stack: "Python (FastAPI), Strapi CMS ONLY. Node.js (Express), Java (Spring Boot) familiarity" },
    { name: dict.skills.categories.frontend, level: "Junior", stack: "React.js, Next.js, HTML, CSS, JavaScript/TypeScript ONLY" },
    { name: dict.skills.categories.flutter, level: "Junior", stack: "Simple to moderate UI/UX and API integrations" },
    { name: dict.skills.categories.data, level: "Junior", stack: "Telegram bots, basic automation, web scraping (Scrapy/Selenium), data analysis/cleansing" },
    { name: dict.skills.categories.ai, level: "Junior", stack: "Basic machine learning models (TensorFlow/PyTorch), simple training/fine-tuning" },
    { name: dict.skills.categories.architecture, level: "", stack: "Clean Architecture, SOLID, MVVM/MVI, Git, CI/CD Familiarity" },
  ];

  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12"
        >
          {/* About Column */}
          <div className="lg:col-span-5">
            <motion.div variants={itemVariants} className="sticky top-24">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-brand-neon neon-text">
                {dict.about.title}
              </h2>
              <div className="glass-panel p-8 rounded-2xl">
                <p className="text-lg leading-relaxed text-text-muted whitespace-pre-line">
                  {aboutText}
                </p>
              </div>
            </motion.div>
          </div>

          {/* Skills Column */}
          <div id="skills" className="lg:col-span-7">
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold mb-8">
              {dict.skills.title}
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skillCategories.map((skill, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="glass-panel p-6 rounded-xl hover:border-brand-neon/30 transition-colors group"
                >
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-brand-neon transition-colors flex items-center gap-2">
                    {skill.name}
                    {skill.level && (
                      <span className="text-xs px-2 py-1 bg-white/5 rounded-full text-text-muted border border-white/10">
                        {skill.level}
                      </span>
                    )}
                  </h3>
                  <p className="text-sm text-text-muted leading-relaxed">
                    {skill.stack}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

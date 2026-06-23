"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Code } from "lucide-react";

export function PortfolioSection({ dict, projects }: { dict: Record<string, any>; projects: Record<string, any>[] }) {
  const [filter, setFilter] = useState("All");

  // Extract unique areas/categories
  const categories = ["All", ...Array.from(new Set(projects.map(p => p.area)))];

  const filteredProjects = filter === "All"
    ? projects
    : projects.filter(p => p.area === filter);

  return (
    <section id="portfolio" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-12 text-center neon-text"
        >
          {dict.portfolio.title}
        </motion.h2>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                filter === category
                  ? "bg-brand-neon/20 border border-brand-neon text-brand-neon neon-glow"
                  : "bg-white/5 border border-white/10 text-text-muted hover:border-white/30"
              }`}
            >
              {category === "All" ? dict.portfolio.all : category}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id || idx}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="glass-panel p-6 rounded-2xl hover:border-brand-neon/30 group flex flex-col h-full"
              >
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-brand-neon/10 text-brand-neon border border-brand-neon/20 mb-3">
                    {project.area}
                  </span>
                  <h3 className="text-xl font-bold text-white group-hover:text-brand-neon transition-colors">
                    {project.title || "Project"}
                  </h3>
                </div>

                <p className="text-text-muted text-sm leading-relaxed mb-6 flex-grow">
                  {project.highlight || project.description}
                </p>

                {(project.live_link || project.github_link) && (
                  <div className="flex gap-4 mt-auto pt-4 border-t border-white/5">
                    {project.live_link && (
                      <a
                        href={project.live_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-text-main hover:text-brand-neon transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        {dict.portfolio.liveLink}
                      </a>
                    )}
                    {project.github_link && (
                      <a
                        href={project.github_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-text-main hover:text-brand-neon transition-colors"
                      >
                        <Code className="w-4 h-4" />
                        {dict.portfolio.githubLink}
                      </a>
                    )}
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

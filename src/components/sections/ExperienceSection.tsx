"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, ExternalLink, Code } from "lucide-react";
import { useState } from "react";
import { PortfolioModal } from "../PortfolioModal";
import Link from "next/link";

export function ExperienceSection({ dict, experiences, projects }: { dict: Record<string, any>; experiences?: any[]; projects?: any[] }) {
  const exps = experiences || [];
  const projs = projects || [];
  const [selectedProject, setSelectedProject] = useState<any>(null);

  // Group floating card variants to achieve a scattered organic look
  const getFloatingVariants = (idx: number, isRightSide: boolean) => {
    // Generate scattered positions
    const spreadX = isRightSide ? [10, 30, 0, 20, -10] : [-10, -30, 0, -20, 10];
    const spreadY = [-20, 20, -10, 30, 0];

    return {
      initial: { opacity: 0, scale: 0.8, x: isRightSide ? -20 : 20 },
      animate: {
        opacity: 1,
        scale: 1,
        x: spreadX[idx % 5],
        y: spreadY[idx % 5],
        transition: { duration: 0.6, delay: 0.2 + idx * 0.15 }
      },
      hover: {
        scale: 1.05,
        zIndex: 20,
        boxShadow: "0 0 20px rgba(0, 255, 255, 0.2)"
      }
    };
  };

  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-16 text-center neon-text"
        >
          {dict.experience.title}
        </motion.h2>

        <div className="relative">
          {/* Vertical Timeline Line */}
          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-brand-neon/50 via-brand-neon/20 to-transparent -translate-x-1/2 hidden md:block"
          />

          <div className="space-y-32 md:space-y-24">
            {exps.map((exp, index) => {
              // Find related projects
              const relatedProjects = projs.filter(p => p.experience === exp.slug);
              // Filter featured and limit to 5 max
              const featuredProjects = relatedProjects.filter(p => p.featured_on_timeline).slice(0, 5);
              // Only show the See All button if there are explicitly MORE than 5 total projects for this experience,
              // matching the prompt's request.
              const hasMoreProjects = relatedProjects.length > 5;

              const isEven = index % 2 === 0;
              // If even, main card is on Right, floating on Left. If odd, main Left, floating Right.
              const contentIsRight = isEven;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className={`relative flex flex-col md:flex-row items-center gap-8 ${
                    contentIsRight ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Timeline Dot */}
                  <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-bg-dark border-2 border-brand-neon neon-glow z-10" />

                  {/* Experience Content */}
                  <div className={`flex-1 w-full z-10 ${contentIsRight ? "md:text-right" : "md:text-left"}`}>
                    <div className="glass-panel p-8 rounded-2xl hover:border-brand-neon/30 transition-all duration-300 group shadow-lg">
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-brand-neon transition-colors">
                        {exp.role}
                      </h3>

                      <div className={`flex flex-wrap gap-4 text-sm text-text-muted mb-4 ${
                        contentIsRight ? "md:justify-end" : "md:justify-start"
                      }`}>
                        <span className="flex items-center gap-1 font-medium text-white/80">
                          {exp.company || exp.type}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {exp.period}
                        </span>
                        {exp.location && (
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {exp.location}
                          </span>
                        )}
                      </div>

                      <ul className={`space-y-2 text-text-muted/90 ${
                        contentIsRight ? "md:items-end" : ""
                      }`}>
                        {exp.achievements?.map((achievement: string, i: number) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-brand-neon mt-1.5">•</span>
                            <span className="leading-relaxed">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Floating Projects Space */}
                  <div className="flex-1 w-full hidden md:flex items-center justify-center relative min-h-[300px]">
                    {featuredProjects.length > 0 && (
                      <div className="relative w-full h-full flex flex-wrap items-center justify-center gap-4">

                        {/* Draw connection lines to center */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }} preserveAspectRatio="none">
                            {featuredProjects.map((_, i) => (
                                <motion.path
                                    key={`line-${i}`}
                                    initial={{ pathLength: 0, opacity: 0 }}
                                    whileInView={{ pathLength: 1, opacity: 0.3 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                                    // A dynamic curve from the center of the flex container to the timeline dot
                                    d={contentIsRight
                                        ? `M 50% ${50 + (i*10 - 20)}% C 80% 50%, 90% 50%, 100% 50%`
                                        : `M 50% ${50 + (i*10 - 20)}% C 20% 50%, 10% 50%, 0% 50%`
                                    }
                                    stroke="url(#neonGradient)"
                                    strokeWidth="1.5"
                                    fill="none"
                                />
                            ))}
                            <defs>
                                <linearGradient id="neonGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#00ffff" stopOpacity="0.2" />
                                    <stop offset="100%" stopColor="#00ffff" stopOpacity="0.8" />
                                </linearGradient>
                            </defs>
                        </svg>

                        {featuredProjects.map((project, i) => (
                          <motion.div
                            key={project.slug}
                            variants={getFloatingVariants(i, !contentIsRight)}
                            initial="initial"
                            whileInView="animate"
                            whileHover="hover"
                            viewport={{ once: true }}
                            onClick={() => setSelectedProject(project)}
                            className="absolute cursor-pointer group w-[240px]"
                            style={{
                                top: `calc(50% + ${(i - 2) * 60}px)`, // More spread out vertically
                                left: `calc(50% + ${(i % 2 === 0 ? -1 : 1) * (i * 35)}px)`, // More stagger horizontally
                                transform: 'translate(-50%, -50%)',
                                zIndex: 10 - i
                            }}
                          >
                            {/* Inner element for continuous float animation */}
                            <motion.div
                                animate={{ y: [0, -8, 0] }}
                                transition={{ repeat: Infinity, duration: 4 + (i % 3), ease: "easeInOut" }}
                                className="glass-panel rounded-xl p-3 hover:border-brand-neon/50 shadow-xl overflow-hidden relative bg-bg-dark/90 backdrop-blur-md"
                            >
                                {/* Card Content */}
                                {project.image ? (
                                    <div className="w-full h-24 mb-2 rounded-lg overflow-hidden relative">
                                        <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                                        <h4 className="absolute bottom-2 left-2 right-2 text-sm font-bold text-white truncate drop-shadow-md">
                                            {project.title || project.area}
                                        </h4>
                                    </div>
                                ) : (
                                    <div className="w-full mb-2">
                                        <h4 className="text-sm font-bold text-brand-neon truncate mb-1">
                                            {project.title || project.area}
                                        </h4>
                                        <p className="text-xs text-text-muted line-clamp-2">
                                            {project.highlight || project.body}
                                        </p>
                                    </div>
                                )}
                            </motion.div>
                          </motion.div>
                        ))}

                        {hasMoreProjects && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 1 }}
                                className="absolute bottom-0 right-0 z-10"
                            >
                                <Link href="#portfolio" className="text-xs font-medium text-brand-neon/80 hover:text-brand-neon hover:underline flex items-center gap-1">
                                    See All <ExternalLink className="w-3 h-3" />
                                </Link>
                            </motion.div>
                        )}

                      </div>
                    )}
                  </div>

                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Modal */}
        {selectedProject && (
          <PortfolioModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
            dict={dict}
          />
        )}
      </div>
    </section>
  );
}

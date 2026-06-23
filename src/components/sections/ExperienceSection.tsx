"use client";

import { motion } from "framer-motion";
import { experienceData } from "@/data/experience";
import { Calendar, MapPin } from "lucide-react";

export function ExperienceSection({ dict }: { dict: Record<string, any> }) {
  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
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

          <div className="space-y-12">
            {experienceData.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex flex-col md:flex-row gap-8 ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Timeline Dot */}
                <div className="hidden md:flex absolute left-1/2 top-8 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-bg-dark border-2 border-brand-neon neon-glow z-10" />

                {/* Content */}
                <div className={`flex-1 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                  <div className="glass-panel p-8 rounded-2xl hover:border-brand-neon/30 transition-all duration-300 group">
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-brand-neon transition-colors">
                      {exp.role}
                    </h3>

                    <div className={`flex flex-wrap gap-4 text-sm text-text-muted mb-4 ${
                      index % 2 === 0 ? "md:justify-end" : "md:justify-start"
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
                      index % 2 === 0 ? "md:items-end" : ""
                    }`}>
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-brand-neon mt-1.5">•</span>
                          <span className="leading-relaxed">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

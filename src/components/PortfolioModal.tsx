"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Code, ChevronLeft, ChevronRight, Play } from "lucide-react";
import { useState, useRef } from "react";

export function PortfolioModal({
  project,
  onClose,
  dict
}: {
  project: any;
  onClose: () => void;
  dict: Record<string, any>;
}) {
  const [currentMediaIdx, setCurrentMediaIdx] = useState(0);

  // Normalize media gallery to ensure we always have an array
  let mediaGallery = project.media_gallery || [];
  if (mediaGallery.length === 0 && project.image) {
      mediaGallery = [{ media_file: project.image, type: 'image' }];
  }

  const handleNext = () => {
    setCurrentMediaIdx((prev) => (prev + 1) % mediaGallery.length);
  };

  const handlePrev = () => {
    setCurrentMediaIdx((prev) => (prev - 1 + mediaGallery.length) % mediaGallery.length);
  };

  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-5xl bg-bg-dark border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col my-auto max-h-[90vh]"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-white/10">
              <h2 className="text-2xl font-bold text-white pr-8">{project.title || project.area}</h2>
              <button
                onClick={onClose}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 transition-colors"
              >
                <X className="w-6 h-6 text-text-muted hover:text-white" />
              </button>
            </div>

            {/* Content Body - Scrollable */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 flex flex-col gap-8">

              {/* Media Gallery */}
              {mediaGallery.length > 0 && (
                <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden group">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentMediaIdx}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      {mediaGallery[currentMediaIdx].type === 'video' ? (
                        <video
                          src={mediaGallery[currentMediaIdx].media_file}
                          controls
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <img
                          src={mediaGallery[currentMediaIdx].media_file}
                          alt={`${project.title} media ${currentMediaIdx + 1}`}
                          className="w-full h-full object-contain"
                        />
                      )}
                    </motion.div>
                  </AnimatePresence>

                  {/* Controls */}
                  {mediaGallery.length > 1 && (
                    <>
                      <button
                        onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-brand-neon/50 transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <ChevronLeft className="w-6 h-6" />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleNext(); }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-brand-neon/50 transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <ChevronRight className="w-6 h-6" />
                      </button>

                      {/* Indicators */}
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        {mediaGallery.map((_: any, idx: number) => (
                          <button
                            key={idx}
                            onClick={() => setCurrentMediaIdx(idx)}
                            className={`w-2 h-2 rounded-full transition-all ${idx === currentMediaIdx ? 'bg-brand-neon w-4' : 'bg-white/50 hover:bg-white'}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* Details */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Overview</h3>
                    <p className="text-text-muted leading-relaxed whitespace-pre-wrap">
                      {project.body || project.highlight}
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  {project.tech_stack && project.tech_stack.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-3">Tech Stack</h3>
                      <div className="flex flex-wrap gap-2">
                        {project.tech_stack.map((tech: string, i: number) => (
                          <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm text-text-muted">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="pt-4 border-t border-white/10 flex flex-col gap-4">
                    {project.live_link && (
                      <a
                        href={project.live_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full py-3 bg-brand-neon/10 text-brand-neon border border-brand-neon/30 rounded-xl hover:bg-brand-neon/20 transition-colors font-medium"
                      >
                        <ExternalLink className="w-5 h-5" />
                        {dict.portfolio.liveLink || "Live Demo"}
                      </a>
                    )}
                    {project.github_link && (
                      <a
                        href={project.github_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full py-3 bg-white/5 text-white border border-white/10 rounded-xl hover:bg-white/10 transition-colors font-medium"
                      >
                        <Code className="w-5 h-5" />
                        {dict.portfolio.githubLink || "GitHub Repository"}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

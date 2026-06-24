"use client";

import { motion } from "framer-motion";

export function HeroSection({ dict, globals }: { dict: Record<string, any>, globals?: Record<string, any> }) {
  const greeting = globals?.hero_greeting || dict.hero.greeting;
  const role = globals?.hero_role || dict.hero.role;
  const tagline = globals?.hero_tagline || dict.hero.tagline;

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-20">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-neon/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 text-center max-w-4xl px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            {greeting}
          </h1>
          <h2 className="text-2xl md:text-4xl text-brand-neon font-medium mb-8 neon-text">
            {role}
          </h2>
          <p className="text-xl md:text-2xl text-text-muted mb-12 max-w-2xl mx-auto leading-relaxed">
            {tagline}
          </p>

          <motion.a
            href="#portfolio"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-8 py-4 bg-brand-neon/10 border border-brand-neon/30 text-brand-neon font-semibold rounded-full neon-glow hover:bg-brand-neon/20 transition-all duration-300"
          >
            {dict.hero.cta}
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

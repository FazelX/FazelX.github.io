"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Globe } from "lucide-react";

export function Navbar({ dict, lang, enableBilingual = true }: { dict: Record<string, any>; lang: string; enableBilingual?: boolean }) {
  const pathname = usePathname();
  const toggleLang = lang === "en" ? "fa" : "en";

  // Reconstruct path with new language
  const togglePath = pathname.replace(`/${lang}`, `/${toggleLang}`);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href={`/${lang}`} className="text-xl font-bold neon-text">
              FazelX
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="flex items-baseline space-x-8 space-x-reverse rtl:space-x-reverse">
              <Link href={`/${lang}#about`} className="hover:text-brand-neon transition-colors px-3 py-2 rounded-md text-sm font-medium">
                {dict.navigation.about}
              </Link>
              <Link href={`/${lang}#skills`} className="hover:text-brand-neon transition-colors px-3 py-2 rounded-md text-sm font-medium">
                {dict.navigation.skills}
              </Link>
              <Link href={`/${lang}#experience`} className="hover:text-brand-neon transition-colors px-3 py-2 rounded-md text-sm font-medium">
                {dict.navigation.experience}
              </Link>
              <Link href={`/${lang}#portfolio`} className="hover:text-brand-neon transition-colors px-3 py-2 rounded-md text-sm font-medium">
                {dict.navigation.portfolio}
              </Link>
            </div>
          </div>

          {enableBilingual && (
            <div className="flex items-center">
              <Link
                href={togglePath}
                className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-white/5 transition-colors"
              >
                <Globe className="w-4 h-4" />
                <span className="text-sm font-medium uppercase">{toggleLang}</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </motion.nav>
  );
}

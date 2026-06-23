import { getDictionary } from '@/dictionaries';
import { notFound } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSkillsSection } from '@/components/sections/AboutSkillsSection';
import { ExperienceSection } from '@/components/sections/ExperienceSection';
import { PortfolioSection } from '@/components/sections/PortfolioSection';
import { portfolioData } from '@/data/portfolio';

export function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'fa' }];
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params;
  if (lang !== 'en' && lang !== 'fa') {
    notFound();
  }

  const dict = await getDictionary(lang as 'en' | 'fa');
  const dir = lang === 'fa' ? 'rtl' : 'ltr';

  return (
    <div dir={dir} className="min-h-screen bg-bg-dark font-sans text-text-main selection:bg-brand-neon/30">
      <Navbar dict={dict} lang={lang} />

      <main className="pt-16">
        <HeroSection dict={dict} />
        <AboutSkillsSection dict={dict} />
        <ExperienceSection dict={dict} />
        <PortfolioSection dict={dict} projects={portfolioData} />
      </main>

      <footer className="border-t border-white/10 py-8 text-center text-text-muted mt-20">
        <p>© {new Date().getFullYear()} Fazel (Ross) Heidari. All rights reserved.</p>
      </footer>
    </div>
  );
}

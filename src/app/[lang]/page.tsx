import { getDictionary } from '@/dictionaries';
import { notFound, redirect } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSkillsSection } from '@/components/sections/AboutSkillsSection';
import { ExperienceSection } from '@/components/sections/ExperienceSection';
import { PortfolioSection } from '@/components/sections/PortfolioSection';
import { getGlobals, getExperiences, getProjects } from '@/utils/cms';

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

  const globals = getGlobals(lang);

  if (!globals.enable_bilingual && lang === 'fa') {
    redirect('/en');
  }

  const dict = await getDictionary(lang as 'en' | 'fa');
  const dir = lang === 'fa' ? 'rtl' : 'ltr';

  const experiences = getExperiences(lang);
  const projects = getProjects(lang);

  return (
    <div dir={dir} className="min-h-screen bg-bg-dark font-sans text-text-main selection:bg-brand-neon/30">
      <Navbar dict={dict} lang={lang} enableBilingual={globals.enable_bilingual} />

      <main className="pt-16">
        <HeroSection dict={dict} globals={globals} />
        <AboutSkillsSection dict={dict} globals={globals} />
        <ExperienceSection dict={dict} experiences={experiences} projects={projects} />
        <PortfolioSection dict={dict} projects={projects} />
      </main>

      <footer className="border-t border-white/10 py-8 text-center text-text-muted mt-20">
        <p>© {new Date().getFullYear()} Fazel (Ross) Heidari. All rights reserved.</p>
      </footer>
    </div>
  );
}

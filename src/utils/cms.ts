import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Generic function to read global settings
export function getGlobals(lang: string = 'en') {
  const filePath = path.join(process.cwd(), 'src/data/settings', lang, 'globals.json');
  if (fs.existsSync(filePath)) {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents);
  }
  // Fallback to English if file doesn't exist
  const fallbackPath = path.join(process.cwd(), 'src/data/settings/en/globals.json');
  if (fs.existsSync(fallbackPath)) {
      return JSON.parse(fs.readFileSync(fallbackPath, 'utf8'));
  }
  return {};
}

// Read experiences collection
export function getExperiences(lang: string = 'en') {
  const dir = path.join(process.cwd(), 'src/data/experiences', lang);
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));
  const experiences = files.map(file => {
    const fullPath = path.join(dir, file);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);
    return {
      slug: file.replace('.md', ''),
      ...data
    };
  });

  return experiences.sort((a: any, b: any) => (a.order || 0) - (b.order || 0));
}

// Read projects collection
export function getProjects(lang: string = 'en') {
  const dir = path.join(process.cwd(), 'src/data/portfolio_items', lang);
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));
  const projects = files.map(file => {
    const fullPath = path.join(dir, file);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    return {
      slug: file.replace('.md', ''),
      ...data,
      body: content
    };
  });

  return projects;
}

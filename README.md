# Fazel (Ross) Heidari Portfolio

Welcome to my personal portfolio website!

I am a Versatile Software Developer specializing in Next.js, Python (FastAPI), Flutter, and AI integration.

This site is built with:
- **Framework**: Next.js (App Router, Static Export)
- **Styling**: Tailwind CSS + Framer Motion
- **CMS**: Decap CMS via GitHub
- **Hosting**: GitHub Pages

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## CMS Management

This portfolio uses **Decap CMS** to manage all content dynamically without touching code.

### 1. Accessing the Admin Panel
Navigate to `/admin` (e.g., `https://fazelx.github.io/admin` or `http://localhost:3000/admin`).
Log in using Netlify Identity (which uses GitHub OAuth).

### 2. Managing Content
Once logged in, you will see a dashboard with three main collections on the left sidebar:
*   **Site Settings**: Edit global settings such as your Hero text, About text, and the Bilingual Toggle.
*   **Experiences**: Manage your work history. Create new entries and set an `Order` number to organize them on the timeline.
*   **Projects**: Add new portfolio items. Here you can configure advanced features like:
    *   **Related Experience**: Use the dropdown to link a project to a specific Experience.
    *   **Featured on Timeline**: Toggle this ON if you want the project to appear as a floating card next to its linked Experience on the main timeline. (Max 5 per Experience will be displayed; the rest can be viewed via a "See All" link).
    *   **Media Gallery**: Upload multiple images and videos. The system will automatically generate a beautiful carousel modal for them. For each item, select whether it's an `image` or `video` to ensure the correct player is loaded.

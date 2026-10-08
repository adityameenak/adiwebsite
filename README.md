# Aditya Meenakshisundaram - Portfolio Website

Modern, minimalist portfolio website built with Vite, React, and Tailwind CSS.

## Features

- **Modern Design**: Minimalist cream-and-maroon interface with a pointer glow, custom cursor and reading-progress bar
- **One-Page Layout**: Smooth scrolling between sections
- **Fully Responsive**: Works beautifully on all devices
- **Scroll Animations**: Subtle fade-in effects as you scroll
- **SEO Optimized**: Complete meta tags for search engines and social sharing
- **Fast Performance**: Built with Vite for lightning-fast load times
- **Easy to Update**: All content managed in a single data file

## Tech Stack

- **Vite** - Next-generation frontend tooling
- **React** - Component-based UI library
- **Tailwind CSS** - Utility-first CSS framework
- **Inter Font** - Modern, clean typography

## Local Setup

### Prerequisites

- Node.js 16+ installed
- npm or yarn package manager

### Installation

1. Navigate to the project directory:
   ```bash
   cd portfolio-website
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit:
   ```
   http://localhost:5173
   ```

### Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## Updating Content

All website content is centralized in `src/data/content.js`. Edit this file to update:

- Personal information
- Experience entries
- Projects
- Writing samples
- Leadership roles
- Contact information

## Project Structure

```
portfolio-website/
├── src/
│   ├── components/          # React components
│   │   ├── Navigation.jsx   # Top navigation bar
│   │   ├── Hero.jsx         # Hero section
│   │   ├── About.jsx        # About section
│   │   ├── Projects.jsx     # Projects showcase
│   │   ├── Experience.jsx   # Work experience
│   │   ├── Writing.jsx      # Writing section
│   │   ├── Leadership.jsx   # Leadership activities
│   │   ├── Resume.jsx       # Resume viewer
│   │   ├── Contact.jsx      # Contact form
│   │   └── Footer.jsx       # Footer
│   ├── data/
│   │   └── content.js       # All website content
│   ├── hooks/
│   │   └── useScrollAnimation.js  # Scroll animation hook
│   ├── App.jsx              # Main app component
│   ├── main.jsx             # App entry point
│   └── index.css            # Global styles
├── index.html               # HTML template
├── tailwind.config.js       # Tailwind configuration
└── vite.config.js           # Vite configuration
```

## adi.ai — portfolio assistant

A floating "Ask adi.ai ✦" assistant answers questions about Adi using a
curated knowledge base, and links visitors to the relevant parts of the site.

**How it fits together**

- `src/components/assistant/` — launcher, chat panel (lazy-loaded), safe
  Markdown renderer, streaming chat hook, and site navigation helper.
- `api/chat.js` — Vercel serverless function (`POST /api/chat`). Calls OpenAI
  server-side and streams the reply. Validation, origin check, rate limiting,
  input/output caps and prompt-injection rules live in `api/_lib/`.
- `knowledge/` — what the assistant knows (Markdown) and every link it may
  show (`links.json`). Edit these to update answers; no UI changes needed.
  See `knowledge/README.md`.

**Run locally**

```bash
cp .env.example .env.local   # then set OPENAI_API_KEY
npm run dev                  # /api/chat is served by the Vite dev server
```

No key yet? `ADI_AI_MOCK=1 npm run dev` streams a canned reply so you can work
on the UI.

**Deploy (Vercel)**

1. Project → Settings → Environment Variables: add `OPENAI_API_KEY`
   (Production and Preview). Optional: `OPENAI_MODEL`.
2. Redeploy. `vercel.json` bundles `knowledge/` into the function and keeps
   `/api/*` out of the SPA rewrite.
3. Optional hardening: add a Vercel Firewall rate-limit rule for `/api/chat`
   and a monthly budget limit on the OpenAI key.

## Deployment

### Deploy to Vercel (Recommended)

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

Or use the Vercel dashboard:
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Vercel will auto-detect Vite and deploy

### Deploy to GitHub Pages

1. Update `vite.config.js` base path:
   ```js
   base: '/your-repo-name/'
   ```

2. Install gh-pages:
   ```bash
   npm install -D gh-pages
   ```

3. Add to `package.json`:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```

4. Deploy:
   ```bash
   npm run deploy
   ```

### Deploy to Netlify

1. Build the project:
   ```bash
   npm run build
   ```

2. Drag and drop the `dist` folder to [Netlify Drop](https://app.netlify.com/drop)

Or use Netlify CLI:
```bash
npm install -g netlify-cli
netlify deploy --prod
```

## Adding Your Resume PDF

1. Place your resume PDF in the `public` folder as `resume.pdf`
2. The Resume section will automatically link to it for download and viewing

## Customization

### Colors

Edit `tailwind.config.js` to change the purple accent color:

```js
colors: {
  purple: {
    500: '#8b5cf6',  // Change this hex value
    600: '#7c3aed',  // Change this hex value
  },
}
```

### Font

Change the font in `tailwind.config.js`:

```js
fontFamily: {
  sans: ['YourFont', 'system-ui', 'sans-serif'],
}
```

Update the import in `src/index.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=YourFont:wght@300;400;500;600;700;800;900&display=swap');
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Lighthouse Score: 95+ (Performance, Accessibility, Best Practices, SEO)
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s

## License

This project is open source and available for personal use.

## Contact

Aditya Meenakshisundaram
- Email: adityameenakshisundaram@gmail.com
- LinkedIn: [linkedin.com/in/adityameenakshi](https://www.linkedin.com/in/adityameenakshi/)

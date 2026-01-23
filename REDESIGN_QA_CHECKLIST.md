# Portfolio Redesign QA Checklist

## Pre-Launch Checklist

### 1. Install Dependencies
```bash
npm install lenis
```

### 2. Mobile Behavior
- [ ] Wordmark visible but appropriately sized on mobile (text-lg)
- [ ] Hero section readable on small screens (min 320px)
- [ ] Filter pills horizontally scrollable on mobile
- [ ] Project cards stack to single column on mobile
- [ ] Experience section uses stacked timeline on mobile (no sticky)
- [ ] Footer contact section responsive
- [ ] Touch targets minimum 44x44px
- [ ] Progress rail hidden on mobile (lg:flex)

### 3. Reduced Motion
- [ ] Test with `prefers-reduced-motion: reduce` enabled
  - Windows: Settings > Accessibility > Visual effects > Animation effects OFF
  - macOS: System Preferences > Accessibility > Display > Reduce motion
  - Chrome DevTools: Rendering tab > Emulate CSS media feature prefers-reduced-motion
- [ ] All animations disabled/instant when reduced motion is on
- [ ] Lenis smooth scroll disabled when reduced motion is on
- [ ] Site fully functional without animations
- [ ] No jarring flashes or layout shifts

### 4. Performance
- [ ] Run Lighthouse audit (target 90+ on all metrics)
- [ ] Check Core Web Vitals:
  - [ ] LCP < 2.5s (Largest Contentful Paint)
  - [ ] FID < 100ms (First Input Delay)
  - [ ] CLS < 0.1 (Cumulative Layout Shift)
- [ ] Verify no layout shifts during scroll
- [ ] Test on throttled connection (Slow 3G)
- [ ] Fonts load with `display=swap` (no FOIT)
- [ ] No unused CSS/JS in bundle

### 5. Accessibility
- [ ] Keyboard navigation works for all interactive elements
- [ ] Tab order is logical
- [ ] Focus states visible on all buttons/links
- [ ] Color contrast ratio minimum 4.5:1 for body text
- [ ] Color contrast ratio minimum 3:1 for large text
- [ ] Screen reader test (VoiceOver/NVDA):
  - [ ] All sections have proper headings (h1-h6 hierarchy)
  - [ ] Links have descriptive text
  - [ ] Images have alt text (when added)
  - [ ] Filter pills announce active state
- [ ] ARIA labels on icon-only buttons
- [ ] Skip to content link (optional but recommended)

### 6. Browser Compatibility
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Safari iOS
- [ ] Chrome Android
- [ ] Check CSS features used:
  - [ ] `clip-path` (supported in all modern browsers)
  - [ ] `backdrop-blur` (may need fallback)
  - [ ] CSS Grid (supported)
  - [ ] Flexbox (supported)
  - [ ] Custom properties (supported)

### 7. Content
- [ ] All project links work
- [ ] GitHub links point to real repos
- [ ] Resume PDF exists in `/public/resume.pdf`
- [ ] Email link opens mail client
- [ ] LinkedIn link opens in new tab
- [ ] Substack link works
- [ ] No lorem ipsum or placeholder text
- [ ] Contact form sends to correct email

### 8. Design Consistency
- [ ] Accent purple (#7C3AED) used sparingly
- [ ] Typography hierarchy clear (display, heading, body fonts)
- [ ] Spacing consistent (use Tailwind spacing scale)
- [ ] Border radius consistent
- [ ] Shadows consistent
- [ ] Hover states consistent across all interactive elements
- [ ] Active states consistent

### 9. Animations
- [ ] Smooth scroll feels natural (not too slow/fast)
- [ ] Section reveals trigger at correct scroll position
- [ ] Stagger animations feel coordinated
- [ ] Magnetic button effect is subtle (not disorienting)
- [ ] Filter transitions are smooth
- [ ] No janky/stuttering animations on scroll

### 10. Final Checks
- [ ] Favicon updated
- [ ] Meta tags updated (title, description, og:image)
- [ ] Analytics installed (if applicable)
- [ ] Console has no errors
- [ ] Console has no warnings
- [ ] 404 page exists

---

## Lighthouse Tips

### Performance
- Preload critical fonts
- Use `loading="lazy"` on below-fold images
- Minimize main thread work (avoid heavy JS on load)
- Serve images in next-gen formats (WebP)

### Accessibility
- Use semantic HTML (`<main>`, `<nav>`, `<article>`, etc.)
- Ensure all form inputs have labels
- Ensure sufficient color contrast

### Best Practices
- Use HTTPS
- Avoid deprecated APIs
- Use passive event listeners

### SEO
- Document has a `<title>`
- Document has a meta description
- Links have descriptive text
- Images have alt attributes

---

## File Structure Summary

```
src/
├── components/
│   ├── WordmarkLogo.jsx      # Fixed top-left wordmark
│   ├── ProgressRail.jsx      # Side progress indicator
│   ├── MagneticButton.jsx    # Magnetic hover effect
│   ├── FilterPills.jsx       # Project category filters
│   ├── ImageReveal.jsx       # Hover image reveal
│   ├── HeroChapter.jsx       # Hero section
│   ├── About.jsx             # About section (updated)
│   ├── ExperienceChapter.jsx # Experience section
│   ├── ProjectsChapter.jsx   # Projects with filters
│   ├── Writing.jsx           # Writing section (updated)
│   ├── Resume.jsx            # Resume section (updated)
│   ├── FooterContact.jsx     # Contact + footer
│   └── PinnedTransition.jsx  # Optional GSAP pinned section
├── hooks/
│   ├── index.js              # Hooks barrel export
│   ├── useReducedMotion.js   # Accessibility hook
│   └── useLenis.jsx          # Lenis smooth scroll
├── utils/
│   └── motion-variants.js    # Framer Motion variants
├── styles/
│   └── design-tokens.js      # Design system tokens
├── data/
│   └── content.js            # Content data (updated)
├── App.jsx                   # Main app with Lenis
├── main.jsx                  # React entry
└── index.css                 # Tailwind + fonts
```

---

## Quick Start

1. Install dependencies:
```bash
npm install lenis
```

2. Start dev server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

4. Preview production build:
```bash
npm run preview
```

---

## Notes

- The GSAP PinnedTransition component is optional. Only use if you want one pinned "chapter" transition.
- To add project images, update the `image` field in `src/data/content.js` and use the `ImageReveal` component.
- The design uses a limited color palette intentionally. Keep purple accent usage to ~5-10% of visible screen.

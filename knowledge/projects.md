# Projects

## STEM Research Finder

- Role: co-creator and lead developer. Live at stemresearchfinder.tech. Source code is public on GitHub (adityameenak/AggieResearchFinder).
- What it is: an AI-powered research discovery and outreach platform for students. Upload a resume, enter research interests, and get matched with faculty whose work fits where you want to go — then generate a personalized outreach email draft in one click.
- Origin: started as the Aggie Research Finder for Texas A&M and expanded to other universities, each with its own branded subpage: Texas A&M (Aggie Research Finder), Rice (Owl Research Finder), UT Austin (Longhorn Research Finder) and UT Dallas (Comet Research Finder).
- Scale: indexes 5,000+ STEM faculty; 3,000+ student users, grown without paid marketing.

**How it works**
- Data collection: Python crawlers using Playwright and BeautifulSoup scrape faculty directory pages across 50+ university web sources. Where a school exposes a clean API (Rice's profile system has a JSON:API), it uses that instead of HTML scraping. A merge step canonicalizes department names through a shared taxonomy, merges joint-appointment duplicates into one record, and writes per-school datasets; an audit tool checks data coverage and quality per school.
- Search: multi-attribute search across institution, discipline/department and research area, in a single interface.
- Matching is interest-driven: the student's stated interests are tokenized and scored by keyword overlap against each professor's research summary, name and department. The resume adds a secondary boost (35% weight) that is capped at the interest score, so a resume can reorder interest matches but never outrank them. Results are ranked and labeled Strong Fit (≥ 60% of the top score), Exploratory Fit (≥ 25%) or Adjacent Fit, with a per-professor explanation; the top 20 are returned.
- AI features (using an LLM, Claude): structured resume parsing into a profile (coursework, skills, tools, lab techniques, experiences, inferred themes), natural-language match explanations, and personalized outreach email drafts grounded in the professor's own research and papers. Without an API key it runs in a mock mode with keyword heuristics and templates, so every feature still works.
- MCP server: the dataset is also available to AI assistants (Claude or any MCP-compatible assistant) through a public, read-only, rate-limited MCP endpoint, with tools to list schools/departments/topics, search and match faculty, get a professor's profile with most-cited papers, and fetch an outreach-email brief. It reuses the site's own search and matching code so results match the website.
- Tech stack: Python crawlers (Playwright, BeautifulSoup); FastAPI + SQLAlchemy backend with a multi-tenant schema (each faculty record carries a university code); Vite + React + Tailwind front end; serverless API functions on Vercel. (The portfolio also lists Next.js.)

## Switchable Thermal Barriers Against Battery Runaway

- A research simulation and technical report; see research.md for details.
- Tech: Python, finite-volume simulation, heat transfer, battery safety.
- Public paper (PDF on the portfolio) and code on GitHub.

## Sustainapath

- Role: creator and developer (built independently). Live at sustainapath.vercel.app.
- What it is: an AI-assisted chemical-process analysis web app. You describe a chemical or industrial process in plain language, and it returns sustainability, cost and efficiency assessments with improvement recommendations.
- Optimization goals: users choose the focus of the assessment — sustainability, cost, efficiency, or a balanced view.
- Workflow: AI-assisted clarifying questions about the process, process scoring, automatic process flow diagram (PFD) generation, and improvement recommendations.
- Tech: React, AI (LLM-assisted analysis), deployed on Vercel.

## SolarIQ

- A solar energy analytics platform for tracking, forecasting and optimizing energy production from solar installations, letting users monitor output and find efficiency opportunities.
- Tech: Python, Streamlit, analytics. Live at iqsolar.streamlit.app.

## Substack (writing)

- 30+ long-form articles on semiconductors, materials and energy, with 400+ monthly readers. See writing.md.

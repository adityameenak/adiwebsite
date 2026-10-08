# adi.ai knowledge base

Everything adi.ai knows about Adi comes from the files in this folder. Edit them
to change what it says — no UI code needs to change. Redeploy (or restart
`npm run dev`) to pick up edits.

## Files

| File | What goes in it |
| --- | --- |
| `about.md` | Background, education, interests, career goals |
| `experience.md` | Jobs and internships |
| `research.md` | Research projects and fellowships |
| `projects.md` | Built projects (software, reports) |
| `skills.md` | Technical skills, grouped |
| `writing.md` | Substack and articles |
| `contact.md` | Public contact links and the resume |
| `links.json` | Every link / section the assistant may point visitors to |

Every `.md` file in this folder (except this README) is loaded, in alphabetical
order, so you can add new topic files without touching code.

## Rules for editing

- **Only public, verified facts.** Anything here can be repeated to any visitor.
  No phone number, home address, confidential internship details, or
  unpublished research.
- **Placeholders go in HTML comments.** Anything inside `<!-- ... -->` is
  stripped before the model sees it, so unfinished notes never leak into
  answers. When a fact is confirmed, move it out of the comment.
- **Don't describe planned things as done.** Write "starting in May 2027" rather
  than past tense.

## links.json

Each entry is an action the assistant can attach to an answer as a button.
The model only ever returns an `id`; the browser looks the id up here, so it
can never invent a URL.

- `route` + `section`: a page on this site. If the visitor is on the home page
  and the section exists there, it scrolls; otherwise it navigates to `route`
  and scrolls to `section` if present.
- `href`: an external link, a file in `/public`, or a `mailto:` link.
- `description`: tells the model when the action is relevant (not shown).

Project sections use the id `project-<slug>`, where the slug is the project
title lowercased with non-alphanumerics replaced by `-`
(e.g. `project-stem-research-finder`).

## Adding RAG later

`api/_lib/knowledge.js` exposes `loadKnowledge()`, which currently returns the
whole folder as one string. To switch to retrieval, replace it with a function
that takes the visitor's question and returns only the relevant chunks — the
rest of the pipeline stays the same.

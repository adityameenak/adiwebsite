import { motion } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

/**
 * HeroPortrait
 *
 * A hand-crafted SVG bust portrait rendered as a softly-faded background
 * element in the hero section. Uses warm editorial tones (blush, cream, warm
 * brown) that integrate with the shell palette.
 *
 * Technique:
 *  - SVG paths with Bezier curves for organic shapes
 *  - Radial/linear gradient fills for soft volume
 *  - Internal SVG mask for top/bottom edge fade
 *  - CSS mask-image for left/right edge fade
 *  - CSS blur filter for impressionistic softening
 *  - ~13% opacity so typography stays clearly dominant
 *
 * Easily replaced: swap the SVG content for a real <image> tag pointing to
 * a portrait photo and the layering/masking will continue to work correctly.
 */
export default function HeroPortrait({ className = '' }) {
  const reducedMotion = useReducedMotion();

  // Unique gradient IDs to avoid collisions if the component is used twice
  const uid = 'hp_';

  return (
    <div
      className={`absolute top-0 right-0 bottom-0 pointer-events-none select-none hidden md:block ${className}`}
      style={{
        width: '54%',
        maxWidth: '620px',
        opacity: 0.13,
        /* Fade left edge (so it blends into text area) and
           right edge (where the shell rounds) */
        maskImage:
          'linear-gradient(to right, transparent 0%, black 22%, black 82%, transparent 100%)',
        WebkitMaskImage:
          'linear-gradient(to right, transparent 0%, black 22%, black 82%, transparent 100%)',
      }}
      aria-hidden="true"
    >
      <motion.svg
        viewBox="0 0 400 620"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        style={{ filter: 'blur(1.8px)' }}
        initial={reducedMotion ? false : { opacity: 0, scale: 1.02 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* ── Gradient fills ── */}
          <radialGradient id={`${uid}gFace`} cx="50%" cy="44%" r="56%">
            <stop offset="0%"   stopColor="#DDBFAC" />
            <stop offset="55%"  stopColor="#CEA898" />
            <stop offset="100%" stopColor="#BFA090" />
          </radialGradient>

          <radialGradient id={`${uid}gHair`} cx="50%" cy="28%" r="58%">
            <stop offset="0%"   stopColor="#9A7468" />
            <stop offset="100%" stopColor="#7A5E52" />
          </radialGradient>

          <radialGradient id={`${uid}gShoulder`} cx="50%" cy="30%" r="60%">
            <stop offset="0%"   stopColor="#C8B0A4" />
            <stop offset="100%" stopColor="#B89E94" />
          </radialGradient>

          <radialGradient id={`${uid}gNeck`} cx="50%" cy="40%" r="60%">
            <stop offset="0%"   stopColor="#D8BAA8" />
            <stop offset="100%" stopColor="#C4A898" />
          </radialGradient>

          <linearGradient id={`${uid}gLip`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#C49898" />
            <stop offset="100%" stopColor="#B48888" />
          </linearGradient>

          {/* ── Top + bottom fade mask ── */}
          <linearGradient id={`${uid}vFade`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"  stopColor="white" stopOpacity="0" />
            <stop offset="8%"  stopColor="white" stopOpacity="1" />
            <stop offset="80%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <mask id={`${uid}fade`}>
            <rect width="400" height="620" fill={`url(#${uid}vFade)`} />
          </mask>
        </defs>

        {/* ── All shapes sit inside the fade mask ── */}
        <g mask={`url(#${uid}fade)`}>

          {/* ────────────────────────────────────────
              SHOULDERS / BODY BASE
          ──────────────────────────────────────── */}
          <ellipse cx="200" cy="585" rx="230" ry="90" fill={`url(#${uid}gShoulder)`} />

          {/* Shirt / clothing suggestion */}
          <path
            d="M 30 620 C 40 550 80 510 120 495 L 140 510 L 200 490 L 260 510 L 280 495 C 320 510 360 550 370 620 Z"
            fill="#B8A49C"
            opacity="0.7"
          />

          {/* ────────────────────────────────────────
              NECK
          ──────────────────────────────────────── */}
          <path
            d="M 172 418 C 168 445 166 462 165 478
               C 174 487 200 490 200 490
               C 200 490 226 487 235 478
               C 234 462 232 445 228 418 Z"
            fill={`url(#${uid}gNeck)`}
          />

          {/* ────────────────────────────────────────
              FACE
              Organic bezier — wider at cheeks, tapers to chin
          ──────────────────────────────────────── */}
          <path
            d="M 200 135
               C 250 135 298 162 306 210
               C 314 255 312 295 305 330
               C 296 365 272 400 200 408
               C 128 400 104 365 95 330
               C 88 295 86 255 94 210
               C 102 162 150 135 200 135 Z"
            fill={`url(#${uid}gFace)`}
          />

          {/* Jaw / chin highlight */}
          <ellipse cx="200" cy="388" rx="50" ry="22" fill="#C8A898" opacity="0.4" />

          {/* Cheekbone subtle warmth */}
          <ellipse cx="140" cy="295" rx="32" ry="22" fill="#D8B8A8" opacity="0.35" />
          <ellipse cx="260" cy="295" rx="32" ry="22" fill="#D8B8A8" opacity="0.35" />

          {/* ────────────────────────────────────────
              EARS
          ──────────────────────────────────────── */}
          <path
            d="M 87 258 C 74 248 68 268 70 285 C 72 302 82 310 92 304"
            fill="#C8A898" stroke="#B89888" strokeWidth="1" />
          <path
            d="M 313 258 C 326 248 332 268 330 285 C 328 302 318 310 308 304"
            fill="#C8A898" stroke="#B89888" strokeWidth="1" />

          {/* ────────────────────────────────────────
              HAIR
              Main volume on top, flowing down sides
          ──────────────────────────────────────── */}

          {/* Hair top mass */}
          <path
            d="M 200 135
               C 150 135 108 148 92 168
               C 76 188 72 215 75 238
               C 82 222 86 208 90 200
               C 94 185 102 165 115 153
               C 128 140 162 124 200 122
               C 238 124 272 140 285 153
               C 298 165 306 185 310 200
               C 314 208 318 222 325 238
               C 328 215 324 188 308 168
               C 292 148 250 135 200 135 Z"
            fill={`url(#${uid}gHair)`}
          />

          {/* Hair crown arch — the dome of the head above the face line */}
          <ellipse cx="200" cy="108" rx="122" ry="68" fill={`url(#${uid}gHair)`} />

          {/* Hair left side flow */}
          <path
            d="M 88 200 C 72 238 66 275 68 315
               C 74 300 80 280 84 258
               C 86 240 87 220 88 200 Z"
            fill="#8A6858"
          />

          {/* Hair right side flow */}
          <path
            d="M 312 200 C 328 238 334 275 332 315
               C 326 300 320 280 316 258
               C 314 240 313 220 312 200 Z"
            fill="#8A6858"
          />

          {/* ────────────────────────────────────────
              EYEBROWS
          ──────────────────────────────────────── */}
          <path
            d="M 135 205 C 145 199 158 197 170 202"
            stroke="#7A5E52" strokeWidth="3.5" fill="none"
            strokeLinecap="round"
          />
          <path
            d="M 230 202 C 242 197 255 199 265 205"
            stroke="#7A5E52" strokeWidth="3.5" fill="none"
            strokeLinecap="round"
          />

          {/* ────────────────────────────────────────
              EYES
          ──────────────────────────────────────── */}

          {/* Left eye socket + lid */}
          <path
            d="M 133 222 C 142 213 162 212 172 222
               C 162 231 142 231 133 222 Z"
            fill="#7A5E52"
          />
          {/* Left iris */}
          <circle cx="152" cy="221" r="7.5" fill="#4A3830" />
          {/* Left highlight */}
          <circle cx="155" cy="219" r="2.2" fill="white" opacity="0.45" />

          {/* Right eye socket + lid */}
          <path
            d="M 228 222 C 238 212 258 213 267 222
               C 258 231 238 231 228 222 Z"
            fill="#7A5E52"
          />
          {/* Right iris */}
          <circle cx="248" cy="221" r="7.5" fill="#4A3830" />
          {/* Right highlight */}
          <circle cx="251" cy="219" r="2.2" fill="white" opacity="0.45" />

          {/* ────────────────────────────────────────
              NOSE
          ──────────────────────────────────────── */}
          <path
            d="M 200 238
               C 197 255 192 272 188 280
               C 192 286 200 289 200 289
               C 200 289 208 286 212 280
               C 208 272 203 255 200 238 Z"
            fill="#B89888"
            opacity="0.5"
          />
          {/* Nostrils hint */}
          <path
            d="M 186 282 C 182 285 180 288 182 291 C 184 294 188 292 190 289"
            fill="#A88878" opacity="0.4"
          />
          <path
            d="M 214 282 C 218 285 220 288 218 291 C 216 294 212 292 210 289"
            fill="#A88878" opacity="0.4"
          />

          {/* ────────────────────────────────────────
              MOUTH / LIPS
          ──────────────────────────────────────── */}

          {/* Upper lip — M-shaped cupid's bow */}
          <path
            d="M 168 328
               C 174 323 183 320 191 322
               C 196 318 204 318 209 322
               C 217 320 226 323 232 328
               C 226 334 218 338 210 336
               C 207 339 200 341 200 341
               C 200 341 193 339 190 336
               C 182 338 174 334 168 328 Z"
            fill={`url(#${uid}gLip)`}
          />

          {/* Lower lip */}
          <path
            d="M 168 328 C 174 342 185 349 200 350 C 215 349 226 342 232 328"
            stroke="#B09090" strokeWidth="0.8" fill="none"
          />

          {/* Lip separator line */}
          <path
            d="M 171 330 C 185 335 200 337 229 330"
            stroke="#A08080" strokeWidth="1.5" fill="none"
            strokeLinecap="round" opacity="0.6"
          />

          {/* ────────────────────────────────────────
              PHILTRUM (subtle vertical groove above lips)
          ──────────────────────────────────────── */}
          <path
            d="M 195 302 L 193 322 M 205 302 L 207 322"
            stroke="#B89888" strokeWidth="0.8" fill="none" opacity="0.3"
          />

        </g>{/* end fade mask group */}
      </motion.svg>
    </div>
  );
}

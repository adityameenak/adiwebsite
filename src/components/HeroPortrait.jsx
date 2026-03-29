import { useReducedMotion } from '../hooks/useReducedMotion';

/**
 * HeroPortrait
 *
 * SVG editorial portrait — used as a background focal-point in the hero.
 *
 * Visibility decisions:
 *  - opacity 0.28 instead of 0.13 (0.13 was invisible on warm-white bg)
 *  - fill colors shifted to dark warm sepia (#2C1A10, #A07560) for real
 *    contrast against the #FEFCF9 surface
 *  - CSS blur reduced to 0.5px (just enough to soften edges, not erase)
 *  - mask-image loosened so only the very edges fade out
 *
 * Swap-in: replace the <g id="portrait"> content with an SVG <image>
 * pointing to a real portrait photo and all the layering will carry over.
 */
export default function HeroPortrait() {
  const reducedMotion = useReducedMotion();

  return (
    <div
      className="absolute top-0 right-0 bottom-0 pointer-events-none select-none hidden md:block"
      style={{
        width: '58%',
        maxWidth: '660px',
        opacity: reducedMotion ? 0 : 0.28,
        maskImage:
          'linear-gradient(to right, transparent 0%, black 8%, black 94%, transparent 100%)',
        WebkitMaskImage:
          'linear-gradient(to right, transparent 0%, black 8%, black 94%, transparent 100%)',
      }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 420 640"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        style={{ filter: 'blur(0.5px)' }}
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* ─── Top/bottom fade ─── */}
          <linearGradient id="phVFade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="white" stopOpacity="0" />
            <stop offset="6%"   stopColor="white" stopOpacity="1" />
            <stop offset="82%"  stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <mask id="phFade">
            <rect width="420" height="640" fill="url(#phVFade)" />
          </mask>

          {/* ─── Fill gradients ─── */}
          {/* Hair — deep warm brown */}
          <radialGradient id="phHair" cx="50%" cy="30%" r="60%">
            <stop offset="0%"   stopColor="#2C1A10" />
            <stop offset="100%" stopColor="#1E1008" />
          </radialGradient>

          {/* Face — medium warm brown for contrast on cream bg */}
          <radialGradient id="phFace" cx="50%" cy="42%" r="55%">
            <stop offset="0%"   stopColor="#C09078" />
            <stop offset="60%"  stopColor="#A87860" />
            <stop offset="100%" stopColor="#906858" />
          </radialGradient>

          {/* Neck/shoulders — slightly darker */}
          <radialGradient id="phNeck" cx="50%" cy="35%" r="60%">
            <stop offset="0%"   stopColor="#B08878" />
            <stop offset="100%" stopColor="#986868" />
          </radialGradient>

          {/* Shoulder body — darkest zone for grounding */}
          <radialGradient id="phBody" cx="50%" cy="20%" r="70%">
            <stop offset="0%"   stopColor="#785848" />
            <stop offset="100%" stopColor="#604838" />
          </radialGradient>
        </defs>

        <g mask="url(#phFade)">

          {/* ─────────────────────────────────────────
              BODY / SHOULDERS
          ───────────────────────────────────────── */}
          {/* Wide torso base */}
          <ellipse cx="210" cy="610" rx="250" ry="100" fill="url(#phBody)" />

          {/* Clothing/shirt shape */}
          <path
            d="M 20 640 C 30 570 75 530 120 515
               L 148 530 L 210 508 L 272 530 L 300 515
               C 345 530 390 570 400 640 Z"
            fill="#604838"
            opacity="0.85"
          />

          {/* ─────────────────────────────────────────
              NECK
          ───────────────────────────────────────── */}
          <path
            d="M 185 422 C 180 450 178 468 176 486
               C 186 496 210 500 210 500
               C 210 500 234 496 244 486
               C 242 468 240 450 235 422 Z"
            fill="url(#phNeck)"
          />

          {/* ─────────────────────────────────────────
              FACE
              Organic bezier — widest at cheekbones
          ───────────────────────────────────────── */}
          <path
            d="M 210 140
               C 265 140 316 168 322 220
               C 328 268 326 310 318 346
               C 308 384 282 414 210 420
               C 138 414 112 384 102 346
               C 94 310 92 268 98 220
               C 104 168 155 140 210 140 Z"
            fill="url(#phFace)"
          />

          {/* Chin / jaw definition */}
          <ellipse cx="210" cy="400" rx="54" ry="22" fill="#906858" opacity="0.5" />

          {/* Cheekbone warmth */}
          <ellipse cx="148" cy="305" rx="34" ry="24" fill="#C0907A" opacity="0.4" />
          <ellipse cx="272" cy="305" rx="34" ry="24" fill="#C0907A" opacity="0.4" />

          {/* ─────────────────────────────────────────
              EARS
          ───────────────────────────────────────── */}
          <path
            d="M 95 268 C 80 256 74 274 76 292
               C 78 310 90 318 100 312"
            fill="#A07868" stroke="#906858" strokeWidth="1"
          />
          <path
            d="M 325 268 C 340 256 346 274 344 292
               C 342 310 330 318 320 312"
            fill="#A07868" stroke="#906858" strokeWidth="1"
          />

          {/* ─────────────────────────────────────────
              HAIR
          ───────────────────────────────────────── */}
          {/* Main dome */}
          <ellipse cx="210" cy="100" rx="132" ry="76" fill="url(#phHair)" />

          {/* Hair-to-face transition (fills the upper face curve) */}
          <path
            d="M 210 140
               C 155 140 110 155 98 190
               C 88 178 84 155 90 138
               C 104 98 152 68 210 64
               C 268 68 316 98 330 138
               C 336 155 332 178 322 190
               C 310 155 265 140 210 140 Z"
            fill="url(#phHair)"
          />

          {/* Left side hair flow */}
          <path
            d="M 96 210 C 78 248 72 288 76 332
               C 82 315 88 294 92 268
               C 94 248 95 228 96 210 Z"
            fill="#281408"
          />

          {/* Right side hair flow */}
          <path
            d="M 324 210 C 342 248 348 288 344 332
               C 338 315 332 294 328 268
               C 326 248 325 228 324 210 Z"
            fill="#281408"
          />

          {/* ─────────────────────────────────────────
              EYEBROWS
          ───────────────────────────────────────── */}
          <path
            d="M 142 210 C 154 203 168 201 180 206"
            stroke="#281408" strokeWidth="4"
            fill="none" strokeLinecap="round"
          />
          <path
            d="M 240 206 C 252 201 266 203 278 210"
            stroke="#281408" strokeWidth="4"
            fill="none" strokeLinecap="round"
          />

          {/* ─────────────────────────────────────────
              EYES
          ───────────────────────────────────────── */}
          {/* Left eye */}
          <path
            d="M 142 228 C 152 218 170 217 180 228
               C 170 238 152 238 142 228 Z"
            fill="#4A3028"
          />
          <circle cx="161" cy="227" r="8" fill="#1C0E08" />
          <circle cx="164" cy="224" r="2.5" fill="white" opacity="0.5" />

          {/* Right eye */}
          <path
            d="M 240 228 C 250 217 268 218 278 228
               C 268 238 250 238 240 228 Z"
            fill="#4A3028"
          />
          <circle cx="259" cy="227" r="8" fill="#1C0E08" />
          <circle cx="262" cy="224" r="2.5" fill="white" opacity="0.5" />

          {/* ─────────────────────────────────────────
              NOSE
          ───────────────────────────────────────── */}
          <path
            d="M 210 248 C 207 268 201 286 197 296
               C 204 303 210 306 210 306
               C 210 306 216 303 223 296
               C 219 286 213 268 210 248 Z"
            fill="#906858" opacity="0.6"
          />
          {/* Nostril hints */}
          <path d="M 195 298 C 190 302 189 306 191 310 C 194 313 198 311 200 307"
                fill="#806050" opacity="0.5" />
          <path d="M 225 298 C 230 302 231 306 229 310 C 226 313 222 311 220 307"
                fill="#806050" opacity="0.5" />

          {/* ─────────────────────────────────────────
              MOUTH
          ───────────────────────────────────────── */}
          {/* Upper lip (cupid's bow) */}
          <path
            d="M 178 344
               C 185 338 195 335 203 337
               C 207 333 213 333 217 337
               C 225 335 235 338 242 344
               C 235 352 226 356 218 354
               C 215 358 210 360 210 360
               C 210 360 205 358 202 354
               C 194 356 185 352 178 344 Z"
            fill="#A07070"
          />
          {/* Lower lip */}
          <path
            d="M 178 344 C 185 358 196 364 210 365 C 224 364 235 358 242 344"
            stroke="#907060" strokeWidth="0.8" fill="none"
          />
          {/* Lip centre line */}
          <path
            d="M 181 347 C 195 352 210 354 239 347"
            stroke="#906060" strokeWidth="1.8"
            fill="none" strokeLinecap="round" opacity="0.7"
          />

          {/* ─────────────────────────────────────────
              PHILTRUM
          ───────────────────────────────────────── */}
          <path
            d="M 205 316 L 203 338 M 215 316 L 217 338"
            stroke="#906858" strokeWidth="0.8"
            fill="none" opacity="0.35"
          />

        </g>{/* /phFade mask */}
      </svg>
    </div>
  );
}

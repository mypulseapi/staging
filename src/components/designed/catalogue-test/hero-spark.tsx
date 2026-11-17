/**
 * The magic wand before the hero heading (owner's pick "I2c-r3", 12 Nov 2026, from the designer's
 * mockups): the wand flicks, the big sparkle and two small ones pop out of its tip, they rest about
 * 3s, then the small ones twinkle out and the big one glows, swells and dissolves into four sparks,
 * and the loop (7.2s) starts again from the wand alone. CSS only, in `globals.css` under
 * "Hero spark"; with reduced motion it is the still rest frame. Decorative, so hidden from
 * screen readers.
 */
const FILL = "url(#hero-spark-fill)";
const STAR = {
  fill: FILL,
  stroke: FILL,
  strokeWidth: 1.2,
  strokeLinejoin: "round",
} as const;

export function HeroSpark() {
  return (
    <svg
      className="hero-spark"
      viewBox="0 0 32 32"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient
          id="hero-spark-fill"
          gradientUnits="userSpaceOnUse"
          x1="3"
          y1="29"
          x2="29"
          y2="3"
        >
          <stop offset="0" style={{ stopColor: "var(--spark-0)" }} />
          <stop offset=".5" style={{ stopColor: "var(--spark-1)" }} />
          <stop offset="1" style={{ stopColor: "var(--spark-2)" }} />
        </linearGradient>
        <radialGradient id="hero-spark-glow">
          <stop
            offset="0"
            style={{ stopColor: "var(--spark-1)", stopOpacity: 0.7 }}
          />
          <stop
            offset="1"
            style={{ stopColor: "var(--spark-1)", stopOpacity: 0 }}
          />
        </radialGradient>
      </defs>
      <g className="hs-wand">
        <path
          d="M5.5 27.5 L15 18"
          stroke="currentColor"
          strokeWidth="3.4"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M15 18 L19.2 13.8"
          stroke={FILL}
          strokeWidth="3.4"
          strokeLinecap="round"
          fill="none"
        />
      </g>
      <circle
        className="hs-glow"
        cx="21.5"
        cy="10.5"
        r="11"
        fill="url(#hero-spark-glow)"
      />
      <path
        {...STAR}
        className="hs-star hs-big"
        d="M21.5,2.3 L23.47,8.53 L29.7,10.5 L23.47,12.47 L21.5,18.7 L19.53,12.47 L13.3,10.5 L19.53,8.53Z"
      />
      <path
        {...STAR}
        className="hs-star hs-s1"
        d="M28.2,0 L29.11,2.89 L32,3.8 L29.11,4.71 L28.2,7.6 L27.29,4.71 L24.4,3.8 L27.29,2.89Z"
      />
      <path
        {...STAR}
        className="hs-star hs-s2"
        d="M5.5,3.6 L6.32,6.18 L8.9,7 L6.32,7.82 L5.5,10.4 L4.68,7.82 L2.1,7 L4.68,6.18Z"
      />
      <circle
        fill={FILL}
        className="hs-spark hs-p1"
        cx="21.5"
        cy="10.5"
        r="1.3"
      />
      <circle
        fill={FILL}
        className="hs-spark hs-p2"
        cx="21.5"
        cy="10.5"
        r="1"
      />
      <path
        fill={FILL}
        className="hs-spark hs-p3"
        d="M21.5,8.3 L22.03,9.97 L23.7,10.5 L22.03,11.03 L21.5,12.7 L20.97,11.03 L19.3,10.5 L20.97,9.97Z"
      />
      <circle
        fill={FILL}
        className="hs-spark hs-p4"
        cx="21.5"
        cy="10.5"
        r=".9"
      />
    </svg>
  );
}

/**
 * Shared palette and SVG primitives for every generated asset.
 *
 * Both generators import from here so a colour change can never leave the light
 * and dark variants, or the hero and the stats card, disagreeing with each other.
 */

export const MONO =
  "ui-monospace,SFMono-Regular,'SF Mono',Menlo,Consolas,'Liberation Mono',monospace";
export const SANS =
  "'Segoe UI',-apple-system,BlinkMacSystemFont,Roboto,'Helvetica Neue',Arial,sans-serif";

/** Monospace advance width as a fraction of font-size. Close enough on every
 *  common mono face to place carets and columns deterministically. */
export const ADV = 0.6009;

export const THEMES = {
  dark: {
    id: "dark",
    bg: "#0A0C12",
    bg2: "#0D111A",
    chrome: "#121722",
    border: "#1D2331",
    ink: "#E8EEF7",
    dim: "#94A3B8",
    faint: "#5C6A80",
    violet: "#8B5CF6",
    indigo: "#6366F1",
    cyan: "#22D3EE",
    teal: "#2DD4BF",
    pink: "#F472B6",
    green: "#34D399",
    amber: "#FBBF24",
    red: "#FB7185",
    dot: "#FFFFFF",
    dotOp: 0.085,
    auroraOp: 0.34,
    sweepOp: 0.45,
    grainOp: 0.055,
    glow: true,
  },
  light: {
    id: "light",
    bg: "#FBFCFE",
    bg2: "#F1F4FA",
    chrome: "#EDF1F7",
    border: "#DBE2ED",
    ink: "#0B1020",
    dim: "#4A566B",
    faint: "#7A8798",
    violet: "#6D28D9",
    indigo: "#4338CA",
    cyan: "#0E7490",
    teal: "#0F766E",
    pink: "#BE185D",
    green: "#047857",
    amber: "#B45309",
    red: "#BE123C",
    dot: "#0B1020",
    dotOp: 0.075,
    auroraOp: 0.16,
    sweepOp: 0.5,
    grainOp: 0.03,
    glow: false,
  },
};

/** Blurred colour clouds that drift behind everything else. */
export const aurora = (t, blobs) => `
  <g filter="url(#soften)" opacity="${t.auroraOp}">
    ${blobs
      .map(
        (b) => `<ellipse cx="${b.x}" cy="${b.y}" rx="${b.rx}" ry="${b.ry}" fill="${b.fill}">
      <animateTransform attributeName="transform" type="translate"
        values="0 0; ${b.dx} ${b.dy}; ${-b.dx * 0.6} ${b.dy * 0.7}; 0 0"
        dur="${b.dur}s" repeatCount="indefinite" calcMode="spline"
        keyTimes="0;0.33;0.66;1" keySplines=".4 0 .6 1;.4 0 .6 1;.4 0 .6 1"/>
    </ellipse>`,
      )
      .join("\n    ")}
  </g>`;

/** Diagonal specular highlight that sweeps across the panel. */
export const sweep = (t, h, dur = 7) => `
  <g transform="skewX(-18)" opacity="${t.sweepOp}">
    <g>
      <animateTransform attributeName="transform" type="translate"
        values="-700 0; 2000 0" dur="${dur}s" repeatCount="indefinite"/>
      <rect x="0" y="${-h}" width="190" height="${h * 3}" fill="url(#sweepG)"/>
    </g>
  </g>`;

export const grain = (t, w, h) =>
  `<rect width="${w}" height="${h}" filter="url(#grain)" opacity="${t.grainOp}"/>`;

export const defsShared = (t) => `
  <filter id="soften" x="-60%" y="-60%" width="220%" height="220%">
    <feGaussianBlur stdDeviation="62"/>
  </filter>
  <filter id="grain" x="0" y="0" width="100%" height="100%">
    <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch"/>
    <feColorMatrix type="saturate" values="0"/>
  </filter>
  <linearGradient id="sweepG" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0" stop-color="${t.ink}" stop-opacity="0"/>
    <stop offset=".5" stop-color="${t.ink}" stop-opacity=".085"/>
    <stop offset="1" stop-color="${t.ink}" stop-opacity="0"/>
  </linearGradient>
  <pattern id="dots" width="26" height="26" patternUnits="userSpaceOnUse">
    <circle cx="1.4" cy="1.4" r="1.35" fill="${t.dot}" opacity="${t.dotOp}"/>
  </pattern>`;

/** XML-escapes text that comes from the GitHub API rather than this file. */
export const esc = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

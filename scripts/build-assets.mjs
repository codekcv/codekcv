#!/usr/bin/env node
/**
 * Builds every animated SVG used by the profile README.
 *
 * Why generate instead of hand-writing the files: each asset needs a light and a
 * dark variant that are structurally identical and differ only by palette. Keeping
 * one source of truth means a colour tweak can never desync the two themes.
 *
 * Constraints these assets are written against, because GitHub serves them through
 * the camo image proxy inside an <img> tag:
 *   - no external fonts, stylesheets, images or scripts. System font stacks only.
 *   - CSS animations and SMIL both run; JavaScript does not.
 *   - the browser, not GitHub, decides light vs dark, so the README pairs the two
 *     files with <picture media="(prefers-color-scheme: ...)">.
 *   - camo caches by URL, so bump the ?v= query in README.md after regenerating.
 *
 * Usage: node scripts/build-assets.mjs
 */

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { ADV, MONO, SANS, THEMES, aurora, defsShared, grain, sweep } from "./theme.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "assets");

/* -------------------------------------------------------------------- hero */

function hero(t) {
  const W = 1280;
  const H = 400;

  // Rotating strapline. Kept lowercase and monospaced so it reads as a log line
  // rather than a marketing subtitle.
  const phrases = [
    "react 18 · typescript · vite · tanstack query",
    "python · fastapi · sqlalchemy · azure",
    "design systems that survive contact",
    "spec-driven delivery, agents in the loop",
  ];
  const SLOT = 4; // seconds each phrase holds
  const CYCLE = phrases.length * SLOT;
  const pct = (s) => ((s / CYCLE) * 100).toFixed(3);

  const padX = 80;
  const phX = padX + 28; // clears the "&gt;" prompt glyph
  const phSize = 21;
  const adv = phSize * ADV;

  const orbit = { x: 1048, y: 200 };

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-labelledby="heroTitle">
<title id="heroTitle">Christian Villamin, software engineer in Manila, Philippines</title>
<defs>
  ${defsShared(t)}
  <linearGradient id="bgG" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="${t.bg}"/>
    <stop offset="1" stop-color="${t.bg2}"/>
  </linearGradient>
  <linearGradient id="nameG" x1="0" y1="0" x2="520" y2="0" gradientUnits="userSpaceOnUse" spreadMethod="reflect">
    <stop offset="0" stop-color="${t.ink}"/>
    <stop offset=".42" stop-color="${t.ink}"/>
    <stop offset=".62" stop-color="${t.violet}"/>
    <stop offset=".8" stop-color="${t.cyan}"/>
    <stop offset="1" stop-color="${t.ink}"/>
    <animateTransform attributeName="gradientTransform" type="translate"
      values="-1040 0; 1040 0" dur="8s" repeatCount="indefinite"/>
  </linearGradient>
  <linearGradient id="kickG" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="${t.cyan}"/>
    <stop offset="1" stop-color="${t.violet}"/>
  </linearGradient>
  <linearGradient id="ruleG" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0" stop-color="${t.violet}" stop-opacity=".9"/>
    <stop offset=".45" stop-color="${t.cyan}" stop-opacity=".55"/>
    <stop offset="1" stop-color="${t.cyan}" stop-opacity="0"/>
  </linearGradient>
  <linearGradient id="ringG" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="${t.violet}" stop-opacity=".95"/>
    <stop offset=".5" stop-color="${t.cyan}" stop-opacity=".7"/>
    <stop offset="1" stop-color="${t.violet}" stop-opacity=".15"/>
  </linearGradient>
  <radialGradient id="coreG">
    <stop offset="0" stop-color="${t.ink}"/>
    <stop offset=".55" stop-color="${t.cyan}"/>
    <stop offset="1" stop-color="${t.violet}"/>
  </radialGradient>
  <radialGradient id="fadeMaskG">
    <stop offset="0" stop-color="#fff" stop-opacity=".95"/>
    <stop offset=".75" stop-color="#fff" stop-opacity=".25"/>
    <stop offset="1" stop-color="#fff" stop-opacity="0"/>
  </radialGradient>
  <!-- Scrim and vignette pull the aurora back off the type so the name keeps
       its contrast in both themes without desaturating the background. -->
  <linearGradient id="scrimG" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0" stop-color="${t.bg}" stop-opacity=".82"/>
    <stop offset=".5" stop-color="${t.bg}" stop-opacity=".3"/>
    <stop offset="1" stop-color="${t.bg}" stop-opacity="0"/>
  </linearGradient>
  <radialGradient id="vigG" cx=".5" cy=".5" r=".8">
    <stop offset=".4" stop-color="${t.bg}" stop-opacity="0"/>
    <stop offset="1" stop-color="${t.bg}" stop-opacity=".8"/>
  </radialGradient>
  <mask id="dotMask">
    <rect width="${W}" height="${H}" fill="url(#fadeMaskG)"/>
  </mask>
  ${
    t.glow
      ? `<filter id="nameGlow" x="-12%" y="-60%" width="124%" height="220%">
    <feGaussianBlur stdDeviation="11" result="b"/>
    <feColorMatrix in="b" type="matrix" values="0 0 0 0 .42  0 0 0 0 .27  0 0 0 0 .96  0 0 0 .36 0" result="g"/>
    <feMerge><feMergeNode in="g"/><feMergeNode in="SourceGraphic"/></feMerge>
  </filter>`
      : ""
  }
  <path id="orbA" d="M -172,0 A 172,172 0 1 0 172,0 A 172,172 0 1 0 -172,0"/>
  <path id="orbB" d="M -168,0 A 168,66 0 1 0 168,0 A 168,66 0 1 0 -168,0"/>
  <path id="orbC" d="M -124,0 A 124,112 0 1 0 124,0 A 124,112 0 1 0 -124,0"/>
  <clipPath id="frame"><rect width="${W}" height="${H}" rx="22"/></clipPath>
  <style>
    .mono { font-family: ${MONO}; }
    .sans { font-family: ${SANS}; }
    .ph { opacity: 0; animation: ph ${CYCLE}s linear infinite; }
    ${phrases.map((_, i) => `.ph${i} { animation-delay: ${i * SLOT}s; }`).join("\n    ")}
    @keyframes ph {
      0%              { opacity: 0; transform: translateY(8px); }
      ${pct(0.45)}%   { opacity: 1; transform: translateY(0); }
      ${pct(SLOT - 0.55)}% { opacity: 1; transform: translateY(0); }
      ${pct(SLOT)}%   { opacity: 0; transform: translateY(-8px); }
      100%            { opacity: 0; transform: translateY(-8px); }
    }
    .blink { animation: blink 1.06s steps(1) infinite; }
    @keyframes blink { 0%,49.9% { opacity: 1 } 50%,100% { opacity: 0 } }
  </style>
</defs>

<g clip-path="url(#frame)">
  <rect width="${W}" height="${H}" fill="url(#bgG)"/>
  ${aurora(t, [
    { x: 180, y: 90, rx: 330, ry: 210, fill: t.violet, dx: 70, dy: -34, dur: 19 },
    { x: 620, y: 380, rx: 300, ry: 180, fill: t.cyan, dx: -60, dy: -40, dur: 23 },
    { x: 1080, y: 150, rx: 300, ry: 240, fill: t.indigo, dx: 46, dy: 46, dur: 27 },
    { x: 1240, y: 400, rx: 230, ry: 160, fill: t.pink, dx: -50, dy: -30, dur: 31 },
  ])}
  <rect width="${W}" height="${H}" fill="url(#dots)" mask="url(#dotMask)"/>
  <rect width="${W}" height="${H}" fill="url(#vigG)"/>
  <rect width="${W * 0.72}" height="${H}" fill="url(#scrimG)"/>

  <!-- orbital system -->
  <g transform="translate(${orbit.x} ${orbit.y})" opacity=".95">
    <g>
      <animateTransform attributeName="transform" type="rotate" values="0;360" dur="80s" repeatCount="indefinite"/>
      <use href="#orbA" fill="none" stroke="url(#ringG)" stroke-width="1.1" opacity=".45"/>
      <g transform="rotate(20)">
        <use href="#orbB" fill="none" stroke="url(#ringG)" stroke-width="1.35"/>
        <circle r="4.5" fill="${t.cyan}">
          <animateMotion dur="11s" repeatCount="indefinite" rotate="auto"><mpath href="#orbB"/></animateMotion>
        </circle>
      </g>
      <g transform="rotate(-58)">
        <use href="#orbC" fill="none" stroke="url(#ringG)" stroke-width="1.35" opacity=".8"/>
        <circle r="3.6" fill="${t.violet}">
          <animateMotion dur="7.5s" repeatCount="indefinite" rotate="auto"><mpath href="#orbC"/></animateMotion>
        </circle>
      </g>
      <g transform="rotate(74)">
        <use href="#orbB" fill="none" stroke="url(#ringG)" stroke-width="1" opacity=".45"/>
        <circle r="3" fill="${t.pink}">
          <animateMotion dur="15s" repeatCount="indefinite" rotate="auto"><mpath href="#orbB"/></animateMotion>
        </circle>
      </g>
    </g>
    <circle r="38" fill="${t.cyan}" opacity=".07">
      <animate attributeName="opacity" values=".05;.15;.05" dur="9s" repeatCount="indefinite"/>
    </circle>
    <circle r="7" fill="url(#coreG)"/>
    <circle r="7" fill="none" stroke="${t.cyan}" stroke-width="1.4">
      <animate attributeName="r" values="7;46" dur="3.6s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values=".85;0" dur="3.6s" repeatCount="indefinite"/>
    </circle>
  </g>

  <!-- identity block -->
  <g>
    <rect x="${padX}" y="117" width="11" height="11" rx="2.5" fill="url(#kickG)">
      <animateTransform attributeName="transform" type="rotate" values="0 ${padX + 5.5} 122.5;90 ${padX + 5.5} 122.5;90 ${padX + 5.5} 122.5"
        dur="6s" repeatCount="indefinite" calcMode="spline" keyTimes="0;0.35;1" keySplines=".2 .8 .2 1;0 0 1 1"/>
    </rect>
    <text x="${padX + 26}" y="127" class="mono" font-size="13.5" letter-spacing="3.4" fill="${t.faint}">SOFTWARE ENGINEER · MANILA, PHILIPPINES</text>

    <text x="${padX - 4}" y="207" class="sans" font-size="62" font-weight="800" letter-spacing="-1.4"
      fill="url(#nameG)"${t.glow ? ' filter="url(#nameGlow)"' : ""}>CHRISTIAN VILLAMIN</text>

    <text x="${padX}" y="264" class="mono" font-size="${phSize}" fill="${t.violet}" font-weight="700">&gt;</text>
    ${phrases
      .map(
        (p, i) => `<g class="ph ph${i}">
      <text x="${phX}" y="264" class="mono" font-size="${phSize}" fill="${t.dim}">${p}</text>
      <rect class="blink" x="${(phX + p.length * adv + 5).toFixed(1)}" y="${264 - phSize + 3}" width="${(adv * 0.85).toFixed(1)}" height="${phSize}" fill="${t.cyan}"/>
    </g>`,
      )
      .join("\n    ")}

    <rect x="${padX}" y="302" width="620" height="1.4" fill="url(#ruleG)"/>
    <text x="${padX}" y="334" class="mono" font-size="14.5" fill="${t.faint}">github.com/codekcv<tspan fill="${t.violet}">   ·   </tspan>codekcv.github.io<tspan fill="${t.violet}">   ·   </tspan>x.com/codekcv</text>
  </g>

  ${sweep(t, H)}
  ${grain(t, W, H)}
</g>
<rect x=".75" y=".75" width="${W - 1.5}" height="${H - 1.5}" rx="21.5" fill="none" stroke="${t.border}" stroke-width="1.5"/>
</svg>
`;
}

/* ---------------------------------------------------------------- terminal */

function terminal(t) {
  const W = 830;
  const H = 488;
  const FS = 19;
  const adv = FS * ADV;
  const LH = 30;
  const padX = 40;
  const colX = padX + 128; // key column is 9 chars wide at most, plus a gutter
  const chrome = 46;

  const rows = [
    { k: "cmd", text: "whoami" },
    { k: "out", text: "Christian Villamin · Software Engineer · Manila, Philippines", fill: t.ink },
    { k: "gap" },
    { k: "cmd", text: "cat ~/.now" },
    { k: "kv", key: "frontend", val: "React 18 · TypeScript · Vite · TanStack · Tailwind" },
    { k: "kv", key: "backend", val: "Python · FastAPI · SQLAlchemy · Azure" },
    { k: "kv", key: "canvas", val: "Konva · AOI annotation · embedded analytics" },
    { k: "kv", key: "delivery", val: "trunk-based · spec-driven · agents in the loop" },
    { k: "kv", key: "community", val: "core team @ ReactJS Philippines" },
    { k: "gap" },
    { k: "cmd", text: "git log --oneline -1" },
    { k: "sha", sha: "a11y1ce", text: "feat(web): make it fast for everyone, forever" },
    { k: "gap" },
    { k: "prompt" },
  ];

  let y = chrome + 44;
  let clock = 0.35;
  let cid = 0;
  const body = [];
  const clips = [];

  for (const r of rows) {
    if (r.k === "gap") {
      y += LH * 0.62;
      continue;
    }

    if (r.k === "cmd") {
      const id = `type${cid++}`;
      const n = r.text.length;
      const full = n * adv;
      // Discrete steps give a real character-by-character reveal rather than a wipe.
      const widths = Array.from({ length: n + 1 }, (_, i) => (i * adv).toFixed(2)).join(";");
      const carets = Array.from({ length: n + 1 }, (_, i) =>
        (padX + 26 + i * adv).toFixed(2),
      ).join(";");
      const dur = Math.max(0.35, n * 0.048);

      clips.push(`<clipPath id="${id}">
    <rect x="${padX + 26}" y="${y - FS}" width="0" height="${FS + 8}">
      <animate attributeName="width" values="${widths}" calcMode="discrete"
        dur="${dur.toFixed(2)}s" begin="${clock.toFixed(2)}s" fill="freeze"/>
    </rect>
  </clipPath>`);

      body.push(`<g opacity="0">
    <animate attributeName="opacity" values="0;1" dur="0.01s" begin="${clock.toFixed(2)}s" fill="freeze"/>
    <text x="${padX}" y="${y}" class="mono" font-size="${FS}" fill="${t.green}" font-weight="700">$</text>
    <g clip-path="url(#${id})">
      <text x="${padX + 26}" y="${y}" class="mono" font-size="${FS}" fill="${t.ink}">${r.text}</text>
    </g>
    <!-- No .blink here: a CSS opacity animation outranks SMIL, so the class would
         keep the caret visible forever instead of letting it retire after typing. -->
    <rect x="${padX + 26}" y="${y - FS + 3}" width="${(adv * 0.9).toFixed(1)}" height="${FS}" fill="${t.cyan}">
      <animate attributeName="x" values="${carets}" calcMode="discrete" dur="${dur.toFixed(2)}s" begin="${clock.toFixed(2)}s" fill="freeze"/>
      <animate attributeName="opacity" values="1;0" dur="0.01s" begin="${(clock + dur + 0.12).toFixed(2)}s" fill="freeze"/>
    </rect>
  </g>`);

      clock += dur + 0.34;
      y += LH;
      continue;
    }

    const fade = `<animate attributeName="opacity" values="0;1" dur="0.32s" begin="${clock.toFixed(2)}s" fill="freeze"/>`;

    if (r.k === "out") {
      body.push(`<g opacity="0">${fade}
    <text x="${padX}" y="${y}" class="mono" font-size="${FS}" fill="${r.fill}">${r.text}</text>
  </g>`);
    } else if (r.k === "kv") {
      body.push(`<g opacity="0">${fade}
    <text x="${padX}" y="${y}" class="mono" font-size="${FS}" fill="${t.violet}">${r.key}</text>
    <text x="${colX}" y="${y}" class="mono" font-size="${FS}" fill="${t.dim}">${r.val}</text>
  </g>`);
    } else if (r.k === "sha") {
      body.push(`<g opacity="0">${fade}
    <text x="${padX}" y="${y}" class="mono" font-size="${FS}" fill="${t.amber}">${r.sha}</text>
    <text x="${padX + 8 * adv}" y="${y}" class="mono" font-size="${FS}" fill="${t.dim}">${r.text}</text>
  </g>`);
    } else if (r.k === "prompt") {
      body.push(`<g opacity="0">${fade}
    <text x="${padX}" y="${y}" class="mono" font-size="${FS}" fill="${t.green}" font-weight="700">$</text>
    <rect x="${padX + 26}" y="${y - FS + 3}" width="${(adv * 0.9).toFixed(1)}" height="${FS}" fill="${t.cyan}" class="blink"/>
  </g>`);
    }

    clock += 0.16;
    y += LH;
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-labelledby="termTitle">
<title id="termTitle">Terminal session: frontend React 18, TypeScript, Vite, TanStack, Tailwind. Backend Python, FastAPI, SQLAlchemy, Azure. Canvas Konva, AOI annotation, embedded analytics. Delivery trunk-based, spec-driven, agents in the loop. Community core team at ReactJS Philippines.</title>
<defs>
  ${defsShared(t)}
  <linearGradient id="winG" x1="0" y1="0" x2=".6" y2="1">
    <stop offset="0" stop-color="${t.bg2}"/>
    <stop offset="1" stop-color="${t.bg}"/>
  </linearGradient>
  <linearGradient id="chromeG" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0" stop-color="${t.chrome}"/>
    <stop offset="1" stop-color="${t.bg2}"/>
  </linearGradient>
  <linearGradient id="topG" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0" stop-color="${t.violet}"/>
    <stop offset=".5" stop-color="${t.cyan}"/>
    <stop offset="1" stop-color="${t.pink}"/>
  </linearGradient>
  <clipPath id="win"><rect width="${W}" height="${H}" rx="16"/></clipPath>
  ${clips.join("\n  ")}
  <style>
    .mono { font-family: ${MONO}; }
    .blink { animation: blink 1.06s steps(1) infinite; }
    @keyframes blink { 0%,49.9% { opacity: 1 } 50%,100% { opacity: 0 } }
  </style>
</defs>

<g clip-path="url(#win)">
  <rect width="${W}" height="${H}" fill="url(#winG)"/>
  <g opacity=".6">${aurora(t, [
    { x: 40, y: 500, rx: 250, ry: 180, fill: t.violet, dx: 50, dy: -30, dur: 21 },
    { x: 840, y: 20, rx: 240, ry: 180, fill: t.cyan, dx: -44, dy: 34, dur: 25 },
  ])}</g>
  <rect width="${W}" height="${chrome}" fill="url(#chromeG)"/>
  <rect width="${W}" height="2.5" fill="url(#topG)"/>
  <circle cx="34" cy="24" r="6.2" fill="${t.red}"/>
  <circle cx="56" cy="24" r="6.2" fill="${t.amber}"/>
  <circle cx="78" cy="24" r="6.2" fill="${t.green}"/>
  <text x="${W / 2}" y="29" text-anchor="middle" class="mono" font-size="13.5" fill="${t.faint}" letter-spacing="1.2">christian@codekcv: ~</text>
  <rect y="${chrome}" width="${W}" height="1" fill="${t.border}"/>

  ${body.join("\n  ")}
  ${grain(t, W, H)}
</g>
<rect x=".75" y=".75" width="${W - 1.5}" height="${H - 1.5}" rx="15.5" fill="none" stroke="${t.border}" stroke-width="1.5"/>
</svg>
`;
}

/* ------------------------------------------------------------------ footer */

function footer(t) {
  const W = 1280;
  const H = 220;

  // Three crests per wave, each layer offset in phase and period so the stack
  // never repeats a silhouette you can read as a loop.
  const wave = (base, amp, dur, fill, op) => {
    const shape = (a, b, c) =>
      `M0,${base + a} C 160,${base - amp + a} 320,${base + amp * 1.2 + b} 480,${base + b}` +
      ` C 640,${base - amp * 1.3 + b} 800,${base + amp + c} 960,${base + c}` +
      ` C 1120,${base - amp + c} 1200,${base + amp * 0.6 + a} 1280,${base + a}` +
      ` L1280,${H} L0,${H} Z`;
    return `<path fill="${fill}" opacity="${op}" d="${shape(0, 0, 0)}">
    <animate attributeName="d" dur="${dur}s" repeatCount="indefinite" calcMode="spline"
      keyTimes="0;0.5;1" keySplines=".45 0 .55 1;.45 0 .55 1"
      values="${shape(0, 0, 0)};${shape(amp * 0.8, -amp * 1.1, amp * 0.7)};${shape(0, 0, 0)}"/>
  </path>`;
  };

  // Slow rising motes, so the flat area above the waves is not dead space.
  const motes = [
    { x: 150, r: 2.4, dur: 15, delay: 0 },
    { x: 355, r: 1.7, dur: 19, delay: -6 },
    { x: 610, r: 2.9, dur: 13, delay: -3 },
    { x: 880, r: 1.9, dur: 21, delay: -11 },
    { x: 1105, r: 2.5, dur: 17, delay: -8 },
  ]
    .map(
      (m) => `<circle cx="${m.x}" cy="0" r="${m.r}" fill="${t.cyan}" opacity="0">
    <animate attributeName="cy" values="${H};${H * 0.32}" dur="${m.dur}s" begin="${m.delay}s" repeatCount="indefinite"/>
    <animate attributeName="opacity" values="0;.6;0" dur="${m.dur}s" begin="${m.delay}s" repeatCount="indefinite"/>
  </circle>`,
    )
    .join("\n  ");

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-labelledby="footTitle">
<title id="footTitle">Let us make something that lasts. github.com/codekcv, codekcv.github.io, x.com/codekcv</title>
<defs>
  ${defsShared(t)}
  <linearGradient id="fbg" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="${t.bg}"/>
    <stop offset="1" stop-color="${t.bg2}"/>
  </linearGradient>
  <linearGradient id="w1" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0" stop-color="${t.violet}"/>
    <stop offset="1" stop-color="${t.indigo}"/>
  </linearGradient>
  <linearGradient id="w2" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0" stop-color="${t.cyan}"/>
    <stop offset="1" stop-color="${t.teal}"/>
  </linearGradient>
  <linearGradient id="w3" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0" stop-color="${t.pink}"/>
    <stop offset="1" stop-color="${t.violet}"/>
  </linearGradient>
  <!-- Dissolves the wave stack into the background so it reads as a horizon
       glow rather than a solid slab pinned to the bottom edge. -->
  <linearGradient id="sink" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="${t.bg}" stop-opacity="0"/>
    <stop offset=".55" stop-color="${t.bg}" stop-opacity=".45"/>
    <stop offset="1" stop-color="${t.bg}" stop-opacity=".92"/>
  </linearGradient>
  <clipPath id="fframe"><rect width="${W}" height="${H}" rx="22"/></clipPath>
  <style>.mono{font-family:${MONO}}.sans{font-family:${SANS}}</style>
</defs>
<g clip-path="url(#fframe)">
  <rect width="${W}" height="${H}" fill="url(#fbg)"/>
  ${aurora(t, [
    { x: 300, y: 220, rx: 300, ry: 150, fill: t.violet, dx: 60, dy: -26, dur: 20 },
    { x: 1000, y: 210, rx: 300, ry: 150, fill: t.cyan, dx: -55, dy: -22, dur: 26 },
  ])}
  <rect width="${W}" height="${H}" fill="url(#dots)" opacity=".55"/>
  ${motes}

  <text x="${W / 2}" y="76" text-anchor="middle" class="sans" font-size="33" font-weight="700" fill="${t.ink}" letter-spacing="-.4">Let's make something that lasts.</text>
  <text x="${W / 2}" y="110" text-anchor="middle" class="mono" font-size="15.5" fill="${t.faint}" letter-spacing="1.1">github.com/codekcv<tspan fill="${t.violet}">   ·   </tspan>codekcv.github.io<tspan fill="${t.violet}">   ·   </tspan>x.com/codekcv</text>

  ${wave(140, 20, 14, "url(#w3)", 0.3)}
  ${wave(156, 26, 11, "url(#w2)", 0.4)}
  ${wave(174, 30, 8.5, "url(#w1)", 0.62)}
  <rect y="116" width="${W}" height="${H - 116}" fill="url(#sink)"/>
  ${grain(t, W, H)}
</g>
<rect x=".75" y=".75" width="${W - 1.5}" height="${H - 1.5}" rx="21.5" fill="none" stroke="${t.border}" stroke-width="1.5"/>
</svg>
`;
}

/* --------------------------------------------------------------------- run */

mkdirSync(OUT, { recursive: true });

const BUILDERS = { hero, terminal, footer };
let count = 0;

for (const [key, build] of Object.entries(BUILDERS)) {
  for (const theme of Object.values(THEMES)) {
    const file = join(OUT, `${key}-${theme.id}.svg`);
    writeFileSync(file, build(theme).trimStart(), "utf8");
    count += 1;
    console.log(`  wrote assets/${key}-${theme.id}.svg`);
  }
}

console.log(`\n${count} assets built. Bump the ?v= query in README.md so camo re-fetches.`);

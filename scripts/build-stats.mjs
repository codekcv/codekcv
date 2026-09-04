#!/usr/bin/env node
/**
 * Builds assets/stats-{dark,light}.svg from live GitHub data.
 *
 * Why this exists: the popular hosted stats cards are a single shared Vercel
 * deployment, and it answers 503 often enough that a profile built on it is
 * broken a noticeable fraction of the time. This queries the GraphQL API once,
 * renders the numbers into the same design language as the other assets, and
 * commits the result, so the README has no runtime dependency at all.
 *
 * Auth: GITHUB_TOKEN in the environment, otherwise it shells out to `gh auth token`.
 * Usage: node scripts/build-stats.mjs [login]
 */

import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { MONO, SANS, THEMES, aurora, defsShared, esc, grain, sweep } from "./theme.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "assets");
const LOGIN = process.argv[2] || "codekcv";

/* -------------------------------------------------------------------- data */

function token() {
  if (process.env.GITHUB_TOKEN) return process.env.GITHUB_TOKEN;
  try {
    return execFileSync("gh", ["auth", "token"], { encoding: "utf8" }).trim();
  } catch {
    throw new Error("No GITHUB_TOKEN in the environment and `gh auth token` failed.");
  }
}

const QUERY = `
query($login: String!) {
  user(login: $login) {
    followers { totalCount }
    following { totalCount }
    # privacy: PUBLIC is deliberate. Without it the counts depend on whether the
    # run used a personal token or the repo-scoped Actions token, and the numbers
    # would jump around between refreshes for no visible reason.
    repositories(first: 100, ownerAffiliations: OWNER, isFork: false, privacy: PUBLIC,
                 orderBy: { field: STARGAZERS, direction: DESC }) {
      totalCount
      nodes {
        stargazerCount
        languages(first: 12, orderBy: { field: SIZE, direction: DESC }) {
          edges { size node { name color } }
        }
      }
    }
    contributionsCollection {
      totalCommitContributions
      totalPullRequestContributions
      totalPullRequestReviewContributions
      contributionCalendar { totalContributions }
    }
  }
}`;

async function fetchStats() {
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `bearer ${token()}`,
      "Content-Type": "application/json",
      "User-Agent": "codekcv-profile-build",
    },
    body: JSON.stringify({ query: QUERY, variables: { login: LOGIN } }),
  });

  if (!res.ok) throw new Error(`GitHub API ${res.status}: ${await res.text()}`);
  const json = await res.json();
  // A repo-scoped Actions token can be refused contributionsCollection while the
  // rest of the query still resolves, so treat a partial response as usable.
  if (!json.data?.user) throw new Error(`GraphQL returned no user: ${JSON.stringify(json.errors)}`);
  return json.data.user;
}

/** The previously committed figures, used only as a fallback. */
function readPrevious() {
  const file = join(OUT, "stats.json");
  if (!existsSync(file)) return null;
  try {
    return JSON.parse(readFileSync(file, "utf8"));
  } catch {
    return null;
  }
}

function shape(user) {
  const repos = user.repositories.nodes;
  const stars = repos.reduce((n, r) => n + r.stargazerCount, 0);

  const bytes = new Map();
  const colors = new Map();
  for (const repo of repos) {
    for (const { size, node } of repo.languages.edges) {
      bytes.set(node.name, (bytes.get(node.name) ?? 0) + size);
      if (node.color) colors.set(node.name, node.color);
    }
  }

  const total = [...bytes.values()].reduce((a, b) => a + b, 0) || 1;
  const languages = [...bytes.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([name, size]) => ({
      name,
      pct: (size / total) * 100,
      color: colors.get(name) ?? "#8B5CF6",
    }));

  // A repo-scoped Actions token can be refused contributionsCollection while the
  // rest of the query still resolves. Carrying the last committed figure forward
  // is better than letting the tile silently become something else: the daily
  // refresh must never make the card worse than the one it replaces.
  const c = user.contributionsCollection;
  const previous = readPrevious();
  const carried = (live, key) => live ?? previous?.[key] ?? null;
  if (c?.contributionCalendar?.totalContributions == null && previous?.contributions != null) {
    console.warn(
      `  ! contributions unavailable to this token; carrying forward ${previous.contributions}`,
    );
  }

  return {
    login: LOGIN,
    generated: new Date().toISOString(),
    stars,
    repos: user.repositories.totalCount,
    followers: user.followers.totalCount,
    following: user.following.totalCount,
    contributions: carried(c?.contributionCalendar?.totalContributions, "contributions"),
    commits: carried(c?.totalCommitContributions, "commits"),
    pullRequests: carried(c?.totalPullRequestContributions, "pullRequests"),
    reviews: carried(c?.totalPullRequestReviewContributions, "reviews"),
    languages,
  };
}

/* ------------------------------------------------------------------ render */

// Thousands separators rather than "1.6k": the exact figure is the interesting
// part, and four digits still fit the tile at 42px.
const compact = (n) =>
  n >= 100000 ? `${Math.round(n / 1000)}k` : n.toLocaleString("en-US");

function card(t, s) {
  const W = 830;
  const H = 296;
  const padX = 40;

  // Four headline tiles. Contributions falls back to Following when the token in
  // use is not allowed to read the contributions calendar.
  const tiles = [
    { value: s.stars, label: "TOTAL STARS", accent: t.amber },
    { value: s.repos, label: "PUBLIC REPOS", accent: t.cyan },
    { value: s.followers, label: "FOLLOWERS", accent: t.pink },
    s.contributions !== null
      ? { value: s.contributions, label: "CONTRIBUTIONS · 12MO", accent: t.violet }
      : { value: s.following, label: "FOLLOWING", accent: t.violet },
  ];

  const colX = [padX, padX + 190];
  const rowY = [138, 232];
  const tileSvg = tiles
    .map((tile, i) => {
      const x = colX[i % 2];
      const y = rowY[Math.floor(i / 2)];
      return `<g class="rise r${i}">
    <text x="${x}" y="${y}" class="sans" font-size="42" font-weight="800" letter-spacing="-1.4" fill="${tile.accent}">${compact(tile.value)}</text>
    <text x="${x}" y="${y + 22}" class="mono" font-size="11" letter-spacing="1.9" fill="${t.faint}">${tile.label}</text>
  </g>`;
    })
    .join("\n  ");

  // Stacked language bar. Segments are laid out at full width and revealed by a
  // single clip, which keeps every boundary crisp while it grows.
  const barX = 452;
  const barW = W - barX - padX;
  const barY = 118;
  let cursor = 0;
  const segments = s.languages
    .map((lang) => {
      const w = (lang.pct / 100) * barW;
      const seg = `<rect x="${(barX + cursor).toFixed(2)}" y="${barY}" width="${Math.max(w, 0).toFixed(2)}" height="15" fill="${lang.color}"/>`;
      cursor += w;
      return seg;
    })
    .join("\n    ");

  const legend = s.languages
    .map((lang, i) => {
      const x = barX + (i % 2) * 190;
      const y = 170 + Math.floor(i / 2) * 27;
      return `<g class="rise r${i + 4}">
    <circle cx="${x + 5}" cy="${y - 4}" r="5" fill="${lang.color}"/>
    <text x="${x + 18}" y="${y}" class="mono" font-size="13" fill="${t.dim}">${esc(lang.name)}</text>
    <text x="${x + 172}" y="${y}" text-anchor="end" class="mono" font-size="13" fill="${t.faint}">${lang.pct.toFixed(1)}%</text>
  </g>`;
    })
    .join("\n  ");

  const stamp = new Date(s.generated).toISOString().slice(0, 10);

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-labelledby="statsTitle">
<title id="statsTitle">GitHub statistics for ${esc(s.login)}: ${s.stars} total stars, ${s.repos} public repositories, ${s.followers} followers${s.contributions !== null ? `, ${s.contributions} contributions in the last twelve months` : ""}. Most used languages: ${s.languages.map((l) => `${l.name} ${l.pct.toFixed(1)} percent`).join(", ")}. Generated ${stamp}.</title>
<defs>
  ${defsShared(t)}
  <linearGradient id="sbg" x1="0" y1="0" x2=".7" y2="1">
    <stop offset="0" stop-color="${t.bg2}"/>
    <stop offset="1" stop-color="${t.bg}"/>
  </linearGradient>
  <linearGradient id="topline" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0" stop-color="${t.violet}"/>
    <stop offset=".5" stop-color="${t.cyan}"/>
    <stop offset="1" stop-color="${t.pink}"/>
  </linearGradient>
  <clipPath id="sframe"><rect width="${W}" height="${H}" rx="16"/></clipPath>
  <!-- Base width is the full bar, not 0: a renderer that ignores SMIL then shows a
       complete bar instead of an empty track. begin="0s" means the animated value
       takes over immediately, so the full width never flashes first. -->
  <clipPath id="barClip">
    <rect x="${barX}" y="${barY}" width="${barW}" height="15" rx="7.5">
      <animate attributeName="width" values="0;${barW}" dur="1.2s" begin="0s"
        fill="freeze" calcMode="spline" keyTimes="0;1" keySplines=".22 1 .36 1"/>
    </rect>
  </clipPath>
  <style>
    .mono { font-family: ${MONO}; }
    .sans { font-family: ${SANS}; }
    /* No base opacity:0 here. The keyframes plus fill-mode "both" hide the element
       while it waits its turn, but the resting state stays visible, so the card
       still reads if the animation never runs: reduced motion, a static
       rasteriser, or a re-raster that restarts the one-shot mid-scroll. */
    .rise { animation: rise .55s cubic-bezier(.22,1,.36,1) both; }
    ${tiles.map((_, i) => `.r${i} { animation-delay: ${(0.1 + i * 0.07).toFixed(2)}s; }`).join("\n    ")}
    ${s.languages.map((_, i) => `.r${i + 4} { animation-delay: ${(0.6 + i * 0.06).toFixed(2)}s; }`).join("\n    ")}
    @keyframes rise { from { opacity: 0; transform: translateY(10px) } to { opacity: 1; transform: translateY(0) } }
    .pulse { animation: pulse 2.4s ease-in-out infinite; }
    @keyframes pulse { 0%,100% { opacity: .35 } 50% { opacity: 1 } }
    @media (prefers-reduced-motion: reduce) {
      .rise, .pulse { animation: none; }
    }
  </style>
</defs>

<g clip-path="url(#sframe)">
  <rect width="${W}" height="${H}" fill="url(#sbg)"/>
  <g opacity=".6">${aurora(t, [
    { x: 60, y: 40, rx: 250, ry: 180, fill: t.violet, dx: 54, dy: 30, dur: 22 },
    { x: 820, y: 300, rx: 250, ry: 180, fill: t.cyan, dx: -48, dy: -30, dur: 26 },
  ])}</g>
  <rect width="${W}" height="${H}" fill="url(#dots)" opacity=".5"/>
  <rect width="${W}" height="2.5" fill="url(#topline)"/>

  <circle cx="${padX + 5}" cy="47" r="5" fill="${t.green}" class="pulse"/>
  <text x="${padX + 20}" y="52" class="mono" font-size="12.5" letter-spacing="2.6" fill="${t.faint}">LIVE FROM THE GITHUB API</text>
  <text x="${W - padX}" y="52" text-anchor="end" class="mono" font-size="12.5" letter-spacing="1.4" fill="${t.faint}">updated ${stamp}</text>
  <rect x="${padX}" y="70" width="${W - padX * 2}" height="1" fill="${t.border}"/>

  ${tileSvg}

  <rect x="${W / 2 - 8}" y="96" width="1" height="${H - 132}" fill="${t.border}"/>

  <text x="${barX}" y="100" class="mono" font-size="11" letter-spacing="1.9" fill="${t.faint}">MOST USED LANGUAGES</text>
  <rect x="${barX}" y="${barY}" width="${barW}" height="15" rx="7.5" fill="${t.border}" opacity=".5"/>
  <g clip-path="url(#barClip)">
    ${segments}
  </g>
  ${legend}

  ${sweep(t, H, 9)}
  ${grain(t, W, H)}
</g>
<rect x=".75" y=".75" width="${W - 1.5}" height="${H - 1.5}" rx="15.5" fill="none" stroke="${t.border}" stroke-width="1.5"/>
</svg>
`;
}

/* --------------------------------------------------------------------- run */

const stats = shape(await fetchStats());

mkdirSync(OUT, { recursive: true });
writeFileSync(join(OUT, "stats.json"), `${JSON.stringify(stats, null, 2)}\n`, "utf8");

for (const theme of Object.values(THEMES)) {
  writeFileSync(join(OUT, `stats-${theme.id}.svg`), card(theme, stats).trimStart(), "utf8");
  console.log(`  wrote assets/stats-${theme.id}.svg`);
}

console.log(
  `\n${stats.stars} stars · ${stats.repos} repos · ${stats.followers} followers · ` +
    `${stats.contributions ?? "n/a"} contributions · top language ${stats.languages[0]?.name}`,
);

<!--
  Every graphic here is generated, not hand-written.
    hero / terminal / footer -> node scripts/build-assets.mjs
    stats card               -> node scripts/build-stats.mjs   (also runs daily in CI)
  After regenerating, bump the ?v= query on the URLs below so GitHub's camo
  proxy re-fetches them instead of serving the cached copy.
-->

<div align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/codekcv/codekcv/main/assets/hero-dark.svg?v=3">
    <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/codekcv/codekcv/main/assets/hero-light.svg?v=3">
    <img alt="Christian Villamin, software engineer in Manila, Philippines" src="https://raw.githubusercontent.com/codekcv/codekcv/main/assets/hero-dark.svg?v=3" width="100%">
  </picture>
</div>

<!-- Kept on one line: a soft line break between badges becomes a <br> in some of
     the places this file gets rendered, which stacks them into a column. -->
<div align="center">

[![Website](https://img.shields.io/badge/codekcv.github.io-0A0C12?style=for-the-badge&logo=googlechrome&logoColor=22D3EE&labelColor=0A0C12)](https://codekcv.github.io) [![X](https://img.shields.io/badge/@codekcv-0A0C12?style=for-the-badge&logo=x&logoColor=E8EEF7&labelColor=0A0C12)](https://x.com/codekcv) [![ReactJS Philippines](https://img.shields.io/badge/ReactJS_Philippines-0A0C12?style=for-the-badge&logo=react&logoColor=61DAFB&labelColor=0A0C12)](https://reactjs.org.ph/) ![Manila](https://img.shields.io/badge/Manila,_PH-0A0C12?style=for-the-badge&logo=googlemaps&logoColor=8B5CF6&labelColor=0A0C12)

</div>

I build products for the web and the parts underneath that keep them fast. These
days that means a React and TypeScript front end, Python services on Azure, and
being fairly opinionated about the pipeline in between.

## ▸ What I'm working on

- **An enterprise SaaS platform for consumer research.** React 18 and TypeScript
  on the surface, Python and FastAPI services on Azure behind it. Canvas-based
  design annotation, embedded analytics, AI-assisted content generation.
- **A design system people actually follow.** Semantic tokens over palette steps,
  Storybook for every primitive, and a CI guardrail that fails the build on a
  hardcoded hex rather than leaving it to review.
- **Spec-driven, agent-assisted delivery.** Behaviour contracts written before the
  code, trunk-based shipping so every commit is releasable, and agents doing the
  work that should not need a human.

<div align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/codekcv/codekcv/main/assets/terminal-dark.svg?v=3">
    <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/codekcv/codekcv/main/assets/terminal-light.svg?v=3">
    <img alt="Terminal session listing the current stack: React 18, TypeScript, Vite, TanStack and Tailwind on the front end; Python, FastAPI, SQLAlchemy and Azure on the back end; Konva canvas and embedded analytics; trunk-based, spec-driven delivery; core team at ReactJS Philippines" src="https://raw.githubusercontent.com/codekcv/codekcv/main/assets/terminal-dark.svg?v=3" width="100%">
  </picture>
</div>

## ▸ Stack

<table>
  <tr>
    <td><b>Frontend</b></td>
    <td>
      <img alt="React" src="https://img.shields.io/badge/React-0A0C12?style=flat-square&logo=react&logoColor=61DAFB">
      <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-0A0C12?style=flat-square&logo=typescript&logoColor=3178C6">
      <img alt="Vite" src="https://img.shields.io/badge/Vite-0A0C12?style=flat-square&logo=vite&logoColor=FFC016">
      <img alt="TanStack" src="https://img.shields.io/badge/TanStack-0A0C12?style=flat-square&logo=reactquery&logoColor=FF4154">
      <img alt="Redux Toolkit" src="https://img.shields.io/badge/Redux_Toolkit-0A0C12?style=flat-square&logo=redux&logoColor=764ABC">
      <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind-0A0C12?style=flat-square&logo=tailwindcss&logoColor=38BDF8">
      <img alt="Radix UI" src="https://img.shields.io/badge/Radix_UI-0A0C12?style=flat-square&logo=radixui&logoColor=E8EEF7">
      <img alt="Storybook" src="https://img.shields.io/badge/Storybook-0A0C12?style=flat-square&logo=storybook&logoColor=FF4785">
    </td>
  </tr>
  <tr>
    <td><b>Backend</b></td>
    <td>
      <img alt="Python" src="https://img.shields.io/badge/Python-0A0C12?style=flat-square&logo=python&logoColor=FFD343">
      <img alt="FastAPI" src="https://img.shields.io/badge/FastAPI-0A0C12?style=flat-square&logo=fastapi&logoColor=05998B">
      <img alt="SQLAlchemy" src="https://img.shields.io/badge/SQLAlchemy-0A0C12?style=flat-square&logo=sqlalchemy&logoColor=D71F00">
      <img alt="Node.js" src="https://img.shields.io/badge/Node.js-0A0C12?style=flat-square&logo=nodedotjs&logoColor=5FA04E">
      <img alt="PostgreSQL" src="https://img.shields.io/badge/PostgreSQL-0A0C12?style=flat-square&logo=postgresql&logoColor=4169E1">
      <img alt="GraphQL" src="https://img.shields.io/badge/GraphQL-0A0C12?style=flat-square&logo=graphql&logoColor=E10098">
    </td>
  </tr>
  <tr>
    <td><b>Platform</b></td>
    <td>
      <!-- simple-icons no longer ships an Azure, Playwright or OpenAI mark, so these
           three carry neutral inline glyphs (a cloud, a browser, a spark) to keep the
           row visually even instead of dropping to bare text. -->
      <img alt="Azure" src="https://img.shields.io/badge/Azure-0A0C12?style=flat-square&logo=data:image/svg%2Bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iIzAwNzhENCI%2BPHBhdGggZD0iTTE5LjM1IDEwLjA0QTcuNDkgNy40OSAwIDAgMCAxMiA0QzkuMTEgNCA2LjYgNS42NCA1LjM1IDguMDRBNS45OTQgNS45OTQgMCAwIDAgMCAxNGMwIDMuMzEgMi42OSA2IDYgNmgxM2MyLjc2IDAgNS0yLjI0IDUtNSAwLTIuNjQtMi4wNS00Ljc4LTQuNjUtNC45NnoiLz48L3N2Zz4%3D">
      <img alt="Docker" src="https://img.shields.io/badge/Docker-0A0C12?style=flat-square&logo=docker&logoColor=2496ED">
      <img alt="GitHub Actions" src="https://img.shields.io/badge/GitHub_Actions-0A0C12?style=flat-square&logo=githubactions&logoColor=2088FF">
      <img alt="Vitest" src="https://img.shields.io/badge/Vitest-0A0C12?style=flat-square&logo=vitest&logoColor=6DA544">
      <img alt="Playwright" src="https://img.shields.io/badge/Playwright-0A0C12?style=flat-square&logo=data:image/svg%2Bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iIzJFQUQzMyI%2BPHBhdGggZD0iTTMgM2gxOGExIDEgMCAwIDEgMSAxdjE2YTEgMSAwIDAgMS0xIDFIM2ExIDEgMCAwIDEtMS0xVjRhMSAxIDAgMCAxIDEtMXptMSA1djExaDE2VjhINHptMS42LTMuM2EuOC44IDAgMSAwIDAgMS42LjguOCAwIDAgMCAwLTEuNnptMi42IDBhLjguOCAwIDEgMCAwIDEuNi44LjggMCAwIDAgMC0xLjZ6TTEwIDExbDYgMy41LTYgMy41di03eiIvPjwvc3ZnPg%3D%3D">
      <img alt="OpenAI" src="https://img.shields.io/badge/OpenAI-0A0C12?style=flat-square&logo=data:image/svg%2Bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iI0U4RUVGNyI%2BPHBhdGggZD0iTTEyIDEuNWwyLjIgNi4wNWE0IDQgMCAwIDAgMi4yNSAyLjI1TDIyLjUgMTJsLTYuMDUgMi4yYTQgNCAwIDAgMC0yLjI1IDIuMjVMMTIgMjIuNWwtMi4yLTYuMDVhNCA0IDAgMCAwLTIuMjUtMi4yNUwxLjUgMTJsNi4wNS0yLjJhNCA0IDAgMCAwIDIuMjUtMi4yNUwxMiAxLjV6Ii8%2BPC9zdmc%2B">
    </td>
  </tr>
</table>

## ▸ By the numbers

<div align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/codekcv/codekcv/main/assets/stats-dark.svg?v=3">
    <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/codekcv/codekcv/main/assets/stats-light.svg?v=3">
    <img alt="GitHub statistics: total stars, public repositories, followers, contributions in the last twelve months, and most used languages" src="https://raw.githubusercontent.com/codekcv/codekcv/main/assets/stats-dark.svg?v=3" width="100%">
  </picture>
</div>

<div align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/codekcv/codekcv/output/github-snake-dark.svg">
    <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/codekcv/codekcv/output/github-snake.svg">
    <img alt="A snake eating the contribution graph" src="https://raw.githubusercontent.com/codekcv/codekcv/output/github-snake-dark.svg" width="100%">
  </picture>
</div>

## ▸ Community

Core team at [ReactJS Philippines](https://reactjs.org.ph/) and a moderator of the
[community group](https://www.facebook.com/groups/reactjsphilippines). If you are
learning React in the Philippines, come say hello. Nobody there will make you feel
bad for asking a beginner question.

> **Goal:** help make the world a better place before I die.<br>
> _Not just people stuff. The whole animal kingdom and nature too._

<details>
  <summary><b>How this README is built</b></summary>

<br>

The banner, the terminal, the stats card and the footer are not screenshots and
they are not hosted card services. They are SVGs generated by
[`scripts/build-assets.mjs`](scripts/build-assets.mjs) and
[`scripts/build-stats.mjs`](scripts/build-stats.mjs), then committed to this repo.

That last one is the point. The popular hosted stats card is one shared
deployment that answers `503` often enough to leave a profile visibly broken, so
this queries the GitHub GraphQL API directly, renders the numbers in the same
palette as everything else, and lets [a scheduled
workflow](.github/workflows/refresh-stats.yml) commit the refreshed file each day.

A few constraints shaped them, because GitHub serves README images through its
camo proxy inside an `<img>` tag:

- No external fonts, stylesheets or scripts. System font stacks only, with caret
  and column positions computed from the monospace advance width so they land in
  the same place on every platform.
- CSS animations and SMIL both run, JavaScript does not. The typing effect is a
  clip rectangle stepping through discrete widths; the orbits are `animateMotion`
  along paths in `<defs>`.
- GitHub does not tell the image which theme is active, so each asset ships in a
  light and a dark variant, paired with `<picture media="(prefers-color-scheme)">`.
  One generator emits both, so a palette change cannot desync them.

Regenerate with `node scripts/build-assets.mjs`, then bump the `?v=` query on the
image URLs so camo re-fetches.

</details>

<div align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/codekcv/codekcv/main/assets/footer-dark.svg?v=3">
    <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/codekcv/codekcv/main/assets/footer-light.svg?v=3">
    <img alt="Let's make something that lasts. github.com/codekcv, codekcv.github.io, x.com/codekcv" src="https://raw.githubusercontent.com/codekcv/codekcv/main/assets/footer-dark.svg?v=3" width="100%">
  </picture>
</div>

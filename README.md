<div align="center">

<br/>

### Skidless

*Minimal. Private. No build step.*
#

<br/>

![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![Cloudflare Pages](https://img.shields.io/badge/Cloudflare%20Pages-F38020?logo=cloudflare&logoColor=white)

<br/>

[**Overview**](#overview) · [**Features**](#features) · [**Getting Started**](#getting-started) · [**Project Structure**](#project-structure) · [**Deploy**](#deploy) · [**License**](#license)

<br/>

</div>

---

## Overview

Reading out someone's IP, faking a hack with Inspect Element or threatening a DDoS doesn't make you a hacker. **skidless** is a single page that shows what that looks like, and what works better.

*Live at [skidless.org](https://skidless.org)*

---

## Features

- **One static page.** Plain HTML, CSS and a little JavaScript. No framework, no dependencies, no build step.
- **Private by default.** Fonts are self-hosted, so the page makes no third-party requests. No cookies, no analytics.
- **Light and dark.** Follows the system theme, with a toggle that remembers the visitor's choice.
- **Easy to share.** Opens the native share sheet on phones and copies the link on desktop. Includes a social preview image and a home-screen icon.
- **Accessible.** Semantic markup, a skip link, visible focus styles, and respect for reduced-motion settings.

---

## Getting Started

Clone the repository and serve it with any static file server:

```bash
git clone https://github.com/durismaros/skidless.git
cd skidless
python3 -m http.server 8000
```

Then open [http://localhost:8000](http://localhost:8000).

---

## Project Structure

```
skidless/
├── index.html              # Page content and share-preview tags
├── assets/
│   ├── style.css           # Styles and color tokens
│   ├── main.js             # Theme toggle, title animation, share button
│   └── fonts/              # Geist and Geist Mono
├── favicon.svg             # Browser tab icon
├── apple-touch-icon.png    # Home-screen icon
└── og.png                  # Social preview image
```

---

## Deploy

Any static host works. Point it at the repository root with no build command.

- **Cloudflare Pages:** create a project from this repository, choose *None* as the framework preset, leave the build command empty and set the output directory to `/`.
- **GitHub Pages:** go to *Settings → Pages*, choose *Deploy from a branch*, then select `main` and `/ (root)`.

The share-preview tags in `index.html` assume the site lives at `https://skidless.org/`. If you deploy to a different domain, update the `canonical`, `og:url` and `og:image` URLs.

---

## License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for full terms.

---

<div align="center">

<br/>

Built by **Maroš Ďuriš** with ❤️ · 2026

<br/>

[Report a Bug](https://github.com/durismaros/skidless/issues) · [Request a Feature](https://github.com/durismaros/skidless/issues)

<br/>

</div>

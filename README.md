# CATAROT 🐱🔮

> Tarot card reader with a cat twist — interactive, mystical, and fun.

Curiosity killed the cat? **Ask Meow!** Flip tarot cards, get mystical readings, and let the universe guide you. Built with Next.js and GSAP for a smooth parallax experience.

## ✨ Features

- 🃏 **3-card Tarot Flip** — Click to flip, tap to read the meaning
- 🎠 **Parallax Scroll Animation** — Smooth GSAP-powered parallax with sun, moon, stars & mountains
- 🌐 **Auto Language Detection** — Detects visitor IP & browser language (Indonesian / English)
- 📱 **Fully Responsive** — Desktop & mobile friendly
- 🎨 **Beautiful UI** — Custom tarot card art with modal popup readings

## 🛠 Tech Stack

![Next.js](https://img.shields.io/badge/Next.js-13.2-000000?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-18.2-61DAFB?style=for-the-badge&logo=react)
![GSAP](https://img.shields.io/badge/GSAP-3.11-88CE02?style=for-the-badge&logo=greensock)
![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=for-the-badge&logo=vercel)

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Deployment

The app is deployed on **Vercel**. Push to `master` to auto-deploy:

```bash
git push origin master
```

## 🗺 Language Detection

CATAROT detects your language automatically:
- **🇮🇩 Indonesia** — Judul & credit dalam Bahasa Indonesia
- **🇺🇸 English** — Title & credit in English

Detection uses IP geolocation (`ip-api.com`) with browser language fallback.

## 🃏 Tarot Cards

22 Major Arcana cards with curated meanings and reversed (negative) interpretations. Each flip picks a random meaning — no two readings are the same.

## 🖼 Gallery

| Card Back | Sample Cards |
|:---:|:---:|
| ![Card Back](https://raw.githubusercontent.com/Febvn/CATAROT/master/public/images/back.JPG) | ![0. The Fool](https://raw.githubusercontent.com/Febvn/CATAROT/master/public/images/0.%20The%20Fool.png) ![1. The Magician](https://raw.githubusercontent.com/Febvn/CATAROT/master/public/images/1.%20The%20Magician.png) ![2. The High Priestess](https://raw.githubusercontent.com/Febvn/CATAROT/master/public/images/2.%20The%20High%20Priestess.png) |

All 22 Major Arcana cards are included with beautiful artwork.

## 👤 Credits

Created with love by **Febvn**

# CATAROT

> Tarot card reader with a cat twist - it is interactive, mystical, fun, and full of delightful surprises and deep spiritual insights.

Curiosity killed the cat? **Ask Meow!** Flip mystical tarot cards right now, get mystical readings, and let the universe guide your path forward every day. This project is built with Next.js and GSAP for a smooth parallax experience with beautifully animated card flips.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Language Detection](#language-detection)
- [GSAP Parallax Effect](#gsap-parallax-effect)
- [Tarot Card Gallery](#tarot-card-gallery)
- [Card Meanings System](#card-meanings-system)
- [Mobile Responsiveness](#mobile-responsiveness)
- [Browser Support](#browser-support)
- [Deployment](#deployment)
- [Performance](#performance)
- [Credits](#credits)

---

## Features

- **Interactive 3-Card Tarot Flip** - Click any card slot to flip and reveal a random Major Arcana card. Tap the flipped card to open a detailed reading modal.
- **GSAP Parallax Animation** - A full-screen parallax experience with animated sun, moon, stars, clouds, and three mountain layers. The background gradient shifts dynamically based on scroll position, transitioning from deep blue through purple to warm yellow.
- **Auto Language Detection** - The app detects the visitor's country using IP geolocation via ip-api.com. If the country is Indonesia (ID), the interface displays in Indonesian. For all other countries, it defaults to English. If the API call fails, it falls back to the browser's `navigator.language` setting.
- **Fully Responsive Design** - The layout adapts seamlessly from large desktop screens down to the smallest mobile phones. Card sizes, font sizes, spacing, and modal layouts all scale using CSS `clamp()` functions.
- **Built-in Modal Reading System** - Each card flip generates a random mystical meaning from a curated set of interpretations. The modal shows the card artwork alongside the reading text, with a clean overlay design.
- **No Two Readings Are the Same** - Each card in the Major Arcana has between 20 and 30 unique meaning entries. The `getRandomMeaning` function selects one at random, ensuring a fresh experience every time.

---

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 13.2.4 | React framework with file-based routing, SSR, and static generation |
| **React** | 18.2.0 | UI component library |
| **GSAP** | 3.11.5 | Professional-grade animation library for the parallax effect |
| **GSAP ScrollTrigger** | bundled | Scroll-driven animation plugin for pinning and scrub-based timelines |
| **CSS3** | - | Flexbox, Grid, clamp() for responsive design, CSS custom properties |
| **ip-api.com** | - | Free IP geolocation API for language detection |
| **Vercel** | - | Deployment platform with automatic HTTPS and CDN |

### Badges

![Next.js](https://img.shields.io/badge/Next.js-13.2-000000?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-18.2-61DAFB?style=for-the-badge&logo=react)
![GSAP](https://img.shields.io/badge/GSAP-3.11-88CE02?style=for-the-badge&logo=greensock)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-F7DF1E?style=for-the-badge&logo=javascript)
![CSS3](https://img.shields.io/badge/CSS3-Flexbox-1572B6?style=for-the-badge&logo=css3)
![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=for-the-badge&logo=vercel)

---

## Getting Started

### Prerequisites

- Node.js 16.x or later
- npm 8.x or later

### Installation

```bash
# Clone the repository
git clone https://github.com/Febvn/CATAROT.git

# Navigate to the project directory
cd CATAROT

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

### Production Build

```bash
npm run build
npm start
```

---

## Project Structure

```
CATAROT/
+-- public/
- +-- images/ # Tarot card artwork & card back
- - +-- 0. The Fool.png
- - +-- 1. The Magician.png
- - +-- ... (22 cards)
- - +-- back.JPG
- - +-- back.png
- - +-- favicon.png
- +-- parallax/ # SVG layers for the parallax scene
- +-- mountain-1.svg
- +-- mountain-2.svg
- +-- mountain-3.svg
- +-- sun.svg
- +-- moon.svg
- +-- stars.svg
- +-- cloud-bottom.svg
- +-- clouds-left.svg
- +-- clouds-right.svg
+-- src/
- +-- components/
- - +-- Parallax.js # GSAP parallax animation component
- +-- data/
- - +-- tarotData.js # All 22 cards with meanings & negative meanings
- +-- pages/
- - +-- _app.js # Next.js app wrapper
- - +-- _document.js # Custom HTML document with fonts & favicon
- - +-- index.js # Main page with card flip logic & modal
- +-- styles/
- - +-- globals.css # All styles with responsive breakpoints
- +-- utils/
- +-- lang.js # Language detection utility (IP + browser)
+-- Assets/ # Original source images
+-- .gitignore
+-- jsconfig.json # Path alias @/ for src/
+-- next.config.js # Next.js configuration
+-- package.json
+-- vercel.json # Vercel framework detection
```

---

## Language Detection

CATAROT features automatic language detection that works in two layers:

### Layer 1: IP Geolocation (Primary)

When the app loads, it makes a fetch request to `https://ip-api.com/json/?fields=countryCode`. This is a free API that does not require an API key. The request has a 3-second timeout to prevent slow loading.

- If the returned country code is `ID` (Indonesia), the language is set to **Indonesian**.
- For any other country code, the language is set to **English**.

### Layer 2: Browser Language (Fallback)

If the IP geolocation API fails (network error, timeout, or rate limiting), the app falls back to the browser's `navigator.language` property:

- If it starts with `"id"`, use **Indonesian**.
- Otherwise, use **English**.

### Language Cache

The detected language is cached in a module-level variable so that subsequent calls return instantly without additional API requests.

### UI Text Map

```javascript
const texts = {
id: {
title: 'Katakan Apa yang Ingin Kamu Ketahui Meooww!!',
credit: 'Dibuat Oleh Febvn'
},
en: {
title: 'Curiosity Killed the Cat? Ask Meow!',
credit: 'Created By Febvn'
},
}
```

---

## GSAP Parallax Effect

The parallax section is built using **GSAP** (GreenSock Animation Platform) with the **ScrollTrigger** plugin. Here is how it works:

### Scene Composition

The parallax scene consists of 10 layered SVG elements:

1. **Background** - A CSS gradient that transitions from `#0F2B9C` (deep blue) through `#673D7D` (purple) and `#A74A67` (magenta) to `#EDFC54` (yellow). The gradient stop positions shift based on scroll progress, creating a day-to-night or dawn-to-dusk effect.
2. **Stars** - Positioned above the viewport, they slide down as the user scrolls.
3. **Moon** - Starts off-screen (top) and descends into view.
4. **Sun** - Starts centered and moves upward while fading out.
5. **Clouds** - Three cloud layers (bottom, left, right) that fade and slide out.
6. **Mountains** - Three mountain layers (mountain-3 back, mountain-2 middle, mountain-1 front) that move at different speeds to create a depth effect.

### ScrollTrigger Configuration

- **Trigger**: The parallax container itself
- **Start**: `"top top"` (when the container hits the top of the viewport)
- **End**: `"+=2500"` (2500px of scroll distance on desktop, 1200px on mobile)
- **Scrub**: `1` (smooth scrub with 1 second lag)
- **Pin**: `true` (the section stays fixed while the animation plays)

### Desktop vs Mobile

GSAP's `matchMedia` is used to provide different animation parameters for desktop (min-width: 769px) and mobile (max-width: 768px):

| Element | Desktop Movement | Mobile Movement |
|---------|-----------------|-----------------|
| Mountain 3 (back) | `y: -80` | `y: -40` |
| Mountain 2 (mid) | `y: -30` | `y: -15` |
| Mountain 1 (front) | `y: +50` | `y: +25` |
| Stars | `top: 0` from -550px | `top: 0` from -550px |
| Clouds Bottom | `opacity: 0` | `opacity: 0` |
| Clouds Left | `x: -20%, opacity: 0` | `x: -25%, opacity: 0` |
| Clouds Right | `x: +20%, opacity: 0` | `x: +25%, opacity: 0` |
| Sun | `y: +250, opacity: 0` | `y: +130, opacity: 0` |
| Moon | `y: 45vh` | `y: 30vh` |

### Dynamic Background Color

The background gradient is updated on every scroll event using `onUpdate`. The progress (0 to 1) is mapped to a percentage (20 to 120) that controls the gradient stop position:

```javascript
onUpdate: (self) => {
setBackground(Math.ceil(self.progress * 100 + 20))
}
```

This creates a smooth color transition effect as the user scrolls through the parallax section.

---

## Tarot Card Gallery

The complete Major Arcana (22 cards) used in CATAROT:

| # | Card | Artwork | Arcana |
|---|------|---------|--------|
| 0 | The Fool | ![The Fool](https://raw.githubusercontent.com/Febvn/CATAROT/master/public/images/0.%20The%20Fool.png) | Major |
| 1 | The Magician | ![The Magician](https://raw.githubusercontent.com/Febvn/CATAROT/master/public/images/1.%20The%20Magician.png) | Major |
| 2 | The High Priestess | ![The High Priestess](https://raw.githubusercontent.com/Febvn/CATAROT/master/public/images/2.%20The%20High%20Priestess.png) | Major |
| 3 | The Empress | ![The Empress](https://raw.githubusercontent.com/Febvn/CATAROT/master/public/images/3.%20The%20Empress.png) | Major |
| 4 | The Emperor | ![The Emperor](https://raw.githubusercontent.com/Febvn/CATAROT/master/public/images/4.%20The%20Emperor.png) | Major |
| 5 | The Hierophant | ![The Hierophant](https://raw.githubusercontent.com/Febvn/CATAROT/master/public/images/5.%20The%20Hierophant.png) | Major |
| 6 | The Lovers | ![The Lovers](https://raw.githubusercontent.com/Febvn/CATAROT/master/public/images/6.%20The%20Lovers.png) | Major |
| 7 | The Chariot | ![The Chariot](https://raw.githubusercontent.com/Febvn/CATAROT/master/public/images/7.%20The%20Chariot.png) | Major |
| 8 | Justice | ![Justice](https://raw.githubusercontent.com/Febvn/CATAROT/master/public/images/8.%20Justice.png) | Major |
| 9 | The Hermit | ![The Hermit](https://raw.githubusercontent.com/Febvn/CATAROT/master/public/images/9.%20The%20Hermit.png) | Major |
| 10 | Wheel of Fortune | ![Wheel of Fortune](https://raw.githubusercontent.com/Febvn/CATAROT/master/public/images/10.%20Wheel%20of%20Fortune.png) | Major |
| 11 | Strength | ![Strength](https://raw.githubusercontent.com/Febvn/CATAROT/master/public/images/11.%20Strength.png) | Major |
| 12 | The Hanged Man | ![The Hanged Man](https://raw.githubusercontent.com/Febvn/CATAROT/master/public/images/12.%20The%20Hanged%20Man.png) | Major |
| 13 | Death | ![Death](https://raw.githubusercontent.com/Febvn/CATAROT/master/public/images/13.%20Death.png) | Major |
| 14 | Temperance | ![Temperance](https://raw.githubusercontent.com/Febvn/CATAROT/master/public/images/14.%20Temperance.png) | Major |
| 15 | The Devil | ![The Devil](https://raw.githubusercontent.com/Febvn/CATAROT/master/public/images/15.%20The%20Devil.png) | Major |
| 16 | The Tower | ![The Tower](https://raw.githubusercontent.com/Febvn/CATAROT/master/public/images/16.%20The%20Tower.png) | Major |
| 17 | The Star | ![The Star](https://raw.githubusercontent.com/Febvn/CATAROT/master/public/images/17.%20The%20Star.png) | Major |
| 18 | The Moon | ![The Moon](https://raw.githubusercontent.com/Febvn/CATAROT/master/public/images/18.%20The%20Moon.png) | Major |
| 19 | The Sun | ![The Sun](https://raw.githubusercontent.com/Febvn/CATAROT/master/public/images/19.%20The%20Sun.png) | Major |
| 20 | Judgement | ![Judgement](https://raw.githubusercontent.com/Febvn/CATAROT/master/public/images/20.%20Judgement.png) | Major |
| 21 | The World | ![The World](https://raw.githubusercontent.com/Febvn/CATAROT/master/public/images/21.%20The%20World.png) | Major |

### Card Back

The card back design used for the flip animation:

![Card Back](https://raw.githubusercontent.com/Febvn/CATAROT/master/public/images/back.JPG)

---

## Card Meanings System

Each of the 22 Major Arcana cards contains two arrays of textual interpretations:

### Meaning Array (Upright/Positive)

Each card has between 20 and 30 unique meaning entries stored in the `meaning` array. These entries are written in a unique bilingual style that blends Indonesian and English, creating a contemporary, accessible spiritual reading experience. Examples of themes covered:

- New beginnings and spiritual journeys
- Courage and taking action
- Overcoming overthinking
- Manifestation and intention
- Self-discovery and authenticity
- Trusting the process of life
- Finding balance and wisdom

### Negative Meaning Array (Reversed/Warning)

Each card also includes 15 to 25 entries in the `negativeMeaning` array. These provide warnings, cautions, and shadow-aspect interpretations for when the card appears in a challenging context:

- Impulsiveness and recklessness
- Self-deception and illusions
- Fear of commitment
- Financial irresponsibility
- Manipulation and trickery
- Stagnation and refusal to grow
- Blind optimism and naivety

### Random Selection Logic

```javascript
export function getRandomMeaning(card) {
if (!card || !card.meaning || card.meaning.length === 0) {
return "No meaning available."
}
const randomIndex = Math.floor(Math.random() * card.meaning.length)
return card.meaning[randomIndex]
}
```

The function randomly selects one entry from the array, ensuring that every reading is unique. The same function pattern is used for both positive and negative meanings.

---

## Mobile Responsiveness

The app uses modern CSS techniques to ensure a great experience on all screen sizes:

### CSS clamp() Strategy

Instead of traditional breakpoint-based design with fixed pixel values at each breakpoint, CATAROT uses CSS `clamp()` functions to create fluid, continuous scaling:

```css
.flip-card {
width: clamp(100px, 25vw, 450px);
}

.about h2 {
font-size: clamp(1.2rem, 6vw, 4rem);
}

.modal-meaning p {
font-size: clamp(0.65rem, 1.5vw, 1.4rem);
}
```

This means:
- On a 400px phone: card width is ~100px, title is ~1.2rem
- On a 768px tablet: card width is ~192px, title is ~4.6rem
- On a 1920px desktop: card width is 450px, title is 4rem

### Breakpoints

Only minimal breakpoints are used for structural changes:
- **768px**: Switch parallax to mobile animation, reduce parallax scroll distance
- **480px**: Further reduce font sizes and spacing for very small screens

### Mobile-Specific Adjustments

- Card row stays horizontal at all sizes (no stacking)
- Modal layout stays horizontal with card on the left and text on the right
- Touch-friendly tap targets on flip cards
- Modal overlay fills the entire screen with close button easily reachable

---

## Browser Support

CATAROT is tested and works on:

- **Google Chrome** 90+
- **Mozilla Firefox** 88+
- **Apple Safari** 14+
- **Microsoft Edge** 90+
- **Samsung Internet** 15+
- **Opera** 76+

### Polyfills and Considerations

- GSAP's ScrollTrigger requires browsers that support `IntersectionObserver`. All modern browsers support this.
- The IP geolocation API uses `fetch()` with `AbortController`. A polyfill may be needed for very old browsers (IE 11 and below are not supported).
- CSS `clamp()` is supported in all modern browsers from 2020 onwards.

---

## Deployment

### Deploy to Vercel (Recommended)

The project is pre-configured for Vercel deployment with a `vercel.json` file:

```json
{
"framework": "nextjs"
}
```

1. Push the repository to GitHub
2. Go to [vercel.com](https://vercel.com) and import the repository
3. Vercel automatically detects Next.js and sets up the build
4. Your app is live within minutes

### Manual Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

### Environment Variables

No environment variables are required. The IP geolocation API is called client-side from `ip-api.com`, which is a free public API.

---

## Performance

- **Images**: All tarot card images are resized to 400px width (~200-450KB each) for optimal loading speed
- **GSAP Bundle**: GSAP is loaded as an npm dependency and tree-shaken. Only the ScrollTrigger plugin is imported
- **Next.js Static Generation**: The main page is statically generated with no server-side data fetching
- **CSS**: Single CSS file with no preprocessor dependencies
- **Fonts**: Google Fonts (Margarine, Slackey, Cause) are loaded via `<link>` in `_document.js`

---

## Major Arcana Card Meanings

Each card in the Major Arcana represents a different stage of the hero's journey, a spiritual path that every person walks in their own way. Here is a brief description of each card and its significance in a tarot reading:

### 0. The Fool
The Fool represents new beginnings, spontaneity, and a free spirit. It is the card of infinite potential, signaling that the querent is at the start of a new journey or chapter in life. The Fool encourages taking a leap of faith, embracing the unknown, and approaching life with childlike wonder and openness. In its shadow aspect, The Fool warns against recklessness, naivety, and jumping into situations without proper preparation or forethought. It asks the querent to balance excitement with wisdom, and to ensure that their optimism does not blind them to real risks and dangers that may lie ahead.

### 1. The Magician
The Magician is the card of manifestation, resourcefulness, and inspired action. It signifies that the querent has all the tools and resources they need to succeed - they simply need to harness their willpower, focus their intention, and take decisive action. The Magician represents the bridge between the spiritual and material worlds, reminding us that our thoughts and beliefs have the power to shape our reality. When reversed or in shadow, this card warns about manipulation, trickery, and untapped potential being wasted on illusions or deceitful pursuits.

### 2. The High Priestess
The High Priestess embodies intuition, mystery, and the subconscious mind. She represents the hidden knowledge that lies beneath the surface of conscious awareness. When this card appears, it urges the querent to trust their inner voice, pay attention to their dreams and gut feelings, and explore the depths of their own psyche. The High Priestess reminds us that not everything can be understood through logic and rational analysis - some truths must be felt and intuited. In shadow, she warns about secrets being kept, information being withheld, or a disconnection from one's intuitive guidance system.

### 3. The Empress
The Empress represents abundance, fertility, and nurturing energy. She is the mother archetype, symbolizing growth, creativity, and the natural world. When The Empress appears, it signals a time of prosperity, comfort, and sensual pleasure. The card encourages the querent to connect with nature, nurture themselves and others, and embrace their creative potential. In its shadow aspect, The Empress can indicate codependency, smothering behavior, or an over-reliance on material comforts and external validation for happiness and self-worth.

### 4. The Emperor
The Emperor stands for authority, structure, and stability. He is the father archetype who brings order out of chaos through discipline, rules, and logical thinking. When this card appears, it suggests that the querent needs to establish boundaries, take a structured approach to their goals, and assert their authority in a situation. The Emperor represents the power of organization and the strength that comes from having a solid foundation. In shadow, this card warns about tyranny, rigidity, and an abuse of power or authority over others.

### 5. The Hierophant
The Hierophant represents tradition, spiritual guidance, and conformity to established norms. He is the teacher, the priest, the mentor who passes down wisdom through established institutions and practices. When this card appears, it suggests that the querent may benefit from seeking guidance from a trusted source, following tried-and-true methods, or participating in a community with shared beliefs and values. In shadow, The Hierophant warns against dogmatic thinking, blind adherence to tradition, and the suppression of individual truth in favor of group conformity.

### 6. The Lovers
The Lovers represent relationships, choices, and alignment of values. This card is about more than romantic love - it signifies a major decision point where the querent must choose between two paths, guided by their deepest values and convictions. The Lovers card represents harmony, union, and the integration of opposing forces within oneself. In its shadow aspect, The Lovers warns about disharmony in relationships, misalignment of values, or making choices based on external pressure rather than authentic inner guidance and heartfelt conviction.

### 7. The Chariot
The Chariot represents willpower, determination, and victory through focused effort. It depicts a warrior riding a chariot pulled by two opposing forces (often two sphinxes or horses of different colors), representing the need to harness and balance conflicting desires or circumstances. When this card appears, it signals that the querent has the inner strength and resolve to overcome obstacles and achieve their goals through sheer determination and self-discipline. In shadow, The Chariot warns about aggression, lack of direction, and the loss of control over one's circumstances or emotions.

### 8. Justice
Justice represents fairness, truth, and the law of cause and effect. This card indicates that the consequences of past actions are coming to fruition, and that balance will be restored. Justice asks the querent to consider their actions and decisions with honesty and integrity, and to take responsibility for the outcomes they have created. When this card appears, it often signals a legal matter, a contract, or a decision that requires objective and impartial judgment. In shadow, Justice warns about dishonesty, unfairness, and avoiding accountability for one's actions and their consequences.

### 9. The Hermit
The Hermit represents introspection, solitude, and inner guidance. He is the wise elder who retreats from the world to seek deeper understanding through contemplation and meditation. When this card appears, it suggests that the querent needs to take time for solitude and self-reflection, to look inward for answers rather than seeking them from external sources. The Hermit carries a lantern that illuminates the path forward, symbolizing the inner wisdom that guides us when we are quiet enough to hear it. In shadow, The Hermit warns about isolation, loneliness, and withdrawing from the world to the point of disconnection from others.

### 10. Wheel of Fortune
The Wheel of Fortune represents cycles, change, and destiny. It is the card of fate and the ever-turning wheel of life that brings ups and downs, beginnings and endings, fortune and reversal. When this card appears, it signals that a change is coming - a turning point or a shift in circumstances that is beyond the querent's control. The Wheel of Fortune reminds us that life is cyclical and that change is inevitable. In its shadow aspect, this card warns about bad luck, resistance to change, and feeling stuck in negative patterns that seem impossible to break free from.

### 11. Strength
Strength represents courage, inner power, and the gentle mastery of one's instincts and emotions. Unlike the raw force of The Chariot, Strength is about quiet confidence, patience, and the power of compassion. The card often depicts a woman calmly taming a lion, symbolizing the ability to overcome challenges through love, patience, and inner fortitude rather than brute force. When this card appears, it encourages the querent to face their fears with courage and to trust in their own resilience. In shadow, Strength warns about self-doubt, insecurity, and the fear of one's own power or potential.

### 12. The Hanged Man
The Hanged Man represents suspension, surrender, and a shift in perspective. He hangs upside down from a tree, voluntarily sacrificing his comfort for a higher understanding. When this card appears, it suggests that the querent is in a period of waiting, of letting go, and of seeing things from a new angle. The Hanged Man asks us to release our need for control and to trust that the pause has a purpose. In shadow, this card warns about unnecessary sacrifice, stagnation, and refusing to change one's perspective even when it is clearly needed for growth.

### 13. Death
Death represents transformation, endings, and new beginnings. Despite its frightening name, this card is rarely about literal death - it is about the death of one chapter and the birth of another. Death is the card of profound transformation, of shedding old identities, beliefs, or situations that no longer serve our highest good. When this card appears, it signals that a major change is necessary and inevitable, and that resisting it will only cause more suffering. In shadow, Death warns about resistance to change, fear of transformation, and clinging to what is already dead and needs to be released.

### 14. Temperance
Temperance represents balance, moderation, and the middle path. She is the alchemist who blends opposing forces to create harmony and wholeness. When this card appears, it suggests that the querent needs to find balance in their life, to practice patience, and to approach situations with a calm and measured perspective. Temperance is about the art of combining different elements in the right proportions to create something greater than the sum of its parts. In shadow, Temperance warns about excess, imbalance, and the chaos that results from extreme behavior or lack of self-regulation.

### 15. The Devil
The Devil represents bondage, materialism, and shadow aspects of the psyche. This card reveals the ways in which we trap ourselves through unhealthy attachments, addictions, fears, and limiting beliefs. The Devil shines a light on our shadow side - the parts of ourselves that we deny or suppress but that still hold power over us. When this card appears, it invites the querent to examine their relationship with power, pleasure, and material concerns, and to identify the chains that bind them. In shadow, The Devil warns about toxic relationships, addiction, and the denial of personal responsibility for one's circumstances.

### 16. The Tower
The Tower represents sudden upheaval, destruction, and revelation. It is the card of unexpected chaos that tears down old structures to make way for new ones. The Tower can be a shocking and painful experience, but it serves a necessary purpose - it clears away what is false, unstable, or built on shaky foundations. When this card appears, it signals that a sudden change or crisis is breaking down the old order, revealing truths that were hidden and creating space for authentic rebuilding. In shadow, The Tower warns about resisting necessary change, refusing to see the truth, and the disaster that comes from ignoring warning signs.

### 17. The Star
The Star represents hope, inspiration, and spiritual renewal. After the destruction of The Tower, The Star brings healing, peace, and a sense of calm purpose. It is the card of divine guidance, of finding light in the darkness, and of trusting that the universe is supporting your highest good. The Star encourages the querent to open their heart to hope, to connect with their spiritual source, and to let their inner light shine. In shadow, The Star warns about disillusionment, loss of faith, and the despair that comes from feeling disconnected from a higher purpose or meaning in life.

### 18. The Moon
The Moon represents illusion, fear, and the unconscious mind. It is the card of mystery, of things that are hidden from view, and of the shadow self. The Moon reveals how our fears and anxieties can distort our perception of reality, creating monsters in the shadows that may not actually exist. When this card appears, it cautions the querent to be wary of illusions and deceptions, both from others and from themselves. The Moon asks us to navigate through uncertainty with faith and to trust that the light will return. In shadow, The Moon warns about confusion, anxiety, and being lost in a world of illusion and self-deception.

### 19. The Sun
The Sun represents joy, success, and vitality. It is one of the most positive cards in the deck, signaling a time of happiness, achievement, and radiant well-being. The Sun brings clarity, confidence, and the energy of life itself. When this card appears, it indicates that the querent is entering a period of success and fulfillment. The Sun celebrates the authentic self and encourages us to shine our light brightly without fear or shame. In shadow, The Sun warns about arrogance, overshadows, and the temporary nature of success if it is not grounded in authentic self-expression and genuine connection.

### 20. Judgement
Judgement represents reflection, reckoning, and a call to awakening. It is the card of the final judgment, of being called to account for one's life and actions. Judgement invites the querent to reflect deeply on their past choices, to learn from their experiences, and to answer the call of their higher purpose. This card signifies a moment of profound realization and the opportunity for rebirth and redemption through honest self-evaluation. In shadow, Judgement warns about self-judgment, refusal to learn from the past, and the fear of answering life's call to a higher purpose.

### 21. The World
The World represents completion, accomplishment, and wholeness. It is the final card of the Major Arcana, signifying the successful conclusion of a major life cycle or journey. The World represents integration, the achievement of a long-term goal, and the sense of fulfillment that comes from reaching a significant milestone. When this card appears, it signals that the querent has completed a major chapter and is ready to move to the next level of consciousness or experience. In shadow, The World warns about incompletion, delays, and the feeling of being stuck at the finish line without being able to cross it.

---

## CSS Architecture Deep Dive

### Responsive Strategy

The CSS architecture is built around modern responsive techniques that minimize the need for media queries while maintaining pixel-perfect control at every screen size:

**Clamp Function Pattern:**
```css
clamp(minimum, preferred, maximum)
```
- `minimum`: The smallest acceptable value
- `preferred`: An expression (usually viewport-relative) that scales fluidly
- `maximum`: The largest acceptable value

This pattern is applied to font sizes, card widths, spacing, border-radius, and modal dimensions. The result is a design that feels native at every screen size without abrupt breakpoint transitions.

### CSS Custom Properties for Theming

The app uses CSS custom properties (variables) for its color scheme:
```css
:root {
--primaryColor: #282a57;
--secondaryColor: #e4e4e4;
}
```

This makes it easy to implement theme switching or branding changes in the future. The deep navy background (`#282a57`) paired with light text (`#e4e4e4`) creates a mystical, nighttime atmosphere appropriate for a tarot reading experience.

### Flexbox Layout System

The entire layout relies on Flexbox for centering, alignment, and distribution:
- **`.about`**: A column flex container that centers content vertically and horizontally
- **`.card-row`**: A row flex container that distributes cards with gap spacing
- **`.modal-body`**: A row flex container with the card image on the left and meaning text on the right
- **`.copy`**: An absolutely positioned flex container centered over the parallax scene

No Grid layout or float-based approaches are used, keeping the CSS simple and maintainable.

### Animation and Transitions

- **Card flip**: CSS `transform: rotateY(180deg)` with a `0.8s cubic-bezier` transition on `.flip-inner`
- **Backface visibility**: Both `.flip-front` and `.flip-back` use `backface-visibility: hidden`
- **Modal overlay**: Fixed positioning with semi-transparent black background (`rgba(0,0,0,0.85)`)
- **Close button**: Hover effect with `opacity` transition

### Z-Index Layering

1. `.parallax` elements: z-index 1-3 for mountain layers
2. `.copy` text overlay: z-index 10
3. `.about` section: z-index 10
4. `.modal-overlay`: z-index 999

---

## JavaScript Logic Walkthrough

### Card Flip Mechanics

```javascript
const flipCard = (index) => {
// Track which cards are already used to avoid duplicates
const usedIds = cards.filter(c => c).map(c => c.id)
const available = majorArcana.filter(c => !usedIds.includes(c.id))
const pool = available.length > 0 ? available : majorArcana
// Pick a random card from the available pool
const card = pool[Math.floor(Math.random() * pool.length)]
// Get a random meaning for this card
const meaning = getRandomMeaning(card)
// Create a new card object with the selected meaning
const newCard = { id: card.id, name: card.name, meaning }
// Update the cards array immutably
const newCards = [...cards]
newCards[index] = newCard
setCards(newCards)
// Open the modal with the new card
setSelectedCard(newCard)
}
```

Key design decisions:
- Cards cannot repeat in a single spread (3 unique cards per reading)
- Once all cards are used, the pool resets to the full deck
- Each flip creates a new object to avoid mutating the source data
- The modal opens automatically on flip

### Modal Opening Logic

```javascript
const openReading = (card) => {
// If the card was opened from a previous state without a meaning
if (!card.meaning) {
const c = majorArcana.find(c => c.id === card.id)
card.meaning = getRandomMeaning(c)
}
setSelectedCard(card)
}
```

This function handles the case where a card might not have a meaning assigned yet (edge case protection). It also allows re-opening the modal for an already-flipped card without changing the meaning.

### State Management

Three pieces of state drive the application:
1. **`cards`** - Array of 3 items (card objects or null)
2. **`selectedCard`** - Currently displayed card in the modal (or null)
3. **`lang`** - Detected language ('id' or 'en')

No external state management library is needed. React's built-in `useState` and `useEffect` hooks are sufficient for this application's complexity level.

---

## Frequently Asked Questions

**What is the Major Arcana?**
The Major Arcana is the 22-card trump suit in a traditional tarot deck. These cards represent major life themes, spiritual lessons, and archetypal energies that shape our life journeys. Unlike the Minor Arcana (which deals with everyday events), the Major Arcana cards signify important life transitions and deep soul lessons.

**How many meanings does each card have?**
Each card in CATAROT has between 20 and 30 positive meanings and between 15 and 25 negative/warning meanings. This ensures a wide variety of readings and prevents the app from feeling repetitive.

**Can I add more cards to the deck?**
Yes. The data structure in `tarotData.js` is designed to be extensible. You can add new cards by following the same object pattern with `id`, `name`, `meaning`, and `negativeMeaning` properties.

**Why is the text mixed Indonesian and English?**
The meanings are written in a contemporary bilingual style that reflects how many young Indonesians communicate naturally, mixing Indonesian grammar with English vocabulary for spiritual and self-development concepts.

**Does the app collect any user data?**
No. The IP geolocation API call is made client-side and does not store any user information. No cookies, local storage, or tracking mechanisms are used.

**How does the parallax effect work?**
The parallax uses GSAP ScrollTrigger to pin the scene in place while various elements (mountains, sun, moon, clouds, stars) move at different speeds, creating a depth illusion. The background gradient also shifts dynamically based on scroll progress.

**Can I use this app offline?**
The app requires an internet connection for initial loading of fonts from Google Fonts and for the IP geolocation API call. Once loaded, the tarot readings work entirely client-side and do not require additional network requests.

---

## Development Notes

### Code Style Conventions

- React functional components with hooks (no class components)
- No TypeScript - plain JavaScript with JSX
- CSS class names use kebab-case
- Imports use `@/` path alias for `src/` directory
- Component files use `.js` extension (not `.jsx`)

### Potential Enhancements

Future features that could be added:
- **Audio feedback** - Card flip sound effect and ambient background music
- **Card spread animations** - Animated card dealing with staggered timing
- **History tracking** - Save previous readings to localStorage
- **Share functionality** - Generate shareable images of readings for social media
- **Multiple languages** - Full translation support for more languages
- **Dark/light theme** - Toggle between mystical dark mode and light mode
- **Interactive card meanings** - Allow users to select specific aspects of a card's meaning to explore deeper

---

## Image Optimization

The tarot card images used in CATAROT have been carefully optimized for web delivery through a multi-step process:

### Original Source
The original card images from the Assets folder were high-resolution PNG files with dimensions of approximately 1568x2716 pixels and file sizes ranging from 2MB to 6MB per image. These were the raw source files used for maximum quality preservation.

### Resizing
All card images were programmatically resized to a width of 400 pixels while maintaining their original aspect ratio. The resulting images have dimensions of 400x692 pixels (standard tarot card proportions). This resize was performed using bicubic interpolation for optimal quality at the reduced resolution.

### Compression Results
After resizing and re-encoding, the image file sizes were reduced from 2-6MB to approximately 200-450KB per image. This represents a compression ratio of approximately 90-95% reduction in file size with minimal visible quality loss at the displayed dimensions.

### Back Image
The card back image (`back.JPG`) was similarly optimized from its original size to 400x644 pixels at approximately 600KB. The file format was kept as JPEG which provides better compression than PNG for photographic-style images.

### Gallery Image Loading
All images are served statically from the `public/images/` directory by Next.js, which provides automatic caching headers and optimized serving. The browser caches images after the first load, so subsequent card flips and modal openings happen instantly without additional network requests.

---

## Security and Privacy

### Data Collection
CATAROT is designed with privacy as a core principle. The application collects no user data, stores no cookies, and maintains no user accounts or sessions. There is no backend database, no authentication system, and no analytics tracking code embedded in the application.

### IP Geolocation
The sole external API call made by the application is to `ip-api.com` for language detection purposes. This call is made from the client-side browser and returns only the country code of the visitor. According to ip-api.com's privacy policy, they do not log or store individual API requests made from client-side applications. The data is used solely for the purpose of displaying the interface in the appropriate language and is not stored, transmitted, or processed by the CATAROT application in any way.

### Third-Party Resources
The application loads fonts from Google Fonts (Margarine, Slackey, Cause). Google Fonts requests include the visitor's IP address and user agent string as part of standard HTTP request headers. Users concerned about Google's data collection practices can self-host the fonts by downloading them and serving them from the application's own domain.

### Content Security
All application code runs client-side in the browser. No server-side rendering of user-specific data occurs. The Next.js application is statically generated, meaning the HTML, CSS, and JavaScript are pre-built and served as static files from Vercel's CDN.

---

## Troubleshooting

### Common Issues

**Cards are not flipping on mobile**
Ensure that JavaScript is enabled in your browser. The card flip animation requires JavaScript for the GSAP ScrollTrigger plugin and the React state management. If the cards do not respond to taps on mobile, try refreshing the page or clearing your browser cache.

**Language is not changing**
The language detection uses IP geolocation which may not work if:
- The API request times out (3-second timeout)
- An ad blocker or privacy extension blocks the request to ip-api.com
- The browser is in private/incognito mode with strict tracking prevention

In these cases, the app falls back to the browser's language setting. If your browser is set to a language other than Indonesian or English, the default will be English. You can also manually override by clearing the cached language detection and reloading the page.

**Parallax animation is jerky or not working**
The GSAP ScrollTrigger animation requires a modern browser with IntersectionObserver support. If the animation appears jerky:
- Try disabling browser extensions that might interfere with scroll behavior
- Check if your browser is up to date
- Reduce the parallax scroll distance by modifying the `end: "+=2500"` value in the Parallax component
- On very low-end mobile devices, consider reducing the animation complexity

**Images are not loading**
Card images are served from the `public/images/` directory. If images fail to load:
- Verify that the image files exist in the public directory
- Check that the file names match exactly (including spaces and numbering)
- The image paths in the code use URL-encoded spaces (which is handled automatically by Next.js)
- Try a hard refresh (Ctrl+F5 or Cmd+Shift+R)

**Modal appears empty when clicking a card**
This can happen if the card object does not have a `meaning` property. The `openReading` function has a fallback that regenerates the meaning if it is missing. If the modal still appears empty, check the browser console for JavaScript errors and ensure the `tarotData.js` file is properly formatted.

---

## Design Philosophy

### Why a Cat Theme?
The cat theme was chosen to add personality and warmth to what could otherwise be a serious or intimidating tarot reading experience. Cats are associated with mystery, intuition, and independence - qualities that align well with the practice of tarot. The playful tone ("Ask Meow!") lowers the barrier to entry and makes the app feel more approachable to casual users who might be curious about tarot but not ready for a serious spiritual practice.

### Why Bilingual Meanings?
The meaning texts in CATAROT are written in a distinctive bilingual style that blends Indonesian and English. This reflects the natural communication patterns of many young Indonesians, especially in urban areas, who code-switch between languages in everyday conversation. The spiritual and self-development vocabulary used in the readings draws from both Indonesian and English sources, creating a unique voice that feels both contemporary and authentic.

### Color Palette Decisions
The deep navy background (`#282a57`) creates a night-sky atmosphere that evokes mystery and introspection. The light text (`#e4e4e4`) ensures readability while maintaining the dark, immersive mood. The parallax gradient transitions through purple and magenta to warm yellow, symbolizing the journey from darkness to light, from confusion to clarity - mirroring the spiritual journey that tarot readings are meant to illuminate.

### Typography
Three fonts are used to create visual hierarchy and personality:
- **Margarine** (cursive, display) - Used for the CATAROT logo and card names, adding a playful, hand-drawn feel
- **Slackey** (display) - Used for the main call-to-action heading, giving it a bold, attention-grabbing presence
- **Cause** (sans-serif) - Used for the reading text, providing excellent readability for longer passages

---

## Tarot Reading Tips

### How to Get the Most Out of Your Reading

**Set an Intention Before Flipping**
Before you click a card, take a moment to think about what you want guidance on. It could be a specific question about your life, relationship, career, or spiritual path, or it could be an open-ended request for general guidance. The clearer your intention, the more relevant the reading will feel.

**Pay Attention to Your First Reaction**
When the card and its meaning appear, notice your initial emotional and mental response. Do you feel relief, resistance, curiosity, or recognition? Your first reaction often contains valuable information about how the message applies to your situation.

**Read with an Open Mind**
Some card meanings may seem negative or challenging at first glance. Try to sit with the message before dismissing it. Even challenging cards like Death or The Tower carry important wisdom about transformation and necessary change. The shadow meanings are included specifically to help you identify areas where you might be stuck or blind to your own patterns.

**Don't Read Too Often**
For the most meaningful experience, limit yourself to one reading per day or per significant life event. Reading too frequently can lead to confusion and dependency on external guidance rather than trusting your own inner wisdom.

**Journal Your Readings**
Consider keeping a journal of the cards and meanings you receive, along with your personal reflections. Over time, you may notice patterns and themes that provide deeper insight into your life journey.

---

## Customization Guide

### Changing the Card Artwork
To replace the tarot card images with your own artwork:
1. Prepare your images as PNG files with the naming format `{id}. {Card Name}.png`
2. Place them in the `public/images/` directory
3. Ensure the file names match the card names in `tarotData.js`
4. The card back image is `back.JPG` or `back.png` in the same directory

### Adding New Meanings
To add new meanings to existing cards:
1. Open `src/data/tarotData.js`
2. Navigate to the card you want to edit
3. Add new string entries to the `meaning` array (for positive meanings) or `negativeMeaning` array (for warning meanings)
4. Each entry should be a single string enclosed in quotes
5. The `getRandomMeaning` function will automatically include your new entry

### Modifying the Parallax Scene
To customize the parallax animation:
1. Edit `src/components/Parallax.js`
2. Adjust the `end: "+=2500"` value to change the scroll distance
3. Modify the `y`, `x`, and `opacity` values for each element to change movement patterns
4. The background gradient colors can be changed in the inline style on the parallax div
5. For desktop vs mobile differences, edit the values within the `mm.add()` matchMedia blocks

### Changing the Color Theme
To customize the color scheme:
1. Open `src/styles/globals.css`
2. Modify the CSS custom properties in the `:root` block:
- `--primaryColor` controls the main background
- `--secondaryColor` controls the text color
3. Update the parallax gradient in `Parallax.js` to match your new theme

---

## Accessibility

CATAROT is built with basic accessibility considerations:
- All images include appropriate `alt` attributes
- Text content maintains sufficient color contrast ratios against the dark background
- The modal overlay can be dismissed by clicking outside the content area
- Interactive elements (cards, buttons) are clearly indicated through visual feedback
- Font sizes use relative units (`rem`, `clamp()`) so they scale with browser zoom settings

### Known Accessibility Limitations
- The card flip animation relies on CSS transforms and may not be accessible to screen reader users
- The parallax effect is decorative and does not convey essential information
- No keyboard navigation is implemented for the card flip mechanism
- Focus indicators are not explicitly styled

---

## Search Engine Optimization

CATAROT is built with Next.js which provides excellent SEO capabilities out of the box:
- **Static Generation**: The main page is statically generated at build time, meaning search engines can crawl and index the HTML content without executing JavaScript
- **Semantic HTML**: The page structure uses proper heading hierarchy (h1, h2, h3) and semantic HTML elements
- **Meta Tags**: The `_document.js` file includes proper character encoding and viewport meta tags
- **Image Alt Text**: All tarot card images include descriptive alt text for image search indexing
- **Page Speed**: Optimized images, minimal JavaScript, and CDN serving contribute to fast page load times which positively impact search rankings

---

## A Brief History of Tarot

Tarot cards have a rich and fascinating history that spans more than five centuries. Understanding this history adds depth to the reading experience in CATAROT.

### Origins in Renaissance Italy
The earliest known tarot decks appeared in northern Italy in the mid-15th century, during the Renaissance period. These early decks, known as "carte da trionfi" (cards of triumphs), were created for noble families such as the Visconti and Sforza dynasties of Milan. The cards were hand-painted by artists and used for playing a popular card game similar to modern bridge, not for divination or fortune-telling.

### Evolution into Divination
The use of tarot for divination and mystical purposes began in the late 18th century, when French occultists like Antoine Court de G-belin and Jean-Baptiste Alliette (known as Etteilla) proposed that the cards contained ancient Egyptian wisdom and esoteric knowledge. Court de G-belin published essays claiming that the word "tarot" came from the Egyptian word "tar" (path) and "ro" (royal), meaning "the royal path" - a theory that has since been debunked but that captured the popular imagination.

### The Rider-Waite-Smith Deck
The most influential tarot deck in the modern era is the Rider-Waite-Smith deck, first published in 1909. This deck was created by Arthur Edward Waite, a British occultist and member of the Hermetic Order of the Golden Dawn, and illustrated by Pamela Colman Smith, a talented artist and fellow Golden Dawn member. The Rider-Waite-Smith deck was revolutionary because it was the first deck to feature illustrated scenes on all 78 cards, including the Minor Arcana (which previously had only geometric patterns). This made the deck more accessible to beginners and more visually engaging for readings. The CATAROT app uses Major Arcana cards inspired by this tradition.

### The Major Arcana as a Spiritual Journey
The 22 cards of the Major Arcana, numbered 0 through 21, are often interpreted as representing the "Fool's Journey" - a spiritual pilgrimage of self-discovery and transformation. Beginning with The Fool (card 0) representing the innocent soul setting out on life's adventure, and ending with The World (card 21) representing completion and enlightenment, each card marks a stage of growth, challenge, and revelation along the path. This narrative framework is the foundation upon which the meaning texts in CATAROT are built.

### Tarot in the Digital Age
In the 21st century, tarot has experienced a resurgence in popularity, particularly among younger generations seeking spiritual guidance outside traditional religious frameworks. Digital tarot apps like CATAROT make the practice more accessible by removing barriers to entry - no physical deck to purchase, no memorization of card meanings required, and the ability to receive a reading anytime, anywhere. The interactive, animated format adds an element of engagement that traditional card readings cannot replicate.

---

## How to Interpret Your Reading

Each reading in CATAROT consists of three cards flipped one at a time. While each card's meaning can be read individually, there are several ways to interpret the three cards together as a coherent message.

### Past-Present-Future Spread
The most common interpretation for a three-card spread is the past-present-future framework:
- **First Card (Left)**: Represents the energies and influences of your past that have led you to your current situation. This card may highlight lessons learned, patterns established, or events that have shaped your perspective.
- **Second Card (Center)**: Represents your present circumstances and the current energies at work in your life. This card speaks to what is most relevant for you to focus on right now.
- **Third Card (Right)**: Represents the potential future that is emerging based on your current trajectory. This is not a fixed prediction but a likely outcome if you continue on your present path without making changes.

### Situation-Action-Outcome Spread
An alternative interpretation:
- **First Card**: Describes the current situation or challenge you are facing
- **Second Card**: Suggests the action or attitude that would serve you best
- **Third Card**: Indicates the likely outcome if you follow the guidance

### Body-Mind-Spirit Spread
For those seeking holistic guidance:
- **First Card**: Relates to physical and material aspects of your life (health, finances, career)
- **Second Card**: Relates to mental and emotional aspects (relationships, thoughts, feelings)
- **Third Card**: Relates to spiritual aspects (life purpose, inner growth, connection to the divine)

### Trust Your Intuition
Ultimately, the most powerful interpretation is the one that resonates with you personally. The card meanings provided in CATAROT are starting points for reflection, not absolute truths. Pay attention to which phrases stand out to you, what emotions arise as you read, and how the message connects to your current life circumstances. Your own intuition is the most valuable tool in any tarot reading.

---

## The Fool's Journey Through the Major Arcana

The 22 cards of the Major Arcana tell a story known as the Fool's Journey, a narrative of spiritual growth and self-realization:

### Act One: The Physical World (Cards 0-6)
The Fool begins the journey in the material world, encountering the basic forces that shape human experience. **The Magician** teaches the power of manifestation and will. **The High Priestess** introduces the mysteries of intuition and the subconscious. **The Empress** brings abundance and connection to nature. **The Emperor** establishes structure and authority. **The Hierophant** represents tradition and spiritual guidance from institutions. **The Lovers** presents the first major choice point, testing the Fool's values and commitments.

### Act Two: The Inner Journey (Cards 7-14)
Having established themselves in the world, the Fool turns inward. **The Chariot** represents the will to overcome challenges through determination. **Justice** calls for truth and accountability. **The Hermit** retreats into solitude for deeper wisdom. **The Wheel of Fortune** reminds the Fool of life's cyclical nature and the forces beyond human control. **Strength** teaches gentle mastery over one's instincts. **The Hanged Man** asks for surrender and a shift in perspective. **Death** brings transformation and the necessary end of old patterns. **Temperance** blends opposing forces into harmonious balance.

### Act Three: The Transcendent Realm (Cards 15-21)
The Fool confronts their shadow and achieves enlightenment. **The Devil** reveals the chains of attachment and limitation that bind the spirit. **The Tower** shatters false structures to reveal truth. **The Star** brings hope, healing, and divine inspiration. **The Moon** navigates the realm of illusion and the unconscious mind. **The Sun** shines with joy, success, and authentic self-expression. **Judgement** calls for reflection, reckoning, and answering one's higher calling. **The World** completes the journey with integration, fulfillment, and the realization that the Fool has become whole.

---

## Card Keywords Quick Reference

| # | Card | Upright Keywords | Reversed Keywords |
|---|------|-----------------|-------------------|
| 0 | The Fool | New beginnings, spontaneity, innocence, adventure | Recklessness, naivety, risk-taking without foresight |
| 1 | The Magician | Manifestation, willpower, resourcefulness, skill | Manipulation, trickery, untapped potential |
| 2 | The High Priestess | Intuition, mystery, subconscious, inner knowledge | Secrets withheld, disconnection from intuition |
| 3 | The Empress | Abundance, nurture, fertility, nature | Codependency, smothering, creative block |
| 4 | The Emperor | Authority, structure, stability, discipline | Tyranny, rigidity, abuse of power |
| 5 | The Hierophant | Tradition, spiritual guidance, conformity | Dogmatism, rebellion, restriction |
| 6 | The Lovers | Relationships, choices, alignment, values | Disharmony, misalignment, poor decisions |
| 7 | The Chariot | Willpower, determination, victory, focus | Lack of direction, aggression, loss of control |
| 8 | Justice | Fairness, truth, cause and effect, accountability | Dishonesty, injustice, avoidance of responsibility |
| 9 | The Hermit | Introspection, solitude, inner guidance | Isolation, loneliness, withdrawal |
| 10 | Wheel of Fortune | Cycles, change, destiny, turning point | Bad luck, resistance to change, stagnation |
| 11 | Strength | Courage, inner power, patience, compassion | Self-doubt, insecurity, fear of one's power |
| 12 | The Hanged Man | Surrender, new perspective, pause, sacrifice | Stagnation, resistance, unnecessary sacrifice |
| 13 | Death | Transformation, endings, new beginnings | Resistance to change, fear of letting go |
| 14 | Temperance | Balance, moderation, patience, harmony | Excess, imbalance, lack of self-regulation |
| 15 | The Devil | Bondage, materialism, shadow, attachment | Liberation, awareness of chains, recovery |
| 16 | The Tower | Sudden upheaval, revelation, destruction | Resistance to necessary change, disaster ignored |
| 17 | The Star | Hope, inspiration, renewal, serenity | Despair, disillusionment, loss of faith |
| 18 | The Moon | Illusion, fear, unconscious, mystery | Confusion, anxiety, clarity emerging |
| 19 | The Sun | Joy, success, vitality, confidence | Arrogance, temporary success, overshadowing |
| 20 | Judgement | Reflection, reckoning, awakening, rebirth | Self-judgment, refusal to learn, avoiding calling |
| 21 | The World | Completion, accomplishment, wholeness, travel | Incompletion, delays, stagnation at finish line |

---

## The Cats and Tarot Connection

Cats have been associated with mystical and spiritual practices throughout history, making them the perfect mascot for a tarot reading app:

- **Ancient Egypt**: Cats were revered as sacred animals associated with the goddess Bastet, who represented protection, fertility, and the home. The cat's nocturnal nature connected it to the moon and the mysteries of the night.
- **Medieval Europe**: Cats were both feared as familiars of witches and valued as protectors against evil spirits. Their independent nature and luminous eyes gave them an air of otherworldly wisdom.
- **Japanese Folklore**: The maneki-neko (beckoning cat) is believed to bring good luck and fortune, similar to what tarot readings seek to attract.
- **Modern Internet Culture**: Cats have become synonymous with internet culture itself, representing curiosity, playfulness, and a touch of mystery - all qualities that align with the practice of tarot exploration.

The CATAROT name itself combines "cat" and "tarot," symbolizing the fusion of feline mystique with ancient divination practice.

---

## Testing

The application can be tested manually by:
1. Running `npm run build` to verify that the Next.js build completes without errors
2. Testing on multiple screen sizes using browser developer tools responsive mode
3. Testing on actual mobile devices for touch interaction testing
4. Verifying that the language detection works by using a VPN or browser language settings
5. Testing all 22 cards by repeatedly flipping cards and verifying that meanings display correctly

Automated testing (unit tests, integration tests) is not currently implemented but could be added using Jest and React Testing Library for component tests and Cypress for end-to-end testing of the card flip and modal flow.

---

## FAQ

### General Questions

**Q: Do I need to know anything about tarot to use this app?**
A: Not at all. CATAROT is designed for both complete beginners and experienced tarot enthusiasts. Just click a card and read the meaning. There is no prior knowledge or preparation required.

**Q: How many cards are in the deck?**
A: CATAROT includes all 22 Major Arcana cards, numbered from 0 (The Fool) to 21 (The World). The Minor Arcana (56 cards) are not included in this version.

**Q: Are the readings accurate?**
A: The accuracy of a tarot reading depends more on the reader's interpretation and personal reflection than on the cards themselves. The meanings in CATAROT are written to be thought-provoking starting points for self-reflection rather than predictive statements.

**Q: Why does the app show three cards?**
A: Three cards is a common tarot spread length that provides enough information for a meaningful reading without being overwhelming. The three cards can be interpreted in multiple ways - past/present/future, situation/action/outcome, or body/mind/spirit.

**Q: Can I get the same card twice in one reading?**
A: No. The app randomly selects three unique cards from the deck of 22, so you will never see a duplicate in a single reading session.

### Technical Questions

**Q: How does the language detection work?**
A: When you open the app, your browser sends a request to ip-api.com, a free IP geolocation service. If the API locates you in Indonesia, the interface language is set to Indonesian. For all other locations, English is used. If the API request fails (for example, due to an ad blocker), the app falls back to your browser's language setting. If your browser is set to Indonesian, the app will show Indonesian text; otherwise, it defaults to English.

**Q: Does the app collect my personal data?**
A: No. CATAROT collects no user data, stores no cookies, and has no analytics tracking. The only external API call is to ip-api.com for language detection, which returns a country code without logging or storing your information.

**Q: Can I use this app offline?**
A: The app requires an internet connection to load for the first time because it fetches fonts from Google Fonts and makes the language detection API call. Once loaded, the cards and meanings are cached by the browser for the session.

**Q: Why is the page so fast to load?**
A: The app uses Next.js static generation, optimized images (compressed from 6MB to ~300KB each), and is served from Vercel's global CDN. The minimal JavaScript bundle and efficient CSS contribute to fast page loads.

**Q: What browsers are supported?**
A: CATAROT supports all modern browsers including Chrome, Firefox, Safari, and Edge. Internet Explorer is not supported. The GSAP animation library requires a modern browser with support for IntersectionObserver and CSS transforms.

**Q: Can I contribute to the project?**
A: Yes. See the Contributing section above for guidelines. The project is open for pull requests, whether you want to add new features, improve the design, add translations, or fix bugs.

### Reading Interpretation Questions

**Q: What does it mean if I keep getting the same card?**
A: Frequent appearance of the same card across multiple reading sessions is a strong signal that the card's message is particularly relevant to your current life situation. Pay close attention to that card's meaning and consider how it might apply to an area of your life you may be overlooking or avoiding.

**Q: Should I read the shadow/negative meanings?**
A: The negative meanings (shadow meanings) are always displayed alongside positive meanings in CATAROT. They are not meant to be frightening but rather to provide a balanced perspective and to help you identify areas where you might be stuck in unhelpful patterns. Growth often comes from recognizing and working with our shadow aspects.

**Q: How often should I do a reading?**
A: For the most meaningful experience, limit yourself to one reading per day or per significant life event. Reading too frequently can lead to confusion and dependency on external guidance. The best reading is one you reflect on throughout the day, not one you immediately dismiss and replace with another.

**Q: Can I use this for readings for other people?**
A: Yes. The three-card spread works well for readings about other people, relationships, or group situations. Simply think about the person or situation clearly before flipping the cards. The most accurate readings come when you approach with genuine care and an open mind, not when you are trying to validate a predetermined conclusion.

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## Acknowledgments

- The 22 Major Arcana tarot card artwork and their rich symbolic traditions spanning centuries of esoteric wisdom
- GSAP (GreenSock) for providing one of the most powerful and performant animation libraries available for web development
- Next.js team at Vercel for creating an exceptional React framework that makes building modern web applications a joy
- ip-api.com for offering a free, no-registration-required IP geolocation API that powers the language detection feature
- Vercel for the deployment platform that makes hosting Next.js applications seamless with automatic HTTPS, CDN distribution, and continuous deployment

---

## Credits

Created with love by **Febvn**

*"Curiosity killed the cat? Ask Meow!"*

---

## License

This project is for personal and educational use only. All tarot card artwork belongs to their respective creators and original sources. If you are the copyright holder of any artwork used in this project and would like attribution, correction, removal, or have any other concerns, please open an issue on the GitHub repository for prompt attention and fair resolution.

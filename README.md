# Ken Studio — Portfolio Website

The portfolio website of **Ken Studio**, an independent digital solutions studio based in Abidjan, Côte d'Ivoire. It presents the studio's services and real projects to local businesses such as restaurants and lounges.

## Live Preview

https://emm0546.github.io/ken-studio/

## Why I Built It

Local businesses in Abidjan often rely on social media alone and have no website of their own. I needed one place to show what I can build, so that when I contact a business they can check my work instead of taking my word for it.

## Features

- **Bilingual (EN / FR)**: a language button switches the whole page without reloading. The choice is remembered, and the page opens in French for visitors whose browser is in French.
- **Responsive layout**: built with CSS Grid and Flexbox, with separate tablet and phone layouts.
- **Mobile menu**: a hamburger button opens and closes the navigation, and it closes after a link is tapped.
- **Scroll reveal**: sections slide up and fade in as they enter the screen, with a reduced-motion fallback.
- **Direct contact**: a WhatsApp button opens a conversation with a message already written.
- **Real work only**: the portfolio links to live projects I have built.

## Built With

- **HTML5**: semantic structure
- **CSS3**: Grid, Flexbox, custom layouts, transitions, media queries
- **JavaScript (vanilla)**: DOM manipulation, `classList`, `IntersectionObserver`, `localStorage`
- **Google Fonts**: DM Sans and Manrope
- **Git & GitHub Pages**: version control and hosting

## Project Structure

```
ken-studio/
├── index.html      # page structure and English content
├── style.css       # all styles, including the responsive rules
├── script.js       # mobile menu, scroll reveal, language toggle
└── assets/         # logo and images
```

## How the Language Toggle Works

The English text stays in the HTML. Each translatable element carries a `data-i18n` key, and `script.js` holds a `translations` object with the French text for each key. When the button is clicked, the script swaps the text of every marked element and saves the choice in `localStorage`. Adding another language only means adding another set of translations.

## Technical Highlights

- Lightweight: no frameworks or build step, just HTML, CSS and vanilla JavaScript, so pages load fast on mobile data
- Mobile navigation overlays the page instead of pushing content down, so the hero stays fully visible
- Scroll animations use `IntersectionObserver`, play once, and respect the user's reduced-motion setting
- Translations are driven by `data-i18n` attributes, so content stays readable if JavaScript fails
- Responsive layouts for desktop, tablet and phone

## Roadmap

- Add more client projects as they are completed
- Add a portrait and a short story in the About section
- Add a data dashboards service once I have real samples to show

## Author

**Konan Emmanuel Nassé**

GitHub: [Emm0546](https://github.com/Emm0546)

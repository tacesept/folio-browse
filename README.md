# Folio Browse

Folio Browse is a lightweight React app for discovering developer portfolios. It gives you a curated archive of portfolios, searchable by name or tagline, with quick alphabet navigation and a randomizer for browsing inspiration.

## Overview

This project was built to make portfolio discovery easier and more enjoyable. Instead of manually searching through scattered links, you can quickly browse a central library of developer portfolio sites, filter by keyword, and jump to relevant sections alphabetically.

The app loads portfolio data from the public developer portfolio feed and presents it in a clean, fast interface.

## Features

- Browse a curated archive of developer portfolios
- Search portfolios by name or tagline
- Jump between sections using alphabet navigation
- Generate a random set of portfolios for inspiration
- Responsive, minimal interface optimized for quick exploration
- Client-side data fetching with caching for a smoother browsing experience

## Tech Stack

- React 19
- Vite
- Tailwind CSS
- TanStack React Query
- ESLint

## Project Structure

```text
.
├── public/
├── src/
│   ├── components/
│   ├── hooks/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── eslint.config.js
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Data Source

Portfolio data is pulled from the public feed used by the developer portfolio archive project:

https://github.com/emmabostian/developer-portfolios


## Notes

This app is intentionally simple and focused on exploration. It does not require a backend and is designed to be easy to run locally for inspiration, research, or further customization.

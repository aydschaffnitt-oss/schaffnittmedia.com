// ============================================================
//  VIDEOS DATA FILE — Edit this file to add/remove videos
// ============================================================
//
//  HOW TO ADD A VIDEO:
//  1. Upload your video to YouTube
//  2. Copy the video ID from the URL
//     e.g. youtube.com/watch?v=dQw4w9WgXcQ  →  ID is "dQw4w9WgXcQ"
//  3. Add a new object to the VIDEOS array below, following the same format

// ============================================================
//  HERO BACKGROUND VIDEOS
//  These cycle in the background of the hero section (muted).
//  Add your best/most cinematic YouTube video IDs here.
//  Tip: short clips or highlight reels work best as backgrounds.
// ============================================================

const HERO_VIDEOS = [
  "dQw4w9WgXcQ",   // Replace with your YouTube video ID
  "dQw4w9WgXcQ",   // Replace with your YouTube video ID
  "dQw4w9WgXcQ",   // Replace with your YouTube video ID
];

// How many seconds each video plays before switching (default: 8)
const HERO_INTERVAL = 8;
//
//  CATEGORIES: "sports" or "business"
//
// ============================================================

const VIDEOS = [
  // --- SPORTS ---
  {
    id: "dQw4w9WgXcQ",          // Replace with your YouTube video ID
    title: "Game Day Highlights",
    description: "High-energy sports recap with dynamic cuts and sound design.",
    category: "sports",
  },
  {
    id: "dQw4w9WgXcQ",          // Replace with your YouTube video ID
    title: "Athlete Feature",
    description: "A cinematic profile following a local athlete through their season.",
    category: "sports",
  },
  {
    id: "dQw4w9WgXcQ",          // Replace with your YouTube video ID
    title: "Tournament Recap",
    description: "Full-weekend coverage condensed into a punchy two-minute edit.",
    category: "sports",
  },

  // --- BUSINESS / CLIENTS ---
  {
    id: "dQw4w9WgXcQ",          // Replace with your YouTube video ID
    title: "Brand Story — Local Business",
    description: "A short documentary-style brand film for a local Kearney business.",
    category: "business",
  },
  {
    id: "dQw4w9WgXcQ",          // Replace with your YouTube video ID
    title: "Product Showcase",
    description: "Clean, minimal product video with motion graphics.",
    category: "business",
  },
  {
    id: "dQw4w9WgXcQ",          // Replace with your YouTube video ID
    title: "Event Coverage",
    description: "Full-day event captured and cut into a polished highlight reel.",
    category: "business",
  },
];

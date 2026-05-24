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

// ============================================================
//  HERO BACKGROUND VIDEOS
//  Add your encoded MP4 clips to the /videos/ folder, then
//  list the filenames here. They are randomized on each visit.
//  Note: keep files under 100MB (GitHub's hard limit)
// ============================================================
const HERO_VIDEOS = (function () {
  const clips = [
    "videos/bg01.mp4",
    "videos/bg02.mp4",
    "videos/bg03.mp4",
    "videos/bg04.mp4",
    "videos/bg05.mp4",
    "videos/bg06.mp4",
    "videos/bg07.mp4",
    "videos/bg08.mp4",
    "videos/bg09.mp4",
    "videos/bg10.mp4",
    "videos/bg11.mp4",
    "videos/bg12.mp4",
    // Add new clips below — name them bg13.mp4, bg14.mp4, etc.
  ];
  // Shuffle using Fisher-Yates so order is different every visit
  for (let i = clips.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [clips[i], clips[j]] = [clips[j], clips[i]];
  }
  return clips;
})();

// How many seconds each video plays before switching (default: 8)
const HERO_INTERVAL = 8;
//
//  CATEGORIES: "sports" or "business"
//
// ============================================================

const VIDEOS = [
  // --- SPORTS ---
  {
    id: "f_v63UmqYis",
    title: "Nebraska Basketball Hype Video",
    description: "Hype video edited by me that played in-venue at Pinnacle Bank Arena during the 25-26 season.",
    category: "sports",
  },

  // --- BUSINESS / CLIENTS ---
  {
    id: "IncmXQTd6Ps",
    title: "KVFD Volunteer Advertisement",
    description: "Short video produced for the Kearney Volunteer Fire Department to bolster local volunteer recruitment.",
    category: "business",
  },
  {
    id: "8D35nULokaA",
    title: "Hub Fitness Promo Video",
    description: "Short video produced for Hub Fitness to support their grand opening.",
    category: "business",
  },
  {
    id: "G1gkw-7Stx8",
    title: "Sissy Squat Reel",
    description: "Short reel showcasing new piece of equipment for Hub Fitness.",
    category: "business",
  },
];

// src/prompt/presets.ts
export const PROMPT_STYLES = [
  "Futuristic Base Blue neon gradients, sharp edges, high contrast",
  "Minimal vector cartoon, bold outlines, pastel palette",
  "Cyberpunk night city, holograms, moody atmosphere",
  "3D glossy render, studio lighting, soft reflections",
  "Hand-drawn sketch with watercolor texture",
];

export const SUBJECT_TEMPLATES = [
  "Wise Owl (WOW) logo perched on a circuit branch",
  "Giraffe mascot with geometric elongated neck",
  "Token coin with hidden 'V' monogram inspired by Cappadocia rocks",
  "Abstract Base Network portal background",
  "Crystal cube with glowing inner core",
];

export function combine(style: string, subject: string) {
  return `${subject}. Style: ${style}. 1024x1024, centered composition, no text.`;
}

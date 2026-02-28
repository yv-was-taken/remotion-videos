// ============================================================
// COLOR PALETTE — derived from Stronghold logo
// ============================================================
export const COLORS = {
  bgDark: "#0B1219",
  bgMid: "#0F1923",
  accentCyan: "#7DFCE0",
  accentTeal: "#4AAEA0",
  deepTeal: "#1A3A4A",
  textWhite: "#E8F4F2",
  textMuted: "#8AACB8",
  dangerRed: "#FF4757",
  warningAmber: "#FFBE0B",
} as const;

// ============================================================
// TIMING HELPERS
// ============================================================
export const FPS = 30;
export const sec = (s: number) => Math.round(s * FPS);

// ============================================================
// WORD-LEVEL TIMING MAP (from Whisper transcription)
// Audio: ~72.7s
//
// SCENE 1 — OPENER (0s → 10.0s)
//   0.00 -  0.90  "Welcome back."
//   1.14 -  5.86  "The Stronghold team has been hard at work on several key initiatives for native"
//   5.86 -  7.68  "and hybrid on-chain businesses."
//   8.16 -  9.74  "Let's get into it."
//
// SCENE 2 — B2B API (10.0s → 31.5s)
//  10.26 - 11.90  "First, business to business."
//  12.34 - 16.98  "We're enabling the foundation for B2B customers with our API"
//  17.62 - 22.90  "so that businesses can build and scale agentic products without worrying about the threat surface."
//  23.28 - 25.66  "Scanning inputs across the entire pipeline"
//  26.20 - 31.10  "to block poisoned payloads, prompt injections, and jailbreaks before they can propagate."
//
// SCENE 3 — IMAGE SCANNING (31.5s → 47.0s)
//  31.80 - 33.10  "Second, image scanning!"
//  33.62 - 38.02  "Most tools on the market still can't detect prompt injection hidden within images."
//  38.58 - 45.12  "As on-chain products scale into more visual, retail-focused experiences, that's a critical vulnerability."
//  45.74 - 46.94  "We're closing that gap."
//
// SCENE 4 — SCAN EGRESS (47.0s → 58.5s)
//  47.44 - 49.22  "Third, scan model egress."
//  49.50 - 58.28  "We secure outputs too, protecting PII, keys, financial data, and technical architecture on the response side."
//
// SCENE 5 — CLOSE (58.5s → 74.0s)
//  58.82 - 61.32  "The on-chain agentic economy is accelerating,"
//  62.08 - 69.98  "and Stronghold is building the security and payment infrastructure that serious businesses need to move fast without breaking things."
//  70.42 - 71.40  "We're just getting started."
//  71.76 - 72.34  "GET STRONG!"
//  72.34 - 74.00  [silence / fade out]
// ============================================================

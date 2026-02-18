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
// Audio: ~65.8s
//
// SCENE 1 — THE THREAT (0s → 19.5s)
//   0.00 -  4.28  "Autonomous agents hold private keys and move real capital around the clock!"
//   4.72 -  8.52  "Every website they scrape, every document they parse is an open door!"
//   9.08 - 12.62  "A single prompt injection can hijack an agent's behavior!"
//  13.16 - 17.10  "A single credential leak can expose private keys to the open internet."
//  17.42 - 19.12  "One exploit is all it takes!" (flash red)
//
// SCENE 2 — INTRODUCING STRONGHOLD (19.5s → 21.0s) — 1.5s flash
//  19.74 - 21.02  "Introducing Stronghold,"
//
// SCENE 3 — HOW IT WORKS (21.0s → 35.0s)
//  21.34 - 25.18  "a transparent proxy that sits between your agent and the internet."
//  25.58 - 30.10  "Inbound traffic is scanned for prompt injection before it ever reaches the model."
//  30.50 - 34.98  "Outbound responses are scanned for credential leaks and blocked before they leave."
//
// SCENE 4 — $STRONG TOKEN (35.0s → 55.0s)
//  35.48 - 39.50  "$STRONG is your stake in the security layer protecting agentic finance."
//  40.00 - 44.16  "10% of all fee volume goes to weekly $STRONG burns."
//  44.68 - 47.16  "Sustained deflation as adoption scales."
//  47.78 - 54.94  "As more agents integrate Stronghold, $STRONG becomes the connective tissue..."
//
// SCENE 5 — CTA + CLOSE (55.0s → 66.0s)
//  55.42 - 56.86  "$STRONG is live."
//  57.36 - 59.54  "Get it before the agents need saving."
//  59.98 - 63.58  "The strong do what they can; the weak suffer what they must."
//  64.16 - 64.64  "Get $STRONG"
//  64.80 - 65.76  [silence / fade out]
// ============================================================

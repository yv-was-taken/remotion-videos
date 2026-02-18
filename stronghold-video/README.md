# Stronghold — Remotion Video

A ~66s announcement video for [Stronghold](https://getstronghold.xyz) — enterprise security for AI infrastructure.

## Project Structure

```
stronghold-video/
├── public/
│   ├── narration.mp3      # ElevenLabs narration audio (65.8s)
│   └── logo.png           # Stronghold logo
├── src/
│   ├── index.ts           # Remotion entry point
│   ├── Root.tsx            # Composition registration
│   ├── StrongholdVideo.tsx # Main composition (scene assembly + audio)
│   ├── constants.ts        # Colors, timing map, helpers
│   ├── components.tsx      # Reusable visual components
│   ├── SceneThreat.tsx     # Scene 1: The Threat (0-22s)
│   ├── SceneIntro.tsx      # Scene 2: Introducing Stronghold (22-26s)
│   ├── SceneHowItWorks.tsx # Scene 3: How It Works (26-40s)
│   ├── SceneToken.tsx      # Scene 4: $STRONG Token (40-57s)
│   └── SceneClose.tsx      # Scene 5: CTA + Close (57-66s)
├── package.json
└── tsconfig.json
```

## Scene Breakdown (synced to narration audio)

| Scene | Time | Content |
|-------|------|---------|
| 1. The Threat | 0s – 22s | Danger of unprotected AI agents, escalating red vignette |
| 2. Introducing | 22s – 26s | Logo reveal with cyan glow |
| 3. How It Works | 26s – 40s | Proxy architecture diagram, inbound/outbound scanning |
| 4. $STRONG Token | 40s – 57s | Token value prop, no VCs, 10% burn mechanism |
| 5. CTA + Close | 57s – 66s | "$STRONG is live", URL, Thucydides quote fade |

## Setup

```bash
npm install
```

## Preview (opens in browser)

```bash
npm run preview
```

## Render MP4

```bash
npm run render
# or explicitly:
npm run render:mp4
```

Output: `out/stronghold.mp4` (1920×1080, 30fps, ~66s)

## Swapping Audio

Replace `public/narration.mp3` with a new file. If timing changes significantly, update the silence-break timing map in `src/constants.ts` and adjust scene `from`/`durationInFrames` in `src/StrongholdVideo.tsx`.

## Color Palette (from logo)

| Token | Hex | Usage |
|-------|-----|-------|
| `bgDark` | `#0B1219` | Primary background |
| `accentCyan` | `#7DFCE0` | Highlights, glow, brand accent |
| `accentTeal` | `#4AAEA0` | Secondary accent |
| `deepTeal` | `#1A3A4A` | Borders, subtle elements |
| `dangerRed` | `#FF4757` | Threat emphasis |
| `warningAmber` | `#FFBE0B` | Warning highlights |

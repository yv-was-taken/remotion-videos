# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Remotion video generation project. The single app lives in `stronghold-video/` — a ~66-second promotional video for Stronghold (AI infrastructure security). Built with Remotion 4, React 19, and TypeScript (strict mode).

## Commands

All commands run from `stronghold-video/`:

```bash
npm install                # install dependencies
npm run preview            # interactive Remotion preview in browser
npm run render             # render to out/stronghold.mp4
npm run render:mp4         # H.264 codec explicitly
npm run render:webm        # VP8 WebM for web delivery
```

There is no automated test suite. Validate via `npm run preview` (timing, transitions, layout) and `npm run render` before PRs.

## Architecture

**Scene-based composition pattern:**

- `src/Root.tsx` registers two compositions: `StrongholdVideo` (1920×1080) and `StrongholdVideoShort` (1080×1920 vertical)
- Main compositions (`StrongholdVideo.tsx`, `StrongholdVideoShort.tsx`) layer `<Audio>` with sequenced scene components
- Five scene components (`SceneThreat`, `SceneIntro`, `SceneHowItWorks`, `SceneToken`, `SceneClose`) each own their animations and content
- `SceneHowItWorksShort.tsx` is the vertical-layout variant of `SceneHowItWorks`

**Shared code:**

- `constants.ts` — `COLORS` palette, `FPS` (30), `sec()` helper (seconds → frames), and word-level Whisper timestamps for caption sync
- `components.tsx` — reusable visual components: `GlowText`, `FadeIn`, `GridBackground`, `ScanLine`, `Particles`, `RadialGlow`, `renderHighlighted`

**Animation approach:** Frame-based using Remotion's `useCurrentFrame()` + `interpolate()`. Spring physics via `spring()` for entrances. Sine-wave modulation for pulse/glow effects.

**Audio sync:** Narration at `public/narration.mp3` (65.8s, ElevenLabs). Word-level timestamps from Whisper stored in `constants.ts`. To swap audio: replace the MP3, update the timing map in `constants.ts`, and adjust `Sequence` frame ranges in the main composition files.

## Coding Conventions

- TypeScript strict mode; 2-space indent; semicolons; double quotes
- `PascalCase` for component files/exports (`SceneThreat.tsx`), `camelCase` for helpers (`sec`), `UPPER_SNAKE_CASE` for constants (`COLORS`, `FPS`)
- New scenes go in `stronghold-video/src/` and must be registered in `Root.tsx`
- Prefer small scene-focused components; reuse shared UI from `components.tsx`
- Path alias: `@/*` maps to `src/*` (configured in tsconfig)

## Git Conventions

- Imperative, concise commit subjects
- Group related scene/timing changes in one commit
- PRs should include: summary, affected files/scenes, and render evidence (screenshot or clip)

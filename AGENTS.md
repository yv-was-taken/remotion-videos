# Repository Guidelines

## Project Structure & Module Organization
This repository contains one Remotion app in `stronghold-video/`.

- `stronghold-video/src/`: TypeScript/React video code (compositions, scenes, shared constants/components).
- `stronghold-video/public/`: static assets bundled at render time (for example `narration.mp3`, `logo.png`).
- `stronghold-video/remotion.config.ts`: Remotion configuration.
- `stronghold-video/package.json`: local scripts and dependencies.
- Root `.gitignore`: excludes `node_modules/` and `*.mp4`.

Keep new scene files in `stronghold-video/src/` and register compositions in `stronghold-video/src/Root.tsx`.

## Build, Test, and Development Commands
Run commands from `stronghold-video/`:

- `npm install`: install dependencies.
- `npm run preview`: open Remotion preview for interactive timeline checks.
- `npm run render`: render the main MP4 to `out/stronghold.mp4`.
- `npm run render:mp4`: explicit H.264 MP4 render.
- `npm run render:webm`: VP8 WebM render for web delivery.

## Coding Style & Naming Conventions
- Language: TypeScript (`strict: true` in `tsconfig.json`).
- Indentation: 2 spaces; use semicolons and double quotes to match existing files.
- Components/compositions: `PascalCase` file and export names (for example `SceneThreat.tsx`, `StrongholdVideo.tsx`).
- Helpers/constants: `camelCase` for functions (`sec`) and `UPPER_SNAKE_CASE` for global constants (`FPS`, `COLORS` object key group).
- Prefer small, scene-focused components and reuse shared UI in `components.tsx`.

## Testing Guidelines
There is currently no automated test suite. Validate changes with:

- `npm run preview` for timing, transitions, and layout checks.
- `npm run render` (and optionally `npm run render:webm`) before opening a PR.

When editing narration timing, verify `src/constants.ts` timestamps and scene `Sequence` frame ranges in `src/StrongholdVideo.tsx`.

## Commit & Pull Request Guidelines
History is minimal and uses concise imperative subjects (example: `Recreate initial commit and ignore build artifacts`). Follow that style:

- Keep commit subjects imperative and specific.
- Group related scene/timing changes in one commit when practical.

PRs should include:

- Short summary of visual/timing changes.
- Affected files/scenes.
- Render evidence (output path, screenshot, or short clip), especially for animation or timing updates.

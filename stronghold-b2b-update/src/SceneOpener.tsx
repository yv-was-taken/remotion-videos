import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Img,
  staticFile,
} from "remotion";
import { COLORS, sec } from "./constants";
import {
  GlowText,
  GridBackground,
  ScanLine,
  RadialGlow,
  WordReveal,
  WordTiming,
} from "./components";

export const SceneOpener: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Scene: 0s → 10.0s (300 frames)
  // Whisper relative timestamps:
  //   0.00 -  0.90  "Welcome back."
  //   1.14 -  7.68  "The Stronghold team ... on-chain businesses."
  //   8.16 -  9.74  "Let's get into it."

  // Logo spring entrance
  const logoScale = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 60 },
    delay: 0,
  });

  // "Welcome back" text
  const welcomeOpacity = interpolate(frame, [0, sec(0.3)], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // "Let's get into it" — cyan flash at ~8s
  const flashProgress = interpolate(
    frame,
    [sec(8.0), sec(8.3), sec(8.8), sec(9.5)],
    [0, 0.15, 0.15, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // RadialGlow pulse
  const glowPulse = interpolate(
    Math.sin(frame * 0.08),
    [-1, 1],
    [0.08, 0.18]
  );

  // Subtitle words — per-word Whisper timestamps (scene-relative = global)
  const subtitleWords: WordTiming[] = [
    { text: "The", at: sec(1.14) },
    { text: "Stronghold", at: sec(1.32) },
    { text: "team", at: sec(1.82) },
    { text: "has", at: sec(2.18) },
    { text: "been", at: sec(2.5) },
    { text: "hard", at: sec(2.72) },
    { text: "at", at: sec(2.94) },
    { text: "work", at: sec(3.16) },
    { text: "on", at: sec(3.38) },
    { text: "several", at: sec(3.7) },
    { text: "key", at: sec(3.96) },
    { text: "initiatives", at: sec(4.46) },
    { text: "for", at: sec(5.02) },
    { text: "native", at: sec(5.52), color: COLORS.accentCyan },
    { text: "and", at: sec(5.86) },
    { text: "hybrid", at: sec(6.2), color: COLORS.accentCyan },
    { text: "on-chain", at: sec(6.52), color: COLORS.accentCyan },
    { text: "businesses.", at: sec(7.14) },
  ];

  // "Let's get into it..." words
  const letsGoWords: WordTiming[] = [
    { text: "Let's", at: sec(8.16) },
    { text: "get", at: sec(8.4) },
    { text: "into", at: sec(8.62) },
    { text: "it...", at: sec(8.86) },
  ];

  return (
    <AbsoluteFill
      style={{
        background: COLORS.bgDark,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: 30,
      }}
    >
      <GridBackground intensity={0.06} />
      <ScanLine speed={1.5} />
      <RadialGlow size={800} opacity={glowPulse} blur={80} />

      {/* Cyan flash on "Let's get into it" */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: COLORS.accentCyan,
          opacity: flashProgress,
        }}
      />

      {/* Logo */}
      <div style={{ transform: `scale(${logoScale})`, marginBottom: 10 }}>
        <Img
          src={staticFile("logo.png")}
          style={{ width: 160, height: 160 }}
        />
      </div>

      {/* "Welcome back!" */}
      <div style={{ opacity: welcomeOpacity, textAlign: "center" }}>
        <GlowText fontSize={72} style={{ letterSpacing: 4 }}>
          Welcome back!
        </GlowText>
      </div>

      {/* Subtitle — word-by-word reveal synced to narration */}
      {frame < sec(7.8) && (
        <div
          style={{
            textAlign: "center",
            maxWidth: 1100,
            padding: "0 80px",
          }}
        >
          <WordReveal
            words={subtitleWords}
            fontSize={30}
            color={COLORS.textMuted}
            style={{ textAlign: "center" }}
          />
        </div>
      )}

      {/* "Let's get into it..." — appears at ~8s */}
      {frame >= sec(7.8) && (
        <WordReveal
          words={letsGoWords}
          fontSize={48}
          color={COLORS.accentCyan}
          style={{ textAlign: "center", letterSpacing: 3 }}
        />
      )}
    </AbsoluteFill>
  );
};

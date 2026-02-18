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
import { COLORS } from "./constants";
import { GlowText, GridBackground, RadialGlow } from "./components";

export const SceneIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 1.5s scene (45 frames) — everything appears fast
  const logoScale = spring({
    frame,
    fps,
    config: { damping: 8, stiffness: 200 },
  });

  const textOpacity = interpolate(frame, [2, 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const glowPulse = interpolate(
    Math.sin(frame * 0.06),
    [-1, 1],
    [0.08, 0.2]
  );

  // Fade out over the last 15 frames (~0.5s)
  const fadeOut = interpolate(frame, [30, 45], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: COLORS.bgDark,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: 40,
        opacity: fadeOut,
      }}
    >
      <GridBackground intensity={0.04} />
      <RadialGlow size={700} opacity={glowPulse} blur={80} />

      {/* Logo */}
      <div style={{ transform: `scale(${logoScale})` }}>
        <Img
          src={staticFile("logo.png")}
          style={{ width: 200, height: 200 }}
        />
      </div>

      {/* Title */}
      <div style={{ opacity: textOpacity }}>
        <GlowText
          fontSize={80}
          style={{ textAlign: "center", letterSpacing: 8 }}
        >
          STRONGHOLD
        </GlowText>
      </div>
    </AbsoluteFill>
  );
};

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
import { GlowText, FadeIn, GridBackground, RadialGlow } from "./components";

export const SceneClose: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Scene is 11s (55s → 66s global)
  // Sub-segments (frame-relative):
  //  0.4 - 2.0s  "$STRONG is live."
  //  2.6 - 4.7s  "Get it before the agents need saving."
  //  5.1 - 8.8s  "The strong do what they can; the weak suffer what they must."
  //  9.2 - 9.8s  "Get $STRONG"
  //  9.8 - 11.0s [fade out]

  // Logo entrance
  const logoScale = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 60 },
    delay: 0,
  });

  // CTA "$STRONG is live."
  const ctaOpacity = interpolate(frame, [sec(0.2), sec(0.6)], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // "Get it before the agents need saving."
  const subtitleOpacity = interpolate(frame, [sec(2.4), sec(2.8)], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // URL
  const urlOpacity = interpolate(frame, [sec(3.0), sec(3.5)], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Quote — appears ~5.1s into scene
  const quoteOpacity = interpolate(frame, [sec(4.9), sec(5.3)], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // "Get $STRONG" final CTA — appears ~9.2s into scene
  const getFinalOpacity = interpolate(frame, [sec(9.0), sec(9.3)], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Final fade out
  const sceneDuration = sec(11);
  const fadeOut = interpolate(
    frame,
    [sceneDuration - 20, sceneDuration],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const glowPulse = interpolate(
    Math.sin(frame * 0.1),
    [-1, 1],
    [0.08, 0.18]
  );

  return (
    <AbsoluteFill
      style={{
        background: COLORS.bgDark,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: 24,
        opacity: fadeOut,
      }}
    >
      <GridBackground intensity={0.03} />
      <RadialGlow size={1000} opacity={glowPulse} blur={100} />

      {/* Logo */}
      <div style={{ transform: `scale(${logoScale})`, marginBottom: 8 }}>
        <Img
          src={staticFile("logo.png")}
          style={{ width: 130, height: 130 }}
        />
      </div>

      {/* CTA headline */}
      <div style={{ opacity: ctaOpacity, textAlign: "center" }}>
        <GlowText fontSize={54}>
          <span style={{ color: COLORS.accentCyan }}>$STRONG</span> is live.
        </GlowText>
        <div style={{ opacity: subtitleOpacity, marginTop: 14 }}>
          <GlowText fontSize={34} color={COLORS.textMuted}>
            Get it before the agents need saving.
          </GlowText>
        </div>
      </div>

      {/* URL */}
      <div style={{ opacity: urlOpacity, marginTop: 16 }}>
        <div
          style={{
            padding: "10px 32px",
            border: `1px solid ${COLORS.accentCyan}44`,
            borderRadius: 8,
            background: `${COLORS.bgMid}AA`,
          }}
        >
          <GlowText
            fontSize={22}
            color={COLORS.accentTeal}
            style={{ letterSpacing: 3, textAlign: "center" }}
          >
            getstronghold.xyz
          </GlowText>
        </div>
      </div>

      {/* Thucydides quote */}
      <div
        style={{
          opacity: quoteOpacity,
          position: "absolute",
          bottom: 100,
          left: 0,
          right: 0,
          textAlign: "center",
        }}
      >
        <GlowText
          fontSize={22}
          color={`${COLORS.textMuted}CC`}
          glowColor={COLORS.deepTeal}
          style={{
            fontStyle: "italic",
            letterSpacing: 1,
          }}
        >
          The strong do what they can; the weak suffer what they must.
        </GlowText>
      </div>

      {/* Final "Get $STRONG" CTA */}
      <div
        style={{
          opacity: getFinalOpacity,
          position: "absolute",
          bottom: 40,
          left: 0,
          right: 0,
          textAlign: "center",
        }}
      >
        <GlowText
          fontSize={32}
          color={COLORS.accentCyan}
          style={{
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          Get $STRONG
        </GlowText>
      </div>
    </AbsoluteFill>
  );
};

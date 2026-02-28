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
  FadeIn,
  GridBackground,
  RadialGlow,
  WordReveal,
  WordTiming,
} from "./components";

export const SceneClose: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Scene: 58.5s → 74.0s global (15.5s, 465 frames)
  // Scene offset: 58.5s (subtract from global Whisper timestamps)

  // Logo entrance
  const logoScale = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 60 },
    delay: 0,
  });

  // Feature icons (staggered)
  const featureDelays = [sec(2.5), sec(3.3), sec(4.1)];
  const features = [
    { icon: "🛡️", label: "B2B API" },
    { icon: "🖼️", label: "Image Scan" },
    { icon: "🔒", label: "Egress Scan" },
  ];

  // "We're just getting started." — appears at ~11.5s, stays on screen
  const startedOpacity = interpolate(
    frame,
    [sec(11.0), sec(11.5)],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // "GET $STRONG!" CTA — appears at ~13s
  const ctaOpacity = interpolate(
    frame,
    [sec(12.5), sec(13.0)],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const ctaScale = spring({
    frame: frame - sec(12.5),
    fps,
    config: { damping: 10, stiffness: 100 },
  });

  // CTA glow pulse
  const ctaGlow = interpolate(
    Math.sin((frame - sec(13.0)) * 0.2),
    [-1, 1],
    [0.5, 1]
  );

  // RadialGlow pulse
  const glowPulse = interpolate(
    Math.sin(frame * 0.08),
    [-1, 1],
    [0.08, 0.2]
  );

  // Final fade out
  const sceneDuration = sec(15.5);
  const fadeOut = interpolate(
    frame,
    [sceneDuration - 20, sceneDuration],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Caption 1: "The on-chain agentic economy is accelerating"
  const caption1: WordTiming[] = [
    { text: "The", at: sec(0.32) },
    { text: "on-chain", at: sec(0.4) },
    { text: "agentic", at: sec(0.86) },
    { text: "economy", at: sec(1.52) },
    { text: "is", at: sec(1.92) },
    { text: "accelerating", at: sec(2.3) },
  ];

  // Caption 2: "And Stronghold is building the security and payment infrastructure that serious businesses need to move fast without breaking things."
  const caption2: WordTiming[] = [
    { text: "And", at: sec(3.58) },
    { text: "Stronghold", at: sec(3.66) },
    { text: "is", at: sec(4.24) },
    { text: "building", at: sec(4.5) },
    { text: "the", at: sec(4.78) },
    { text: "security", at: sec(5.08), color: COLORS.accentCyan },
    { text: "and", at: sec(5.48) },
    { text: "payment", at: sec(5.94), color: COLORS.accentCyan },
    { text: "infrastructure", at: sec(6.24), color: COLORS.accentCyan },
    { text: "that", at: sec(6.86) },
    { text: "serious", at: sec(7.5) },
    { text: "businesses", at: sec(7.86) },
    { text: "need", at: sec(8.42) },
    { text: "to", at: sec(9.22) },
    { text: "move", at: sec(9.62) },
    { text: "fast", at: sec(9.9) },
    { text: "without", at: sec(10.28) },
    { text: "breaking", at: sec(10.6) },
    { text: "things.", at: sec(10.88) },
  ];

  return (
    <AbsoluteFill
      style={{
        background: COLORS.bgDark,
        opacity: fadeOut,
      }}
    >
      <GridBackground intensity={0.03} />
      <RadialGlow size={1000} opacity={glowPulse} blur={100} />

      {/* Logo — fixed at top */}
      <div
        style={{
          position: "absolute",
          top: 100,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div style={{ transform: `scale(${logoScale})` }}>
          <Img
            src={staticFile("logo.png")}
            style={{ width: 120, height: 120 }}
          />
        </div>
      </div>

      {/* Caption area — fixed position, word-by-word reveal */}
      <div
        style={{
          position: "absolute",
          top: 250,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          padding: "0 180px",
        }}
      >
        {frame < sec(3.3) && (
          <WordReveal
            words={caption1}
            fontSize={40}
            style={{ textAlign: "center", maxWidth: 1000 }}
          />
        )}
        {frame >= sec(3.3) && frame < sec(11.5) && (
          <WordReveal
            words={caption2}
            fontSize={36}
            style={{ textAlign: "center", maxWidth: 1000 }}
          />
        )}
      </div>

      {/* Feature icons — fixed position */}
      <div
        style={{
          position: "absolute",
          top: 480,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 60,
        }}
      >
        {features.map((feat, i) => {
          const featOpacity = interpolate(
            frame,
            [featureDelays[i], featureDelays[i] + sec(0.5)],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );
          const featY = interpolate(
            frame,
            [featureDelays[i], featureDelays[i] + sec(0.5)],
            [20, 0],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          return (
            <div
              key={i}
              style={{
                opacity: featOpacity,
                transform: `translateY(${featY}px)`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 12,
              }}
            >
              <div
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 16,
                  border: `2px solid ${COLORS.deepTeal}`,
                  background: `${COLORS.bgMid}DD`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 36,
                }}
              >
                {feat.icon}
              </div>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: COLORS.textMuted,
                  fontFamily: "monospace",
                  letterSpacing: 1,
                }}
              >
                {feat.label}
              </div>
            </div>
          );
        })}
      </div>

      {/* "We're just getting started." + "GET $STRONG!" — centered between icons and URL */}
      <div
        style={{
          position: "absolute",
          top: 700,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
        }}
      >
        <div style={{ opacity: startedOpacity }}>
          <GlowText
            fontSize={32}
            color={COLORS.textMuted}
            style={{ textAlign: "center", letterSpacing: 2 }}
          >
            We're just getting started.
          </GlowText>
        </div>

        <div
          style={{
            opacity: ctaOpacity,
            transform: `scale(${ctaScale})`,
          }}
        >
          <GlowText
            fontSize={72}
            color={COLORS.accentCyan}
            glowColor={COLORS.accentCyan}
            style={{
              letterSpacing: 12,
              textAlign: "center",
              opacity: ctaGlow,
              textShadow: `0 0 60px ${COLORS.accentCyan}88, 0 0 120px ${COLORS.accentCyan}44`,
            }}
          >
            GET <span style={{ color: "#00FF88" }}>$STRONG</span>!
          </GlowText>
        </div>
      </div>

      {/* URL — fixed at very bottom */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <FadeIn delay={sec(6.0)} duration={10}>
          <div
            style={{
              padding: "10px 32px",
              border: `1px solid ${COLORS.accentCyan}44`,
              borderRadius: 8,
              background: `${COLORS.bgMid}AA`,
            }}
          >
            <GlowText
              fontSize={20}
              color={COLORS.accentTeal}
              style={{ letterSpacing: 3, textAlign: "center" }}
            >
              getstronghold.xyz
            </GlowText>
          </div>
        </FadeIn>
      </div>
    </AbsoluteFill>
  );
};

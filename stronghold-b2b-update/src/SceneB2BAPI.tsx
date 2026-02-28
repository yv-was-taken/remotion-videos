import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
} from "remotion";
import { COLORS, sec } from "./constants";
import {
  GlowText,
  FadeIn,
  GridBackground,
  Particles,
  FeatureBadge,
  WordReveal,
  WordTiming,
} from "./components";

const BOX_STYLE: React.CSSProperties = {
  padding: "24px 36px",
  border: `2px solid ${COLORS.deepTeal}`,
  borderRadius: 12,
  background: `${COLORS.bgMid}DD`,
  textAlign: "center" as const,
  minWidth: 160,
  backdropFilter: "blur(4px)",
};

export const SceneB2BAPI: React.FC = () => {
  const frame = useCurrentFrame();

  // Scene: 10.0s → 31.5s global (21.5s, 645 frames)
  // Scene offset: 10.0s (subtract from global Whisper timestamps)

  // Pipeline diagram appears at ~2s
  const diagramOpacity = interpolate(
    frame,
    [sec(2.0), sec(2.5)],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Arrow pulse
  const arrowPulse = interpolate(
    Math.sin(frame * 0.15),
    [-1, 1],
    [0.4, 1]
  );

  // Threat labels synced to narration (Whisper word timestamps, scene-relative)
  const threats = [
    { label: "Poisoned Payloads", delay: sec(16.8) },
    { label: "Prompt Injections", delay: sec(18.0) },
    { label: "Jailbreaks", delay: sec(19.3) },
  ];

  // Lock icon appears after all three threats are visible
  const lockStart = sec(20.2);
  const lockOpacity = interpolate(
    frame,
    [lockStart, lockStart + sec(0.3)],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Caption 1: "First, Business to Business — we're enabling the foundation for B2B customers with our API"
  const caption1: WordTiming[] = [
    { text: "First,", at: sec(0.26) },
    { text: "Business", at: sec(0.92) },
    { text: "to", at: sec(1.24) },
    { text: "Business", at: sec(1.44) },
    { text: "—", at: sec(2.34) },
    { text: "we're", at: sec(2.34) },
    { text: "enabling", at: sec(2.5) },
    { text: "the", at: sec(2.82) },
    { text: "foundation", at: sec(3.16) },
    { text: "for", at: sec(3.74) },
    { text: "B2B", at: sec(4.2), color: COLORS.accentCyan },
    { text: "customers", at: sec(5.22), color: COLORS.accentCyan },
    { text: "with", at: sec(5.6) },
    { text: "our", at: sec(6.16) },
    { text: "API", at: sec(6.46) },
  ];

  // Caption 2: "So that businesses can build and scale agentic products without worrying about the threat surface,"
  const caption2: WordTiming[] = [
    { text: "So", at: sec(6.98) },
    { text: "that", at: sec(7.62) },
    { text: "businesses", at: sec(7.86) },
    { text: "can", at: sec(8.28) },
    { text: "build", at: sec(8.62) },
    { text: "and", at: sec(8.86) },
    { text: "scale", at: sec(9.22) },
    { text: "agentic", at: sec(9.56), color: COLORS.accentCyan },
    { text: "products", at: sec(10.34), color: COLORS.accentCyan },
    { text: "without", at: sec(10.78) },
    { text: "worrying", at: sec(11.26) },
    { text: "about", at: sec(11.64) },
    { text: "the", at: sec(11.94) },
    { text: "threat", at: sec(12.12), color: COLORS.warningAmber },
    { text: "surface,", at: sec(12.36), color: COLORS.warningAmber },
  ];

  // Caption 3: "scanning inputs across the entire pipeline to block poisoned payloads, prompt injections, and jailbreaks before they can propagate."
  const caption3: WordTiming[] = [
    { text: "scanning", at: sec(13.28) },
    { text: "inputs", at: sec(13.74) },
    { text: "across", at: sec(14.08) },
    { text: "the", at: sec(14.48) },
    { text: "entire", at: sec(14.72) },
    { text: "pipeline", at: sec(15.12), color: COLORS.accentCyan },
    { text: "to", at: sec(15.66) },
    { text: "block", at: sec(16.2) },
    { text: "poisoned", at: sec(16.5), color: COLORS.dangerRed },
    { text: "payloads,", at: sec(16.88), color: COLORS.dangerRed },
    { text: "prompt", at: sec(18.02), color: COLORS.dangerRed },
    { text: "injections,", at: sec(18.18), color: COLORS.dangerRed },
    { text: "and", at: sec(19.18) },
    { text: "jailbreaks", at: sec(19.38), color: COLORS.dangerRed },
    { text: "before", at: sec(19.92) },
    { text: "they", at: sec(20.26) },
    { text: "can", at: sec(20.46) },
    { text: "propagate.", at: sec(20.66) },
  ];

  return (
    <AbsoluteFill
      style={{
        background: COLORS.bgDark,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <GridBackground intensity={0.05} />
      <Particles count={15} />

      {/* Badge "01" */}
      <div style={{ position: "absolute", top: 80, left: 0, right: 0, textAlign: "center" }}>
        <FeatureBadge number="01" delay={0} />
      </div>

      {/* Feature title */}
      <div style={{ position: "absolute", top: 180, left: 0, right: 0, textAlign: "center" }}>
        <FadeIn delay={sec(0.3)} duration={8}>
          <GlowText fontSize={56} style={{ letterSpacing: 6 }}>
            B2B API
          </GlowText>
        </FadeIn>
      </div>

      {/* Pipeline flow diagram */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 40,
          marginTop: 40,
          opacity: diagramOpacity,
        }}
      >
        {/* API box */}
        <div style={BOX_STYLE}>
          <div
            style={{
              fontSize: 14,
              color: COLORS.textMuted,
              marginBottom: 6,
              fontFamily: "monospace",
              letterSpacing: 2,
            }}
          >
            INPUT
          </div>
          <div
            style={{
              fontSize: 20,
              fontWeight: 700,
              color: COLORS.textWhite,
              fontFamily: "monospace",
            }}
          >
            API
          </div>
        </div>

        {/* Arrow */}
        <div
          style={{
            fontSize: 28,
            color: COLORS.accentCyan,
            opacity: arrowPulse,
          }}
        >
          ━━━▶
        </div>

        {/* Scanner box */}
        <div
          style={{
            ...BOX_STYLE,
            borderColor: COLORS.accentCyan,
            boxShadow: `0 0 30px ${COLORS.accentCyan}22, inset 0 0 20px ${COLORS.accentCyan}08`,
          }}
        >
          <div
            style={{
              fontSize: 14,
              color: COLORS.accentCyan,
              marginBottom: 6,
              fontFamily: "monospace",
              letterSpacing: 2,
            }}
          >
            STRONGHOLD
          </div>
          <div
            style={{
              fontSize: 20,
              fontWeight: 700,
              color: COLORS.accentCyan,
              fontFamily: "monospace",
            }}
          >
            SCANNER
          </div>
        </div>

        {/* Arrow */}
        <div
          style={{
            fontSize: 28,
            color: COLORS.accentCyan,
            opacity: arrowPulse,
          }}
        >
          ━━━▶
        </div>

        {/* Model box */}
        <div style={BOX_STYLE}>
          <div
            style={{
              fontSize: 14,
              color: COLORS.textMuted,
              marginBottom: 6,
              fontFamily: "monospace",
              letterSpacing: 2,
            }}
          >
            SAFE
          </div>
          <div
            style={{
              fontSize: 20,
              fontWeight: 700,
              color: COLORS.textWhite,
              fontFamily: "monospace",
            }}
          >
            MODEL
          </div>
        </div>
      </div>

      {/* Threat labels with lock overlay — centered between diagram and captions */}
      <div
        style={{
          position: "absolute",
          top: "62%",
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 40,
        }}
      >
        {threats.map((threat, i) => {
          const threatOpacity = interpolate(
            frame,
            [threat.delay, threat.delay + sec(0.4)],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );
          const threatY = interpolate(
            frame,
            [threat.delay, threat.delay + sec(0.4)],
            [15, 0],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          const secured = lockOpacity > 0;

          return (
            <div
              key={i}
              style={{
                opacity: threatOpacity,
                transform: `translateY(${threatY}px)`,
                position: "relative",
              }}
            >
              <div
                style={{
                  padding: "14px 28px",
                  border: `2px solid ${secured ? COLORS.accentCyan + "88" : COLORS.dangerRed + "88"}`,
                  borderRadius: 8,
                  background: `${COLORS.bgMid}DD`,
                  fontSize: 18,
                  fontWeight: 600,
                  color: secured ? COLORS.accentCyan : COLORS.dangerRed,
                  fontFamily: "monospace",
                }}
              >
                {threat.label}
              </div>
              {/* Lock icon */}
              <div
                style={{
                  position: "absolute",
                  top: -10,
                  right: -10,
                  opacity: lockOpacity,
                  fontSize: 20,
                }}
              >
                🔒
              </div>
            </div>
          );
        })}
      </div>

      {/* Caption area — word-by-word reveal */}
      <div
        style={{
          position: "absolute",
          bottom: 100,
          left: 0,
          right: 0,
          textAlign: "center",
          padding: "0 100px",
        }}
      >
        {frame < sec(7.0) && (
          <WordReveal
            words={caption1}
            fontSize={34}
            style={{ textAlign: "center", maxWidth: 1100, margin: "0 auto" }}
          />
        )}
        {frame >= sec(7.0) && frame < sec(13.0) && (
          <WordReveal
            words={caption2}
            fontSize={34}
            style={{ textAlign: "center", maxWidth: 1100, margin: "0 auto" }}
          />
        )}
        {frame >= sec(13.0) && (
          <WordReveal
            words={caption3}
            fontSize={34}
            style={{ textAlign: "center", maxWidth: 1100, margin: "0 auto" }}
          />
        )}
      </div>
    </AbsoluteFill>
  );
};

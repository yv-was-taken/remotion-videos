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
  RadialGlow,
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

export const SceneEgress: React.FC = () => {
  const frame = useCurrentFrame();

  // Scene: 47.0s → 58.5s global (11.5s, 345 frames)
  // Scene offset: 47.0s (subtract from global Whisper timestamps)
  // Note: Whisper lost words ~49.2-55.7 — timestamps estimated for missing words

  // Arrow pulses
  const arrowPulse = interpolate(
    Math.sin(frame * 0.15),
    [-1, 1],
    [0.4, 1]
  );

  // Data type labels synced to narration (Whisper small model, scene-relative)
  const dataTypes = [
    { label: "PII", delay: sec(4.98) },
    { label: "Keys", delay: sec(6.54) },
    { label: "Financial Data", delay: sec(7.30) },
    { label: "Tech Architecture", delay: sec(8.74) },
  ];

  // Lock icon appears after all labels are visible
  const lockStart = sec(9.5);
  const lockOpacity = interpolate(
    frame,
    [lockStart, lockStart + sec(0.3)],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Diagram opacity
  const diagramOpacity = interpolate(
    frame,
    [sec(1.5), sec(2.0)],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Glow pulse
  const glowPulse = interpolate(
    Math.sin(frame * 0.1),
    [-1, 1],
    [0.06, 0.14]
  );

  // Caption: "We secure outputs too, protecting PII, keys, financial data, and technical architecture on the response side."
  // Timestamps estimated where Whisper lost words (~49.5-55.7 global)
  const captionWords: WordTiming[] = [
    // Whisper small model timestamps (global - 47.0 = scene-relative)
    { text: "We", at: sec(2.68) },
    { text: "secure", at: sec(2.84) },
    { text: "outputs", at: sec(3.18), color: COLORS.accentCyan },
    { text: "too,", at: sec(3.68) },
    { text: "protecting", at: sec(4.02) },
    { text: "PII,", at: sec(4.98), color: COLORS.dangerRed },
    { text: "keys,", at: sec(6.54), color: COLORS.dangerRed },
    { text: "financial", at: sec(7.30), color: COLORS.dangerRed },
    { text: "data,", at: sec(7.70), color: COLORS.dangerRed },
    { text: "and", at: sec(8.06) },
    { text: "technical", at: sec(8.74), color: COLORS.dangerRed },
    { text: "architecture", at: sec(9.20), color: COLORS.dangerRed },
    { text: "on", at: sec(9.84) },
    { text: "the", at: sec(10.18) },
    { text: "response", at: sec(10.30) },
    { text: "side.", at: sec(10.58) },
  ];

  return (
    <AbsoluteFill
      style={{
        background: COLORS.bgDark,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <GridBackground intensity={0.04} />
      <RadialGlow size={600} opacity={glowPulse} blur={80} />

      {/* Badge "03" */}
      <div style={{ position: "absolute", top: 80, left: 0, right: 0, textAlign: "center" }}>
        <FeatureBadge number="03" delay={0} />
      </div>

      {/* Feature title */}
      <div style={{ position: "absolute", top: 180, left: 0, right: 0, textAlign: "center" }}>
        <FadeIn delay={sec(0.3)} duration={8}>
          <GlowText fontSize={56} style={{ letterSpacing: 6 }}>
            Scan Model Egress
          </GlowText>
        </FadeIn>
      </div>

      {/* Flow diagram: MODEL → STRONGHOLD → OUTPUT */}
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
            LLM
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

        {/* Arrow (red — unsafe output) */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4,
          }}
        >
          <div
            style={{
              fontSize: 12,
              color: COLORS.dangerRed,
              fontFamily: "monospace",
              letterSpacing: 1,
              opacity: 0.7,
            }}
          >
            RAW
          </div>
          <div
            style={{
              fontSize: 28,
              color: COLORS.dangerRed,
              opacity: arrowPulse,
            }}
          >
            ━━━▶
          </div>
        </div>

        {/* Stronghold box */}
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
            EGRESS SCAN
          </div>
        </div>

        {/* Arrow (cyan — safe output) */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4,
          }}
        >
          <div
            style={{
              fontSize: 12,
              color: COLORS.accentCyan,
              fontFamily: "monospace",
              letterSpacing: 1,
              opacity: 0.7,
            }}
          >
            SAFE
          </div>
          <div
            style={{
              fontSize: 28,
              color: COLORS.accentCyan,
              opacity: arrowPulse,
            }}
          >
            ━━━▶
          </div>
        </div>

        {/* Output box */}
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
            CLEAN
          </div>
          <div
            style={{
              fontSize: 20,
              fontWeight: 700,
              color: COLORS.textWhite,
              fontFamily: "monospace",
            }}
          >
            OUTPUT
          </div>
        </div>
      </div>

      {/* Data type labels with lock overlay */}
      <div
        style={{
          position: "absolute",
          bottom: 220,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 30,
          flexWrap: "wrap",
          padding: "0 200px",
        }}
      >
        {dataTypes.map((dt, i) => {
          const dtOpacity = interpolate(
            frame,
            [dt.delay, dt.delay + sec(0.4)],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );
          const dtY = interpolate(
            frame,
            [dt.delay, dt.delay + sec(0.4)],
            [15, 0],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          const secured = lockOpacity > 0;

          return (
            <div
              key={i}
              style={{
                opacity: dtOpacity,
                transform: `translateY(${dtY}px)`,
                position: "relative",
              }}
            >
              <div
                style={{
                  padding: "12px 24px",
                  border: `2px solid ${secured ? COLORS.accentCyan + "88" : COLORS.dangerRed + "88"}`,
                  borderRadius: 8,
                  background: `${COLORS.bgMid}DD`,
                  fontSize: 16,
                  fontWeight: 600,
                  color: secured ? COLORS.accentCyan : COLORS.dangerRed,
                  fontFamily: "monospace",
                }}
              >
                {dt.label}
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
        <WordReveal
          words={captionWords}
          fontSize={34}
          style={{ textAlign: "center", maxWidth: 1100, margin: "0 auto" }}
        />
      </div>
    </AbsoluteFill>
  );
};

import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  Img,
  staticFile,
} from "remotion";
import { COLORS, sec } from "./constants";
import { GlowText, FadeIn, GridBackground, ScanLine } from "./components";

const BOX_STYLE: React.CSSProperties = {
  padding: "24px 36px",
  border: `2px solid ${COLORS.deepTeal}`,
  borderRadius: 12,
  background: `${COLORS.bgMid}DD`,
  textAlign: "center",
  minWidth: 160,
  backdropFilter: "blur(4px)",
};

export const SceneHowItWorks: React.FC = () => {
  const frame = useCurrentFrame();

  // Scene starts at 21.0s global. Whisper word timestamps:
  //  21.34 - 25.18  "a transparent proxy that sits between your agent and the internet."
  //  25.58 - 30.10  "Inbound traffic is scanned for prompt injection before it ever reaches the model."
  //  30.50 - 34.98  "Outbound responses are scanned for credential leaks and blocked before they leave."
  //
  // Relative to 21.0s scene start:
  //  0.34 - 4.18   proxy
  //  4.58 - 9.10   inbound
  //  9.50 - 13.98  outbound
  //
  // Text appears ~0.2s before narration:
  const isProxy = frame < sec(4.4);
  const isInbound = frame >= sec(4.4) && frame < sec(9.3);
  const isOutbound = frame >= sec(9.3) && frame < sec(14.0);

  // Animated data flow arrows
  const arrowPulse = interpolate(
    Math.sin(frame * 0.15),
    [-1, 1],
    [0.4, 1]
  );

  return (
    <AbsoluteFill
      style={{
        background: COLORS.bgDark,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <GridBackground intensity={0.05} />
      <ScanLine speed={2} />

      {/* Architecture diagram — centered, row layout */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 50,
          marginBottom: 120,
        }}
      >
        {/* Agent box */}
        <FadeIn delay={0} duration={4}>
          <div style={BOX_STYLE}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>🤖</div>
            <div
              style={{
                fontSize: 20,
                fontWeight: 700,
                color: COLORS.textWhite,
                fontFamily: "monospace",
              }}
            >
              AI AGENT
            </div>
          </div>
        </FadeIn>

        {/* Arrow: Agent ← Stronghold */}
        <FadeIn delay={1} duration={4}>
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
                opacity: isInbound ? 1 : 0.3,
                fontFamily: "monospace",
                letterSpacing: 1,
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
              ◀━━━
            </div>
          </div>
        </FadeIn>

        {/* Stronghold box */}
        <FadeIn delay={2} duration={4}>
          <div
            style={{
              ...BOX_STYLE,
              borderColor: COLORS.accentCyan,
              boxShadow: `0 0 30px ${COLORS.accentCyan}22, inset 0 0 20px ${COLORS.accentCyan}08`,
            }}
          >
            <Img
              src={staticFile("logo.png")}
              style={{ width: 44, height: 44, marginBottom: 8 }}
            />
            <div
              style={{
                fontSize: 20,
                fontWeight: 700,
                color: COLORS.accentCyan,
                fontFamily: "monospace",
              }}
            >
              STRONGHOLD
            </div>
            <div
              style={{
                fontSize: 12,
                color: COLORS.textMuted,
                marginTop: 4,
                letterSpacing: 2,
              }}
            >
              PROXY
            </div>
          </div>
        </FadeIn>

        {/* Arrow: Stronghold ← Internet */}
        <FadeIn delay={3} duration={4}>
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
                opacity: isOutbound ? 1 : 0.3,
                fontFamily: "monospace",
                letterSpacing: 1,
              }}
            >
              SCANNED
            </div>
            <div
              style={{
                fontSize: 28,
                color: isOutbound ? COLORS.dangerRed : COLORS.accentCyan,
                opacity: arrowPulse,
              }}
            >
              ━━━▶
            </div>
          </div>
        </FadeIn>

        {/* Internet box */}
        <FadeIn delay={4} duration={4}>
          <div
            style={{
              ...BOX_STYLE,
              borderColor: `${COLORS.dangerRed}88`,
            }}
          >
            <div style={{ fontSize: 28, marginBottom: 8 }}>🌐</div>
            <div
              style={{
                fontSize: 20,
                fontWeight: 700,
                color: COLORS.dangerRed,
                fontFamily: "monospace",
              }}
            >
              INTERNET
            </div>
          </div>
        </FadeIn>
      </div>

      {/* Caption area */}
      <div
        style={{
          position: "absolute",
          bottom: 120,
          left: 0,
          right: 0,
          textAlign: "center",
          padding: "0 100px",
        }}
      >
        {isProxy && (
          <FadeIn duration={3}>
            <GlowText fontSize={40} style={{ textAlign: "center" }}>
              A transparent proxy between your agent and the internet.
            </GlowText>
          </FadeIn>
        )}
        {isInbound && (
          <FadeIn duration={3}>
            <GlowText
              fontSize={36}
              style={{
                textAlign: "center",
                maxWidth: 1100,
                margin: "0 auto",
              }}
            >
              <span style={{ color: COLORS.accentCyan }}>Inbound</span> traffic
              is scanned for{" "}
              <span style={{ color: COLORS.warningAmber }}>
                prompt injection
              </span>{" "}
              before it ever reaches the model.
            </GlowText>
          </FadeIn>
        )}
        {isOutbound && (
          <FadeIn duration={3}>
            <GlowText
              fontSize={36}
              style={{
                textAlign: "center",
                maxWidth: 1100,
                margin: "0 auto",
              }}
            >
              <span style={{ color: COLORS.accentCyan }}>Outbound</span>{" "}
              responses are scanned for{" "}
              <span style={{ color: COLORS.dangerRed }}>credential leaks</span>{" "}
              and blocked before they leave.
            </GlowText>
          </FadeIn>
        )}
      </div>
    </AbsoluteFill>
  );
};

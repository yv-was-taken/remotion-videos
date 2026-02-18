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
  padding: "20px 28px",
  border: `2px solid ${COLORS.deepTeal}`,
  borderRadius: 12,
  background: `${COLORS.bgMid}DD`,
  textAlign: "center",
  minWidth: 140,
  backdropFilter: "blur(4px)",
};

export const SceneHowItWorksShort: React.FC = () => {
  const frame = useCurrentFrame();

  // Same timing as widescreen — scene starts at 21.0s global
  const isProxy = frame < sec(4.4);
  const isInbound = frame >= sec(4.4) && frame < sec(9.3);
  const isOutbound = frame >= sec(9.3) && frame < sec(14.0);

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

      {/* Architecture diagram — vertical column layout for 9:16 */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 24,
          marginBottom: 200,
        }}
      >
        {/* Internet box */}
        <FadeIn delay={0} duration={4}>
          <div
            style={{
              ...BOX_STYLE,
              borderColor: `${COLORS.dangerRed}88`,
            }}
          >
            <div style={{ fontSize: 24, marginBottom: 6 }}>🌐</div>
            <div
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: COLORS.dangerRed,
                fontFamily: "monospace",
              }}
            >
              INTERNET
            </div>
          </div>
        </FadeIn>

        {/* Arrow: Internet → Stronghold */}
        <FadeIn delay={1} duration={4}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
            <div
              style={{
                fontSize: 11,
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
                fontSize: 24,
                color: isOutbound ? COLORS.dangerRed : COLORS.accentCyan,
                opacity: arrowPulse,
              }}
            >
              ▼
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
              style={{ width: 36, height: 36, marginBottom: 6 }}
            />
            <div
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: COLORS.accentCyan,
                fontFamily: "monospace",
              }}
            >
              STRONGHOLD
            </div>
            <div
              style={{
                fontSize: 11,
                color: COLORS.textMuted,
                marginTop: 3,
                letterSpacing: 2,
              }}
            >
              PROXY
            </div>
          </div>
        </FadeIn>

        {/* Arrow: Stronghold → Agent */}
        <FadeIn delay={3} duration={4}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
            <div
              style={{
                fontSize: 11,
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
                fontSize: 24,
                color: COLORS.accentCyan,
                opacity: arrowPulse,
              }}
            >
              ▼
            </div>
          </div>
        </FadeIn>

        {/* Agent box */}
        <FadeIn delay={4} duration={4}>
          <div style={BOX_STYLE}>
            <div style={{ fontSize: 24, marginBottom: 6 }}>🤖</div>
            <div
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: COLORS.textWhite,
                fontFamily: "monospace",
              }}
            >
              AI AGENT
            </div>
          </div>
        </FadeIn>
      </div>

      {/* Caption area */}
      <div
        style={{
          position: "absolute",
          bottom: 160,
          left: 0,
          right: 0,
          textAlign: "center",
          padding: "0 60px",
        }}
      >
        {isProxy && (
          <FadeIn duration={3}>
            <GlowText fontSize={34} style={{ textAlign: "center" }}>
              A transparent proxy between your agent and the internet.
            </GlowText>
          </FadeIn>
        )}
        {isInbound && (
          <FadeIn duration={3}>
            <GlowText
              fontSize={30}
              style={{
                textAlign: "center",
                maxWidth: 900,
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
              fontSize={30}
              style={{
                textAlign: "center",
                maxWidth: 900,
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

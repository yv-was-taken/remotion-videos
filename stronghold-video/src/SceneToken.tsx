import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
} from "remotion";
import { COLORS, sec } from "./constants";
import { GlowText, FadeIn, GridBackground, Particles, RadialGlow } from "./components";

export const SceneToken: React.FC = () => {
  const frame = useCurrentFrame();

  // Scene starts at 35.0s global. Whisper word timestamps:
  //  35.48 - 39.50  "$STRONG is your stake in the security layer protecting agentic finance."
  //  40.00 - 44.16  "10% of all fee volume goes to weekly $STRONG burns."
  //  44.68 - 47.16  "Sustained deflation as adoption scales."
  //  47.78 - 54.94  "As more agents integrate Stronghold, $STRONG becomes the connective tissue of the entire agentic DeFi stack."
  //
  // Relative to 35.0s scene start:
  //  0.48 - 4.50   stake
  //  5.00 - 12.16  10% + deflation
  // 12.78 - 19.94  integrate
  //
  // Text appears ~0.3s before narration:
  const captions: {
    content: React.ReactNode;
    from: number;
    to: number;
  }[] = [
    {
      content: (
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              fontSize: 72,
              fontWeight: 800,
              color: COLORS.accentCyan,
              fontFamily:
                "'Inter', -apple-system, sans-serif",
              textShadow: `0 0 60px ${COLORS.accentCyan}44, 0 0 120px ${COLORS.accentCyan}18`,
              marginBottom: 24,
            }}
          >
            $STRONG
          </div>
          <GlowText
            fontSize={34}
            color={COLORS.textMuted}
            glowColor={COLORS.accentTeal}
            style={{ textAlign: "center", maxWidth: 900, margin: "0 auto" }}
          >
            Your stake in the security layer
            <br />
            protecting agentic finance.
          </GlowText>
        </div>
      ),
      from: 0,
      to: sec(4.7),
    },
    {
      content: (
        <div style={{ textAlign: "center" }}>
          <GlowText
            fontSize={42}
            style={{
              textAlign: "center",
              maxWidth: 1000,
              margin: "0 auto",
            }}
          >
            <span style={{ color: COLORS.accentCyan, fontSize: 56 }}>10%</span>{" "}
            of all fee volume goes to weekly{" "}
            <span style={{ color: COLORS.warningAmber }}>$STRONG burns</span>
          </GlowText>
          <div style={{ marginTop: 20 }}>
            <GlowText
              fontSize={28}
              color={COLORS.textMuted}
              glowColor={COLORS.deepTeal}
              style={{ textAlign: "center" }}
            >
              Sustained deflation as adoption scales.
            </GlowText>
          </div>
        </div>
      ),
      from: sec(4.7),
      to: sec(12.5),
    },
    {
      content: (
        <GlowText
          fontSize={38}
          style={{
            textAlign: "center",
            maxWidth: 1100,
            margin: "0 auto",
            lineHeight: 1.5,
          }}
        >
          As more agents integrate Stronghold,
          <br />
          <span style={{ color: COLORS.accentCyan }}>$STRONG</span> becomes the
          connective tissue
          <br />
          of the entire{" "}
          <span style={{ color: COLORS.accentCyan }}>agentic DeFi</span> stack.
        </GlowText>
      ),
      from: sec(12.5),
      to: sec(20.0),
    },
  ];

  const currentCaption = captions.find(
    (c) => frame >= c.from && frame < c.to
  );

  const glowPulse = interpolate(
    Math.sin(frame * 0.07),
    [-1, 1],
    [0.06, 0.16]
  );

  return (
    <AbsoluteFill
      style={{
        background: COLORS.bgDark,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <GridBackground intensity={0.03} />
      <Particles count={25} />
      <RadialGlow size={900} opacity={glowPulse} blur={60} />

      {currentCaption && (
        <FadeIn key={currentCaption.from} duration={4}>
          {currentCaption.content}
        </FadeIn>
      )}
    </AbsoluteFill>
  );
};
